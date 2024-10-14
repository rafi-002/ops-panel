var regionTempColumns =[];

function setRegionBranchTableColumns(){
	if (_isCentral === true && 
		(currentSettings.regionView == 'regionColapsed' || currentSettings.regionView == 'regionExpanded' )){
		addColumn('branchView','branchHeaderRegion',1,40);	
	}
	if (currentSettings.showBranchIdColumn){
		addColumn('branchView','branchHeaderId',1,20);
	}
	addColumn('branchView','branchHeaderName',1,200);
	
	for (x = 0; x < currentSettings.columnOrderBranch.length; x++){
		if (currentSettings.columnOrderBranch[x] == 'showBranchWaiting') {
			addColumn('branchView','branchHeaderWaiting',0);
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchDelayed') {
			addColumn('branchView','branchHeaderWaitingDelayed',0);
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchMaxWt') {
			addColumn('branchView','branchHeaderMaxWt',0);
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchAvgWt') {
			addColumn('branchView','branchHeaderAvgWt',0);
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchServed') {
			addColumn('branchView','branchHeaderServed',0);
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchNoShow') {
			addColumn('branchView','branchHeaderNoShow',0);
		}
		if (currentSettings.columnOrderBranch[x] == 'showNpsOnBranchTab') {
			addColumn('branchView','branchHeaderNps',0);
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchWaitedAboveSl') {
			addColumn('branchView','branchHeaderWaitedAboveSl',0);
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchBelowSlColumn') {
			addColumn('branchView','branchHeaderSL',0);
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchAvgWtToday') {
			addColumn('branchView','branchHeaderAvgWtToday',0);
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchMaxWtToday') {
			addColumn('branchView','branchHeaderMaxWtToday',0);
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchAvgTrt') {
			addColumn('branchView','branchHeaderAvgTrt',0);
		}
		if (currentSettings.columnOrderBranch[x] == 'showMaxTrt') {
			addColumn('branchView','branchHeaderMaxTrt',0);
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchOpen') {
			addColumn('branchView','branchHeaderOpen',0);
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchClosed') {
			addColumn('branchView','branchHeaderClosed',0);
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchUpdated') {
			addColumn('branchView','branchHeaderUpdated',1,120);
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchStatus') {
			addColumn('branchView','branchHeaderStatus',0);
		}
		//if (currentSettings.columnOrderBranch[x] == 'showBranchTickets') {
		//	addColumn('branchView','branchHeaderTickets',0);
		//}
		if (currentSettings.columnOrderBranch[x] == 'showBranchAction') {
			addColumn('branchView','branchHeaderAction',0);
		}
	}
	if (currentSettings.showBranchTickets) {
		addColumn('branchView','branchHeaderTickets',0);
	}
	if (currentSettings.historyEnabled) {
		addColumn('branchView','branchHeaderHistory',0);
	}
	setRegionTableColumns()	
}
 
function setRegionTableColumns(){
	regionTempColumns =[];
	addColumn('regionView','regionHeaderTitle',1,40);
	addColumn('regionView','regionHeaderBranches',1,10);

	for (x = 0; x < currentSettings.columnOrderBranch.length; x++){
		if (currentSettings.columnOrderBranch[x] == 'showBranchWaiting') {
			addColumn('regionView','regionHeaderWaiting',0);
			regionTempColumns.push('showBranchWaiting');
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchDelayed') {
			addColumn('regionView','regionHeaderWaitingDelayed',0);
			regionTempColumns.push('showBranchDelayed');
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchMaxWt') {
			addColumn('regionView','regionHeaderMaxWt',0);
			regionTempColumns.push('showBranchMaxWt');
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchAvgWt') {
			addColumn('regionView','regionHeaderAvgWt',0);
			regionTempColumns.push('showBranchAvgWt');
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchServed') {
			addColumn('regionView','regionHeaderServed',0);
			regionTempColumns.push('showBranchServed');
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchNoShow') {
			addColumn('regionView','regionHeaderNoShow',0);
			regionTempColumns.push('showBranchNoShow');
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchWaitedAboveSl') {
			addColumn('regionView','regionHeaderWaitedAboveSl',0);
			regionTempColumns.push('showBranchWaitedAboveSl');
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchBelowSlColumn') {
			addColumn('regionView','regionHeaderSL',0);
			regionTempColumns.push('showBranchBelowSlColumn');
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchAvgWtToday') {
			addColumn('regionView','regionHeaderAvgWtToday',0);
			regionTempColumns.push('showBranchAvgWtToday');
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchMaxWtToday') {
			addColumn('regionView','regionHeaderMaxWtToday',0);
			regionTempColumns.push('showBranchMaxWtToday');
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchAvgTrt') {
			addColumn('regionView','regionHeaderAvgTrt',0);
			regionTempColumns.push('showBranchAvgTrt');
		}
		if (currentSettings.columnOrderBranch[x] == 'showMaxTrt') {
			addColumn('regionView','regionHeaderMaxTrt',0);
			regionTempColumns.push('showMaxTrt');
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchOpen') {
			addColumn('regionView','regionHeaderOpen',0);
			regionTempColumns.push('showBranchOpen');
		}
		if (currentSettings.columnOrderBranch[x] == 'showBranchClosed') {
			addColumn('regionView','regionHeaderClosed',0);
			regionTempColumns.push('showBranchClosed');
		}
	}
	setAppointmentTableColumns()
 }
 
function setAppointmentTableColumns(){
	if (!currentSettings.showBranchIdColumn) {
		deleteColumn('appointView' , 'branchAppointHeaderId');
	} 
 }

function buildRegionOverview(subTab) {
	variableAll = util.getStatVariables(0);
	var regionVarTemp = '';
	if (subTab === undefined) {
		subTab = 6;
	}
	if (selectedView != subTab) {
		showPanel(subTab, 0, "");
		totals=[-1,-1,-1];
	}
	resetGraphTotals ();
	resetRegionTotals();
	$("#regionView").find("tr:gt(0)").remove();
	row = "even"
	for (var i = 0; i < branchInfo.length; i++) {
		regionVarTemp = '';
		totBranches += 1;
		for (j=0; j < variableAll.length; j++ ) {
			// finding stored global var for this branch
			if ( variableAll[j].name == 'branchStatInfo_' + branchInfo[i].id ) {
				regionVarTemp = variableAll[j].value;
			}
		}

		if (regionVarTemp != '' ) {
			regionVarTemp = regionVarTemp.split("@");
			$('#onlineBranchPerc').text( " ");
			if (util.todayWithOffsetYYYYMMDD (regionVarTemp[9]) == parseInt(regionVarTemp[0], 10)) {
			//todays date found, so include
				graphData.servedTot += parseInt(regionVarTemp[5], 10);		//total served
				graphData.wtBelowTot += (parseInt(regionVarTemp[2], 10) - parseInt(regionVarTemp[3], 10)); // total waiting below
				graphData.wtAboveTot += parseInt(regionVarTemp[3], 10);		// tot waiting above sl

				if (currentSettings.showPoolWt === true && regionVarTemp[15] !== undefined){
					graphData.waitTot += parseInt(regionVarTemp[14], 10);			//tot waiting
					graphData.wtTot += parseInt(regionVarTemp[15], 10);			//tot waiting time
				} else {
					graphData.waitTot += parseInt(regionVarTemp[2], 10);			//tot waiting
					graphData.wtTot += parseInt(regionVarTemp[4], 10);			//tot waiting time
				}
				graphData.trtTot += parseInt(regionVarTemp[6],10);
				if (parseInt(regionVarTemp[17],10) > graphData.maxWt) {
					graphData.maxWt = parseInt(regionVarTemp[17],10);
				}
				if (parseInt(regionVarTemp[19],10) > graphData.maxWtToday) {
					graphData.maxWtToday = parseInt(regionVarTemp[19],10);
				}
				if (parseInt(regionVarTemp[20],10) > graphData.maxTrt) {
					graphData.maxTrt = parseInt(regionVarTemp[20],10);
				}
				graphData.wtTotToday += parseInt(regionVarTemp[12],10);
				graphData.waitTotToday += parseInt(regionVarTemp[11],10);
				graphData.openTot += parseInt(regionVarTemp[7], 10); //total open counters
				graphData.servingTot += (regionVarTemp[25] !== undefined) ? parseInt(regionVarTemp[25], 10) : 0;
				gauge3Max = graphData.openTot + parseInt(regionVarTemp[8], 10);
			}
		}
		if(i === 0){
			$('#regionView').append(getRegionSummaryData(branchInfo[i].region));
		} else if (branchInfo[i].region !== branchInfo[i-1].region) {
			$('#regionView').append(getRegionSummaryData(branchInfo[i].region));
		}

		if (util.nowOnline(currentSettings.onlineTime,parseInt(regionVarTemp[0], 10),parseInt(regionVarTemp[9], 10),parseInt(regionVarTemp[1], 10))) {
			onlineBranches += 1;
		}
	}
	
	var resort = true;
	$("#regionView").trigger("update", [resort]);
	if (initTable[5] == 0) {
		initTable[5] = 1;
		initTableSort("#regionView", 0 ,0, true);
	}
	
	var perc = "0%";
	if (totBranches > 0) {
		perc = parseInt((onlineBranches / totBranches)*100, 10) + "%";
	}
	$('#onlineBranchPerc').text(jQuery.i18n.prop('online.branch.perc') + " " + perc);	
	drawGraphs(0);
}

function expandRegion(regionName){
	if (showRegionsExpanded !== regionName){
		showRegionsExpanded = regionName;
	} else {
		showRegionsExpanded = "";
	}
	buildBranchOverview(selectedView);
}

function buildBranchOverview(subTab,reg) {
	variableAll = util.getStatVariables(0);
	if (subTab === undefined) {
		subTab = 0;
	}
	if (selectedView != subTab) {
		showPanel(subTab, 0, "");
		totals=[-1,-1,-1];
	}	
	resetGraphTotals ();
	viewData = getAllBranchData(reg);
	$("#branchView").find("tr:gt(0)").remove();
	$("#appointView").find("tr:gt(0)").remove();
	var s='';
	var sa='';
	
	if (viewData == null ) {
		s ='<tr height="200px" align="center"><td colspan="8" align="center"></td></tr>';
		$('#branchView').append(s);
		$('#appointView').append(s);
		graphWaiting([0,0,0,0]);
	} else {
		for ( i = 0; i < viewData.length; i++) {
			s = '<tr class="' + viewData[i].rowclass +'">';
			sa = '<tr class="' + viewData[i].rowclass +'">';
			
			if (_isCentral === true && 
				(currentSettings.regionView == 'regionColapsed' || currentSettings.regionView == 'regionExpanded' )){
				s += viewData[i].regionNameData;
				sa += viewData[i].regionNameData;
			}
			
			if (viewData[i].id > 0) {
				if (currentSettings.showBranchIdColumn){
					s += viewData[i].showBranchIdColumn;
					sa += viewData[i].showBranchIdColumn;
				}
				s += viewData[i].branchNameData;
				sa += viewData[i].appointNameData;
			}
	
			for (x = 0; x < currentSettings.columnOrderBranch.length; x++){
				s += viewData[i][currentSettings.columnOrderBranch[x]];
			}
	
			if (currentSettings.showBranchTickets) {
				if (viewData[i].id > 0 && viewData[i].branchActive == true) {
					s += '<td align="center"><a href="#" onclick="javascript:queues.branchVisitsClicked(' + viewData[i].id + ',\'' + viewData[i].name  + '\');" ><span><i class=\"qm-action-__icon icon-queue\" ></i></span></a></td>';
				} else {
					s += '<td align="center">' + noDataChar + '</td>';
				}				
			}
			if (currentSettings.historyEnabled) {
				if (viewData[i].id > 0){
					s += '<td align="center"><a href="#" onclick="javascript:buildBranchHistory(' + viewData[i].id + ');"><div class=\"history-button\">&nbsp;</div></a></td>';
				} else {
					s+= '<td align="center"></td>';
				}
			}
			
			sa += viewData[i].appointBooked;
			sa += viewData[i].appointArrived;
			sa += viewData[i].appointPending;
			
			s += '</tr>';
			sa += '</tr>';
			if (viewData[i].showRow == true) {
				$('#branchView').append(s);
				$('#appointView').append(sa);
			}
		}
	}
	
	if (currentSettings.showBranchTotals) {
		$("#branchView").find("tfoot").remove();
		$("#branchView").append(
			util.buildFooter("branchView")
		);
		$("#branchFooterServed").html((!currentSettings.showBranchServedAboveSl) ? util.localeFormatNum(viewDataTotal.totalServed) : util.localeFormatNum(viewDataTotal.totalServedAboveSl) + " / " + util.localeFormatNum(viewDataTotal.totalServed));
		$("#branchFooterWaiting").html((!currentSettings.showBranchWaitingAboveSLNow) ? util.localeFormatNum(viewDataTotal.totalWaiting) : util.localeFormatNum(viewDataTotal.totalWaitingAboveSl) + " / " + util.localeFormatNum(viewDataTotal.totalWaiting)).css("textAlign", "center");
		$("#branchFooterServed").css("textAlign", "center");
		$("#branchFooterWaitedAboveSl").html(util.localeFormatNum(viewDataTotal.totalWaitedAboveSl)).css("textAlign", "center");
		$("#branchFooterOpen").html(util.localeFormatNum(viewDataTotal.totalSpOpen)).css("textAlign", "center");
		$("#branchFooterWaitingDelayed").html(util.localeFormatNum(viewDataTotal.totalDelayed)).css("textAlign", "center");
	}

	var resort = true;
	if (currentSettings.regionView != 'regionColapsed' && currentSettings.regionView != 'regionExpanded') {		// table sorting is only enabled when regions are not shown
		$("#branchView").trigger("update", [resort]);
		$("#appointView").trigger("update", [resort]);
		if (initTable[0] == 0) {
			initTable[0] = 1;
			columnToSortOn = $('#' + currentSettings.branchDefaultColumnSort).index();
			if (columnToSortOn == -1) {
				columnToSortOn = 0;
			}
			// adding 1 if selected column for sorting comes after following columns due to colspan = 2
			initTableSort("#branchView",columnToSortOn,currentSettings.defaultColumnSortingOrder, true);
			
			columnToSortOn = 0;
			if (currentSettings.branchDefaultColumnSort == 'branchHeaderId') {
				columnToSortOn = 0;
			}else {
				columnToSortOn = 1;
			}
			initTableSort("#appointView",columnToSortOn,currentSettings.defaultColumnSortingOrder, true);
		}
	} else {
		initTableSort("#branchView",0,currentSettings.defaultColumnSortingOrder, false);
		initTableSort("#appointView",0,currentSettings.defaultColumnSortingOrder, false);
	}
	drawGraphs(0);
}

function getAllBranchData(reg){
	filteredBranchInfo = [];
	regionInfo = [];
	if (reg != undefined && reg != "") {
		selectedRegion = reg;
	}
	if (selectedRegion != ""){
		for ( f = 0; f < branchInfo.length; f++) {
			if (branchInfo[f].region == selectedRegion) {
				filteredBranchInfo.push(branchInfo[f]);
			}
		}
	} else {
		filteredBranchInfo = branchInfo;
	}

	var s='', served, called, waiting, avgWt, avgTrt, open, closed, updated, status, varTemp, calledBelowSl, delayed;
	var regionName = "-1";

	row = "even"
	gauge3Max = 0;
	viewDataTotal.totalServed = 0;
	viewDataTotal.totalServedAboveSl = 0;
	viewDataTotal.totalWaiting = 0;
	viewDataTotal.totalWaitingAboveSl = 0;
	viewDataTotal.totalWaitedAboveSl = 0;
	viewDataTotal.totalSpOpen = 0;
	viewDataTotal.totalDelayed = 0;
	viewDataTotal.totalServing = 0;
	for ( i = 0; i < filteredBranchInfo.length; i++) {
		s='';
		sa='';
		varTemp = '';
		served = 0;
		called = 0;
		noShow = 0;
		waiting = 0;
		avgWt = 0;
		avgTrt = 0;
		open = 0;
		closed = 0;
		updated = noDataChar;
		status = 3; // can be 0 (green) or 3(red)
		servedAboveSL = 0;
		calledBelowSl= 0;
		percCalledBelowSL = 0;
		maxWt = 0
		maxTrt = 0;
		waitedAboveSl = 0;
		maxWtToday = 0;
		currentWaitingAboveSL = 0;
		avgWtToday = 0;
		varTempApp = '';
		booked = noDataChar;
		pending = noDataChar;
		arrived = noDataChar;
		delayed = 0;
		for (j=0; j < variableAll.length; j++ ) {
		// finding stored global var for this branch
			if ( variableAll[j].name == 'branchStatInfo_' + filteredBranchInfo[i].id ) {
				varTemp = variableAll[j].value;
			}
			if ( variableAll[j].name == 'appointStatInfo_' + filteredBranchInfo[i].id ) {
				varTempApp = variableAll[j].value;
			}
		}

		if (varTemp != '') {
			varTemp = varTemp.split("@");
			updated = util.formatDate(varTemp[0] );
			updated += " " +  util.formatTime(varTemp[1].substr(0, varTemp[1].length-2) + ":" + varTemp[1].substr(varTemp[1].length-2, 2) );
			served = varTemp[5];
			called = varTemp[11];
			if (currentSettings.showPoolWt === true && varTemp[14] !== undefined && varTemp[15] !== undefined){
				waiting = varTemp[14];
				avgWt =  getAvg(varTemp[15], varTemp[14]);
			} else {
				waiting = varTemp[2];
				avgWt =  getAvg(varTemp[4], varTemp[2]);
			}
			avgTrt = getAvg(varTemp[6], varTemp[5]);
			maxWtToday = parseInt(varTemp[19],10);
			maxTrt = parseInt(varTemp[20],10);
			waitedAboveSl = parseInt(varTemp[18],10);
			open = parseInt(varTemp[7],10);
			closed = parseInt(varTemp[8],10);
			calledBelowSL = (varTemp[16] !== undefined) ? parseInt(varTemp[16],10) : 0;
			servedAboveSL = parseInt(varTemp[21],10)
			percCalledBelowSL = (called > 0) ? +(Math.round((( calledBelowSL / called ) * 100) + "e+2")  + "e-2") : 0;
			gauge3Max += open + closed;
			noShow = varTemp[10];
			maxWt = parseInt(varTemp[17],10);
			avgWtToday = getAvg(varTemp[12], (parseInt(varTemp[11],10)))
			currentWaitingAboveSL =  parseInt(varTemp[2],10) -  parseInt(varTemp[3],10)
			delayed = (varTemp[23] !== undefined) ? parseInt(varTemp[23], 10) : 0;
			if (noShow == undefined){
				noShow = 0;
			}
			if (util.nowOnline(currentSettings.onlineTime,parseInt(varTemp[0], 10),parseInt(varTemp[9], 10),parseInt(varTemp[1], 10))) {
				status = 0;
				onlineBranches += 1;
				// Only process appointment info when online
				if (varTempApp != '' ) {
					aa = varTempApp.split("@");
					if (aa.length > 1) {
						ab = aa[1].split(",");
						booked = ab[0];
						pending = ab[1];
						arrived = booked - pending;
					}
				}
			}
		}

		totBranches += 1;
		showBranchesInRegion=true;
		branchDataValid = true;
		if (row === "even") { 
			row = "odd";
		} else {
			row = "even";
		}
			
		if (currentSettings.regionView === 'regionColapsed' || currentSettings.regionView === 'regionExpanded' ) {
			if (currentSettings.regionView === 'regionColapsed' && showRegionsExpanded !== filteredBranchInfo[i].region){
				showBranchesInRegion=false;
			}
			
			//filteredBranchInfo list is already sorted based on region, branchname ascending
			if (regionName != filteredBranchInfo[i].region) {
				regionName = filteredBranchInfo[i].region;
				dummyRow = {};
				dummyRow.id = 0;
				dummyRow.name = "---";
				dummyRow.regionName = regionName ;
				dummyRow.showRow = showBranchesInRegion;
				dummyRow = getRegionData(dummyRow);
				if (reg == undefined){
					dummyRow.showRow = true;
				} else {
					dummyRow.showRow = showBranchesInRegion;	
				}
				regionInfo.push(dummyRow);
			}
		} 


		filteredBranchInfo[i].showBranchIdColumn = '<td nowrap align="right">' + filteredBranchInfo[i].id + '</td>';
		filteredBranchInfo[i].regionNameData = '<td></td>';
		filteredBranchInfo[i].showRow = false;
		filteredBranchInfo[i].rowclass = "even";
			
		if (currentSettings.showOldData || 	(util.nowOnline(currentSettings.timeBeforeOldData,parseInt(varTemp[0], 10),parseInt(varTemp[9], 10),parseInt(varTemp[1], 10))) ) {
			filteredBranchInfo[i].branchNameData = '<td nowrap><a href="#" class="labelMedium" onclick="javascript:branchGetInfo(' + filteredBranchInfo[i].id + ',\'' + filteredBranchInfo[i].branchActive + '\');"><span>' + filteredBranchInfo[i].name
			filteredBranchInfo[i].branchNameData += '</span></a></td>';

			filteredBranchInfo[i].showBranchWaiting = (!currentSettings.showBranchWaitingAboveSLNow) ? '<td align="center">' + util.localeFormatNum(waiting) + '</td>' : '<td align="center">' + util.localeFormatNum(currentWaitingAboveSL) + ' / ' + util.localeFormatNum(waiting) + '</td>';
			filteredBranchInfo[i].showBranchDelayed =  '<td align="center">' + util.localeFormatNum(delayed) +'</td>';
			filteredBranchInfo[i].showBranchMaxWt = '<td align="center" class="' + alerts[util.getAlert(parseInt(maxWt/60,10), "wt","MaxWt")] +'">' + parseInt(maxWt/60,10) + ' ' + jQuery.i18n.prop('minutes') + '</td>';
			filteredBranchInfo[i].showBranchAvgWt = '<td align="center" class="' + alerts[util.getAlert(avgWt, "wt","AvgWt")] + '">' + avgWt + ' ' + jQuery.i18n.prop('minutes') + '</td>';
			filteredBranchInfo[i].showBranchServed = (!currentSettings.showBranchServedAboveSl) ? '<td align="center">' + util.localeFormatNum(served) + '</td>' : '<td align="center">' + util.localeFormatNum(servedAboveSL) + ' / ' + util.localeFormatNum(served) + '</td>';
			filteredBranchInfo[i].showBranchNoShow = '<td align="center">' + util.localeFormatNum(noShow) +'</td>';
			filteredBranchInfo[i].showNpsOnBranchTab = '<td align="center">' + getBranchNps(filteredBranchInfo[i].id)+'</td>';
			filteredBranchInfo[i].showBranchWaitedAboveSl = '<td align="center">' + util.localeFormatNum(waitedAboveSl) + '</td>';
			filteredBranchInfo[i].showBranchBelowSlColumn = '<td align="center">' + util.localeFormatNum(calledBelowSL) + ' / ' + percCalledBelowSL + '% </td>';
			filteredBranchInfo[i].showBranchAvgWtToday = '<td align="center" class="' + alerts[util.getAlert(avgWtToday, "wt","AvgWtToday")] +'">' + avgWtToday + ' ' + jQuery.i18n.prop('minutes') + '</td>';
			filteredBranchInfo[i].showBranchMaxWtToday = '<td align="center" class="' + alerts[util.getAlert(parseInt(maxWtToday/60,10), "wt","MaxWtToday")] +'">' +parseInt(maxWtToday/60,10) + ' ' + jQuery.i18n.prop('minutes')  + '</td>';
			filteredBranchInfo[i].showBranchAvgTrt = '<td align="center" class="' + alerts[util.getAlert(avgTrt, "trt","AvgTrt")] + '">' + avgTrt + ' ' + jQuery.i18n.prop('minutes') + '</td>';
			filteredBranchInfo[i].showMaxTrt = '<td align="center" class="' + alerts[util.getAlert(parseInt(maxTrt/60,10), "trt","MaxTrt")] +'">' + parseInt(maxTrt/60,10) + ' ' + jQuery.i18n.prop('minutes') + '</td>';
			filteredBranchInfo[i].showBranchOpen = '<td align="center" class="' + alerts[util.getAlertSp(open,closed,"OpenClose")] +'">' + util.localeFormatNum(open) + '</td>';
			filteredBranchInfo[i].showBranchClosed = '<td align="center">' + util.localeFormatNum(closed) + '</td>';

			if (varTemp != undefined && varTemp!= "" && varTemp.length != 0){
				graphData.servedTot += parseInt(served, 10);		//total served
				noShowTot += parseInt(noShow, 10);		//total noShow
				graphData.wtBelowTot += (parseInt(waiting, 10) - parseInt(varTemp[3], 10)); // total waiting below
				graphData.wtAboveTot += parseInt(varTemp[3], 10);		// tot waiting above sl
				graphData.waitTot += parseInt(waiting, 10);			//tot waiting 
				if ( maxWtTot < maxWt) {
					maxWtTot = maxWt;
				}
				if (maxWt > graphData.maxWt) {
					graphData.maxWt = maxWt;
				}
				if (maxWtToday > graphData.maxWtToday) {
					graphData.maxWtToday = maxWtToday;
				}
				if (currentSettings.showPoolWt === true && varTemp[15] !== undefined){
					graphData.wtTot += parseInt(varTemp[15], 10);			//tot waiting time
				} else {
					graphData.wtTot += parseInt(varTemp[4], 10);			//tot waiting time
				}
				graphData.wtTotToday += parseInt(varTemp[12],10);
				graphData.waitTotToday += parseInt(varTemp[11],10);
				graphData.trtTot += parseInt(varTemp[6], 10);			//tot transaction time
				if (parseInt(varTemp[20],10) > graphData.maxTrt) {
					graphData.maxTrt = parseInt(varTemp[20],10);
				}

				graphData.openTot += parseInt(varTemp[7], 10); //total open counters
				graphData.servingTot += (varTemp[25] !== undefined) ? parseInt(varTemp[25], 10) : 0;
			}

			filteredBranchInfo[i].appointNameData = '<td nowrap><a href="#" class="labelMedium" onclick="javascript:branchGetInfo(' + filteredBranchInfo[i].id + ',\'' + filteredBranchInfo[i].branchActive + '\');"><span>' + filteredBranchInfo[i].name
			filteredBranchInfo[i].appointNameData += '</span></a></td>';
			filteredBranchInfo[i].appointBooked = '<td align="center">' + util.localeFormatNum(booked) + '</td>';
			filteredBranchInfo[i].appointArrived = '<td align="center">' + util.localeFormatNum(arrived) + '</td>';
			filteredBranchInfo[i].appointPending = '<td align="center">' + util.localeFormatNum(pending) + '</td></tr>';

			if(currentSettings.showBranchTotals){
				viewDataTotal.totalServed += parseInt(served,10);
				viewDataTotal.totalServedAboveSl += parseInt(servedAboveSL,10);
				viewDataTotal.totalWaiting += parseInt(waiting,10);
				viewDataTotal.totalWaitingAboveSl += parseInt(currentWaitingAboveSL,10);
				viewDataTotal.totalWaitedAboveSl += parseInt(waitedAboveSl,10);
				viewDataTotal.totalSpOpen += parseInt(open,10);
				viewDataTotal.totalDelayed += delayed
			}

		} else {
			branchDataValid = false;
			filteredBranchInfo[i].branchNameData = '<td nowrap><a href="#" onclick="javascript:branchGetInfo(' + filteredBranchInfo[i].id + ',\'' + filteredBranchInfo[i].branchActive + '\');"><span>' + filteredBranchInfo[i].name + '</span></a></td>';
			filteredBranchInfo[i].showBranchBelowSlColumn = '<td align="center">' + noDataChar + '</td>';
			filteredBranchInfo[i].showBranchWaiting =  '<td align="center">' + noDataChar +'</td>';
			filteredBranchInfo[i].showBranchDelayed = '<td align="left" width="20px">' + noDataChar + '</td>';
			filteredBranchInfo[i].showBranchAvgWt = '<td align="center">' + noDataChar + '</td>';
			filteredBranchInfo[i].showBranchServed = '<td align="center">' + noDataChar + '</td>';
			filteredBranchInfo[i].showBranchMaxWt = '<td align="center">' + noDataChar + '</td>';
			filteredBranchInfo[i].showBranchNoShow = '<td align="center">' + noDataChar + '</td>';
			filteredBranchInfo[i].showNpsOnBranchTab = '<td align="center">' + noDataChar + '</td>';
			filteredBranchInfo[i].showMaxTrt = '<td align="center">' + noDataChar + '</td>';
			filteredBranchInfo[i].showBranchWaitedAboveSl = '<td align="center">' + noDataChar + '</td>';
			filteredBranchInfo[i].showBranchAvgWtToday = '<td align="center">' + noDataChar + '</td>';
			filteredBranchInfo[i].showBranchMaxWtToday = '<td align="center">' + noDataChar + '</td>';
			filteredBranchInfo[i].showBranchAvgTrt = '<td align="center">' + noDataChar + '</td>';
			filteredBranchInfo[i].showBranchOpen = '<td align="center">' + noDataChar + '</td>';
			filteredBranchInfo[i].showBranchClosed = '<td align="center">' + noDataChar + '</td>';

			filteredBranchInfo[i].appointNameData = '<td nowrap><a href="#" onclick="javascript:branchGetInfo(' + filteredBranchInfo[i].id + ',\'' + filteredBranchInfo[i].branchActive + '\');"><span>' + filteredBranchInfo[i].name + '</span></a></td>';
			filteredBranchInfo[i].appointNameData += '</span></a></td>';
			filteredBranchInfo[i].appointBooked = '<td align="center">' + noDataChar + '</td>';
			filteredBranchInfo[i].appointArrived = '<td align="center">' + noDataChar + '</td>';
			filteredBranchInfo[i].appointPending = '<td align="center">' + noDataChar + '</td></tr>';
		}

		filteredBranchInfo[i].showBranchUpdated = '<td align="center">' + updated + '</td>';
		filteredBranchInfo[i].showBranchStatus = '<td align="center" class="status_' + status +'"> &nbsp;</td>';

		if (branchDataValid == true) {
			filteredBranchInfo[i].showBranchTickets = '<td align="center"><a href="#" onclick="javascript:queues.branchVisitsClicked(' + filteredBranchInfo[i].id + ',\'' + filteredBranchInfo[i].name  + '\');" ><span><i class=\"qm-action-__icon icon-queue\" ></i></span></a></td>';
		} else {
			filteredBranchInfo[i].showBranchTickets = '<td align="center">' + noDataChar + '</td>';
		}


		filteredBranchInfo[i].historyEnabled = '<td align="center"><a href="#" onclick="javascript:buildBranchHistory(' + filteredBranchInfo[i].id + ');"><div class=\"history-button\">&nbsp;</div></a></td>';
		
		if (waiting > 0 && branchDataValid == true) {
			filteredBranchInfo[i].showBranchAction = '<td align="center"><a href="#" onclick="javascript:queues.removeBranchTicketsClicked(' + filteredBranchInfo[i].id + ',\'' + filteredBranchInfo[i].name + '\');"><div class=\"qm-action-btn__icon icon-delete\">&nbsp;</div></a></td>';
		} else {
			filteredBranchInfo[i].showBranchAction = '<td align="center">' + noDataChar + '</td>';
		}
		
		if (showBranchesInRegion === true){
			filteredBranchInfo[i].showRow = true;
		}
		regionInfo.push(filteredBranchInfo[i])
	}

	var perc = "0%";
	if (totBranches > 0) {
		perc = parseInt((onlineBranches / totBranches)*100, 10) + "%";
	}
	$('#onlineBranchPerc').text(jQuery.i18n.prop('online.branch.perc') + " " + perc);

	return regionInfo;
}

function getRegionData(dummyRow){
	var regionName = dummyRow.regionName;
	if (currentSettings.showBranchIdColumn) {
		cspan = 2;
	} else {
		cspan = 1;
	}
	dummyRow.rowclass = "region";
	if ( currentSettings.regionView === 'regionColapsed' ) {
		var regName = regionName.replaceAll("'", "\\'");
		dummyRow.regionNameData= '<td nowrap><a href="#" class="labelMedium" onclick="javascript:expandRegion(\'' + regName + '\');"><span>' + regionName + '</td><td colspan="' + cspan + '" nowrap>&nbsp;</td>';
		} else {
			cspan += 1;
			dummyRow.regionNameData = '<td colspan="' + cspan + '" nowrap class="regionName">' + regionName + '</td>';
	}
		
	var withData = false;
	var served = 0;
	var called = 0;
	var noShow = 0;
	var	waiting = 0;
	var	totWt = 0;
	var	totTrt = 0;
	var maxWtTot = 0;
	var	op = 0;
	var	cl = 0;
	var varT ='';
	var calledBelowSL = 0;
	var maxTrt = 0;
	var waitedAboveSl = 0;
	var servedAboveSL = 0;
	var maxWtToday = 0;
	var currentWaitingAboveSL = 0;
	var avgWtToday = 0;
	var delayed = 0;

	for (var x = 0; x < branchInfo.length; x++){
		if (branchInfo[x].region == regionName) {
			varT = '';
			for (j=0; j < variableAll.length; j++ ) {
		// finding stored global var for this branch
				if ( variableAll[j].name == 'branchStatInfo_' + branchInfo[x].id ) {
					varT = variableAll[j].value;
				}
			}
			if (varT != '') {
				varT = varT.split("@");
				if (currentSettings.showOldData || 	(util.nowOnline(currentSettings.timeBeforeOldData,parseInt(varT[0], 10),parseInt(varT[9], 10),parseInt(varT[1], 10))) ) {
					withData = true;
					served += parseInt(varT[5],10);
					called += parseInt(varT[11],10);
					if (currentSettings.showPoolWt === true && varT[14] !== undefined && varT[15] !== undefined){
						waiting += parseInt(varT[14],10);
						totWt +=  parseInt(varT[15],10);
					} else {
						waiting += parseInt(varT[2],10);
						totWt +=  parseInt(varT[4],10);
					}
					if (parseInt(varT[20],10) > maxTrt){
						maxTrt = parseInt(varT[20],10);
					}
					if(getAvg(varT[12], (parseInt(varT[11],10))) > avgWtToday) {
						avgWtToday = getAvg(varT[12], (parseInt(varT[11],10)))
					}
					waitedAboveSl += parseInt(varT[18], 10);
					totTrt += parseInt(varT[6],10);
					op += parseInt(varT[7],10);
					cl += parseInt(varT[8],10);
					if (parseInt(varT[17],10) > maxWtTot){
						maxWtTot = parseInt(varT[17],10)
					}
					if (parseInt(varT[19],10) > maxWtToday){
						maxWtToday = parseInt(varT[19],10)
					}
					calledBelowSL += (varT[16] !== undefined) ? parseInt(varT[16],10) : 0;
					percCalledBelowSL = (called > 0) ? +(Math.round((( calledBelowSL / called ) * 100) + "e+2")  + "e-2") : 0;
					servedAboveSL += parseInt(varT[21], 10);
					currentWaitingAboveSL += parseInt(varT[2], 10) - parseInt(varT[3], 10);
					if (varT[10] != undefined){ 
						noShow += parseInt(varT[10],10);
					}
					delayed += (varT[23] !== undefined) ? parseInt(varT[23],10) : 0;
				}
			}
		}
	}


	dummyRow.showBranchWaiting = '<td></td>';
	dummyRow.showBranchDelayed = '<td></td>'; 
	dummyRow.showBranchMaxWt = '<td></td>';
	dummyRow.showBranchAvgWt = '<td></td>';
	dummyRow.showBranchServed = '<td></td>';
	dummyRow.showBranchNoShow = '<td></td>';
	dummyRow.showNpsOnBranchTab = '<td></td>';
	dummyRow.showBranchWaitedAboveSl = '<td></td>';
	dummyRow.showBranchBelowSlColumn = '<td></td>';
	dummyRow.showBranchAvgWtToday = '<td></td>';
	dummyRow.showBranchMaxWtToday = '<td></td>';
	dummyRow.showBranchAvgTrt = '<td></td>';
	dummyRow.showMaxTrt = '<td></td>';
	dummyRow.showBranchOpen = '<td></td>';
	dummyRow.showBranchClosed = '<td></td>';
	dummyRow.appointNameData = '<td nowrap><a href="#" class="labelMedium" onclick="javascript:branchGetInfo(' + filteredBranchInfo[i].id + ',\'' + filteredBranchInfo[i].branchActive + '\');"><span>' + filteredBranchInfo[i].name
	dummyRow.appointNameData += '</span></a></td>';
	dummyRow.appointBooked = '<td></td>';
	dummyRow.appointArrived = '<td></td>';
	dummyRow.appointPending = '<td></td>';
	dummyRow.showBranchUpdated = '<td></td>';
	dummyRow.showBranchStatus = '<td></td>';
	dummyRow.showBranchAction = '<td></td>';
		
	if (withData !== false) {	
		var avgWt =  getAvg(totWt, waiting);
		var avgTrt = getAvg(totTrt, served);
		dummyRow.showBranchWaiting = (!currentSettings.showBranchWaitingAboveSLNow) ? '<td align="center">' + util.localeFormatNum(waiting) + '</td>' : '<td align="center">' + util.localeFormatNum(currentWaitingAboveSL) + ' / ' + util.localeFormatNum(waiting) + '</td>';
		dummyRow.showBranchDelayed =  '<td align="center">' + util.localeFormatNum(delayed) +'</td>';
		dummyRow.showBranchMaxWt = '<td align="center" class="' + alerts[util.getAlert(parseInt(maxWtTot/60,10), "wt","MaxWt")] +'">' + parseInt(maxWtTot/60,10) + ' ' + jQuery.i18n.prop('minutes') + '</td>';
		dummyRow.showBranchAvgWt = '<td align="center" class="' + alerts[util.getAlert(avgWt, "wt","AvgWt")] + '">' + avgWt + ' ' + jQuery.i18n.prop('minutes') + '</td>';
		dummyRow.showBranchServed = (!currentSettings.showBranchServedAboveSl) ?  '<td align="center">' + util.localeFormatNum(served) + '</td>' : '<td align="center">' + util.localeFormatNum(servedAboveSL) + ' / ' + util.localeFormatNum(served) + '</td>';
		dummyRow.showBranchNoShow = '<td align="center">' + util.localeFormatNum(noShow) +'</td>';
		dummyRow.showNpsOnBranchTab = '<td align="center"></td>';
		dummyRow.showBranchWaitedAboveSl = '<td align="center">' + util.localeFormatNum(waitedAboveSl) + '</td>';
		dummyRow.showBranchBelowSlColumn = '<td align="center">' + util.localeFormatNum(calledBelowSL) + ' / ' + percCalledBelowSL + '%</td>';
		dummyRow.showBranchAvgWtToday = '<td align="center" class="' + alerts[util.getAlert(avgWtToday, "wt","AvgWtToday")] +'">' + avgWtToday + ' ' + jQuery.i18n.prop('minutes') + '</td>';
		dummyRow.showBranchMaxWtToday = '<td align="center" class="' + alerts[util.getAlert(parseInt(maxWtToday/60,10), "wt","MaxWtToday")] +'">' + parseInt(maxWtToday/60,10) + ' ' + jQuery.i18n.prop('minutes') + '</td>';
		dummyRow.showBranchAvgTrt = '<td align="center" class="' + alerts[util.getAlert(avgTrt, "trt","AvgTrt")]  + '">' + avgTrt + ' ' + jQuery.i18n.prop('minutes') + '</td>';
		dummyRow.showMaxTrt = '<td align="center" class="' + alerts[util.getAlert(parseInt(maxTrt/60,10), "trt","MaxTrt")] +'">' + parseInt(maxTrt/60,10) + ' ' + jQuery.i18n.prop('minutes')  + '</td>';
		dummyRow.showBranchOpen = '<td align="center" class="' + alerts[util.getAlertSp(op,cl,"OpenClose")]  + '">' + util.localeFormatNum(op) + '</td>';
		dummyRow.showBranchClosed = '<td align="center">' + util.localeFormatNum(cl) + '</td>';

	}
	return dummyRow;
}

function branchGetInfo(id, branchActive) {
	if(branchActive === 'f') {
		showDisabledModal();
		return;
	}
	branch = restService.get("/rest/managementinformation/v2/branches/" + id);
	if (branch != undefined) {
		webCamUrl = branch.parameters.address3;
	}
	var name = "";
	for (var i = 0; i < branchInfo.length; i++) {
			if (branchInfo[i].id == id) {
				name = branchInfo[i].name;
			}
	}

	clearTimeout(updateInterval);
	
	selectedBranchId = id
	selectedBranchName = branchActive
	var tabToLoad = 1
	if ( currentSettings.queueServicePointSummaryLocation === "queueSpTab" ){
		tabToLoad = 7
		if (selectedView != 7){
			branchQueueSpOverview(id, name);
		}
	} else {
		if (selectedView != 2){
			branchQueueOverview(id, name);
		}
	}

	updateInterval = setTimeout(function(){loadData(tabToLoad)},refreshInterval*1000);
}

function getBranchGraphData(id){
	var varTemp = '';
	for (j=0; j < variableAll.length; j++ ) {
		// finding stored global var for this branch
		if ( variableAll[j].name == 'branchStatInfo_' + id ) {
			varTemp = variableAll[j].value;
		}
	}
	if (varTemp != '') {
		varTemp = varTemp.split("@");
		$('#onlineBranchPerc').text( " ");
		if (util.todayWithOffsetYYYYMMDD (varTemp[9]) == parseInt(varTemp[0], 10)) {
			//todays date found, so include
				graphData.servedTot = parseInt(varTemp[5], 10);		//total served
				graphData.wtBelowTot = (parseInt(varTemp[2], 10) - parseInt(varTemp[3], 10)); // total waiting below
				graphData.wtAboveTot = parseInt(varTemp[3], 10);		// tot waiting above sl
				graphData.waitTot = parseInt(varTemp[2], 10);			//tot waiting
				graphData.wtTot = parseInt(varTemp[4], 10);			//tot waiting time
				graphData.maxWt = parseInt(varTemp[17], 10);			//max waiting time now
				graphData.maxWtToday = parseInt(varTemp[19], 10);			//max waiting time today
				graphData.wtTotToday = parseInt(varTemp[12],10);
				graphData.waitTotToday = parseInt(varTemp[11],10);
				if (currentSettings.showPoolWt === true && varTemp[15] !== undefined){
					var graphText = jQuery.i18n.prop('graph_waiting_pool_included');
					graphText = graphText.replace("%%%", parseInt(varTemp[14], 10) - graphData.waitTot);
					$('#onlineBranchPerc').text(graphText);
					graphData.waitTot = parseInt(varTemp[14], 10);			//tot waiting
					graphData.wtTot = parseInt(varTemp[15], 10);			//tot waiting time
				}
				graphData.trtTot = parseInt(varTemp[6],10);
				graphData.maxTrt = parseInt(varTemp[20],10);
				graphData.openTot = parseInt(varTemp[7], 10); //total open counters
				graphData.servingTot = (varTemp[25] !== undefined) ? parseInt(varTemp[25], 10) : 0;
				branchSp = parseInt(varTemp[8], 10); // total counters for this branch
				gauge3Max = graphData.openTot + branchSp;
			}
		}
	drawGraphs(parseInt(id,10));
}

function getRegionSummaryData(regionName) {
	cspan = 1;
	var rs = '<tr class="region">';
	var regName = regionName.replaceAll("'", "\\'");
	rs += '<td nowrap ><a href="#" class="labelMedium" onclick="javascript:loadData(0,\'' + regName + '\');"><span>' + regionName + '</td>';
	var withData = false;
	var served = 0;
	var called = 0;
	var noShow = 0;
	var	waiting = 0;
	var	totWt = 0;
	var	totTrt = 0;
	var maxWtTot = 0;
	var	op = 0;
	var	cl = 0;
	var varT ='';
	var calledBelowSL = 0;
	var percCalledBelowSL = 0;
	var maxTrt = 0;
	var waitedAboveSl = 0;
	var servedAboveSL = 0;
	var maxWtToday = 0;
	var currentWaitingAboveSL = 0;
	var avgWtToday = 0;
	var totalBranchesPerRegion = 0;
	var branchCustomersDelayed = 0;

	for (var x = 0; x < branchInfo.length; x++){
		if (branchInfo[x].region == regionName) {
			totalBranchesPerRegion = totalBranchesPerRegion + 1;
			varT = '';
			for (j=0; j < variableAll.length; j++ ) {
			// finding stored global var for this branch
				if ( variableAll[j].name == 'branchStatInfo_' + branchInfo[x].id ) {
					varT = variableAll[j].value;
				}
			}
			if (varT != '') {

				varT = varT.split("@");
				if (currentSettings.showOldData || 	(util.nowOnline(currentSettings.timeBeforeOldData,parseInt(varT[0], 10),parseInt(varT[9], 10),parseInt(varT[1], 10))) ) {
					withData = true;
					served += parseInt(varT[5],10);
					called += parseInt(varT[11],10);
					if (currentSettings.showPoolWt === true && varT[14] !== undefined && varT[15] !== undefined){
						waiting += parseInt(varT[14],10);
						totWt +=  parseInt(varT[15],10);
					} else {
						waiting += parseInt(varT[2],10);
						totWt +=  parseInt(varT[4],10);
					}
					if (parseInt(varT[20],10) > maxTrt){
						maxTrt = parseInt(varT[20],10);
					}
					if(getAvg(varT[12], (parseInt(varT[11],10))) > avgWtToday) {
						avgWtToday = getAvg(varT[12], (parseInt(varT[11],10)))
					}
					waitedAboveSl += parseInt(varT[18], 10);
					totTrt += parseInt(varT[6],10);
					op += parseInt(varT[7],10);
					cl += parseInt(varT[8],10);
					if (parseInt(varT[17],10) > maxWtTot){
						maxWtTot = parseInt(varT[17],10)
					}
					if (parseInt(varT[19],10) > maxWtToday){
						maxWtToday = parseInt(varT[19],10)
					}
					calledBelowSL += (varT[16] !== undefined) ? parseInt(varT[16],10) : 0;
					percCalledBelowSL = (called > 0) ? +(Math.round((( calledBelowSL / called ) * 100) + "e+2")  + "e-2") : 0;
					servedAboveSL += parseInt(varT[21], 10);
					currentWaitingAboveSL += parseInt(varT[2], 10) - parseInt(varT[3], 10);
					if (varT[10] != undefined){ 
						noShow += parseInt(varT[10],10);
					}
					branchCustomersDelayed += (varT[23] !== undefined) ? parseInt(varT[23],10) : 0;

					if(currentSettings.showBranchTotals){
						totalRegionsServed += parseInt(varT[5],10);
						totalRegionsServedAboveSl += (!isNaN(parseInt(varT[21], 10)) ? parseInt(varT[21], 10) : 0);
						totalRegionsWaiting += (currentSettings.showPoolWt === true && varT[14] !== undefined && varT[15] !== undefined) ?  parseInt(varT[14],10) : parseInt(varT[2],10);
						totalRegionsWaitingAboveSl += parseInt(varT[2], 10) - parseInt(varT[3], 10);
						totalRegionsWaitedAboveSl += (!isNaN(parseInt(varT[18], 10)) ? parseInt(varT[18], 10) : 0);
						totalRegionsSpOpen += parseInt(varT[7],10);
						totalRegionCustomersDelayed += (varT[23] !== undefined) ? parseInt(varT[23],10) : 0;
					}
				}
			}
			if(currentSettings.showBranchTotals){
				totalRegionsBranches += 1
			}
		}
	}
	
	rs += '<td align="center">' + totalBranchesPerRegion + '</td>';
	rsTemp = [];
	if (withData == false) {
		rs += '<td align="center" colspan="20"></td>';
	} else {
		var avgWt =  getAvg(totWt, waiting);
		var avgTrt = getAvg(totTrt, served);
		
		rsTemp.showBranchWaiting = (!currentSettings.showBranchWaitingAboveSLNow) ? '<td align="center">' + util.localeFormatNum(waiting) + '</td>' : '<td align="center">' + util.localeFormatNum(currentWaitingAboveSL) + ' / ' + util.localeFormatNum(waiting) + '</td>';
		rsTemp.showBranchDelayed = '<td align="center">' + util.localeFormatNum(branchCustomersDelayed) + '</td>';
		rsTemp.showBranchMaxWt = '<td align="center" class="' + alerts[util.getAlert(parseInt(maxWtTot/60,10), "wt","MaxWt")] +'">' + parseInt(maxWtTot/60,10) + ' ' + jQuery.i18n.prop('minutes') + '</td>';
		rsTemp.showBranchAvgWt = '<td align="center" class="' + alerts[util.getAlert(avgWt, "wt","AvgWt")] + '">' + avgWt + ' ' + jQuery.i18n.prop('minutes') + '</td>';
		rsTemp.showBranchServed = (!currentSettings.showBranchServedAboveSl) ?  '<td align="center">' + util.localeFormatNum(served) + '</td>' : '<td align="center">' + util.localeFormatNum(servedAboveSL) + ' / ' + util.localeFormatNum(served) + '</td>';
		rsTemp.showBranchNoShow = '<td align="center">' + util.localeFormatNum(noShow) +'</td>';
		rsTemp.showBranchWaitedAboveSl = '<td align="center">' + util.localeFormatNum(waitedAboveSl) + '</td>';
		rsTemp.showBranchBelowSlColumn = '<td align="center">' + util.localeFormatNum(calledBelowSL) + ' / ' + percCalledBelowSL + '%</td>';
		rsTemp.showBranchAvgWtToday = '<td align="center" class="' + alerts[util.getAlert(avgWtToday, "wt","AvgWtToday")] +'">' + avgWtToday + ' ' + jQuery.i18n.prop('minutes') + '</td>';
		rsTemp.showBranchMaxWtToday = '<td align="center" class="' + alerts[util.getAlert(parseInt(maxWtToday/60,10), "wt","MaxWtToday")] +'">' + parseInt(maxWtToday/60,10) + ' ' + jQuery.i18n.prop('minutes') + '</td>';
		rsTemp.showBranchAvgTrt = '<td align="center"  class="' + alerts[util.getAlert(avgTrt, "trt","AvgTrt")] + '">' + avgTrt + ' ' + jQuery.i18n.prop('minutes') + '</td>';
		rsTemp.showMaxTrt = '<td align="center" class="' + alerts[util.getAlert(parseInt(maxTrt/60,10), "trt","MaxTrt")] +'">' + parseInt(maxTrt/60,10) + ' ' + jQuery.i18n.prop('minutes')  + '</td>';
		rsTemp.showBranchOpen = '<td align="center" class="' + alerts[util.getAlertSp(op,cl,"OpenClose")] + '">' + util.localeFormatNum(op) + '</td>';
		rsTemp.showBranchClosed = '<td align="center">' + util.localeFormatNum(cl) + '</td>';
		
		for (x = 0; x < regionTempColumns.length; x++){
			rs += rsTemp[regionTempColumns[x]];
		}
		
		rs += '<td colspan="3"></td>';
	}
	rs+= '</tr>'

	if (currentSettings.showBranchTotals) {
		$("#regionView").find("tfoot").remove();
		$("#regionView").append(
			util.buildFooter("regionView")
		);
		$("#regionFooterServed").html((!currentSettings.showBranchServedAboveSl) ? util.localeFormatNum(totalRegionsServed) : util.localeFormatNum(totalRegionsServedAboveSl) + " / " + util.localeFormatNum(totalRegionsServed));
		$("#regionFooterWaiting").html((!currentSettings.showBranchWaitingAboveSLNow) ? util.localeFormatNum(totalRegionsWaiting) : util.localeFormatNum(totalRegionsWaitingAboveSl) + " / " + util.localeFormatNum(totalRegionsWaiting)).css("textAlign", "center");
		$("#regionFooterServed").css("textAlign", "center");
		$("#regionFooterWaitedAboveSl").html(util.localeFormatNum(totalRegionsWaitedAboveSl)).css("textAlign", "center");
		$("#regionFooterOpen").html(util.localeFormatNum(totalRegionsSpOpen)).css("textAlign", "center");
		$("#regionFooterBranches").html(util.localeFormatNum(totalRegionsBranches)).css("textAlign", "center");
		$("#regionFooterWaitingDelayed").html(util.localeFormatNum(totalRegionCustomersDelayed)).css("textAlign", "center");
	}
	return rs;
}

function resetRegionTotals () {
	totalRegionsServed = 0;
	totalRegionsServedAboveSl = 0;
	totalRegionsWaiting = 0;
	totalRegionsWaitingAboveSl = 0;
	totalRegionsWaitedAboveSl = 0;
	totalRegionsSpOpen = 0;
	totalRegionsBranches = 0;
	totalRegionCustomersDelayed = 0;
}
