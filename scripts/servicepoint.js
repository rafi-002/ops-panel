// ---------------------------------------------------------------------------------
// variable definition
// variable name: queueStatInfo_ + branchId 
// data:		  queue id [0], avg trt today [1], avg waiting time now [2], waiting now [3], est waiting time now [4], open servicepoints now [5], noShow today [6], called today [7], total waiting time today [8], 
//				  Customer Served today [9], Number Of Served Services today [10], Waiting Time now [11], Appointment Waiting Time Now [12], getServiceLevel [13], queue name [14], waited below sl wt today [15],
//				  waiting above sl wt now [16], waited above sl wt today [17], max waiting time today [18], max trt today [19], served above sl trt today [20], served below sl trt today [21],
//				  queue data included in branch summary [22], show queue in queue summary [23],queueCustomersDelayed [24] service points serving [25] @ etc
// Example:		  20230213@34,0,7,4,480,1,0,2,469,1,1,431,-2147483648,6,Default Queue 1,0,4,2,432,0,0,1,1,3,2@35,0,0,0,-1,1,0,0,0,0,0,0,-2147483648,8,Default Queue 2,0,0,0,0,0,0,1,1,0,3@etc

// variable name: serviceStatInfo_ + branchId 
// data:		  date @ service [0], served [1], waiting [2]@ etc		
// Example:		  20141010@1,4,4@etc

// variable name: branchStatInfo_ + branchId 
// data:		  date [0]@ updated [1]@ waiting now [2]@ waiting below sl now [3]@ total waiting time now [4]@ served today [5]@ total trt today [6]@ open counters [7]@ closed counters [8]@ branchTimeOffset [9]@ 
//				  noShow today [10]@ called today [11]@ total waiting time today [12]@ branchname [13]@ total waiting includin pools now [14]@ total wait time including pools now [15]@ called below sl wt [16]@ 
//				  max waiting time now [17]@ waited above sl today [18]@ max waiting time today [19]@ max trt today [20]@ served above sl trt [21]@ served below sl trt [22]@ total waiting above sl wt now [23]@ 
//				  dataversion [24]@ service points serving [25] 
// Example:		  20230213@1559@4@0@1724@1@428@1@3@+0100@0@1@37@Branch 001 Development (GMT)@4@1724@0@431@1@37@428@1@2@10

// variable name: servicePointMiStatInfo_ + branchId
// data:		  date @ servicePointId [0], Status [1], CustomersServed [2], CurrentTransactionTime [3], CurrentServiceCurrentTransactionTime [4], getServiceTargetTransTime [5], sp name [6], waiting time [7], 
//				  served above sl trt [8], first login [9], last logout [10], show in summary [11], poolWt [12], poolEnterTime [13], totalIdleTime [14], idleCounts [15], startIdle [16] @
// example:		  20210809@120000000001,OPEN,1,0,0,600, Service Point 1, 234 ,4 , 10:12, 14:13, 1, 0, -1, 0 ,0, 0 @

// branch variable name: servicePointStatInfo
// Data:		  date @ service point id [0], waiting time current ticket [1], served above sl trt [2], firstLogin [3], lastLogout [4], waiting in pool [5], last queue served [6]
//					, first enter time in pool [7], total Idle Time [8], number of idle time periods [9], last start for idle time [10]
// Example:       20230215@520000000002,0,01,13:36,13:43,0,1,-1,0,0,0@

// variable name: appointStatInfo_ + branchId 
// data:		  date @ booked [0] , pending [1]
// Example:		  20141010@5,4

// variable name: branchStatHistory_ + branchId 
// data:  		  date@time [0], waiting [1], open [2], waiting_time [3]
// Example:		  20140101 @ 0800 , 10 , 5 , 2 @ etc

// variable name: 	userStatInfo_ + branchId	
// data:			date@userName [0], CustomersServed [1], Total TransactionTime [2],	Max TransactionTime [3], waiting in pool [4], userId [5], first enter time in pool [6]@
// example: 		20230215 @ superadmin , 3 , 622 , 488, 0, 1, -1 @

// variable name: 	branchExpressiaStatInfo_ + branchId	
// data:			date @ score [0],  number of items [1]
// example: 		20230215@1,0@2,1@3,1@4,1@5,0
	
// variable name: 	branchExpressiaWsStatInfo_ + branchId	
// data:			date # servicepointid @ score [0] , number of items [1] @
// example: 		20230215#220000000002@1,0@2,0@3,1@4,0@5,0#120000000002@1,0@2,1@3,0@4,1@5,0

// variable name: 	branchNpsStatInfo_ + branchId	
// data:			date @  number of entries @ number of entries per score
// example: 		20230215@20@0,5,1,2,0,0,5,0,3,8,0

var servicepointInfo;
var servicePointQueues = [];
var showPoolCount = true;

function setServicePointTableColumns(){
	if (currentSettings.showSpIdColumn){
		addColumn('servicepointView','servicepointHeaderId',1,20);
	}
	addColumn('servicepointView','servicepointHeaderName',1,150);
	if (currentSettings.showServicePointStatusIcon) {
		addColumn('servicepointView','servicepointHeaderStatusIcon',2);
	}
	addColumn('servicepointView','servicepointHeaderStaff',1,150);
	
	for (x = 0; x < currentSettings.columnOrderSp.length; x++){
		if (currentSettings.columnOrderSp[x] == 'showServicePointStatusSp') {
			addColumn('servicepointView','servicepointHeaderStatusSp',1,50);
		}
		//if (currentSettings.columnOrderSp[x] == 'showServicePointStaff') {
		//	addColumn('servicepointView','servicepointHeaderStaff',1,150);
		//}
		if (currentSettings.columnOrderSp[x] == 'showLoginLogout') {
			addColumn('servicepointView','servicepointHeaderFirstLogin',0);
			addColumn('servicepointView','servicepointHeaderLastLogout',0);
		}
		if (currentSettings.columnOrderSp[x] == 'showServicePointQueue') {
			addColumn('servicepointView','servicepointHeaderQueue',0);
		}
		if (currentSettings.columnOrderSp[x] == 'showServicePointService') {
			addColumn('servicepointView','servicepointHeaderService',0);
		}
		if (currentSettings.columnOrderSp[x] == 'showServicePointTicket') {
			addColumn('servicepointView','servicepointHeaderTicket',0);
		}
		if (currentSettings.columnOrderSp[x] == 'showServicePointCustomer') {
			addColumn('servicepointView','servicepointHeaderCustomer',0);
		}
		if (currentSettings.columnOrderSp[x] == 'showServicePointExpressia') {
			addColumn('servicepointView','servicepointHeaderExpressia',0);
		}
		if (currentSettings.columnOrderSp[x] == 'showWaitTime') {
			addColumn('servicepointView','servicepointHeaderWt',0);
		}
		if (currentSettings.columnOrderSp[x] == 'showQueueTrtTime') {
			addColumn('servicepointView','servicepointHeaderTrt',0);
		}
		if (currentSettings.columnOrderSp[x] == 'showUserAvgTrt') {
			addColumn('servicepointView','servicepointHeaderAvgTrt',0);
		}
		if (currentSettings.columnOrderSp[x] == 'showUserMaxTrt') {
			addColumn('servicepointView','servicepointHeaderMaxTrt',0);
		}
		if (currentSettings.columnOrderSp[x] == 'userServed') {
			addColumn('servicepointView','servicepointHeaderServed',0);
		}
		if (currentSettings.columnOrderSp[x] == 'showCurrentIdleTime') {
			addColumn('servicepointView','servicepointHeaderCurrentIdleTime',0);
		}
		if (currentSettings.columnOrderSp[x] == 'showTotalIdleTime') {
			addColumn('servicepointView','servicepointHeaderTotalIdleTime',0);
		}
		if (currentSettings.columnOrderSp[x] == 'showAvgIdleTime') {
			addColumn('servicepointView','servicepointHeaderAvgIdleTime',0);
		}
		if (currentSettings.columnOrderSp[x] == 'showServicePointWorkProfile') {
			addColumn('servicepointView','servicepointHeaderProfile',0);
		}
		if (currentSettings.columnOrderSp[x] == 'userForceLogout') {
			addColumn('servicepointView','servicepointHeaderLogout',0);
		}
	}
	 
	//remove servicepoint summary from menu tabs when needed
	if ( currentSettings.servicePointSummaryLocation != 'spTab'){
		deleteColumn('queueMenuTabs','queueServicePointTab')
		deleteColumn('npsMenuTabs','npsServicePointTab')
		deleteColumn('webcamMenuTabs','webcamServicePointTab')
		deleteColumn('queueSpMenuTabs','queueSpServicePointTab')
	}

 }

function branchServicePointOverview() {
	if (selectedView != 2 && currentSettings.servicePointSummaryLocation != 'queueTab') {
		showPanel(2, selectedBranchId, selectedBranchName);
	}
	variableAll = util.getStatVariables(2);
	viewData = getAllServicePointData();

	$("#servicepointView").find("tr:gt(0)").remove();
	var s = '';

	if (viewData == null ) {
		s = '<tr height="200px" align="center"><td colspan="8" align="center">' + jQuery.i18n.prop('branch.offline') + '</td></tr>';
		$('#servicepointView').append(s);
		graphWaiting([0,0,0]);
	} else {
		for ( i = 0; i < viewData.length; i++) {
			s = '<tr class="even">';
			if (currentSettings.showSpIdColumn){
				s += viewData[i].showSpIdColumn;
			}
			s += viewData[i].servicePointNameData
			if (currentSettings.showServicePointStatusIcon) {
				s += viewData[i].showServicePointStatusIcon;
			}
			s += viewData[i].showServicePointStaff;
			for (x = 0; x < currentSettings.columnOrderSp.length; x++){
				if (currentSettings.columnOrderSp[x] !== 'showServicePointStatusIcon') {
					s += viewData[i][currentSettings.columnOrderSp[x]];
				}
			}
			s += '</tr>';
			if (viewData[i].showRow == true){
				$('#servicepointView').append(s);
			}
		}
	}
	
	if (currentSettings.showServicepointTotals) {
		$("#servicepointView").find("tfoot").remove();
		$("#servicepointView").append(
			util.buildFooter("servicepointView")
		);
		$("#servicepointFooterServed").html(viewDataTotal.ServedAboveSl);
		if (currentSettings.userServed && !currentSettings.showUserServedAboveSl ){
			$("#servicepointFooterServed").html(util.localeFormatNum(viewDataTotal.Served));
		}
	
		//if (!currentSettings.userServed && currentSettings.showUserServedAboveSl ){
		//	$("#servicepointFooterServed").html(util.localeFormatNum(viewDataTotal.ServedAboveSl));
		//}
				
		if (currentSettings.userServed && currentSettings.showUserServedAboveSl ){
			$("#servicepointFooterServed").html(util.localeFormatNum(viewDataTotal.ServedAboveSl) + " / " + util.localeFormatNum(viewDataTotal.Served)) ;
		}
		$("#servicepointFooterServed").css("textAlign", "center");
		$("#servicepointFooterStaff").html(viewDataTotal.Open);
		$("#servicepointFooterTicket").html(viewDataTotal.Serving);
		$("#servicepointFooterStaff").css("textAlign", "center");
		$("#servicepointFooterTicket").css("textAlign", "center");
	}

	var resort = true;
	$("#servicepointView").trigger("update", [resort]);

	if (initTable[2] == 0) {
		initTable[2] = 1;
		columnToSortOn = $('#' + currentSettings.spDefaultColumnSort).index();
		if (columnToSortOn == -1) {
			columnToSortOn = 0;
		}
		
		if ( currentSettings.spDefaultColumnSort == "servicepointHeaderStatusIcon" && currentSettings.showServicePointStatusIcon == true){
			nameColumn = columnToSortOn-1
			initTableSort("#servicepointView", columnToSortOn ,currentSettings.defaultColumnSpSortingOrder, true, nameColumn);
		} else {
			initTableSort("#servicepointView", columnToSortOn ,currentSettings.defaultColumnSpSortingOrder, true);
		}
	}

	getBranchGraphData(selectedBranchId);
}

function getAllServicePointData() {
	//fix for pool waiting on 6.2 due to no RESET_COMMIT event
	showPoolCount = true;
	if (restVersion == 2) {
		brData =restService.get('/rest/managementinformation/v2/branches/' + selectedBranchId)
		if (brData != undefined && brData != null){
			if (brData.customersWaiting == 0) {
				showPoolCount = false;
			}
		}
	}

	resetGraphTotals();
	servicepointInfo = restService.get('/rest/managementinformation/v2/branches/' + selectedBranchId + '/servicePoints');
	servicepointInfo.sort( function( a, b ) {
			return ( a.name > b.name ) ? 1 : ( ( b.name > a.name ) ? -1 : 0);
		} 
	); 

	loadbalanceWsStatus = "{}";
	if (currentSettings.showServicePointStatusSp === true ) {
		try {
			loadbalanceWsStatus = restService.get('/rest/entrypoint/branches/' + selectedBranchId + '/variables/loadbalanceWsStatus').value;
		} catch(e) {
			restService.setBranchVariable(selectedBranchId, "loadbalanceWsStatus", "{}" );
			loadbalanceWsStatus = "{}";
		}
	}
	loadbalanceWsStatus = JSON.parse(loadbalanceWsStatus);
	varTemp = null;
	spMap = {};
	userMap = {};
	viewDataTotal.Open = 0;
	viewDataTotal.Serving = 0;
	viewDataTotal.Served = 0;
	viewDataTotal.ServedAboveSl = 0;
	timeInBranch = 0;
	
	//if (currentSettings.showPoolLongestWt == true) {
		for (j=0; j < variableAll.length; j++ ) {
			if ( variableAll[j].name == 'branchStatInfo_' + selectedBranchId) {
				timeInBranch = parseInt(variableAll[j].value.split("@")[1]);
			}
		}	
	//}

	for (j=0; j < variableAll.length; j++ ) {
		if ( variableAll[j].name == 'servicePointMiStatInfo_' + selectedBranchId) {
			value = variableAll[j].value.split("@");
			for (var s = 1; s < value.length; s++){
				ss = value[s].split(",")
				
				servicePointId =  ss[0];
				spMap[servicePointId]={}
				if ( ss.length >= 11) {
					
					spMap[servicePointId]["wt"] =  ss[7];
					spMap[servicePointId]["aboveTrtSl"] =  ss[8];
					if ( ss[9] == "--"){
						spMap[servicePointId]["firstLogin"] = noDataChar;
					} else {					
						spMap[servicePointId]["firstLogin"] =  util.formatTime(ss[9]);
					}
					if ( ss[10] == "--"){
						spMap[servicePointId]["lastLogout"] = noDataChar;
					} else {					
						spMap[servicePointId]["lastLogout"] =  util.formatTime(ss[10]);
					}
				} else {
					spMap[servicePointId]["firstLogin"] = noDataChar;
					spMap[servicePointId]["lastLogout"] = noDataChar;
					spMap[servicePointId]["wt"] =  noDataChar;
					spMap[servicePointId]["aboveTrtSl"] =  0;
				}
				spMap[servicePointId]["showSp"] = 1;
				if (ss[11] != undefined ){
					spMap[servicePointId]["showSp"] =  parseInt(ss[11],10);
				}
				spMap[servicePointId]["poolWt"] = "";
				if (ss[12] != undefined && showPoolCount == true){
					poolEnter = "";
					if (currentSettings.showPoolLongestWt == true && ss[13] != undefined) {
						poolEnter =  getPoolMaxWt(timeInBranch, parseInt(ss[13],10));
						
					}	
					if (parseInt(ss[12],10) > 0){
						spMap[servicePointId]["poolWt"] =  "(" + ss[12] + poolEnter + ")";
					}
				}
				spMap[servicePointId]["totalIdle"] = noDataChar;
				spMap[servicePointId]["avgIdle"] = noDataChar;
				spMap[servicePointId]["currentIdle"] = noDataChar;
				if (ss[14] != undefined) {
					var idle =  parseInt(ss[14],10);
					var idleCounts =  parseInt(ss[15],10);
					spMap[servicePointId]["currentIdle"] = getCurrentIdleTime(timeInBranch, parseInt(ss[16],10));
					spMap[servicePointId]["totalIdle"] = getTotalIdleTime(timeInBranch, parseInt(ss[16],10), idle);
					spMap[servicePointId]["avgIdle"] = (idleCounts > 0 ? parseInt(idle/(60 * idleCounts), 10) : 0) + ' ' + jQuery.i18n.prop('minutes') ;
				} 
			}
		}
		if ( variableAll[j].name == 'userStatInfo_' + selectedBranchId ) {
			value = variableAll[j].value.split("@");
			for (var s = 1; s < value.length; s++){
				ss = value[s].split(",")
				userName =  ss[0];
				userMap[userName]={}
				if ( ss.length >= 4) {
					userMap[userName]["avgTrt"] =  (parseInt(ss[1],10) > 0 ? parseInt(parseInt(ss[2],10)/(60 * parseInt(ss[1],10)) ,10) + ' ' + jQuery.i18n.prop('minutes') : noDataChar);
					userMap[userName]["maxTrt"] =  (parseInt(ss[3],10) > 0 ? parseInt(parseInt(ss[3], 10)/60, 10) + ' ' + jQuery.i18n.prop('minutes') : noDataChar);
				} else {
					userMap[userName]["avgTrt"] = noDataChar;
					userMap[userName]["maxTrt"] = noDataChar;
				}
				userMap[userName]["poolWt"] = "";
				if (ss[4] != undefined  && showPoolCount == true ){
					poolEnter = "";
					if (currentSettings.showPoolLongestWt == true && ss[6] != undefined) {
						poolEnter =  getPoolMaxWt(timeInBranch, parseInt(ss[6],10));
						
					}
					if (parseInt(ss[4],10) > 0){
						userMap[userName]["poolWt"] =  "(" + ss[4] + poolEnter + ")";
					}
				}
			}
		}		
	}

	if (servicepointInfo != null ) {
		for ( i = 0; i < servicepointInfo.length; i++) {
			servicePointId = parseInt(servicepointInfo[i].id/100000000000, 10);
			unitTypeId = parseInt(servicepointInfo[i].id/10000000000, 10)%10;
			servicepointInfo[i].showRow = false;
			if (spMap[servicepointInfo[i].id] == undefined){
				spMap[servicepointInfo[i].id] = {};
				spMap[servicepointInfo[i].id]["firstLogin"] = noDataChar;
				spMap[servicepointInfo[i].id]["lastLogout"] = noDataChar;
				spMap[servicepointInfo[i].id]["wt"] =  noDataChar;
				spMap[servicepointInfo[i].id]["aboveTrtSl"] =  0;
				spMap[servicepointInfo[i].id]["showSp"] = 1;
			}
			
			if (unitTypeId == 2 && spMap[servicepointInfo[i].id].showSp == 1 ) {
				servicepointInfo[i].showRow = true;
				servicepointInfo[i].showSpIdColumn = '<td nowrap align="center">' +servicePointId + '</td>';
				servicepointInfo[i].servicePointNameData = '<td nowrap align="left"><a href="#"  class="labelMedium" onclick="javascript:showQueue(' + servicePointId + ',\'sppool\', \''+ '\');" ><span>' + servicepointInfo[i].name + '&nbsp;&nbsp; </span>';
				poolWt = "";
				if (spMap[servicepointInfo[i].id] != undefined){
					if (spMap[servicepointInfo[i].id]["poolWt"] != undefined){
						poolWt = spMap[servicepointInfo[i].id]["poolWt"];
					}
				}
				
				servicepointInfo[i].servicePointNameData += '<span><i href=\"#\" class=\"qm-action-__icon icon-queue\" ></i>' + poolWt + '</span></a></td>';
				
				if (servicepointInfo[i].status  == 'CLOSED') {
					servicepointInfo[i].showServicePointStatusIcon = '<td nowrap><span class="closed">&#127;&#127;</td>';
				} else {
					servicepointInfo[i].showServicePointStatusIcon = '<td nowrap><span class="open"><img src="images/icon_status_green.png" width="10px" height="10px">&#127;</td>';
				}


				spStaffName = servicepointInfo[i].staffName
				if (loadbalanceWsStatus[servicepointInfo[i].id] == true && servicepointInfo[i].status  !== 'CLOSED'){
					servicepointInfo[i].showServicePointStatusSp = '<td nowrap align="left"><a href="#"  class="labelMedium" onclick="javascript:changeStatus(' + servicepointInfo[i].id +  ');" ><span >' + jQuery.i18n.prop('info.status.will_close_soon') + '</span></td>';
				} else { 
					if (servicepointInfo[i].status  == 'CLOSED') {
						servicepointInfo[i].showServicePointStatusSp = '<td nowrap><span class="closed">' + jQuery.i18n.prop('info.status.closed') + '</span></td>';
					} else {
						servicepointInfo[i].showServicePointStatusSp = '<td nowrap align="left"><a href="#"  class="labelMedium" onclick="javascript:changeStatus(' + servicepointInfo[i].id + ');" ><span >' + jQuery.i18n.prop('info.status.open') + '</span></td>';
					}
				}

				if (servicepointInfo[i].status  == 'CLOSED') {
					if (currentSettings.showServicePointStatusSp === false ) {
						servicepointInfo[i].showServicePointStaff = '<td nowrap><span class="closed">&#127;' + jQuery.i18n.prop('info.status.closed') + '</span></td>';
					} else {
						servicepointInfo[i].showServicePointStaff = '<td nowrap><span class="closed">' + noDataChar + '</span></td>';
					}
				} else {
					viewDataTotal.Open += 1;
					if (currentSettings.showServicePointStaff === true ) {
						if (servicepointInfo[i].staffFullName == null || servicepointInfo[i].staffFullName == "null null" ){
							servicepointInfo[i].showServicePointStaff = '<td nowrap>' + noDataChar + '</td>';
						} else {
							servicepointInfo[i].showServicePointStaff = '<td nowrap align="left"><a href="#"  class="labelMedium" onclick="javascript:showQueue(' + servicepointInfo[i].staffId + ',\'staffpool\', \''+ '\');" ><span>' + servicepointInfo[i].staffFullName + '&nbsp;&nbsp;</span>';
							poolWt = "";
							if ( userMap[spStaffName] != undefined){
								if (userMap[spStaffName]["poolWt"] != undefined){
									poolWt = userMap[spStaffName]["poolWt"];
								}
							}
							servicepointInfo[i].showServicePointStaff += '<span><i href=\"#\" class=\"qm-action-__icon icon-queue\" ></i>' + poolWt + '</span></a></td>';
						}
					} else {
						if (currentSettings.showServicePointStatusSp === false ) {
							servicepointInfo[i].showServicePointStaff = '<td nowrap><span class="closed">' + jQuery.i18n.prop('info.status.open') + '</span></td>';
						} else {
							servicepointInfo[i].showServicePointStaff = '<td nowrap><span class="closed">' + noDataChar + '</span></td>';
						}
					}
				 }

				if (spMap[servicepointInfo[i].id] != undefined){
					servicepointInfo[i].showLoginLogout = '<td nowrap align="center">'+spMap[servicepointInfo[i].id]["firstLogin"]+'</td>';
					servicepointInfo[i].showLoginLogout += '<td nowrap align="center">'+spMap[servicepointInfo[i].id]["lastLogout"]+'</td>';
				} else {
					servicepointInfo[i].showLoginLogout = '<td nowrap align="center">' + noDataChar + '</td>';
					servicepointInfo[i].showLoginLogout += '<td nowrap align="center">' + noDataChar + '</td>';
				}
			
				serviceName = "";
				queueName = "";

				if ( servicepointInfo[i].currentTicketNumber == "" ) {
					if (servicepointInfo[i].status  !== 'CLOSED') {
						serviceName = jQuery.i18n.prop('panel.servicepoint.'+servicepointInfo[i].status);
						servicepointInfo[i].showCurrentIdleTime = '<td nowrap align="center">' + spMap[servicepointInfo[i].id]["currentIdle"] + '</td>';
					} else {
						servicepointInfo[i].showCurrentIdleTime = '<td nowrap align="center"></td>';
					}
				} else {
					serviceName = servicepointInfo[i].currentServiceName;
					// only search for the queueName when column is enabled
					if (currentSettings.showServicePointQueue){
						queueName = getQueueNameForVisit( servicepointInfo[i].currentVisitId, servicePointId);
					}
					servicepointInfo[i].showCurrentIdleTime = '<td nowrap align="center"></td>';
				}

				servicepointInfo[i].showServicePointQueue = '<td nowrap align="center">' + queueName + '</td>';
				servicepointInfo[i].showServicePointService = '<td nowrap>' + serviceName + '</td>';
				servicepointInfo[i].showServicePointTicket = '<td nowrap align="center">' + ((servicepointInfo[i].status  !== 'CLOSED' && servicepointInfo[i].currentTicketNumber == "") ? '--' : servicepointInfo[i].currentTicketNumber) + '</td>';

				if (servicepointInfo[i].currentTicketNumber != ""){
					viewDataTotal.Serving += 1;
				}
				servicepointInfo[i].showServicePointCustomer = '<td nowrap>' + ((servicepointInfo[i].currentCustomerName != null) ? servicepointInfo[i].currentCustomerName : ' ')  + '</td>';
				servicepointInfo[i].showServicePointExpressia = '<td nowrap align="center">' + getExpressiaWsData(servicepointInfo[i].id) + '</td>';
				
				var wt = parseInt(spMap[servicepointInfo[i].id]["wt"]/60, 10);
				servicepointInfo[i].showWaitTime = '<td nowrap align="center">'+ ((servicepointInfo[i].currentTicketNumber != '') ? wt + ' ' + jQuery.i18n.prop('minutes') : ' ') +'</td>';

				if (servicepointInfo[i].currentTicketNumber != "") {
					var trt = parseInt(servicepointInfo[i].currentServiceCurrentTransactionTime/60, 10);
					servicepointInfo[i].showQueueTrtTime = '<td align="center" class="' + alerts[util.getAlert(trt, "trt","TicketTrt")] +'">' + trt + ' ' + jQuery.i18n.prop('minutes') + '</td>';
				} else {
					servicepointInfo[i].showQueueTrtTime= '<td nowrap></td>';
				}

				if (userMap[spStaffName] != undefined ){
					servicepointInfo[i].showUserAvgTrt = '<td nowrap align="center">' + userMap[spStaffName].avgTrt + '</td>';
				} else {
					servicepointInfo[i].showUserAvgTrt = '<td nowrap>' + noDataChar + '</td>';
				}

				if (userMap[spStaffName] != undefined ){
					servicepointInfo[i].showUserMaxTrt= '<td nowrap align="center">' + userMap[spStaffName].maxTrt + '</td>';
				} else {
					servicepointInfo[i].showUserMaxTrt= '<td nowrap>' + noDataChar + '</td>';
				}
				
				//if (currentSettings.userServed && !currentSettings.showUserServedAboveSl ){
					servicepointInfo[i].userServed = '<td nowrap align="center">' + util.localeFormatNum(servicepointInfo[i].customersServed) + '</td>';
				//}
	
			//	if (!currentSettings.userServed && currentSettings.showUserServedAboveSl ){
			//		servicepointInfo[i].userServed = '<td nowrap align="center">' + util.localeFormatNum(spMap[ servicepointInfo[i].id]["aboveTrtSl"]) + '</td>';
			//	}
				
				if ( currentSettings.showUserServedAboveSl ){
					servicepointInfo[i].userServed= '<td nowrap align="center">' + util.localeFormatNum(spMap[ servicepointInfo[i].id]["aboveTrtSl"]) + " / " + util.localeFormatNum(servicepointInfo[i].customersServed) + '</td>';
				}
				servicepointInfo[i].showTotalIdleTime = '<td nowrap align="center"></td>';
				if (spMap[servicepointInfo[i].id]["totalIdle"] !== undefined) {
					servicepointInfo[i].showTotalIdleTime = '<td nowrap align="center">' + spMap[servicepointInfo[i].id]["totalIdle"] + '</td>';
				}
				servicepointInfo[i].showAvgIdleTime = '<td nowrap align="center">' + spMap[servicepointInfo[i].id]["avgIdle"] + '</td>';

				viewDataTotal.ServedAboveSl += parseInt(spMap[ servicepointInfo[i].id]["aboveTrtSl"] , 10);
				viewDataTotal.Served += parseInt(servicepointInfo[i].customersServed , 10);
				
				if (currentSettings.showServicePointWorkProfile){
					if (servicepointInfo[i].status  == 'CLOSED' || (servicepointInfo[i].staffFullName == null && servicepointInfo[i].workProfileName == null)) {
						servicepointInfo[i].showServicePointWorkProfile= '<td nowrap></td>';
					} else {
						servicepointInfo[i].showServicePointWorkProfile = '<td nowrap align="center"><a href="#"  class="labelMedium" onclick="javascript:changeProfile(';
						servicepointInfo[i].showServicePointWorkProfile	+= servicepointInfo[i].workProfileId + ',\'' + servicepointInfo[i].staffName;
						servicepointInfo[i].showServicePointWorkProfile	+= '\',\'' + servicepointInfo[i].workProfileName +'\');"><span>';
						if (servicepointInfo[i].workProfileName == null || servicepointInfo[i].workProfileName == "null") {
							servicepointInfo[i].showServicePointWorkProfile += noDataChar;
						} else {
							servicepointInfo[i].showServicePointWorkProfile += servicepointInfo[i].workProfileName;
						}
						servicepointInfo[i].showServicePointWorkProfile += '</span></a></td>';
					}
				}
				if (currentSettings.userForceLogout) {
					if (servicepointInfo[i].status  == 'CLOSED' || (servicepointInfo[i].staffName == null )) {
						servicepointInfo[i].userForceLogout= '<td nowrap></td>';
					 } else {
						servicepointInfo[i].userForceLogout = '<td nowrap align="center"><a href="#"  class="labelMedium" onclick="javascript:logoutUserWarning(\'';
						servicepointInfo[i].userForceLogout += servicepointInfo[i].staffName + '\',\'' + servicepointInfo[i].staffFullName;
						servicepointInfo[i].userForceLogout += '\');"><span>' + jQuery.i18n.prop('info.status.force.logout') + '</span></a></td>';
					}
				}

			}
			}
		}
	return servicepointInfo;
}

function getQueueNameForVisit(visitId,spId){
	name = "";
	pos = -1;
	// check if the data in servicePointQueues belongs to the current selected branch
	if ( servicePointQueues.length > 0) {
		if ( servicePointQueues[0].branchId != selectedBranchId) {
			servicePointQueues = [];
		}
	}
	
	// find stored queueName
	for (var aa = 0; aa < servicePointQueues.length; aa++) {
		if ( servicePointQueues[aa].id === parseInt(spId,10)  ){
			pos = aa;
			if ( servicePointQueues[aa].visitId === parseInt(visitId,10)){
				name = servicePointQueues[aa].queueName;
			}
		}
	}
	
	if (name === "") {
		visitEvents = restService.get('/rest/servicepoint/branches/' + selectedBranchId + '/visits/' + visitId + '/events' );
		for ( var ee = 0; ee < visitEvents.length; ee++ ){
			if ( visitEvents[ee].eventName === "VISIT_CALL" ) {
				name = visitEvents[ee].parameterMap.queueName;
			}
		}
		if ( pos > -1 ) {
			servicePointQueues[pos].queueName = name;
		} else {
			newPos = {}
			newPos.branchId = selectedBranchId;
			newPos.id = spId;
			newPos.queueName = name;
			newPos.visitId = visitId;
			servicePointQueues.push(newPos);
		}
	}
	return name;
}

function logoutUserWarning(val, name1) {
	logoutName = val;
	$('#userLogoutFormWarning').text(jQuery.i18n.prop('form.user.logout.warning') + " " + name1 );
	util.showModal('userLogoutPage');
}

function logoutUser() {
	restService.del('/rest/servicepoint/branches/' + selectedBranchId + '/users/' + logoutName + "?force=true")
	util.refreshAfterAction();
	util.hideModal('userLogoutPage');
}

function changeProfile( profileId, staff, name) {
	selectedStaff = staff;
	var idFromList = '';
	var profiles = restService.get('/rest/managementinformation/v2/branches/' + selectedBranchId + '/profiles');
	profiles.sort( function( a, b ) {
			return ( a.name > b.name ) ? 1 : ( ( b.name > a.name ) ? -1 : 0);
		} 
	); 
	var $profiles = $('#profiles');

	$profiles.unbind('change');
	$profiles.empty();

	for(i=0; i < profiles.length; i++) {
		$profiles.append('<option value="' + profiles[i].id + '">' + profiles[i].name + '</option>');
		if (profiles[i].name == name) {
			idFromList = profiles[i].id;
			selectedProfile= idFromList;
		}
	}

	$profiles.val(idFromList);
	$profiles.change(function() {
		selectedProfile = $profiles.val();

	});
	$("#profileFormTitle").html(
	'<a href=\"#\" class=\"closeButton\" onclick="javascript:util.hideModal(\'profileSelectPage\')"></a>' +
		jQuery.i18n.prop('form.profile.title'));
	util.showModal('profileSelectPage');
}

function setProfile() {
	restService.put('/rest/managementinformation/v2/branches/' + selectedBranchId + '/user/' + selectedStaff + '/profile/' + selectedProfile);
	util.refreshAfterAction();
	util.hideModal('profileSelectPage');
}

function changeStatus(spId){
	loadbalanceWsStatus = restService.get('/rest/entrypoint/branches/' + selectedBranchId + '/variables/loadbalanceWsStatus').value;
	loadbalanceWsStatus = JSON.parse(loadbalanceWsStatus);
	st = loadbalanceWsStatus[spId]
	if (st == undefined || st == true) {
		loadbalanceWsStatus[spId] = false;
	} else {
		loadbalanceWsStatus[spId] = true
	}
	restService.setBranchVariable(selectedBranchId, "loadbalanceWsStatus", JSON.stringify(loadbalanceWsStatus) );
	util.refreshAfterAction();
}

function getPoolMaxWt(brTime,inPoolTime){
	t = '';
	if (inPoolTime > -1) {
		t = " - " + parseInt((((parseInt(brTime/100,10)) * 3600) + (brTime%100 * 60) - inPoolTime) / 60 + 1, 10) + " " + jQuery.i18n.prop('minutes') 
	}
	return t;
}

function getCurrentIdleTime(brTime,idleTime){
	t = '';
	if (idleTime > 0) {
		t = parseInt((((parseInt(brTime/100,10)) * 3600) + (brTime%100 * 60) - idleTime) / 60 + 1, 10) + " " + jQuery.i18n.prop('minutes') 
	}
	return t;
}

function getTotalIdleTime(brTime,idleCurrent, idleTotal){
	t = '';
	if (idleCurrent > 0) {
		idleTotal += (parseInt(brTime/100,10) * 3600) + (brTime%100 * 60) - idleCurrent;
	}
	t = Math.ceil(idleTotal/60) + " " + jQuery.i18n.prop('minutes') 
	
	return t;
}

