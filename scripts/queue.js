function setQueueTableColumns(){
	if (currentSettings.queueGroupingEnabled){
		addColumn('queueView','queueHeaderGroup',1,10);
	}
	
	if (currentSettings.showQueueIdColumn){
		addColumn('queueView','queueHeaderId',1,20);
	}
	addColumn('queueView','queueHeaderName',1,200);
	
	for (x = 0; x < currentSettings.columnOrderQueue.length; x++){
		if (currentSettings.columnOrderQueue[x] == 'showQueueDelayed') {
			addColumn('queueView','queueHeaderWaitingDelayed',0);
		}
		if (currentSettings.columnOrderQueue[x] == 'showQueueWaiting') {
			addColumn('queueView','queueHeaderWaiting',0);
		}
		if (currentSettings.columnOrderQueue[x] == 'showRealWt') {
			addColumn('queueView','queueHeaderRealWt',0);
		}
		if (currentSettings.columnOrderQueue[x] == 'showQueueMaxWt') {
			addColumn('queueView','queueHeaderMaxWt',0);
		}
		if (currentSettings.columnOrderQueue[x] == 'showAvgWt') {
			addColumn('queueView','queueHeaderAvgWt',0);
		}
		if (currentSettings.columnOrderQueue[x] == 'showEstWt') {
			addColumn('queueView','queueHeaderEstWt',0);
		}
		if (currentSettings.columnOrderQueue[x] == 'queueShowServed') {
			addColumn('queueView','queueHeaderServed',0);
		}
		if (currentSettings.columnOrderQueue[x] == 'queueShowRecycled') {
			addColumn('queueView','queueHeaderRecycled',0);
		}
		if (currentSettings.columnOrderQueue[x] == 'queueShowServices') {
			addColumn('queueView','queueHeaderServices',0);
		}
		if (currentSettings.columnOrderQueue[x] == 'queueShowTransactions') {
			addColumn('queueView','queueHeaderTransactions',0);
		}
		if (currentSettings.columnOrderQueue[x] == 'showQueueNoShow') {
			addColumn('queueView','queueHeaderNoShow',0);
		}
		if (currentSettings.columnOrderQueue[x] == 'showQueueWaitedAboveSl') {
			addColumn('queueView','queueHeaderWaitedAboveSl',0);
		}
		if (currentSettings.columnOrderQueue[x] == 'showQueueBelowSlColumn') {
			addColumn('queueView','queueHeaderSL',0);
		}
		if (currentSettings.columnOrderQueue[x] == 'showQueueAvgWtToday') {
			addColumn('queueView','queueHeaderAvgWtToday',0);
		}
		if (currentSettings.columnOrderQueue[x] == 'showQueueMaxWtToday') {
			addColumn('queueView','queueHeaderMaxWtToday',0);
		}
		if (currentSettings.columnOrderQueue[x] == 'showQueueMaxTrtColumn') {
			addColumn('queueView','queueHeaderMaxTrt',0);
		}
		if (currentSettings.columnOrderQueue[x] == 'showQueueAvgTrt') {
			addColumn('queueView','queueHeaderAvgTrt',0);
		}
		if (currentSettings.columnOrderQueue[x] == 'showQueueOpen') {
			addColumn('queueView','queueHeaderOpen',0);
		}
		if (currentSettings.columnOrderQueue[x] == 'showQueueAction') {
			addColumn('queueView','queueHeaderAction',0);
		}
	}
}

function branchQueueOverview(id, name) {
	if (selectedView != 1) {
		showPanel(1, selectedBranchId, selectedBranchName);
		totals=[-1,-1,-1];
	}
	variableAll = util.getStatVariables(1);

	resetGraphTotals();
	viewData = getAllQueueData();

	$("#queueView").find("tr:gt(0)").remove();
	var s='';
	
	if (viewData == null ) {
		s='<tr height="200px" align="center"><td colspan="8" align="center">' + jQuery.i18n.prop('branch.offline') + '</td></tr>';
		$('#queueView').append(s);
		graphWaiting([0,0,0,0]);
	} else {
		for ( i = 0; i < viewData.length; i++) {
				s = '<tr class="even">';
			if (currentSettings.queueGroupingEnabled){
				s += viewData[i].groupNameData;
			}
			
			if (viewData[i].id > 0) {
				if (currentSettings.showQueueIdColumn ){
					s += viewData[i].showQueueIdColumn;
				}
				s += viewData[i].queueNameData
			}

			for (x = 0; x < currentSettings.columnOrderQueue.length; x++){
				s += viewData[i][currentSettings.columnOrderQueue[x]];
			}
			s += '</tr>';
			if (viewData[i].showRow == true) {
				$('#queueView').append(s);
			}
		}
	}
	
	if (!currentSettings.queueGroupingEnabled){
		var resort = true;
		$("#queueView").trigger("update", [resort]);
		if (initTable[1] == 0) {
			initTable[1] = 1;
			columnToSortOn = $('#' + currentSettings.queueDefaultColumnSort).index();
			if (columnToSortOn == -1) {
				columnToSortOn = 0;
			}
			initTableSort("#queueView", columnToSortOn , currentSettings.defaultColumnQueueSortingOrder , true);
		}
	} else {
		initTableSort("#queueView", 0 , currentSettings.defaultColumnQueueSortingOrder , false);
	}

	if (currentSettings.showQueueTotals) {
		$("#queueView").find("tfoot").remove();
		$("#queueView").append(
			util.buildFooter("queueView")
		);
		$("#queueFooterServed").html((!currentSettings.showQueueServedAboveSl) ? util.localeFormatNum(viewDataTotal.totalServed) : util.localeFormatNum(viewDataTotal.totalServedAboveSl) + " / " + util.localeFormatNum(viewDataTotal.totalServed));
		$("#queueFooterWaiting").html((!currentSettings.showQueueWaitingAboveSLNow) ? util.localeFormatNum(viewDataTotal.totalWaiting) : util.localeFormatNum(viewDataTotal.totalWaitingAboveSl) + " / " + util.localeFormatNum(viewDataTotal.totalWaiting)).css("textAlign", "center");
		$("#queueFooterServed").css("textAlign", "center");
		$("#queueFooterWaitedAboveSl").html(util.localeFormatNum(viewDataTotal.totalWaitedAboveSl)).css("textAlign", "center");
		$("#queueFooterWaitingDelayed").html(util.localeFormatNum(viewDataTotal.totalDelayed)).css("textAlign", "center");
	}

}	

function getAllQueueData() {	
	var avgWt = 0;
	var avgTrt = 0;
	var showWt = 0;
	var varTemp = "";
	var offset = 0;
	var noShow = 0;
	var called = 0;
	var calledBelowSl = 0;
	var percCalledBelowSl = 0;
	var maxTrt = 0;
	var waitedAboveSl = 0;
	var servedAboveSl = 0;
	var maxWtToday = 0;
	var currentWaitingAboveSL = 0;
	var avgWtToday = 0;
	viewDataTotal.totalServed = 0;
	viewDataTotal.totalServedAboveSl = 0;
	viewDataTotal.totalWaiting = 0;
	viewDataTotal.totalWaitingAboveSl = 0;
	viewDataTotal.totalWaitedAboveSl = 0;
	var delayed = 0;
	viewDataTotal.totalDelayed = 0;
	var maxWt = 0;
	queueInfo = [];
	tmpQueueInfo = restService.get('/rest/managementinformation/v2/branches/' + selectedBranchId + '/queues');
	if (showQueuesByName !== undefined && showQueuesByName.length !== 0) {
		for (var ql = 0; ql < tmpQueueInfo.length; ql++){
			for (var qn = 0; qn < showQueuesByName.length; qn++){
				if (showQueuesByName[qn] === tmpQueueInfo[ql].name) {
					queueInfo.push(tmpQueueInfo[ql])
				}
			}
		}
	} else {
		queueInfo = tmpQueueInfo;
	}

	var currentGroup = "";
	
	for (j=0; j < variableAll.length; j++ ) {
		// finding stored global var for this branch
		// name= queueStatInfo_' + id
		// date@queueId,trt,wt@
		// Example:	20140101@1|5|1234
			if ( variableAll[j].name == 'queueStatInfo_' + selectedBranchId ) {
				varTemp = variableAll[j].value;
			}
			if ( variableAll[j].name == 'branchStatInfo_' + selectedBranchId ) {
				tt = variableAll[j].value.split("@");
				offset = tt[9];
			}
		}
	if (queueInfo != null ) {
		for ( i = 0; i < queueInfo.length; i++) {
			avgWt = 0;
			avgAppWt = 0;
			noShow = 0;
			avgTrt = 0;
			showWtVal = 0;
			estWtVal = 0;
			showWt = "";
			showEstWt = "";
			called = 0;
			calledBelowSl = 0;
			percCalledBelowSl = 0;
			servedAboveSl = 0;
			maxWtToday = 0;
			maxAppWtToday = 0;
			avgWtToday = 0;
			avgAppWtToday = 0;
			maxWt = 0;
			maxAppWt = 0;
			delayed = 0;
			servingNow = 0;
			showThisQueue = true;
			totalForThisQueue = true;
			if (varTemp != "") {
				var q = varTemp.split("@");
				if (util.todayWithOffsetYYYYMMDD (offset) == parseInt(q[0], 10)) {
					for ( k = 1 ; k < q.length ; k++ ) {
						var t = q[k].split(",");
						if ( t[0] == queueInfo[i].id ) {
							avgWt = parseInt(t[2],10);
							avgAppWt = (parseInt(t[27],10) > 0 ) ? parseInt((t[26]/t[27])/60,10) : 0;
							avgTrt = parseInt(t[1],10);
							called = parseInt(t[7],10);
							calledBelowSl = parseInt(t[15],10);
							waitedAboveSl = parseInt(t[17],10);
							maxTrt = (parseInt(t[19],10) > 0 ) ? parseInt(t[19]/60,10) : t[19];
							percCalledBelowSl = (called > 0) ? +(Math.round((( calledBelowSl / called ) * 100) + "e+2")  + "e-2") : 0;
							servedAboveSl = parseInt(t[20],10);
							maxWtToday = parseInt(t[18]/60,10);
							maxAppWtToday = (parseInt(t[31],10) > -90000 ) ? parseInt(t[31]/60,10) : 0;
							avgWtToday = getAvg(t[8], parseInt(t[7],10));
							avgAppWtToday = (parseInt(t[30],10) > 0 ) ? parseInt((t[29]/t[30])/60,10) : 0;
							currentWaitingAboveSL = parseInt(t[16], 10);
							maxWt = parseInt(t[11]/60,10)
							maxAppWt = (parseInt(t[28],10) > -90000 ) ? parseInt(t[28]/60,10) : 0;
							delayed = (t[24] !== undefined) ? parseInt(t[24],10) : 0;
							servingNow = (t[25] !== undefined) ? parseInt(t[25],10) : 0;
							if (t[6] != undefined) {
								noShow = parseInt(t[6],10);
							}
							if (parseInt(t[22],10) == 0) {
								totalForThisQueue = false;
							}
							if (parseInt(t[23],10) == 0) {
								showThisQueue = false;
							}
						}
					}
				}
			}
			queueInfo[i].called = called;
			queueInfo[i].calledBelowSl = calledBelowSl;
			queueInfo[i].percCalledBelowSl = percCalledBelowSl;
			queueInfo[i].avgWt = avgWt
			queueInfo[i].noShow = noShow
			queueInfo[i].avgTrt = avgTrt
			queueInfo[i].maxTrt = maxTrt;
			queueInfo[i].waitedAboveSl = waitedAboveSl;
			queueInfo[i].servedAboveSl = servedAboveSl;
			queueInfo[i].maxWtToday = maxWtToday;
			queueInfo[i].currentWaitingAboveSL = currentWaitingAboveSL;
			queueInfo[i].avgWtToday = avgWtToday;
			queueInfo[i].show = showThisQueue;
			queueInfo[i].avgAppWt = parseInt(avgAppWt,10);
			queueInfo[i].maxAppWt = parseInt(maxAppWt,10);
			queueInfo[i].avgAppWtToday = parseInt(avgAppWtToday,10);
			queueInfo[i].maxAppWtToday = parseInt(maxAppWtToday,10);
			
			if (queueInfo[i].queueType === "APPOINTMENT_QUEUE" && currentSettings.showRealWt === true && currentSettings.showAppointWt === true) {
				showWtVal = parseInt(queueInfo[i].appointmentWaitingTime, 10);
			} else {
				showWtVal = parseInt(queueInfo[i].waitingTime, 10);
			}
			if(currentSettings.showEstWt) {
				estWtVal = parseInt(queueInfo[i].estimatedWaitingTime, 10)
			}

			if (showWtVal > 0) {
				showWt = util.formatIntoHHMMSS(showWtVal);
			} else {
				if (showWtVal === -1 || showWtVal === 0 || showWtVal < -214000000) {
					showWt = "00:00:00";
				} else {
					showWt = util.formatIntoHHMMSS(0-showWtVal);
					if (showAppointNegativeWt == true) {
						showWt = "-" + showWt;
					}
				}
			}
			if (estWtVal > 0) {
				showEstWt = util.formatIntoHHMMSS(estWtVal);
			} else {
				if (estWtVal === -1 || estWtVal === 0 || estWtVal < -214000000) {
					showEstWt = "00:00:00";
				} else {
					showEstWt = util.formatIntoHHMMSS(0-estWtVal);
					if (showAppointNegativeWt == true) {
						showEstWt = "-" + showEstWt;
					}
				}
			}
			
			if (restVersion === 2){
				queueInfo[i].numberOfTransactions = -1;
				queueInfo[i].numberOfServedServices = -1;
				queueInfo[i].numberOfRecycles = -1;
			}


			queueInfo[i].showWt = showWt;
			queueInfo[i].showWtVal = showWtVal;
			queueInfo[i].showEstWt = showEstWt;
			queueInfo[i].estWtVal = estWtVal;
			queueInfo[i].maxWt = maxWt;
			queueInfo[i].delayed = delayed;
			queueInfo[i].serving = servingNow;
			if(currentSettings.showQueueTotals && totalForThisQueue == true){
				viewDataTotal.totalServed += parseInt(queueInfo[i].customersServed,10);
				viewDataTotal.totalServedAboveSl += parseInt(queueInfo[i].servedAboveSl,10);
				viewDataTotal.totalWaiting += parseInt(queueInfo[i].customersWaiting,10);
				viewDataTotal.totalWaitingAboveSl += parseInt(queueInfo[i].currentWaitingAboveSL,10);
				viewDataTotal.totalWaitedAboveSl += parseInt(queueInfo[i].waitedAboveSl,10);
				viewDataTotal.totalDelayed += parseInt(queueInfo[i].delayed,10);
			}
		}
		
		if (currentSettings.queueGroupingEnabled ){
			queueInfo = getQueueInfoGroups(queueInfo,selectedBranchId);
		} else {
			queueInfo.sort( function( a, b ) {
				return ( a.name > b.name ) ? 1 : ( ( b.name > a.name ) ? -1 : 0);
			}); 
		}
	}
	queueInfoTemp = queueInfo
	queueInfo = []

	for (var q = 0; q < queueInfoTemp.length; q++) {
		if (queueInfoTemp[q].show == true) {
			queueInfo.push(queueInfoTemp[q]);
		}
	}

	if (queueInfo != null ) {
		for ( i = 0; i < queueInfo.length; i++) {
			wtAlertType = "wt";
			if (queueInfo[i].queueType === "APPOINTMENT_QUEUE" && currentSettings.showAppointWt === true){
				wtAlertType = "wtApp";
				
				/* remove this when adding columns for appointment wait time. */
				queueInfo[i].avgWt = queueInfo[i].avgAppWt;
				queueInfo[i].maxWt = queueInfo[i].maxAppWt;
				queueInfo[i].avgWtToday = queueInfo[i].avgAppWtToday;
				queueInfo[i].maxWtToday = queueInfo[i].maxAppWtToday;
				/* till here */
			}
				
			queueInfo[i].showRow = true;
			queueInfo[i].groupNameData = '<td nowrap></td>';
			queueInfo[i].queueNameData = '';
			queueInfo[i].showQueueIdColumn = '<td nowrap align="right">' + queueInfo[i].id + '&nbsp;&nbsp;</td>';
			queueInfo[i].showQueueWaiting = (!currentSettings.showQueueWaitingAboveSLNow) ? '<td align="center">' +  util.localeFormatNum(queueInfo[i].customersWaiting) + '</td>' : '<td align="center">' +  util.localeFormatNum(queueInfo[i].currentWaitingAboveSL) + ' / ' + util.localeFormatNum(queueInfo[i].customersWaiting) + '</td>' ;
			queueInfo[i].showQueueMaxWt = '<td align="center" class="' + alerts[util.getAlert(queueInfo[i].maxWt, wtAlertType,"MaxWt")] +'">' + queueInfo[i].maxWt + ' ' + jQuery.i18n.prop('minutes') + '</td>';
			queueInfo[i].showRealWt = '<td align="center">' + queueInfo[i].showWt + '</td>';
			queueInfo[i].showAvgWt = '<td align="center" class="' + alerts[util.getAlert( queueInfo[i].avgWt, wtAlertType,"AvgWt")] +'">';
			queueInfo[i].showAvgWt += queueInfo[i].avgWt + ' ' + jQuery.i18n.prop('minutes') + '</td>';
			queueInfo[i].showEstWt = '<td align="center">' + queueInfo[i].showEstWt + '</td>';
			queueInfo[i].queueShowServed = (!currentSettings.showQueueServedAboveSl) ? '<td align="center">' + util.localeFormatNum(queueInfo[i].customersServed) + '</td>' : '<td align="center">' + util.localeFormatNum(queueInfo[i].servedAboveSl) + ' / ' + util.localeFormatNum(queueInfo[i].customersServed) + '</td>';
			queueInfo[i].showQueueDelayed = '<td align="center">' + util.localeFormatNum(queueInfo[i].delayed) +'</td>';
			queueInfo[i].queueShowRecycled = '<td align="center">' + util.localeFormatNum(queueInfo[i].numberOfRecycles) +'</td>';
			queueInfo[i].queueShowServices = '<td align="center">' + util.localeFormatNum(queueInfo[i].numberOfServedServices) +'</td>';
			queueInfo[i].queueShowTransactions = '<td align="center">' + util.localeFormatNum(queueInfo[i].numberOfTransactions) +'</td>';
			queueInfo[i].showQueueNoShow = '<td align="center">' + util.localeFormatNum(queueInfo[i].noShow) +'</td>';
			queueInfo[i].showQueueWaitedAboveSl = '<td align="center">' +  util.localeFormatNum(queueInfo[i].waitedAboveSl) + '</td>';
			queueInfo[i].showQueueBelowSlColumn = '<td align="center">' +  util.localeFormatNum(queueInfo[i].calledBelowSl) + ' / ' + queueInfo[i].percCalledBelowSl + '%</td>';
			queueInfo[i].showQueueAvgWtToday = '<td align="center" class="' + alerts[util.getAlert(queueInfo[i].avgWtToday, wtAlertType,"AvgWtToday")] +'">' +  queueInfo[i].avgWtToday + ' ' + jQuery.i18n.prop('minutes') + '</td>';
			queueInfo[i].showQueueMaxWtToday = '<td align="center" class="' + alerts[util.getAlert(queueInfo[i].maxWtToday, wtAlertType,"MaxWtToday")] +'">' +  queueInfo[i].maxWtToday + ' ' + jQuery.i18n.prop('minutes') + '</td>';
			queueInfo[i].showQueueAvgTrt = '<td align="center" class="' + alerts[util.getAlert( queueInfo[i].avgTrt, "trt","AvgTrt")] +'">';
			queueInfo[i].showQueueAvgTrt += queueInfo[i].avgTrt + ' ' + jQuery.i18n.prop('minutes') + '</td>';
			queueInfo[i].showQueueMaxTrtColumn = '<td align="center" class="' + alerts[util.getAlert(queueInfo[i].maxTrt, "trt","MaxTrt")] +'">' +  queueInfo[i].maxTrt + ' ' + jQuery.i18n.prop('minutes') + '</td>';
			queueInfo[i].showQueueAction = '<td> </td>';
			queueInfo[i].showQueueOpen = '<td> </td>';
			
			if (queueInfo[i].id === 0) {
				var colspan = 3;
				if (!currentSettings.showQueueIdColumn){
					colspan = 2;
				}
				if ( currentSettings.queueGroupingExpanded === false || currentSettings.queueGroupingGauges === true) {

					var grpName = queueInfo[i].groupName;
					grpName = grpName.replaceAll("'", "\\'");
					queueInfo[i].groupNameData = '<td nowrap colspan="' + colspan + '"><a href="#" class="labelMedium" onclick="javascript:expandGroup(\'' + grpName + '\');"><span>' + queueInfo[i].groupName + '</span></a></td>';
					currentGroup = queueInfo[i].groupName;
				} else {
					queueInfo[i].groupNameData = '<td nowrap class="groupName" colspan="' + colspan + '">' + queueInfo[i].groupName + '</td>';
				}
			} else {
				if (queueInfo[i].customersWaiting > 0) {
					queueInfo[i].queueNameData = '<td nowrap><a href="#"  class="labelMedium" onclick="javascript:showQueue(' + queueInfo[i].id + ',\'queue\', \''+ '\');" ><span>' + queueInfo[i].name + '</span></a>';
				} else {
					queueInfo[i].queueNameData = '<td nowrap >' + queueInfo[i].name ;
				}
				if (queueInfo[i].queueType === "APPOINTMENT_QUEUE") {
					queueInfo[i].queueNameData += " <span><i href=\"#\" class=\"qm-action-__icon icon-calendar\" ></i></span>";
				}
				queueInfo[i].queueNameData += '</td>';
				queueInfo[i].showQueueOpen = '<td align="center">' + queueInfo[i].openServicePoints + '</td>';

				if (queueInfo[i].customersWaiting > 0) {
					queueInfo[i].showQueueAction = '<td align="center"><a href="#" onclick="javascript:queues.removeTicketsClicked(' + queueInfo[i].id + ", \'"+ queueInfo[i].name + '\');"><div class=\"qm-action-btn__icon icon-delete\">&nbsp;</div></a></td>';
				}

				if (currentGroup === showQueuesExpanded || currentSettings.queueGroupingExpanded === true){
					queueInfo[i].showRow = true;
				} else {
					queueInfo[i].showRow = false;
				}
			}
		}
	}
	
	if(currentSettings.queueGroupingGauges == true 	&& currentSettings.queueGroupingEnabled == true && showQueuesExpanded != "" ){
		getQueueGroupGraphData(selectedBranchId);
		$('#graphHeader').text(jQuery.i18n.prop('graph.header.branch')+ " " + selectedBranchName + " - " + showQueuesExpanded);
	} else {
		getBranchGraphData(selectedBranchId);
		$('#graphHeader').text(jQuery.i18n.prop('graph.header.branch')+ " " + selectedBranchName);
	}
	return queueInfo;
}

function expandGroup(groupName){
	if (showQueuesExpanded !== groupName){
		showQueuesExpanded = groupName;
	} else {
		showQueuesExpanded = "";
	}
	if (selectedView == 1){
		branchQueueOverview(selectedBranchId,selectedBranchId);
	} else {
		branchQueueSpOverview(selectedBranchId,selectedBranchId);
	}
}

function getQueueInfoGroups(valQueue,id){
	var val = valQueue;
		var groupsAll = currentSettings.queueGroupingSetting; 
		for (var a= 0; a < groupsAll.length; a++) {
			if (parseInt(groupsAll[a].branchId,10) === parseInt(id,10)){
				groups = groupsAll[a].groups;
				for (var b = 0; b < val.length; b++) {
					val[b].groupName = "";
					for (var c = 0; c < groups.length; c++){
						var tempIds = groups[c].queueIds;
						for (var e = 0; e < tempIds.length; e++) {
							if (parseInt(tempIds[e],10) === parseInt(val[b].id,10)){
								val[b].groupName = groups[c].groupName;
							}
						}
					}
				}
				
				for (var c = 0; c < groups.length; c++){
					var d = {}
					d.id = 0;
					d.groupName = groups[c].groupName;
					served = 0;
					called = 0;
					numOfRecycles = 0;
					numOfServices = 0;
					numOfTransactions = 0;
					waiting = 0;
					noShow = 0;
					showWt = "00:00:00";
					showWtVal = 0;
					estWtVal = 0;
					showEstWt = "00:00:00";
					trt = 0;
					wt = 0;
					avgTrt = 0;
					avgWt = 0;
					calledBelowSl = 0;
					percCalledBelowSl = 0;
					maxTrt = 0;
					waitedAboveSl = 0;
					servedAboveSl = 0;
					maxWtToday = 0;
					currentWaitingAboveSL= 0;
					wtToday = 0;
					avgWtToday = 0;
					maxWt = 0;
					maxOpen = 0;
					delayed = 0;
					queueGroupServing = 0;
					for (var b = 0; b < val.length; b++) {
						if (val[b].groupName === groups[c].groupName && val[b].show == true){
							served += val[b].customersServed;
							waiting += val[b].customersWaiting;
							noShow += val[b].noShow;
							called += val[b].called;
							calledBelowSl +=  val[b].calledBelowSl;
							waitedAboveSl += val[b].waitedAboveSl
							servedAboveSl += val[b].servedAboveSl
							currentWaitingAboveSL += val[b].currentWaitingAboveSL
							delayed += val[b].delayed;
							queueGroupServing += val[b].serving;
							if(maxTrt < parseInt(val[b].maxTrt,10)) {
								maxTrt = parseInt(val[b].maxTrt,10)
							}
							if(maxWtToday < parseInt(val[b].maxWtToday,10)) {
								maxWtToday = parseInt(val[b].maxWtToday,10)
							}
							if(maxWt < parseInt(val[b].maxWt,10)) {
								maxWt = parseInt(val[b].maxWt,10)
							}
							if (restVersion > 2) {
								numOfServices += val[b].numberOfServedServices;
								numOfTransactions += val[b].numberOfTransactions;
								numOfRecycles += val[b].numberOfRecycles;	
							} else {
								numOfRecycles = -1;
								numOfServices = -1;
								numOfTransactions = -1;	
							}
							
							if (val[b].showWtVal > showWtVal){
								showWt = val[b].showWt;
								showWtVal = val[b].showWtVal;
							}
							if (val[b].estWtVal > estWtVal){
								showEstWt = val[b].showEstWt;
								estWtVal = val[b].estWtVal;
							}
							trt += val[b].customersServed * val[b].avgTrt;
							wtToday += val[b].customersServed * parseInt(val[b].avgWtToday,10)
							wt += val[b].customersWaiting * val[b].avgWt;
							if (val[b].openServicePoints > maxOpen){
								maxOpen = val[b].openServicePoints;
							}
						}
					}
					d.customersServed = served;
					d.numberOfTransactions = numOfTransactions;
					d.numberOfServedServices = numOfServices;
					d.numberOfRecycles = numOfRecycles;
					d.customersWaiting = waiting;
					d.showWt = showWt;
					d.showWtVal = showWtVal;
					d.showEstWt = showEstWt;
					d.estWtVal = estWtVal;
					d.noShow = noShow;
					d.calledBelowSl = calledBelowSl;
					d.percCalledBelowSl = (called > 0) ? +(Math.round((( calledBelowSl / called ) * 100) + "e+2")  + "e-2") : 0;
					d.maxTrt = maxTrt;
					d.waitedAboveSl = waitedAboveSl;
					d.servedAboveSl = servedAboveSl;

					if (served > 0){
						avgTrt = parseInt(trt/served,10);
						avgWtToday = parseInt(wtToday/served,10);
					}
					if (waiting > 0){
						avgWt = parseInt(wt/waiting,10);
					}
					d.avgTrt = avgTrt;
					d.avgWt = avgWt;
					d.maxWtToday = maxWtToday;
					d.currentWaitingAboveSL = currentWaitingAboveSL;
					d.avgWtToday = avgWtToday;
					d.maxWt = maxWt;
					d.show = true;
					d.maxOpen = maxOpen;
					d.delayed = delayed;
					if (d.groupName == showQueuesExpanded){
						queueGroupGraphData.servedTot = d.customersServed;
						queueGroupGraphData.wtBelowTot = d.customersWaiting - d.currentWaitingAboveSL;
						queueGroupGraphData.wtAboveTot = d.currentWaitingAboveSL;
						queueGroupGraphData.waitTot = d.customersWaiting;
						queueGroupGraphData.wtTot = 60 * wt;
						queueGroupGraphData.trtTot = 60 * trt;
						if (d.maxTrt > queueGroupGraphData.maxTrt) {
							queueGroupGraphData.maxTrt = 60 * d.maxTrt;
						}
						if (d.maxWt > queueGroupGraphData.maxWt) {
							queueGroupGraphData.maxWt = 60 * d.maxWt;
						}
						if (d.maxWtToday > queueGroupGraphData.maxWtToday) {
							queueGroupGraphData.maxWtToday = 60 * d.maxWtToday;
						}
						
						queueGroupGraphData.wtTotToday = 60 * wtToday;
						queueGroupGraphData.waitTotToday = served;
						queueGroupGraphData.openTot = d.maxOpen;
						queueGroupGraphData.servingTot = queueGroupServing;
					}
					val.push(d);
					
				}
			}
		}

	val.sort( function( a, b ) {
		return ( a.id > b.id ) ? 1 : ( ( b.id > a.id ) ? -1 : 0);
	}); 

	val.sort( function( a, b ) {
		return ( a.groupName > b.groupName ) ? 1 : ( ( b.groupName > a.groupName ) ? -1 : 0);
	}); 
	return val;
}

function getQueueGroupGraphData(id){
	graphData = queueGroupGraphData;
	gauge3Max = graphData.openTot + branchSp;
	drawGraphs(parseInt(id,10));
}

function showQueue(queueId,type) {
	name = getTypeName(type,queueId);
	if (type == 'queue'){
		queues.queueClicked(queueId, type,name);
	} else {
		queues.poolClicked(queueId, type,name);
	}
}

