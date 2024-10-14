var queueQueueTempColums=[];
var queueSpTempColums=[];

function setQueueServicePointTableColumns(){
	queueQueueTempColums=[];
	if (currentSettings.queueGroupingEnabled){
		addColumn('queueQueueView','queueQueueHeaderGroup',1,10);
	}

	if (currentSettings.showQueueIdColumn){
		addColumn('queueQueueView','queueQueueHeaderId',1,20);
	}
	addColumn('queueQueueView','queueQueueHeaderName',1,200);
	
	for (x = 0; x < currentSettings.columnOrderQueueSpQueue.length; x++){
		if (currentSettings.columnOrderQueueSpQueue[x] == 'showQueueQueueDelayed') {
			addColumn('queueQueueView','queueHeaderWaitingDelayed',0);
			queueQueueTempColums.push('showQueueDelayed');
		}
		if (currentSettings.columnOrderQueueSpQueue[x] == 'showQueueSpWaiting') {
			addColumn('queueQueueView','queueQueueHeaderWaiting',0);
			queueQueueTempColums.push('showQueueWaiting');
		}
		if (currentSettings.columnOrderQueueSpQueue[x] == 'showQueueSpRealWt') {
			addColumn('queueQueueView','queueQueueHeaderRealWt',0);
			queueQueueTempColums.push('showRealWt');
		}
		if (currentSettings.columnOrderQueueSpQueue[x] == 'showQueueSpMaxWt') {
			addColumn('queueQueueView','queueQueueHeaderMaxWt',0);
			queueQueueTempColums.push('showQueueMaxWt');
		}
		if (currentSettings.columnOrderQueueSpQueue[x] == 'showQueueSpAvgWt') {
			addColumn('queueQueueView','queueQueueHeaderAvgWt',0);
			queueQueueTempColums.push('showAvgWt');
		}
		if (currentSettings.columnOrderQueueSpQueue[x] == 'showQueueSpEstWt') {
			addColumn('queueQueueView','queueQueueHeaderEstWt',0);
			queueQueueTempColums.push('showEstWt');
		}
		if (currentSettings.columnOrderQueueSpQueue[x] == 'showQueueSpServed') {
			addColumn('queueQueueView','queueQueueHeaderServed',0);
			queueQueueTempColums.push('queueShowServed');
		}
		if (currentSettings.columnOrderQueueSpQueue[x] == 'showQueueSpRecycled') {
			addColumn('queueQueueView','queueQueueHeaderRecycled',0);
			queueQueueTempColums.push('queueShowRecycled');
		}
		if (currentSettings.columnOrderQueueSpQueue[x] == 'showQueueSpServices') {
			addColumn('queueQueueView','queueQueueHeaderServices',0);
			queueQueueTempColums.push('queueShowServices');
		}
		if (currentSettings.columnOrderQueueSpQueue[x] == 'showQueueSpTransactions') {
			addColumn('queueQueueView','queueQueueHeaderTransactions',0);
			queueQueueTempColums.push('queueShowTransactions');
		}
		if (currentSettings.columnOrderQueueSpQueue[x] == 'showQueueSpNoShow') {
			addColumn('queueQueueView','queueQueueHeaderNoShow',0);
			queueQueueTempColums.push('showQueueNoShow');
		}
		if (currentSettings.columnOrderQueueSpQueue[x] == 'showQueueSpWaitedAboveSl') {
			addColumn('queueQueueView','queueQueueHeaderWaitedAboveSl',0);
			queueQueueTempColums.push('showQueueWaitedAboveSl');
		}
		if (currentSettings.columnOrderQueueSpQueue[x] == 'showQueueSpBelowSlColumn') {
			addColumn('queueQueueView','queueQueueHeaderSL',0);
			queueQueueTempColums.push('showQueueBelowSlColumn');
		}
		if (currentSettings.columnOrderQueueSpQueue[x] == 'showQueueSpAvgWtToday') {
			addColumn('queueQueueView','queueQueueHeaderAvgWtToday',0);
			queueQueueTempColums.push('howQueueAvgWtToday');
		}
		if (currentSettings.columnOrderQueueSpQueue[x] == 'showQueueSpMaxWtToday') {
			addColumn('queueQueueView','queueQueueHeaderMaxWtToday',0);
			queueQueueTempColums.push('showQueueMaxWtToday');
		}
		if (currentSettings.columnOrderQueueSpQueue[x] == 'showQueueSpMaxTrtColumn') {
			addColumn('queueQueueView','queueQueueHeaderMaxTrt',0);
			queueQueueTempColums.push('showQueueMaxTrtColumn');
		}
		if (currentSettings.columnOrderQueueSpQueue[x] == 'showQueueSpAvgTrt') {
			addColumn('queueQueueView','queueQueueHeaderAvgTrt',0);
			queueQueueTempColums.push('showQueueAvgTrt');
		}
		if (currentSettings.columnOrderQueueSpQueue[x] == 'showQueueSpOpen') {
			addColumn('queueQueueView','queueQueueHeaderOpen',0);
			queueQueueTempColums.push('showQueueOpen');
		}
		if (currentSettings.columnOrderQueueSpQueue[x] == 'showQueueQueueAction') {
			addColumn('queueQueueView','queueQueueHeaderAction',0);
			queueQueueTempColums.push('showQueueAction');
		}
	}

	setQueueServicePointSpTableColumns();
}

function setQueueServicePointSpTableColumns(){
	queueSpTempColums=[];
	if (currentSettings.showSpIdColumn){
		addColumn('queueServicepointView','queueServicepointHeaderId',1,20);
	}
	addColumn('queueServicepointView','queueServicepointHeaderName',1,150);
	if (currentSettings.showQueueSpStatusIcon) {
		addColumn('queueServicepointView','queueServicepointHeaderStatusIcon',2);
	}
	addColumn('queueServicepointView','queueServicepointHeaderStaff',1,150);
	
	for (x = 0; x < currentSettings.columnOrderQueueSpSp.length; x++){
		if (currentSettings.columnOrderQueueSpSp[x] == 'showQueueSpStatusSp') {
			addColumn('queueServicepointView','queueServicepointHeaderStatusSp',1,50);
			queueSpTempColums.push('showServicePointStatusSp');
		}
		//if (currentSettings.columnOrderQueueSpSp[x] == 'showServicePointStaff') {
		//	addColumn('queueServicepointView','queueServicepointHeaderStaff',1,150);
		//	queueSpTempColums.push('showServicePointStaff');
		//}
		
		if (currentSettings.columnOrderQueueSpSp[x] == 'showQueueSpLoginLogout') {
			addColumn('queueServicepointView','queueServicepointHeaderFirstLogin',0);
			addColumn('queueServicepointView','queueServicepointHeaderLastLogout',0);
			queueSpTempColums.push('showLoginLogout');
		}
		if (currentSettings.columnOrderQueueSpSp[x] == 'showQueueSpServicePointQueue') {
			addColumn('queueServicepointView','queueServicepointHeaderQueue',0);
			queueSpTempColums.push('showServicePointQueue');
		}
		if (currentSettings.columnOrderQueueSpSp[x] == 'showQueueSpServicePointService') {
			addColumn('queueServicepointView','queueServicepointHeaderService',0);
			queueSpTempColums.push('showServicePointService');
		}
		if (currentSettings.columnOrderQueueSpSp[x] == 'showQueueSpTicket') {
			addColumn('queueServicepointView','queueServicepointHeaderTicket',0);
			queueSpTempColums.push('showServicePointTicket');
		}
		if (currentSettings.columnOrderQueueSpSp[x] == 'showQueueSpCustomer') {
			addColumn('queueServicepointView','queueServicepointHeaderCustomer',0);
			queueSpTempColums.push('showServicePointCustomer');
		}
		if (currentSettings.columnOrderQueueSpSp[x] == 'showQueueSpExpressia') {
			addColumn('queueServicepointView','queueServicepointHeaderExpressia',0);
			queueSpTempColums.push('showServicePointExpressia');
		}
		if (currentSettings.columnOrderQueueSpSp[x] == 'showQueueSpWaitTime') {
			addColumn('queueServicepointView','queueServicepointHeaderWt',0);
			queueSpTempColums.push('showWaitTime');
		}
		if (currentSettings.columnOrderQueueSpSp[x] == 'showQueueSpTrtTime') {
			addColumn('queueServicepointView','queueServicepointHeaderTrt',0);
			queueSpTempColums.push('showQueueTrtTime');
		}
		if (currentSettings.columnOrderQueueSpSp[x] == 'showQueueSpUserAvgTrt') {
			addColumn('queueServicepointView','queueServicepointHeaderAvgTrt',0);
			queueSpTempColums.push('showUserAvgTrt');
		}
		if (currentSettings.columnOrderQueueSpSp[x] == 'showQueueSpUserMaxTrt') {
			addColumn('queueServicepointView','queueServicepointHeaderMaxTrt',0);
			queueSpTempColums.push('showUserMaxTrt');
		}
		if (currentSettings.columnOrderQueueSpSp[x] == 'showQueueSpUserServed') {
			addColumn('queueServicepointView','queueServicepointHeaderServed',0);
			queueSpTempColums.push('userServed');
		}
		if (currentSettings.columnOrderQueueSpSp[x] == 'showQueueSpCurrentIdleTime') {
			addColumn('queueServicepointView','queueServicepointHeaderCurrentIdleTime',0);
			queueSpTempColums.push('showCurrentIdleTime');
		}
		if (currentSettings.columnOrderQueueSpSp[x] == 'showQueueSpTotalIdleTime') {
			addColumn('queueServicepointView','queueServicepointHeaderTotalIdleTime',0);
			queueSpTempColums.push('showTotalIdleTime');
		}
		if (currentSettings.columnOrderQueueSpSp[x] == 'showQueueSpAvgIdleTime') {
			addColumn('queueServicepointView','queueServicepointHeaderAvgIdleTime',0);
			queueSpTempColums.push('showAvgIdleTime');
		}
		if (currentSettings.columnOrderQueueSpSp[x] == 'showQueueSpWorkProfile') {
			addColumn('queueServicepointView','queueServicepointHeaderProfile',0);
			queueSpTempColums.push('showServicePointWorkProfile');
		}
		if (currentSettings.columnOrderQueueSpSp[x] == 'showQueueSpUserForceLogout') {
			addColumn('queueServicepointView','queueServicepointHeaderLogout',0);
			queueSpTempColums.push('userForceLogout');
		}
	}
}

function branchQueueSpOverview() {
	if (selectedView != 7 ) {
		showPanel(7, selectedBranchId, selectedBranchName);
	}
	variableAll = util.getStatVariables(7);

	resetGraphTotals();
	viewData = getAllQueueData();
	$("#queueQueueView").find("tr:gt(0)").remove();
	var s='';
	if (queueInfo == null ) {
		s='<tr height="200px" align="center"><td colspan="8" align="center">' + jQuery.i18n.prop('branch.offline') + '</td></tr>';
		$('#queueQueueView').append(s);
		graphWaiting([0,0,0]);
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

			for (x = 0; x < queueQueueTempColums.length; x++){
				s += viewData[i][queueQueueTempColums[x]];
			}
			s += '</tr>';
			if (viewData[i].showRow == true) {
				$('#queueQueueView').append(s);
			}
		}
	}
	
	// disable sorting when groups enabled
	if (!currentSettings.queueGroupingEnabled){
		var resort = true;
		$("#queueQueueView").trigger("update", [resort]);
		if (initTable[3] == 0) {
			initTable[3] = 1;
			columnToSortOn = $('#' + currentSettings.queueQueueDefaultColumnSort).index();
			if (columnToSortOn == -1) {
				columnToSortOn = 0;
			}
			initTableSort("#queueQueueView", columnToSortOn ,currentSettings.defaultColumnQueueSortingOrder, true);
		}
	} else {
		initTableSort("#queueQueueView", 0 , currentSettings.defaultColumnQueueSortingOrder , false);
	}
	if (currentSettings.showQueueSpTotals) {
		$("#queueQueueView").find("tfoot").remove();
		$("#queueQueueView").append(
			util.buildFooter("queueQueueView")
		);
		$("#queueQueueFooterServed").html((!currentSettings.showQueueServedAboveSl) ? util.localeFormatNum(viewDataTotal.totalServed) : util.localeFormatNum(viewDataTotal.totalServedAboveSl) + " / " + util.localeFormatNum(viewDataTotal.totalServed));
		$("#queueQueueFooterWaiting").html((!currentSettings.showQueueWaitingAboveSLNow) ? util.localeFormatNum(viewDataTotal.totalWaiting) : util.localeFormatNum(viewDataTotal.totalWaitingAboveSl) + " / " + util.localeFormatNum(viewDataTotal.totalWaiting)).css("textAlign", "center");
		$("#queueQueueFooterServed").css("textAlign", "center");
		$("#queueQueueFooterWaitedAboveSl").html(util.localeFormatNum(viewDataTotal.totalWaitedAboveSl)).css("textAlign", "center");
		$("#queueQueueFooterWaitingDelayed").html(util.localeFormatNum(viewDataTotal.totalDelayed)).css("textAlign", "center");
	}

	createBranchQueueSpTable()
}

function createBranchQueueSpTable() {

	viewData = getAllServicePointData();

	$("#queueServicepointView").find("tr:gt(0)").remove();
	var s = '';

	if (viewData == null ) {
		s = '<tr height="200px" align="center"><td colspan="8" align="center">' + jQuery.i18n.prop('branch.offline') + '</td></tr>';
		$('#queueServicepointView').append(s);
		graphWaiting([0,0,0]);
	} else {
		for ( i = 0; i < viewData.length; i++) {
			s = '<tr class="even">';
			if (currentSettings.showSpIdColumn){
				s += viewData[i].showSpIdColumn;
			}
			s += viewData[i].servicePointNameData
			if (currentSettings.showQueueSpStatusIcon) {
				s += viewData[i].showServicePointStatusIcon;
			}
			s += viewData[i].showServicePointStaff;
			for (x = 0; x < queueSpTempColums.length; x++){
				if (queueSpTempColums[x] !== 'showQueueSpStatusIcon') {
					s += viewData[i][queueSpTempColums[x]];
				}
			}
			s += '</tr>';
			if (viewData[i].showRow == true){
				$('#queueServicepointView').append(s);
			}
		}
	}
	

	if (currentSettings.showQueueSpServicepointTotals) {
		$("#queueServicepointView").find("tfoot").remove();
		$("#queueServicepointView").append(
			util.buildFooter("queueServicepointView")
		);
		$("#queueServicepointFooterServed").html(viewDataTotal.ServedAboveSl);
		if (currentSettings.showQueueSpUserServed && !currentSettings.showUserServedAboveSl ){
			$("#queueServicepointFooterServed").html(util.localeFormatNum(viewDataTotal.Served));
		}
	
		//if (!currentSettings.showQueueSpUserServed && currentSettings.showQueueSpUserServedAboveSl ){
		//	$("#queueServicepointFooterServed").html(util.localeFormatNum(viewDataTotal.ServedAboveSl));
		//}
				
		if (currentSettings.showQueueSpUserServed && currentSettings.showUserServedAboveSl ){
			$("#queueServicepointFooterServed").html(util.localeFormatNum(viewDataTotal.ServedAboveSl) + " / " + util.localeFormatNum(viewDataTotal.Served)) ;
		}
		$("#queueServicepointFooterServed").css("textAlign", "center");
		$("#queueServicepointFooterStaff").html(viewDataTotal.Open);
		$("#queueServicepointFooterTicket").html(viewDataTotal.Serving);
		$("#queueServicepointFooterStaff").css("textAlign", "center");
		$("#queueServicepointFooterTicket").css("textAlign", "center");
	}

	var resort = true;
	$("#queueServicepointView").trigger("update", [resort]);

	if (initTable[4] == 0) {
		initTable[4] = 1;
		columnToSortOn = $('#' + currentSettings.queueSpDefaultColumnSort).index();
		if (columnToSortOn == -1) {
			columnToSortOn = 0;
		}
		
		if ( currentSettings.queueSpDefaultColumnSort == "queueServicepointHeaderStatusIcon" && currentSettings.showQueueSpStatusIcon == true){
			nameColumn = columnToSortOn-1
			initTableSort("#queueServicepointView", columnToSortOn ,currentSettings.defaultColumnSpSortingOrder, true, nameColumn);
		} else {
			initTableSort("#queueServicepointView", columnToSortOn ,currentSettings.defaultColumnSpSortingOrder, true);
		}
	}

	
	
	$('#queueServicepointView tr').css('height', newRowHeight + 'px');
	$('#queueQueueView tr').css('height', newRowHeight + 'px');
	$('#queueServicepointView tr td').css('vertical-align', 'middle !important');
	$('#queueQueueView tr').css('vertical-align', 'middle');
	
	if(currentSettings.queueGroupingGauges == true 	&& currentSettings.queueGroupingEnabled == true && showQueuesExpanded != "" ){
		getQueueGroupGraphData(selectedBranchId);
		$('#graphHeader').text(jQuery.i18n.prop('graph.header.branch')+ " " + selectedBranchName + " - " + showQueuesExpanded);
	} else {
		getBranchGraphData(selectedBranchId);
		$('#graphHeader').text(jQuery.i18n.prop('graph.header.branch')+ " " + selectedBranchName);
	}

}

