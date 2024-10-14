var queues = new function() {
	var ticketsTable;
	var poolTicketsTable;
	var branchTicketsTable;
	var visitRemoveId = "";
	this.queueClicked = function(clickedQueueId, type, name) {
		var sortType = 'asc';
		if (currentSettings.orderTicketsInQueue === 5) {
			sortType = 'desc'
		}

		var SORTING = [[currentSettings.orderTicketsInQueue, sortType]];

		util.showModal("ticketsDialogue");
		if(typeof ticketsTable !== 'undefined') {
			//empty the tickets table and populate with new data from server if table is not created
			ticketsTable.fnClearTable();
			var tickets;

			if (type === "queue") {
				tickets = restService.get("/rest/entrypoint/branches/" + selectedBranchId + "/queues/" + clickedQueueId + "/visits/full");
			}
			ticketsTable.fnAddData(tickets);
			ticketsTable.fnAdjustColumnSizing();
		} else {
			idProp = "id"
			var columns = [
				/* Id */  
				{"bSearchable": false,
					"bVisible": false,
					"mDataProp": idProp,
					"width": "0%"
					},
				/* Ticket id */ 
				{"sClass": "firstColumn",
					"mDataProp": "ticketId"
					},
				/* Actions */ 
				{"sClass": "actionColumn",
					"mDataProp": null},
				/* Notes */ 
				{"sClass": "notesColumn",
					"bVisible": currentSettings.showTicketListNotes,
					"mDataProp": "parameterMap.custom1",
					"sDefaultContent": ""},
				/* Services */
				{"sClass": "middleColumn",
					"mDataProp": null,
					"sDefaultContent": ""},
				/*Appointment time */
				{"sClass": "lastColumn",
					"bVisible": currentSettings.showTicketListAppointmentTime,
					"mDataProp": "appointmentTime",
					"sDefaultContent": ""},
				/* Waiting Time  */	  
				{"sClass": "lastColumn",
					"bVisible": currentSettings.showTicketListWt,
					"mDataProp": "waitingTime",
					"sDefaultContent": ""},
				/*Customer name */ 
				{"sClass": "middleColumn",
					"bVisible": currentSettings.showTicketListCustomer,
					"mDataProp": null}
				];
			var headerCallback = function(nHead, aasData, iStart, iEnd, aiDisplay) {
				nHead.style.borderBottom = "1px solid #c0c0c0";
				nHead.getElementsByTagName('th')[0].innerHTML = translate.msg('info.queue.tickets');
				nHead.getElementsByTagName('th')[1].innerHTML = jQuery.i18n.prop('info.queue.tickets.actions');
				pos = 2;
				if (currentSettings.showTicketListNotes == true ) {
					nHead.getElementsByTagName('th')[pos].innerHTML = jQuery.i18n.prop('info.queue.tickets.notes');
					pos +=1;
				}
				nHead.getElementsByTagName('th')[pos].innerHTML = jQuery.i18n.prop('info.queue.tickets.service');
				pos +=1;
				if (currentSettings.showTicketListAppointmentTime == true ) {
					nHead.getElementsByTagName('th')[pos].innerHTML = jQuery.i18n.prop('info.queue.tickets.appoint.time');
					pos +=1;
				}
				if (currentSettings.showTicketListWt == true ) {
					nHead.getElementsByTagName('th')[pos].innerHTML = translate.msg('info.queue.waiting.time');
					pos +=1;
				}
				if (currentSettings.showTicketListCustomer == true ) {
					nHead.getElementsByTagName('th')[pos].innerHTML = jQuery.i18n.prop('info.queue.customer.name');
				}
				
				
			};
			var t = new Date();
			var url = restConnector + "/rest/entrypoint/branches/" + selectedBranchId + "/queues/" + clickedQueueId + "/visits/full";
			var rowCallback = function(nRow, aData, iDisplayIndex) {
				if($('td:eq(0)', nRow).find('span').length == 0) {
					//format ticket number
					$('td:eq(0)', nRow).html("<span class='ticketNumSpan'>" + aData.ticketId + "</span>");
					if (currentSettings.buttonTransferFromQueueEnabled == true ) {
						$('td:eq(1)', nRow).append("<span><i href=\"#\" class=\"qm-action-btn__icon icon-transfer\" title=\"" +
							translate.msg("action.title.transfer") + "\"></i></span>");
					}
					if (currentSettings.buttonRemoveFromQueueEnabled == true ) {
					$('td:eq(1)', nRow).append("<span>&nbsp;&nbsp;<i href=\"#\" class=\"qm-action-btn__icon icon-delete\" title=\"" +
						translate.msg("action.title.remove") + "\"></i></span>");
					}
				}
				pos = 2;
				if (currentSettings.showTicketListNotes == true ) {
					if (aData.parameterMap != undefined ) {
						if ( aData.parameterMap.custom1 != undefined &&  aData.parameterMap.custom1 != "") {
							$('td:eq(pos)', nRow).html("<span><i href=\"#\" class=\"qm-action-btn__icon icon-message\" title=\"" +
								decodeURIComponent(aData.parameterMap.custom1) + "\"></i></span>");	
						}							
					}
					pos +=1;
				}
				
				listServices = aData.currentVisitService.serviceInternalName;
				for (var x = 1;x < aData.unservedVisitServices.length; x++){
					listServices += ", " + aData.unservedVisitServices[x].serviceInternalName;
				}
				
				for (var x = 0;x < aData.servedVisitServices.length; x++){
					listServices += ', <SPAN STYLE="text-decoration:line-through">' + aData.servedVisitServices[x].serviceInternalName + '</SPAN>';
				}
				
				$('td:eq('+pos+')', nRow).html(listServices);
				pos +=1;

				if (currentSettings.showTicketListAppointmentTime == true ) {
					if (aData.appointmentTime != null ){
						$('td:eq('+pos+')', nRow).html(util.formatTime(aData.appointmentTime.substring(11,16)));
						pos +=1;
					}
				}
				if (currentSettings.showTicketListWt == true ) {
					if (aData.parameterMap.isAppointmentTransaction != undefined && currentSettings.showAppointWt == true){
						tickBt = util.branchTimeSec(aData.branchCurrentTime);   //07:11:01"
						tickAt = util.appointTimeSec(aData.appointmentTime); 	//"2022-12-22T08:30:00"
						if (tickAt > tickBt) {
							tickWt = tickAt - tickBt;
						} else {
							tickWt = tickBt - tickAt;
						}
						if ( showAppointNegativeWt == true && tickAt > tickBt) {
							$('td:eq('+pos+')', nRow).html("-" + util.formatIntoHHMMSS(parseInt(tickWt)));
						} else {
							$('td:eq('+pos+')', nRow).html(util.formatIntoHHMMSS(parseInt(tickWt)));
						}
					}  else {
						$('td:eq('+pos+')', nRow).html(util.formatIntoHHMMSS(parseInt(aData.waitingTime)));
					}
					pos +=1;
				}
				
				
				var customerName = "";
				if (currentSettings.showTicketListCustomer == true){
					if (aData.parameterMap != undefined ) {
						if ( aData.parameterMap.customers != undefined) {
							customerName += aData.parameterMap.customers;	
						}							
					}
					$('td:eq('+pos+')', nRow).html(customerName);
				}
					
				$(nRow).addClass("");
				return nRow;
			};

			//create new table since not defined
			ticketsTable = util.buildTableJson({"tableId": "tickets", "url": url, "rowCallback": rowCallback,
				"columns": columns, "filter": false, "headerCallback": headerCallback, "scrollYHeight": "600px",
				"emptyTableLabel": "info.queue.tickets.empty"});
			ticketsTable.fnSort(SORTING);
			ticketsTable.fnAdjustColumnSizing();
		}

		//kill old event handlers
		if (currentSettings.buttonTransferFromQueueEnabled == true ) {
			$( document ).off( 'click','tbody td span i.icon-transfer');
		}
		if (currentSettings.buttonRemoveFromQueueEnabled == true ) {
			$( document ).off( 'click','tbody td span i.icon-delete');
		}

		//callbacks for calling, transferring and removing tickets
		$( document ).on( 'click','tbody td span i.icon-transfer' , function(event) {
			var nTr = $(this).closest("tr").get(0);
			var aData = ticketsTable.fnGetData(nTr);
			transfer.transferTicketClicked(aData,event);
			return false;
		});
		$( document ).on( 'click','tbody td span i.icon-delete' , function() {
			var nTr = $(this).closest("tr").get(0);
			var aData = ticketsTable.fnGetData(nTr);
			removeTicketClicked(aData);
			util.hideModal('ticketsDialogue');
			return false;
		});

		$("#ticketListHeader").empty();
		$("#ticketListHeader").html(
			'<a href=\"#\" class=\"closeButton\" onclick="javascript:util.hideModal(\'ticketsDialogue\');util.hideModal(\'transferToQueueDialogue\');"></a>' +
				jQuery.i18n.prop('info.list.of.tickets.' + type) + " " + name);
	};

	this.poolClicked = function(clickedQueueId, type, name) {
		
		var sortType = 'asc';
		if (currentSettings.orderTicketsInQueue === 5) {
			sortType = 'desc'
		}

		var SORTING = [[currentSettings.orderTicketsInQueue, sortType]];

		util.showModal("poolTicketsDialogue");
		if(typeof poolTicketsTable !== 'undefined' ) {
			//empty the tickets table and populate with new data from server if table is not created
			poolTicketsTable.fnClearTable();
			var tickets;
			urlAdd = "";
			if (restVersion > 2) {
				urlAdd = "/full";
			}
			if (type === "sppool" ) {
				tickets = restService.get("/rest/servicepoint/branches/" + selectedBranchId + "/servicePoints/" + clickedQueueId + "/pool/visits" + urlAdd);
			}
			if (type === "staffpool" ) {
				tickets = restService.get("/rest/servicepoint/branches/" + selectedBranchId + "/users/" + clickedQueueId + "/pool/visits" + urlAdd);
			}

			poolTicketsTable.fnAddData(tickets);
			poolTicketsTable.fnAdjustColumnSizing();
		} else {
			idProp = "id"
			if ((type == "sppool" || type == "staffpool") && restVersion <= 2){
				idProp = "ticketId"
			}
			
			var columns = [
				/* Id */  
				{"bSearchable": false,
					"bVisible": false,
					"mDataProp": idProp,
					"width": "0%"
					},
				/* Ticket id */ 
				{"sClass": "firstColumn",
					"mDataProp": "ticketId"
					},
				/* Actions */ 
				{"sClass": "actionColumn",
					"mDataProp": null},
				/* Notes */ 
				{"sClass": "notesColumn",
					"mDataProp": "parameterMap.custom1",
					"sDefaultContent": ""},
				/* Services */
				{"sClass": "middleColumn",
					"mDataProp": null,
					"sDefaultContent": ""},
				/*Appointment time */
				{"sClass": "lastColumn",
					"mDataProp": "appointmentTime",
					"sDefaultContent": ""},
				/* Waiting Time  */	  
				{"sClass": "lastColumn",
					"mDataProp": "waitingTime",
					"sDefaultContent": ""},
				/*Customer name */ 
				{"sClass": "middleColumn",
					"mDataProp": null}
				];
			var headerCallback = function(nHead, aasData, iStart, iEnd, aiDisplay) {
				nHead.style.borderBottom = "1px solid #c0c0c0";
				nHead.getElementsByTagName('th')[0].innerHTML = translate.msg('info.queue.tickets');
				nHead.getElementsByTagName('th')[1].innerHTML = jQuery.i18n.prop('info.queue.tickets.actions');
				nHead.getElementsByTagName('th')[2].innerHTML = jQuery.i18n.prop('info.queue.tickets.notes');
				nHead.getElementsByTagName('th')[3].innerHTML = jQuery.i18n.prop('info.queue.tickets.service');
				nHead.getElementsByTagName('th')[4].innerHTML = jQuery.i18n.prop('info.queue.tickets.appoint.time');
				nHead.getElementsByTagName('th')[5].innerHTML = translate.msg('info.queue.waiting.time');
				nHead.getElementsByTagName('th')[6].innerHTML = jQuery.i18n.prop('info.queue.customer.name');
				
			};
			var t = new Date();
			var url = restConnector + "/rest/entrypoint/branches/" + selectedBranchId + "/queues/" + clickedQueueId + "/visits/full";
			urlAdd = "";
			if (restVersion > 2) {
				urlAdd = "/full";
			}
			if (type === "sppool") {
				url = restConnector + "/rest/servicepoint/branches/" + selectedBranchId + "/servicePoints/" + clickedQueueId + "/pool/visits" + urlAdd;
			}
			if (type === "staffpool") {
				url = restConnector + "/rest/servicepoint/branches/" + selectedBranchId + "/users/" + clickedQueueId + "/pool/visits" + urlAdd;
			}

			var rowCallback = function(nRow, aData, iDisplayIndex) {
				if ((type == "sppool" || type == "staffpool") && restVersion <= 2 ){
					fullVisit = restService.get("/rest/servicepoint/branches/" + selectedBranchId + "/visits/" + aData.visitId + "");
					aData.id = fullVisit.id;
					aData.unservedVisitServices = fullVisit.unservedVisitServices;
					aData.servedVisitServices = fullVisit.servedVisitServices;
					aData.currentVisitService = fullVisit.currentVisitService;
					aData.branchCurrentTime = fullVisit.branchCurrentTime;
					aData.checksum = fullVisit.checksum;
					aData.customerIds = fullVisit.customerIds;
					aData.parameterMap = fullVisit.parameterMap;
					aData.timeSinceCalled = fullVisit.timeSinceCalled;
					aData.visitMarks = fullVisit.visitMarks;
				}
				if($('td:eq(0)', nRow).find('span').length == 0) {
					//format ticket number
					$('td:eq(0)', nRow).html("<span class='ticketNumSpan'>" + aData.ticketId + "</span>");
					if (currentSettings.buttonTransferFromQueueEnabled == true ) {
						$('td:eq(1)', nRow).append("<span><i href=\"#\" class=\"qm-action-btn__icon icon-transfer\" title=\"" +
							translate.msg("action.title.transfer") + "\"></i></span>");
					}
					if (currentSettings.buttonRemoveFromQueueEnabled == true ) {
					$('td:eq(1)', nRow).append("<span>&nbsp;&nbsp;<i href=\"#\" class=\"qm-action-btn__icon icon-delete\" title=\"" +
						translate.msg("action.title.remove") + "\"></i></span>");
					}
				}
				
				if (aData.parameterMap != undefined ) {
					if ( aData.parameterMap.custom1 != undefined &&  aData.parameterMap.custom1 != "") {
						$('td:eq(2)', nRow).html("<span><i href=\"#\" class=\"qm-action-btn__icon icon-message\" title=\"" +
							decodeURIComponent(aData.parameterMap.custom1) + "\"></i></span>");	
					}							
				}
				
				listServices = aData.currentVisitService.serviceInternalName;
				for (var x = 1;x < aData.unservedVisitServices.length; x++){
					listServices += ", " + aData.unservedVisitServices[x].serviceInternalName;
				}
				
				for (var x = 0;x < aData.servedVisitServices.length; x++){
					listServices += ', <SPAN STYLE="text-decoration:line-through">' + aData.servedVisitServices[x].serviceInternalName + '</SPAN>';
				}
				
				$('td:eq(3)', nRow).html(listServices);
				
				if (aData.appointmentTime != null){
					$('td:eq(4)', nRow).html(util.formatTime(aData.appointmentTime.substring(11,16)));
				}
				
				if (aData.parameterMap.isAppointmentTransaction != undefined && currentSettings.showAppointWt == true){
					tickBt = util.branchTimeSec(aData.branchCurrentTime);   //07:11:01"
					tickAt = util.appointTimeSec(aData.appointmentTime); 	//"2022-12-22T08:30:00"
					if (tickAt > tickBt) {
						tickWt = tickAt - tickBt;
					} else {
						tickWt = tickBt - tickAt;
					}
					if ( showAppointNegativeWt == true && tickAt > tickBt) {
						$('td:eq(5)', nRow).html("-" + util.formatIntoHHMMSS(parseInt(tickWt)));
					} else {
						$('td:eq(5)', nRow).html(util.formatIntoHHMMSS(parseInt(tickWt)));
					}
				}  else {
					$('td:eq(5)', nRow).html(util.formatIntoHHMMSS(parseInt(aData.waitingTime)));
				}
				
				var customerName = "";
				if (aData.parameterMap != undefined ) {
					if ( aData.parameterMap.customers != undefined) {
						customerName += aData.parameterMap.customers;	
					}							
				}
				$('td:eq(6)', nRow).html(customerName);
					
				$(nRow).addClass("");
				return nRow;
			};

			//create new table since not defined
			poolTicketsTable = util.buildTableJson({"tableId": "poolTickets", "url": url, "rowCallback": rowCallback,
				"columns": columns, "filter": false, "headerCallback": headerCallback, "scrollYHeight": "600px",
				"emptyTableLabel": "info.queue.tickets.empty"});
			poolTicketsTable.fnSort(SORTING);
			poolTicketsTable.fnAdjustColumnSizing();
		}

		//kill old event handlers
		if (currentSettings.buttonTransferFromQueueEnabled == true ) {
			$( document ).off( 'click','tbody td span i.icon-transfer');
		}
		if (currentSettings.buttonRemoveFromQueueEnabled == true ) {
			$( document ).off( 'click','tbody td span i.icon-delete');
		}

		//callbacks for calling, transferring and removing tickets
		$( document ).on( 'click','tbody td span i.icon-transfer' , function(event) {
			var nTr = $(this).closest("tr").get(0);
			var aData = poolTicketsTable.fnGetData(nTr);
			transfer.transferTicketClicked(aData,event);
			return false;
		});
		$( document ).on( 'click','tbody td span i.icon-delete' , function() {
			var nTr = $(this).closest("tr").get(0);
			var aData = poolTicketsTable.fnGetData(nTr);
			removeTicketClicked(aData);
			util.hideModal('poolTicketsDialogue');
			return false;
		});

		$("#poolTicketListHeader").empty();
		$("#poolTicketListHeader").html(
			'<a href=\"#\" class=\"closeButton\" onclick="javascript:util.hideModal(\'poolTicketsDialogue\');util.hideModal(\'transferToQueueDialogue\');"></a>' +
				jQuery.i18n.prop('info.list.of.tickets.' + type) + " " + name);
	};

	this.branchVisitsClicked = function(clickedBranchId, name) {
		selectedBranchId = clickedBranchId;
		getEntryPoint(selectedBranchId);
		allVisitsInBranch = [];
		allQueuesInBranch = restService.get("/rest/entrypoint/branches/" + selectedBranchId + "/queues");
		for ( q = 0; q < allQueuesInBranch.length; q++ ) {
			if ( allQueuesInBranch[q].customersWaiting > 0 ) {
				thisQueueData = restService.get("/rest/entrypoint/branches/" + selectedBranchId  + "/queues/" + allQueuesInBranch[q].id + "/visits/full");
				for ( p = 0; p < thisQueueData.length; p++ ){
					allVisitsInBranch.push(thisQueueData[p]);
				}	
			}
		}
		var sortType = 'asc';
		if (currentSettings.orderTicketsInQueue === 5) {
			sortType = 'desc'
		}

		var SORTING = [[currentSettings.orderTicketsInQueue, sortType]];
		util.showModal("branchTicketsDialogue");
		if(typeof branchTicketsTable !== 'undefined') {
			//empty the tickets table and populate with new data from server if table is not created
			branchTicketsTable.fnClearTable();
			var tickets;
			tickets = restService.get("/rest/entrypoint/branches/" + selectedBranchId  + "/visits");
			branchTicketsTable.fnAddData(tickets);
			branchTicketsTable.fnAdjustColumnSizing();
		} else {
			var columns = [
				/* Id */  
				{"bSearchable": false,
					"bVisible": false,
					"mDataProp": "visitId",
					"width": "0%",
					"sDefaultContent": ""
					},
				/* Ticket id */ 
				{"sClass": "firstColumn",
					"mDataProp": "ticketId"
					},
				/* Actions */ 
				{"sClass": "actionColumn",
					"mDataProp": null},
				/* Notes */ 
				{"sClass": "notesColumn",
					"mDataProp": null,
					"sDefaultContent": ""},
				/* Services */
				{"sClass": "middleColumn",
					"mDataProp": null,
					"sDefaultContent": ""},
				/*Appointment time */
				{"sClass": "lastColumn",
					"mDataProp": "appointmentTime",
					"sDefaultContent": ""},
				/* Waiting Time  */	  
				{"sClass": "lastColumn",
					"mDataProp": "waitingTime",
					"sDefaultContent": ""},
				/*Customer name */ 
				{"sClass": "middleColumn",
					"mDataProp": null
					}
				];
			var headerCallback = function(nHead, aasData, iStart, iEnd, aiDisplay) {
				nHead.style.borderBottom = "1px solid #c0c0c0";
				nHead.getElementsByTagName('th')[0].innerHTML = translate.msg('info.queue.tickets');
				nHead.getElementsByTagName('th')[1].innerHTML = jQuery.i18n.prop('info.queue.tickets.actions');
				nHead.getElementsByTagName('th')[2].innerHTML = jQuery.i18n.prop('info.queue.tickets.notes');
				nHead.getElementsByTagName('th')[3].innerHTML = jQuery.i18n.prop('info.queue.tickets.service');
				nHead.getElementsByTagName('th')[4].innerHTML = jQuery.i18n.prop('info.queue.tickets.appoint.time');
				nHead.getElementsByTagName('th')[5].innerHTML = translate.msg('info.queue.waiting.time');
				nHead.getElementsByTagName('th')[6].innerHTML = jQuery.i18n.prop('info.queue.customer.name');
				
			};
			var t = new Date();
			var url = restConnector + "/rest/entrypoint/branches/" + selectedBranchId  + "/visits";
			urlAdd = "";

			var rowCallback = function(nRow, aData, iDisplayIndex) {
				hideVisit = false;
				for ( a = 0; a < allVisitsInBranch.length; a++){
					if ( allVisitsInBranch[a].id == aData.visitId) {
						aData.id = allVisitsInBranch[a].id;
						aData.unservedVisitServices = allVisitsInBranch[a].unservedVisitServices;
						aData.servedVisitServices = allVisitsInBranch[a].servedVisitServices;
						aData.currentVisitService = allVisitsInBranch[a].currentVisitService;
						aData.branchCurrentTime = allVisitsInBranch[a].branchCurrentTime;
						aData.checksum = allVisitsInBranch[a].checksum;
						aData.customerIds = allVisitsInBranch[a].customerIds;
						aData.parameterMap = allVisitsInBranch[a].parameterMap;
						aData.timeSinceCalled = allVisitsInBranch[a].timeSinceCalled;
						aData.visitMarks = allVisitsInBranch[a].visitMarks;
						aData.waitingTime = allVisitsInBranch[a].waitingTime;
					}
				}
				var aDataVisit = "";
				if (aData.currentVisitService == undefined){
					aDataVisit = restService.get("/rest/entrypoint/branches/" + selectedBranchId + "/visits/" + aData.visitId);
					if (aDataVisit !== null && aDataVisit !== undefined){
						aData.id = aDataVisit.id;
						aData.unservedVisitServices = aDataVisit.unservedVisitServices;
						aData.servedVisitServices = aDataVisit.servedVisitServices;
						aData.currentVisitService = aDataVisit.currentVisitService;
						aData.branchCurrentTime = aDataVisit.branchCurrentTime;
						aData.checksum = aDataVisit.checksum;
						aData.customerIds = aDataVisit.customerIds;
						aData.parameterMap = aDataVisit.parameterMap;
						aData.timeSinceCalled = aDataVisit.timeSinceCalled;
						aData.visitMarks = aDataVisit.visitMarks;
						aData.waitingTime = aDataVisit.waitingTime;
						if (aDataVisit.timeSinceCalled > 0){
							hideVisit = true;
						}
					}

				}

				if($('td:eq(0)', nRow).find('span').length == 0) {
					//format ticket number
					$('td:eq(0)', nRow).html("<span class='ticketNumSpan'>" + aData.ticketId + "</span>");
					if (hideVisit == false) {
						if (currentSettings.buttonTransferFromQueueEnabled == true ) {
							$('td:eq(1)', nRow).append("<span><i href=\"#\" class=\"qm-action-btn__icon icon-transfer\" title=\"" +
								translate.msg("action.title.transfer") + "\"></i></span>");
						}
						if (currentSettings.buttonRemoveFromQueueEnabled == true ) {
						$('td:eq(1)', nRow).append("<span>&nbsp;&nbsp;<i href=\"#\" class=\"qm-action-btn__icon icon-delete\" title=\"" +
							translate.msg("action.title.remove") + "\"></i></span>");
						}
					}
				}
				if (aDataVisit !== null && aDataVisit !== undefined && hideVisit !== true){				
					if (aData.parameterMap != undefined ) {
						if ( aData.parameterMap.custom1 != undefined &&  aData.parameterMap.custom1 != "") {
							$('td:eq(2)', nRow).html("<span><i href=\"#\" class=\"qm-action-btn__icon icon-message\" title=\"" +
								decodeURIComponent(aData.parameterMap.custom1) + "\"></i></span>");	
						}							
					}
					
					listServices = aData.currentVisitService.serviceInternalName;
					for (var x = 1;x < aData.unservedVisitServices.length; x++){
						listServices += ", " + aData.unservedVisitServices[x].serviceInternalName;
					}
					
					for (var x = 0;x < aData.servedVisitServices.length; x++){
						listServices += ', <SPAN STYLE="text-decoration:line-through">' + aData.servedVisitServices[x].serviceInternalName + '</SPAN>';
					}
					
					$('td:eq(3)', nRow).html(listServices);
					
					if (aData.appointmentTime != null){
						$('td:eq(4)', nRow).html(util.formatTime(aData.appointmentTime.substring(11,16)));
					}
					
					if (aData.parameterMap.isAppointmentTransaction != undefined && currentSettings.showAppointWt == true){
						tickBt = util.branchTimeSec(aData.branchCurrentTime);   //07:11:01"
						tickAt = util.appointTimeSec(aData.appointmentTime); 	//"2022-12-22T08:30:00"
						if (tickAt > tickBt) {
							tickWt = tickAt - tickBt;
						} else {
							tickWt = tickBt - tickAt;
						}
						if ( showAppointNegativeWt == true && tickAt > tickBt) {
							$('td:eq(5)', nRow).html("-" + util.formatIntoHHMMSS(parseInt(tickWt)));
						} else {
							$('td:eq(5)', nRow).html(util.formatIntoHHMMSS(parseInt(tickWt)));
						}
					}  else {
						$('td:eq(5)', nRow).html(util.formatIntoHHMMSS(parseInt(aData.waitingTime)));
					}
					
					var customerName = "";
					if (aData.parameterMap != undefined ) {
						if ( aData.parameterMap.customers != undefined) {
							customerName += aData.parameterMap.customers;	
						}							
					}
					$('td:eq(6)', nRow).html(customerName);
					$(nRow).addClass("");
				} else {
					$(nRow).hide()
				}
				return nRow;
			};

			//create new table since not defined
			branchTicketsTable = util.buildTableJson({"tableId": "branchTickets", "url": url, "rowCallback": rowCallback,
				"columns": columns, "filter": false, "headerCallback": headerCallback, "scrollYHeight": "600px",
				"emptyTableLabel": "info.queue.tickets.empty"});
			branchTicketsTable.fnSort(SORTING);
			branchTicketsTable.fnAdjustColumnSizing();
		}

		//kill old event handlers
		if (currentSettings.buttonTransferFromQueueEnabled == true ) {
			$( document ).off( 'click','tbody td span i.icon-transfer');
		}
		if (currentSettings.buttonRemoveFromQueueEnabled == true ) {
			$( document ).off( 'click','tbody td span i.icon-delete');
		}

		//callbacks for calling, transferring and removing tickets
		$( document ).on( 'click','tbody td span i.icon-transfer' , function(event) {
			var nTr = $(this).closest("tr").get(0);
			var aData = branchTicketsTable.fnGetData(nTr);
			transfer.transferTicketClicked(aData,event);
			return false;
		});
		$( document ).on( 'click','tbody td span i.icon-delete' , function() {
			var nTr = $(this).closest("tr").get(0);
			var aData = branchTicketsTable.fnGetData(nTr);
			removeTicketClicked(aData);
			util.hideModal('branchTicketsDialogue');
			return false;
		});

		$("#branchTicketListHeader").empty();
		$("#branchTicketListHeader").html(
			'<a href=\"#\" class=\"closeButton\" onclick="javascript:util.hideModal(\'branchTicketsDialogue\');util.hideModal(\'transferToQueueDialogue\');"></a>' +
				jQuery.i18n.prop('info.list.of.tickets.branch') + " " + name);
	};
	
	var removeTicketClicked = function(aRowData) {
		visitRemoveId = aRowData.id
		$('#visitRemoveFormWarning').text(jQuery.i18n.prop('form.visit.remove.warning') + " " + aRowData.ticketId );
		util.showModal('visitRemovePage');
		
		//restService.del("/rest/entrypoint/branches/"+ selectedBranchId +"/entryPoints/"+entrypointId+"/visits/"+aRowData.id);
		//transfer.visitActionClicked(selectedBranchId);
	};
	
	
	this.removeVisitConfirm = function() {
		restService.del("/rest/entrypoint/branches/"+ selectedBranchId +"/entryPoints/"+entrypointId+"/visits/"+visitRemoveId);
		transfer.visitActionClicked(selectedBranchId);
		util.hideModal('visitRemovePage');
	};
	
	this.searchTicket = function() {
		$('#foundTicketId').html("");
		$('#foundActions').html("");
		$('#foundWaitingTime').html("");
		$('#foundCustomerName').html("");
		$('#foundQueue').html("");
		$('#foundService').html("");
		$('#foundAppointTime').html("");
		$('#foundNotes').html("");
		var aData = "";
		var searchTicket = $("#searchTicketInput").val();
		var $searchBranch = $('#branchesSearch');
		var selBr = $searchBranch.val();
		
		selectedBranchId=selBr;
		var visitId = "";
		if (selBr > 0 ){
			if (searchTicket != "" ){
				ticket = restService.get("/rest/entrypoint/branches/" + selBr + "/visits;ticketId=" + searchTicket);
				if (ticket.length == 0){
					util.showError(jQuery.i18n.prop("error.no.ticket.found"));
					return; 
				}
			} else {
				util.showError(jQuery.i18n.prop("error.no.ticket.entered"));
				return;
			}
		} else {
			 util.showError(jQuery.i18n.prop("error.no.branch.selected"));
			 return;
		}
			
		
	   if ( ticket.length > 0) {
		   visitId = ticket[0].visitId
			aData = restService.get("/rest/entrypoint/branches/" + selBr + "/visits/" + visitId);
			aData.id = visitId;
			$('#foundTicketId').html("<span class='ticketNumSpan'>" + aData.ticketId + "</span>");
			if (currentSettings.buttonTransferFromQueueEnabled == true ) {
				$('#foundActions').html("<span><i href=\"#\" class=\"qm-action-btn__icon icon-transfer\" title=\"" +
							translate.msg("action.title.transfer") + "\"></i></span>");
			}
			if (currentSettings.buttonRemoveFromQueueEnabled == true ) {
				  $('#foundActions').append("<span>&nbsp;&nbsp;<i href=\"#\" class=\"qm-action-btn__icon icon-delete\" title=\"" +
						translate.msg("action.title.remove") + "\"></i></span>");
			}
			
			if (aData.parameterMap != undefined ) {
				visitQueueId = aData.parameterMap.currentQueueOrigId;

				//getQueue
				branchQueues = restService.get("/rest/entrypoint/branches/" + selBr + "/queues");
				for (var x = 0; x < branchQueues.length; x++){
					if (branchQueues[x].id == visitQueueId) {
						$('#foundQueue').html(branchQueues[x].name);
					}
				}
			}
			
			listServices = aData.currentVisitService.serviceInternalName;
			for (var x = 1;x < aData.unservedVisitServices.length; x++){
				listServices += ", " + aData.unservedVisitServices[x].serviceInternalName;
			}
				
			for (var x = 0;x < aData.servedVisitServices.length; x++){
				listServices += ', <SPAN STYLE="text-decoration:line-through">' + aData.servedVisitServices[x].serviceInternalName + '</SPAN>';
			}
				
			
			$('#foundService').html(listServices);
			if (currentSettings.showTicketListAppointmentTime == true){	
				if (aData.appointmentTime != null){
					$('#foundAppointTime').html(util.formatTime(aData.appointmentTime.substring(11,16)));
				}
			}
			
			if (currentSettings.showTicketListNotes == true) {
				if (aData.parameterMap != undefined ) {
					if ( aData.parameterMap.currentQueueOrigId != undefined) {
						if ( aData.parameterMap.currentQueueOrigId == -1) {
							$('#foundQueue').html(jQuery.i18n.prop('queue.staff.pool'));
						}
						if ( aData.parameterMap.currentQueueOrigId == -2) {
							$('#foundQueue').html(jQuery.i18n.prop('queue.service.point.pool'));
						}
						if ( aData.parameterMap.currentQueueOrigId > 0) {
							queueData = restService.get("/rest/entrypoint/branches/" + selBr + "/queues/" + aData.parameterMap.currentQueueOrigId );
							$('#foundQueue').html(queueData.name);
						}
						
					}
									
					if ( aData.parameterMap.custom1 != undefined) {
						$('#foundNotes').html("<span><i href=\"#\" class=\"qm-action-btn__icon icon-message\" title=\"" +
								decodeURIComponent(aData.parameterMap.custom1) + "\"></i></span>");	
					}							
				}
			}
			
			if (currentSettings.showTicketListWt == true){
				if (aData.parameterMap.isAppointmentTransaction != undefined && currentSettings.showAppointWt == true){
					tickBt = util.branchTimeSec(aData.branchCurrentTime);   //07:11:01"
					tickAt = util.appointTimeSec(aData.appointmentTime); 	//"2022-12-22T08:30:00"
					if (tickAt > tickBt) {
						tickWt = tickAt - tickBt;
					} else {
						tickWt = tickBt - tickAt;
					}
					if ( showAppointNegativeWt == true && tickAt > tickBt) {
						$('#foundWaitingTime').html("-" + util.formatIntoHHMMSS(parseInt(tickWt)));
					} else {
						$('#foundWaitingTime').html(util.formatIntoHHMMSS(parseInt(tickWt)));
					}
				}  else {
					$('#foundWaitingTime').html(util.formatIntoHHMMSS(parseInt(aData.waitingTime)));
				}
			}
			
			if (currentSettings.showTicketListCustomer == true){
				var customerName = "";
				if (aData.parameterMap != undefined ) {
					if ( aData.parameterMap.customers != undefined) {
						customerName = aData.parameterMap.customers;	
					}							
				}
				$('#foundCustomerName').html(customerName);
			}

		}

		if (currentSettings.buttonTransferFromQueueEnabled == true ) {
			$( document ).off( 'click','tbody td span i.icon-transfer');
		}
		if (currentSettings.buttonRemoveFromQueueEnabled == true ) {
			$( document ).off( 'click','tbody td span i.icon-delete');
		}

		//callbacks for calling, transferring and removing tickets
		$( document ).on( 'click','tbody td span i.icon-transfer' , function(event) {
			transfer.transferTicketClicked(aData,event);
			return false;
		});
		$( document ).on( 'click','tbody td span i.icon-delete' , function() {
			removeTicketClicked(aData);
			util.hideModal('searchTicketPage');
			return false;
		});
		getEntryPoint(selBr);
	};
	
	this.sppoolClicked = function(clickedQueueId, name) {
		
		var sortType = 'asc';
		if (currentSettings.orderTicketsInQueue === 5) {
			sortType = 'desc'
		}
		
		var SORTING = [[currentSettings.orderTicketsInQueue, sortType]];

		util.showModal("ticketsDialogue");
		if(typeof ticketsTable !== 'undefined') {
			//empty the tickets table and populate with new data from server if table is not created
			ticketsTable.fnClearTable();
			var tickets;
			if (restVersion < 3) {
				tickets = restService.get("/rest/servicepoint/branches/" + selectedBranchId + "/servicePoints/" + clickedQueueId + "/pool/visits");
			} else {
				tickets = restService.get("/rest/servicepoint/branches/" + selectedBranchId + "/servicePoints/" + clickedQueueId + "/pool/visits/full");	
			}
			ticketsTable.fnAddData(tickets);
			ticketsTable.fnAdjustColumnSizing();
		} else {
			var columns = [
				/* Id */  
				{"bSearchable": false,
					"bVisible": false,
					"mDataProp": "id",
					"width": "0%"
					},
				/* Ticket id */ 
				{"sClass": "firstColumn",
					"mDataProp": "ticketId"
					},
				/* Actions */ 
				{"sClass": "actionColumn",
					"mDataProp": null},
				/* Notes */ 
				{"sClass": "notesColumn",
					"mDataProp": null},
				/* Services */
				{"sClass": "middleColumn",
					"mData": null,
					"sDefaultContent": ""},
				/*Appointment time */
				{"sClass": "lastColumn",
					"mData": null,
					"sDefaultContent": ""},
				/* Waiting Time  */	  
				{"sClass": "lastColumn",
					"mData": null,
					"sDefaultContent": ""},
				/*Customer name */ 
				{"sClass": "middleColumn",
					"mData": null,
					"sDefaultContent": ""}
				];
			var headerCallback = function(nHead, aasData, iStart, iEnd, aiDisplay) {
				nHead.style.borderBottom = "1px solid #c0c0c0";
				nHead.getElementsByTagName('th')[0].innerHTML = translate.msg('info.queue.tickets');
				nHead.getElementsByTagName('th')[1].innerHTML = jQuery.i18n.prop('info.queue.tickets.actions');
				nHead.getElementsByTagName('th')[2].innerHTML = jQuery.i18n.prop('info.queue.tickets.notes');
				nHead.getElementsByTagName('th')[3].innerHTML = jQuery.i18n.prop('info.queue.tickets.service');
				nHead.getElementsByTagName('th')[4].innerHTML = jQuery.i18n.prop('info.queue.tickets.appoint.time');
				nHead.getElementsByTagName('th')[5].innerHTML = translate.msg('info.queue.waiting.time');
				nHead.getElementsByTagName('th')[6].innerHTML = jQuery.i18n.prop('info.queue.customer.name');
				
			};
			var t = new Date();
			var url = restConnector + "/rest/servicepoint/branches/" + selectedBranchId + "/servicePoints/" + clickedQueueId + "/pool/visits/full";
			if (restVersion < 3){
				url = restConnector + "/rest/servicepoint/branches/" + selectedBranchId + "/servicePoints/" + clickedQueueId + "/pool/visits";	
			}
			var rowCallback = function(nRow, aData, iDisplayIndex) {
				if($('td:eq(0)', nRow).find('span').length == 0) {
					//format ticket number
					$('td:eq(0)', nRow).html("<span class='ticketNumSpan'>" + aData.ticketId + "</span>");
					if (currentSettings.buttonTransferFromQueueEnabled == true ) {
						$('td:eq(1)', nRow).append("<span><i href=\"#\" class=\"qm-action-btn__icon icon-transfer\" title=\"" +
							translate.msg("action.title.transfer") + "\"></i></span>");
					}
					if (currentSettings.buttonRemoveFromQueueEnabled == true ) {
					$('td:eq(1)', nRow).append("<span>&nbsp;&nbsp;<i href=\"#\" class=\"qm-action-btn__icon icon-delete\" title=\"" +
						translate.msg("action.title.remove") + "\"></i></span>");
					}
				}
				
				if (aData.parameterMap != undefined ) {
					if ( aData.parameterMap.custom1 != undefined) {
						$('td:eq(2)', nRow).html("<span><i href=\"#\" class=\"qm-action-btn__icon icon-message\" title=\"" +
							decodeURIComponent(aData.parameterMap.custom1) + "\"></i></span>");	
					}							
				}
				
				listServices = aData.currentVisitService.serviceInternalName;
				for (var x = 1;x < aData.unservedVisitServices.length; x++){
					listServices += ", " + aData.unservedVisitServices[x].serviceInternalName;
				}
				
				for (var x = 0;x < aData.servedVisitServices.length; x++){
					listServices += ', <SPAN STYLE="text-decoration:line-through">' + aData.servedVisitServices[x].serviceInternalName + '</SPAN>';
				}
				
				$('td:eq(3)', nRow).html(listServices);
				
				if (aData.appointmentTime != null){
					$('td:eq(4)', nRow).html(util.formatTime(aData.appointmentTime.substring(11,16)));
				}
				
				$('td:eq(5)', nRow).html(util.formatIntoHHMMSS(parseInt(aData.waitingTime)));
				var customerName = "";
				if (aData.parameterMap != undefined ) {
					if ( aData.parameterMap.customers != undefined) {
						customerName += aData.parameterMap.customers;	
					}							
				}
				$('td:eq(6)', nRow).html(customerName);
					
				$(nRow).addClass("");
				return nRow;
			};

			//create new table since not defined
			ticketsTable = util.buildTableJson({"tableId": "tickets", "url": url, "rowCallback": rowCallback,
				"columns": columns, "filter": false, "headerCallback": headerCallback, "scrollYHeight": "600px",
				"emptyTableLabel": "info.queue.tickets.empty"});
			ticketsTable.fnSort(SORTING);
			ticketsTable.fnAdjustColumnSizing();
		}

		//kill old event handlers
		if (currentSettings.buttonTransferFromQueueEnabled == true ) {
			$( document ).off( 'click','tbody td span i.icon-transfer');
		}
		if (currentSettings.buttonRemoveFromQueueEnabled == true ) {
			$( document ).off( 'click','tbody td span i.icon-delete');
		}

		//callbacks for calling, transferring and removing tickets
		$( document ).on( 'click','tbody td span i.icon-transfer' , function(event) {
			var nTr = $(this).closest("tr").get(0);
			var aData = ticketsTable.fnGetData(nTr);
			transfer.transferTicketClicked(aData,event);
			return false;
		});
		$( document ).on( 'click','tbody td span i.icon-delete' , function() {
			var nTr = $(this).closest("tr").get(0);
			var aData = ticketsTable.fnGetData(nTr);
			removeTicketClicked(aData);
			util.hideModal('ticketsDialogue');
			return false;
		});

		$("#ticketListHeader").empty();
		$("#ticketListHeader").html(
			'<a href=\"#\" class=\"closeButton\" onclick="javascript:util.hideModal(\'ticketsDialogue\');util.hideModal(\'transferToQueueDialogue\');"></a>' +
				jQuery.i18n.prop('info.list.of.tickets.sp.pool') + " " + name);
	};

	this.removeTicketsClicked = function(val, name) {
		visitsRemoveId = val;
		removeText = jQuery.i18n.prop('form.visits.remove.queue.warning');

		$('#visitsRemoveFormWarning').text( removeText.replace("{name}",name));
		$('#visitsRemoveFormTitle').text( jQuery.i18n.prop('form.visits.remove.title').replace("{name}",name));
		util.showModal('visitsRemovePage');
	};
	
	this.removeBranchTicketsClicked = function(val, name) {
		visitsRemoveId = 0;
		selectedBranchId = val;
		getEntryPoint(selectedBranchId);
		removeText = jQuery.i18n.prop('form.visits.remove.branch.warning');
		$('#visitsRemoveFormWarning').text( removeText.replace("{name}",name));
		$('#visitsRemoveFormTitle').text( jQuery.i18n.prop('form.visits.remove.title').replace("{name}",name));
		util.showModal('visitsRemovePage');
	};
	
	
	this.removesVisitConfirm = function() {
		if (visitsRemoveId == 0) {
			removeTickets = restService.get("/rest/entrypoint/branches/" + selectedBranchId + "/visits");
		} else {
			removeTickets = restService.get("/rest/entrypoint/branches/" + selectedBranchId + "/queues/" + visitsRemoveId + "/visits");
		}		
		for ( var q = 0; q < removeTickets.length; q++) {
			restService.del("/rest/entrypoint/branches/" + selectedBranchId + "/entryPoints/" + entrypointId + "/visits/" + removeTickets[q].visitId);
		}

		if (visitsRemoveId == 0 ) {
			setTimeout( function(){loadData(loadDataVal,loadDataReg)}, 1000);
		} else {
			setTimeout( function(){transfer.visitActionClicked(selectedBranchId)}, 1000);
		}
		util.hideModal('visitsRemovePage');
	};
	

	
};