var transfer = new function() {
	var transferTicketToQueueTable;
	var transferQueueToStaffPoolTable;
	var transferQueueToServicePointPoolTable;
	var spPoolData;
	var staffPoolData;
	var rowClicked;
	
	this.getSpPoolData = function(val){
		
		spMap = {};
		tmp = restService.get( val + 'servicePointMiStatInfo_' +selectedBranchId);
		if (tmp !== null && tmp != undefined) {
			value = tmp.value.split("@");
			for (var s = 1; s < value.length; s++){
				ss = value[s].split(",")
				servicePointId =  parseInt( ss[0]/100000000000 , 10);
				spMap[servicePointId]={}
				spMap[servicePointId]["poolWt"] = "";
				if (ss[12] != undefined ){
					if (parseInt(ss[12],10) > 0){
						spMap[servicePointId]["poolWt"] =  "(" + ss[12] + ")";
					}
				}
			}
		}
		return spMap;
	}
	
	this.getStaffPoolData = function(val){
		userMap = {}
		tmp = restService.get( val + 'userStatInfo_' +selectedBranchId);
		
		if (tmp !== null && tmp != undefined) {
			value = tmp.value.split("@");
			for (var s = 1; s < value.length; s++){
				ss = value[s].split(",")
				userName =  ss[0];
				userMap[userName]={}
				userMap[userName]["poolWt"] = "";
				if (ss[4] != undefined ){
					if (parseInt(ss[4],10) > 0){
						userMap[userName]["poolWt"] =  "(" + ss[4] + ")";
					}
				}
			}
		}
		return userMap;
	}

	//transfer clicked in ticket list => open a new dialogue presenting a list of services and transfer options for each service
	this.transferTicketClicked = function(aRowData,event) {
		rowClicked = aRowData
		$('#transferPopupTitle').text(jQuery.i18n.prop('info.transfer.selection.header').replace('%%%', rowClicked.ticketId));
        // Calculate pageX/Y if missing and clientX/Y available
        if (event.pageX == null && event.clientX != null) {
            var doc = document.documentElement,
                body = document.body;
            event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
        }

        $('#transferToQueueDialogue').css({
            'left': event.pageX + 20,
            'top': event.pageY - 20,
            'display': 'inline',
            "position": "absolute"
        }).show();
	}
		
	this.toQueueClicked = function (){
		transfer.hideListModals();
		transfer.transferTicketToQueueClicked(rowClicked);
	}

	this.toStaffClicked = function (){
		transfer.hideListModals();
		transfer.transferTicketToStaffClicked(rowClicked);
	}

	this.toServicePointClicked = function (){
		transfer.hideListModals();
		transfer.transferTicketToServicePointClicked(rowClicked)
	}
	this.hideListModals = function () {
		util.hideModal('searchTicketPage');
		util.hideModal('ticketsDialogue');
		util.hideModal('poolTicketsDialogue');
		util.hideModal('branchTicketsDialogue');
		util.hideModal('transferToQueueDialogue');
	}
	
	this.transferTicketToQueueClicked = function(aRowData) {	
		var filterQueues = function(queuesData){
			var i = queuesData.length;
			while(i--){
				if(queuesData[i].queueType != "QUEUE"){
					queuesData.splice(i, 1);
				}
			}
		};

		sessvars.ticketIdToTransfer = aRowData.ticketId;
		util.showModal("transferQueueToQueueDialogue");
		//need to store some information from the tickets table for later usage, when calling/transferring a ticket
		if(typeof transferTicketToQueueTable !== 'undefined') {
			transferTicketToQueueTable.fnClearTable();
			var queuesData = restService.get("/rest/entrypoint/branches/" + selectedBranchId + "/queues" );
			filterQueues(queuesData);
			transferTicketToQueueTable.fnAddData(queuesData);
			transferTicketToQueueTable.fnAdjustColumnSizing();
		} else {
			var columns = [
				/* Queue name */
				{"sClass": "firstColumn",
					"mDataProp": "name"},
				/* Actions */
				{"sClass": "middleColumn",
					"mData": null,
					"sDefaultContent": ""},
				/* Queue id */
				{"bSearchable": false,
					"bVisible": false,
					"mDataProp": "id"},
				/* Queue waiting time */
				{"sClass": "middleColumn",
					"mDataProp": "waitingTime"},
				/* Queue waiting num */ 
				{"sClass": "lastColumn",
						"mDataProp": "customersWaiting"}
				];
			var t = new Date();
			var url = "/rest/entrypoint/branches/" + selectedBranchId + "/queues?call=" + t;
			var headerCallback = function(nHead, aasData, iStart, iEnd, aiDisplay) {
				$(nHead).closest('thead, THEAD').find('.transferQueueName').each( function (i, item) {
					$(item).parent().css('borderBottom', "1px solid #c0c0c0");
					$(item).html(jQuery.i18n.prop('info.transfer.queue.name'));
				});
				$(nHead).closest('thead, THEAD').find('.transferQueueActions').each( function (i, item) {
					$(item).html(jQuery.i18n.prop('info.transfer.queue.actions'));
				});
				$(nHead).closest('thead, THEAD').find('.transferQueueWaitingTime').each( function (i, item) {
					$(item).html(jQuery.i18n.prop('info.transfer.queue.waiting.time'));
				});
				$(nHead).closest('thead, THEAD').find('.transferQueueCustomerWaiting').each( function (i, item) {
					$(item).html(jQuery.i18n.prop('info.transfer.queue.waiting'));
				});
			};
			var rowCallback = function(nRow, aData, iDisplayIndex) {
				if($('td:eq(0)', nRow).find('span').length == 0) {
					var queueName = $('td:eq(0)', nRow).text();
					$('td:eq(0)', nRow).empty().append("<span class=\"queueNameSpan\">" + queueName + "</span>");
					if (currentSettings.buttonTransferFirstEnabled == true ) {
						$('td:eq(1)', nRow).append("<span><i href=\"#\" class=\"qm-action-btn__icon icon-queue-first\" title=\"" +
							translate.msg("action.title.transfer.first", [sessvars.ticketIdToTransfer]) + "\"></i></span>");
					}
					if (currentSettings.buttonTransferLastEnabled == true ) {
						$('td:eq(1)', nRow).append("<span><i href=\"#\" class=\"qm-action-btn__icon icon-queue-last\" title=\"" +
							translate.msg("action.title.transfer.last", [sessvars.ticketIdToTransfer]) + "\"></i></span>");
					}
					if (currentSettings.buttonTransferSortEnabled == true ) {
						$('td:eq(1)', nRow).append("<span><i href=\"#\" class=\"qm-action-btn__icon icon-clock\" title=\"" +
							translate.msg("action.title.transfer.sorted.lifetime", [sessvars.ticketIdToTransfer]) + "\"></i></span>");
					}
					
				}
				$('td:eq(2)', nRow).html(util.formatIntoHHMMSS(parseInt(aData.waitingTime)));
				return nRow;
			};
			transferTicketToQueueTable = util.buildTableJson({"tableId": "transferTicketQueueToQueueTable", "url": url,
				"rowCallback": rowCallback, "columns": columns, "filter": false, "headerCallback": headerCallback,
				"scrollYHeight": "600px", "emptyTableLabel":"info.transfer.queue.empty", "filterData": filterQueues});
			transferTicketToQueueTable.fnSort([[0,"asc"]]);	
		}

		//destroy old event handlers
		if (currentSettings.buttonTransferFirstEnabled == true ) {
			$( document ).off( 'click','tbody td span i.icon-queue-first')
		}
		if (currentSettings.buttonTransferLastEnabled == true ) {
			$( document ).off( 'click','tbody td span i.icon-queue-last')
		}
		if (currentSettings.buttonTransferSortEnabled == true ) {
			$( document ).off( 'click','tbody td span i.icon-clock' )
		}
		//make new ones
		if (currentSettings.buttonTransferFirstEnabled == true ) {
			$( document ).on( 'click','tbody td span i.icon-queue-first' , function() {
				var nTr = $(this).closest("tr").get(0);
				var aData = transferTicketToQueueTable.fnGetData(nTr);
				transferTicketToQueue("FIRST", aData, aRowData.id);
			});
		}
		if (currentSettings.buttonTransferLastEnabled == true ) {
			$( document ).on( 'click','tbody td span i.icon-queue-last' , function() {
				var nTr = $(this).closest("tr").get(0);
				var aData = transferTicketToQueueTable.fnGetData(nTr);
				transferTicketToQueue("LAST", aData, aRowData.id);
			});
		}
		if (currentSettings.buttonTransferSortEnabled == true ) {
			$( document ).on( 'click','tbody td span i.icon-clock' , function() {
				var nTr = $(this).closest("tr").get(0);
				var aData = transferTicketToQueueTable.fnGetData(nTr);
				transferTicketToQueue("SORTED", aData, aRowData.id);
			});
		}
		$("#transferFromQueueHeader").empty();
		$("#transferFromQueueHeader").html(
			'<a href=\"#\" class=\"closeButton\" onclick="javascript:util.hideModal(\'transferQueueToQueueDialogue\')"></a>' +
				jQuery.i18n.prop('info.transfer.queue.header') );
	}
		
	this.transferTicketToStaffClicked = function(aRowData) {
		if (_isCentral == true ) {
			method = "/rest/entrypoint/variables/";
		} else {
			method = "/rest/entrypoint/branches/" + selectedBranchId + "/variables/";
		}
		staffPoolData = this.getStaffPoolData(method);
		// Transfer to staff pool
		if(typeof transferQueueToStaffPoolTable !== 'undefined') {
			transferQueueToStaffPoolTable.fnClearTable();
			var params = util.createParams();
			var usersData = restService.get("/rest/entrypoint/branches/" + params.branchId + "/users/validForUserPoolTransfer/");
			transferQueueToStaffPoolTable.fnAddData(usersData);
			transferQueueToStaffPoolTable.fnAdjustColumnSizing();
		} else {
			var staffPoolColumns = [
				/* Id */		 {"bSearchable": false,
					"bVisible": false,
					"mDataProp": "id"},
				/* User name  */ {"sClass": "firstColumn",
					"mDataProp": "userName"},
				/* Actions */	  {"sClass": "middleColumn",
					"mData": null,
					"sDefaultContent": ""},
				/* First mme */  {"sClass": "lastColumn",
					"mDataProp": "firstName"},
				/* Last name */  {"sClass": "lastColumn",
					"mDataProp": "lastName"}
			];
			var staffPoolUrl = "/rest/entrypoint/branches/" + selectedBranchId + "/users/validForUserPoolTransfer/";
			var staffPoolHeaderCallback = function(nHead, aasData, iStart, iEnd, aiDisplay) {
				$(nHead).closest('thead, THEAD').find('.transferStaffPoolUserName').each( function (i, item) {
					$(item).parent().css('borderBottom', "1px solid #c0c0c0");
					$(item).html(jQuery.i18n.prop('info.transfer.staff.pool.username'));
				});
				$(nHead).closest('thead, THEAD').find('.transferStaffPoolActions').each( function (i, item) {
					$(item).html(jQuery.i18n.prop('info.transfer.staff.pool.actions'));
				});
				$(nHead).closest('thead, THEAD').find('.transferStaffPoolFirstName').each( function (i, item) {
					$(item).html(jQuery.i18n.prop('info.transfer.staff.pool.firstname'));
				});
				$(nHead).closest('thead, THEAD').find('.transferStaffPoolLastName').each( function (i, item) {
					$(item).html(jQuery.i18n.prop('info.transfer.staff.pool.lastname'));
				});
			};
			var staffPoolRowCallback = function(nRow, aData, iDisplayIndex) {
				if($('td:eq(0)', nRow).find('span').length == 0) {
					
					var staffName = $('td:eq(0)', nRow).text();
					var staffWt = "";
					if (staffPoolData[staffName] != undefined){
						staffWt = staffPoolData[staffName].poolWt;
					}
					$('td:eq(0)', nRow).empty().append("<span class=\"staffNameSpan\">" + staffName + " " + staffWt + "</span>");
					$('td:eq(1)', nRow).append("<span><i href=\"#\" class=\"qm-action-btn__icon icon-customer-solid\" title=\"" +
						translate.msg("action.title.transfer.staff.pool", [sessvars.ticketIdToTransfer, staffName]) + "\"></i></span>");
				}
				return nRow;
			};
			transferQueueToStaffPoolTable = util.buildTableJson({"tableId": "transferQueueToStaffPoolTable",
				"url": staffPoolUrl, "rowCallback": staffPoolRowCallback, "columns": staffPoolColumns,
				"filter": false, "headerCallback": staffPoolHeaderCallback, "scrollYHeight": "600px",
				"emptyTableLabel":"info.transfer.staff.pool.empty"});
			transferQueueToStaffPoolTable.fnSort([[1,"asc"]]);	
		}
		//destroy old event handlers
		$( document ).off( 'click','tbody tr td span i.icon-customer-solid')
		//make new ones
		$( document ).on( 'click','tbody tr td span i.icon-customer-solid' , function() {
			var nTr = $(this).closest("tr").get(0);
			var aData = transferQueueToStaffPoolTable.fnGetData(nTr);
			transferVisitInQueueToStaffPoolClicked("FIRST", aData, aRowData.id);
		});
		util.showModal("transferQueueToStaffPoolDialogue");
		$("#transferFromStaffPoolHeader").empty();
		$("#transferFromStaffPoolHeader").html(
			'<a href=\"#\" class=\"closeButton\" onclick="javascript:util.hideModal(\'transferQueueToStaffPoolDialogue\')"></a>' +
				jQuery.i18n.prop('info.transfer.staff.pool.header') );
	}
		
	this.transferTicketToServicePointClicked = function(aRowData) {
		if (_isCentral == true ) {
			method = "/rest/entrypoint/variables/";
		} else {
			method = "/rest/entrypoint/branches/" + selectedBranchId + "/variables/";
		}
		spPoolData = this.getSpPoolData(method);
		// Transfer to service point pool
		if(typeof transferQueueToServicePointPoolTable !== 'undefined') {
			transferQueueToServicePointPoolTable.fnClearTable();
			var params = util.createParams();
			var servicePointsData = restService.get("/rest/entrypoint/branches/" + params.branchId + "/servicePoints/validForServicePointPoolTransfer/");
			transferQueueToServicePointPoolTable.fnAddData(servicePointsData);
			transferQueueToServicePointPoolTable.fnAdjustColumnSizing();
		} else {
			var servicePointColumns = [
				/* Name */		{"sClass": "firstColumn",
					"mDataProp": "name"},
				/* Actions */	  {"sClass": "middleColumn",
					"mData": null,
					"sDefaultContent": ""},
				/* Id */		  {"bSearchable": false,
					"bVisible": false,
					"mDataProp": "id"},
				/* Unit id */	 {"bSearchable": false,
					"bVisible": false,
					"mDataProp": "unitId"},
				/* State*/{"sClass": "lastColumn",
					"mDataProp": "state"},
				/* Parameters */ {"bSearchable": false,
					"bVisible": false,
					"mDataProp": "parameters"}
			];
			var servicePointUrl = "/rest/entrypoint/branches/" + selectedBranchId + "/servicePoints/validForServicePointPoolTransfer/";
			var servicePointHeaderCallback = function(nHead, aasData, iStart, iEnd, aiDisplay) {
				$(nHead).closest('thead, THEAD').find('.transferServicePointPoolName').each( function (i, item) {
					$(item).parent().css('borderBottom', "1px solid #c0c0c0");
					$(item).html(jQuery.i18n.prop('info.transfer.servicepoint.pool.name'));
				});
				$(nHead).closest('thead, THEAD').find('.transferServicePointPoolActions').each( function (i, item) {
					$(item).html(jQuery.i18n.prop('info.transfer.servicepoint.pool.actions'));
				});
				$(nHead).closest('thead, THEAD').find('.transferServicePointPoolState').each( function (i, item) {
					$(item).html(jQuery.i18n.prop('info.transfer.servicepoint.pool.state'));
				});
			};
			var servicePointRowCallback = function(nRow, aData, iDisplayIndex) {
				
				if($('td:eq(0)', nRow).find('span').length == 0) {
					var servicePointName = $('td:eq(0)', nRow).text();
					var poolWt = "";
					if (spPoolData[aData.id] != undefined){
						poolWt = spPoolData[aData.id].poolWt;
					}
					
					$('td:eq(0)', nRow).empty().append("<span class=\"servicePointNameSpan\">" + servicePointName + " " + poolWt +
						"</span>");
						
					if (aData.state === 'OPEN' || currentSettings.buttonTransferServicepointAlways == true) {	
						$('td:eq(1)', nRow).append("<span><i href=\"#\" class=\"qm-action-btn__icon icon-screen\" title=\"" +
							translate.msg("action.title.transfer.servicepoint.pool", [sessvars.ticketIdToTransfer, servicePointName]) + "\"></i></span>");
					}
				}
				
				$('td:eq(2)', nRow).html(translate.msg("info.transfer.servicepoint.pool.state." + aData.state));
				return nRow;
			};
			transferQueueToServicePointPoolTable = util.buildTableJson({"tableId": "transferQueueToServicePointPoolTable",
				"url": servicePointUrl, "rowCallback": servicePointRowCallback, "columns": servicePointColumns,
				"filter": false, "headerCallback": servicePointHeaderCallback, "scrollYHeight": "600px",
				"emptyTableLabel":"info.transfer.servicepoint.pool.empty"});
			transferQueueToServicePointPoolTable.fnSort([[0,"asc"]]);	
		}
		//destroy old event handlers
		$( document ).off( 'click','tbody tr td span i.icon-screen')
		//make new ones
		$( document ).on( 'click','tbody tr td span i.icon-screen' , function() {
			var nTr = $(this).closest("tr").get(0);
			var aData = transferQueueToServicePointPoolTable.fnGetData(nTr);
			transferVisitInQueueToServicePointPoolClicked("FIRST", aData, aRowData.id);
		});
		util.showModal("transferQueueToServicePointPoolDialogue");
		$("#transferFromServicePointPoolHeader").empty();
		$("#transferFromServicePointPoolHeader").html(
			'<a href=\"#\" class=\"closeButton\" onclick="javascript:util.hideModal(\'transferQueueToServicePointPoolDialogue\')"></a>' +
				jQuery.i18n.prop('info.transfer.servicepoint.pool.header') );
	};

	//transfer icon pressed
	var transferTicketToQueue = function(sortType, aRowData, visitId) {
		var transferParams = util.createParams();
		transferParams.queueId = aRowData.id;
		transferParams.$entity = {
			"fromId": entrypointId,
			"fromBranchId" : selectedBranchId,
			"visitId": visitId,
			"sortPolicy" : sortType
		};
		transferParams.json='{"fromId":'+ entrypointId + ',"fromBranchId":'+ selectedBranchId + ',"visitId":' + visitId + ',"sortPolicy":"'+sortType + '"}';
		restService.putParams('/rest/entrypoint/branches/' +  transferParams.branchId + '/queues/' +  transferParams.queueId + '/visits/',transferParams);
		//branchGetInfo(selectedBranchId);
		transfer.visitActionClicked();
		util.hideModal("transferQueueToQueueDialogue");
	};

	var transferVisitInQueueToStaffPoolClicked = function(sortType, aRowData, visitId) {
		var transferParams = util.createParams();
		transferParams.userId = aRowData.id;
		transferParams.$entity = {
			"fromId" : entrypointId,
			"fromBranchId" : selectedBranchId,
			"visitId": visitId
		};
		transferParams.json='{"fromId":'+ entrypointId + ',"fromBranchId":'+ selectedBranchId + ',"visitId":' + visitId + '}';
		restService.putParams('/rest/entrypoint/branches/' +  transferParams.branchId + '/users/' +  transferParams.userId + '/visits/',transferParams);
		//branchGetInfo(selectedBranchId);
		transfer.visitActionClicked();
		util.hideModal("transferQueueToStaffPoolDialogue");
	};

	var transferVisitInQueueToServicePointPoolClicked = function(sortType, aRowData, visitId) {
		var transferParams = util.createParams();
		transferParams.servicePointId = aRowData.id;
		transferParams.$entity = {
			"fromId" : entrypointId,
			"fromBranchId" : selectedBranchId,
			"visitId": visitId
		};
		transferParams.json='{"fromId":'+ entrypointId + ',"fromBranchId":'+ selectedBranchId + ',"visitId":' + visitId + '}';
		restService.putParams('/rest/entrypoint/branches/' +  transferParams.branchId + '/servicePoints/' +  transferParams.servicePointId + '/visits/',transferParams);
		//branchGetInfo(selectedBranchId);
		transfer.visitActionClicked();
		util.hideModal("transferQueueToServicePointPoolDialogue");
	};
	
	this.visitActionClicked = function(selectedBranchId){
		loadData(selectedView)
	};
};