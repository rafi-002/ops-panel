// ---------------------------------------------------------------------------------
// variable definition
// variable name: queueStatInfo_ + branchId 
// data:		  queue id [0], avg trt today [1], avg waiting time now [2], waiting now [3], est waiting time now [4], open servicepoints now [5], noShow today [6], called today [7], total waiting time today [8], 
//				  Customer Served today [9], Number Of Served Services today [10], Waiting Time now [11], Appointment Waiting Time Now [12], getServiceLevel [13], queue name [14], waited below sl wt today [15],
//				  waiting above sl wt now [16], waited above sl wt today [17], max waiting time today [18], max trt today [19], served above sl trt today [20], served below sl trt today [21],
//				  queue data included in branch summary [22], show queue in queue summary [23], queueCustomersDelayed [24] service points serving [25], 
//				  total appoint waiting time now [26], total appoint waiting [27], max appoint waiting time now [28],
//                total appoint waiting time today [29], total appoint waiting today [30], max appoint waiting time today [31] etc
// Example:		  20240703@2,0,0,0,-1,0,0,0,0,0,0,0,-2147483648,300,Default Queue 2,0,0,0,0,0,0,0,1,1,0,0,0,0,-90000,0,0,-90000@6,0,146,2,1200,1,0,1,2807,0,0,9887,11967,300,Appointment Queue 1,0,2,1,2807,0,0,0,1,1,0,1,9532,2,11966,2190,1,2190@etc

// variable name: serviceStatInfo_ + branchId 
// data:		  date @ service [0], served [1], waiting [2]@ etc		
// Example:		  20141010@1,4,4@etc

// variable name: branchStatInfo_ + branchId 
// data:		  date [0]@ updated [1]@ waiting now [2]@ waiting below sl now [3]@ total waiting time now [4]@ served today [5]@ total trt today [6]@ open counters [7]@ closed counters [8]@ branchTimeOffset [9]@ 
//				  noShow today [10]@ called today [11]@ total waiting time today [12]@ branchname [13]@ total waiting including pools now [14]@ total wait time including pools now [15]@ called below sl wt [16]@ 
//				  max waiting time now [17]@ waited above sl today [18]@ max waiting time today [19]@ max trt today [20]@ served above sl trt [21]@ served below sl trt [22]@ total waiting above sl wt now [23]@ 
//				  dataversion [24]@ service points serving [25] @ total appoint waiting time now [26] @ total appoint waiting [27] @ max appoint waiting time now [28]@
//                total appoint waiting time today [29]@ total appoint waiting today [30]@ max appoint waiting time today [31]
// Example:		  20240703@1119@3@0@28087@0@0@1@30@+0200@0@1@2807@Branch 001 (GMT+1)@3@28087@0@10538@1@2807@0@0@0@0@2@1@9532@2@11966@2190@1@-90000

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

var version ="7.4.10";
var unitTypeDataVersion = 3;  // needs to be increased if data format changes in utt
var firstRun = false;
var initTable = [0,0,0,0,0,0]; //sorting of tables position 0:branchView, 1:queueView, 2:servicepointView, 3:queueQueueView, 4:queueServicepointView, 5:regionView,
var branches;
var branch;
var branchAccess;
var branchAccessAll = false;
var branchInfo = new Array();
var selectedView=-2;				//-1 = enterprise appointments, 0 = enterprise, 1=queue, 2=servicepoint, 3=NPS, 4=web cam, 6= Region Summary
var selectedBranchId=0;
var selectedBranchName="";
var entryPointBranchId = -1;
var branchTree;
var variableAll;
var appSettings;
var settingsSet = false;
var totals = [0,0,0];
var totBranches = 0;
var onlineBranches = 0;
var noShowTot = 0;
var awtTot = 0;
var atrtTot = 0;
var wtOpenTot= 0;
var maxWtTot = 0;
var queueInfoGet = 0;
var accessRights = [0,0,0,0,0,0];
var webCamUrl = "";
var services;
var updateInterval;
var oasUser = "";
var userMapping = {};
var lights = ['icon_status_green.png','alert_yellow.png','alert_orange.png','icon_status_red.png','alert_none.png'];
var alerts = ['alert_green','alert_yellow','alert_orange','alert_red','alert_none'];
var logoutName = "";
var tempBranchInfo;
var tempRegion="-";
var entrypointId = "-1"
var showRegionsExpanded = "";
var showQueuesExpanded = "";

var queueInfo;
var queueGroupGraphData ={"servedTot": 0, "wtBelowTot" : 0, "wtAboveTot" : 0, "waitTot" : 0, "wtTot" : 0, "trtTot" : 0, "openTot" : 0, "servingTot" : 0, "maxWt" : 0, "wtTotToday" : 0, "waitTotToday" :0, "maxTrt" : 0 };
var graphData ={"servedTot": 0, "wtBelowTot" : 0, "wtAboveTot" : 0, "waitTot" : 0, "wtTot" : 0, "trtTot" : 0, "openTot" : 0, "servingTot" : 0, "maxWt" : 0, "wtTotToday" : 0, "waitTotToday" :0, "maxTrt" : 0 };
var branchSp = 0

var noDataChar = ""; //"&#45;&#45;"
var gauge3Max = 0;
var portalUrl = "/";
var showQueuesByName = [];
var getGlobalVariableMethod = 1;    //1 = old method which gets all, 2 = new method which does a search on part of the name from 3.2.0.1532, 4.4 

// Variables to calculate totals in Region Summary
var totalRegionsServed = 0;
var totalRegionsServedAboveSl = 0;
var totalRegionsWaiting = 0;
var totalRegionsWaitingAboveSl = 0;
var totalRegionsWaitedAboveSl = 0;
var totalRegionsSpOpen = 0;
var totalRegionsBranches = 0;
var selectedRegion = "";
var develop = "";   // "Visit Manager" for dev Experience Cloud on an Orchestra setup
var totalRegionCustomersDelayed = 0;
var userHasAdmin = false;
var visitsRemoveId = -1;
var loadDataVal;
var loadDataReg;
var tableDensity = 0;
var viewDataTotal = {}
var dateFormat = "YYYY-MM-DD";
var timeFormat = "HH:mm";
var debugId = 0; // branch id for which you want to log the variable in the console on startup
var debugVars = [0,0,0,0,0,0];  // which var to show in the console [branch, queue, servicePointMi, service, user, servicePointStatInfo(branch var)]
var systemInformation;

 $(document).ready(function() {
	systemInformation = restService.get('/rest/managementinformation/v2/systemInformation');
	if (systemInformation !== null && systemInformation !== undefined) {
		var productVersion = systemInformation.productVersion.split(".");
		var mainVersion = parseInt( productVersion[0], 10 );
		var subVersion = parseInt( productVersion[1], 10 );
		var minorVersion = parseInt( productVersion[3], 10 );
		if ((mainVersion === 4 && subVersion > 2) || mainVersion > 4){
			restVersion = 3;
		}
		if ((mainVersion === 3 && subVersion === 2 && minorVersion >= 1532 ) || ( mainVersion === 4 && subVersion >= 4 )){
			getGlobalVariableMethod  = 2;
		}
		if ( systemInformation.productName === "Visit Manager" || develop === "Visit Manager"){
			portalUrl = systemInformation.portalUrl;
			isExperience = true;
		}
		
		if (systemInformation.dateConvention !== undefined) {
			dateFormat = systemInformation.dateConvention;
		}
		if (systemInformation.timeConvention !== undefined) {
			if (systemInformation.timeConvention == "AM/PM"){
				timeFormat = "h:mm a";
			}
		}
	}


	//disable functions which only work on Central

	if (_isCentral === false ) {
		currentSettings.hideInActiveBranches = false;
		//$('#branchHeaderRegion').remove();
		$('#branchAppointHeaderRegion').remove();
		currentSettings.regionView = 'noRegion';
	}
	
	var user = restService.get("/rest/entrypoint/user");
	if (user != null ) {
		accessRights[1] = 1;
		var tempUserAccount = restService.get('/rest/entrypoint/account');
		branchAccess = tempUserAccount.branchIds;
		if (branchAccess.length == 0){
			branchAccessAll = true;
		}
		for ( i = 0; i < tempUserAccount.permissions.length; i++) {
			if (tempUserAccount.permissions[i] == "*:*"  || tempUserAccount.permissions[i] == "branch:*") {
				branchAccessAll = true;
			}
		}

		if (_isCentral !== false) {
			getAdminRights(tempUserAccount);
		} else {
			displayAdminSettings(false);
		}
		
		var userName = user.firstName + ' ' + user.lastName
		oasUser = user.userName;
		sessvars.locale = "en";

		if(sessvars.userName != userName ) {
			sessvars.branchId = -1;
			sessvars.userName = userName;
		}
		if ( user.locale != null) {
			sessvars.locale = user.locale;
		}

		$('#userName').text(sessvars.userName);
	}
	loadSettings();
});

function initDone(){
	
	setTableColumns();
	
	// always load default from war
	jQuery.i18n.properties({
		name:'operationspanelMessages', 
		path:'lang/', 
		mode:'map',
		language:  " ",
		callback : function () {
			i18nPage();
		}
	});	


// try to load user related language file
	jQuery.i18n.properties({
		name:['operationspanelMessages'],
		path:'/bundle/',
		mode:'map',
		language: sessvars.locale == "en" ? " " : sessvars.locale, //hack to avoid trying to load bundle with "_en" ending in case of system language "en"
		callback : function () {
			i18nPage();
		}
	});

	if (systemInformation != null ) {
		sessvars.footer = jQuery.i18n.prop('info.powered.by') + " "  + systemInformation.productName + " " + systemInformation.releaseName + " " + " [" + systemInformation.productVersion + " - " + version + "] " + jQuery.i18n.prop('info.licenced.to') + " " + (typeof systemInformation.licenseCompanyName == "undefined" || systemInformation.licenseCompanyName == "" || systemInformation.licenseCompanyName == null ? jQuery.i18n.prop('info.no.licence') : systemInformation.licenseCompanyName);
		$('#footerVersion').text(sessvars.footer);
		$('#currentBranch').html(sessvars.branchName);
		accessRights[2] = 1;
		console.log ( "Operations panel version: "  +version + " on " + systemInformation.productName + " " + systemInformation.releaseName + " " + " [" + systemInformation.productVersion + "] ");
	}

	if ( accessRights[1] == 1 && accessRights[2] == 1  ) {
		if (currentSettings.usePersonalSlaSettings === true){ 
			slaSettingsVar = 'ops_e_' + oasUser;
		}
		var appSet = restService.get('/rest/entrypoint/variables/'+ slaSettingsVar);
		
		if (appSet != undefined) {
			var x = (appSet.value).split(",");
			appSettings = [];
			for (i = 0 ; i < x.length ; i++) {
				appSettings.push(x[i]); ;
			}
			for ( i = appSettings.length; i < defaultAppSettings.length; i++){
				appSettings.push(""+defaultAppSettings[i]);
			}
			gaugesSettings = appSettings;
		} else {
			appSettings = defaultAppSettings;
			gaugesSettings = appSettings;
		}
		initGraphs();
		initNps();
		getBranches();
		settingsSet = true;
	} else {
		showAccessInvalid();
	}

	
	if(currentSettings.regionView != 'regionSeparated') {
		$('#regionTab').css('display', 'none');
		$('#regionBranchTab').css('display', 'none');
		$('#regionApptTab').css('display', 'none');
		$('#queueServicePointRegionTab').css('display', 'none');
		$('#queueRegionTab').css('display', 'none');
		$('#servicePointRegionTab').css('display', 'none');
		$('#npsRegionTab').css('display', 'none');
		$('#webcamRegionTab').css('display', 'none');
	}
	
	addToolTipsToTables();
	setTableConfig();
	
	if (debugId > 0){
		util.logVariableToConsole (debugId, debugVars);
	}
 }
 
function setTableColumns(){
	var row = document.getElementById("branchView").rows[0];
	setRegionBranchTableColumns();
	setQueueTableColumns();
	setServicePointTableColumns();
	setQueueServicePointTableColumns();
	setSearchTicketTableColumns();
 }
 
function setSearchTicketTableColumns() {
	if (!currentSettings.showTicketListNotes) {
		deleteColumn('searchTickets','searchNotes');
		deleteTd('searchTickets','foundNotes');
	}
	if (!currentSettings.showTicketListAppointmentTime) {
		deleteColumn('searchTickets','searchAppointTime');
		deleteTd('searchTickets','foundAppointTime');
	}
	if (!currentSettings.showTicketListWt) {
		deleteColumn('searchTickets','searchWaitingTime');
		deleteTd('searchTickets','foundWaitingTime');
	}
	if (!currentSettings.showTicketListCustomer) {
		deleteColumn('searchTickets','searchCustomerName');
		deleteTd('searchTickets','foundCustomerName');
	}
} 
 
function deleteColumn(table,column) {
	row = document.getElementById(table).rows[0];
	for (var a = 0 ; a < row.cells.length; a++){
		if (row.cells[a].id === column){
			row.deleteCell(a);
		}
	}
}	
	
function deleteTd(table,column) {
	row = document.getElementById(table).rows[1];
	for (var a = 0 ; a < row.cells.length; a++){
		if (row.cells[a].id === column){
			row.deleteCell(a);
		}
	} 
 }
 
function getAdminRights(val){
	displayAdminSettings(false);
	var opsAdmin = false;
	var adminConnector = false;
	if (val.roles !== undefined && val.roles !== null){
		for ( i = 0; i < val.roles.length; i++) {
			if (val.roles[i] == "Enterprise Opspanel Admin" && isExperience == false){
				opsAdmin = true;
			}
		}
	}

	for ( i = 0; i < val.modules.length; i++) {
		if ( val.modules[i] == "opspanelenterpriseadmin" && isExperience == false ) { 
			opsAdmin = true;
		}
		
		if (val.modules[i] == "admin" || val.modules[i] == "adminConnect" || val.modules[i] == "clientadmin" ){
			adminConnector = true;
		}
	}
	
	if ( opsAdmin == true ) {
		accessRights[5] = 1;	
	}
	
	if (val.userName == "superadmin" || (opsAdmin == true && adminConnector == true) || (isExperience == true && adminConnector == true) ) {
		userHasAdmin = true;
		accessRights[5] = 1;
	}
	
	if (accessRights[5] === 1){
		displayAdminSettings(true);
	} 
 }

function showAccessInvalid() {
	util.showModal('accessRightsPage');
	html= "<table><tr><td><br>" + jQuery.i18n.prop('no.access.part.one') + "</td></tr>";
	html += "<tr><td>&nbsp;&nbsp;&nbsp;-&nbsp;" + jQuery.i18n.prop('no.access.to.entrypoint')  + "</td></tr>";
	html += "<tr><td>&nbsp;&nbsp;&nbsp;-&nbsp;" + jQuery.i18n.prop('no.access.to.managementinformation')  + "</td></tr>";
	html+="<tr><td><br>" + jQuery.i18n.prop('no.access.part.two') + "</td></tr>";
	html += "<tr><td></td></tr>";

	if (accessRights[1] == 0) {
		html += "<tr><td> <img src='images/connector_access_ep.jpg'></td></tr>";
	}
	if (accessRights[2] == 0) {
		html += "<tr><td> <img src='images/connector_access_mi.jpg'></td></tr>";
	}
	html +="<tr><td>&nbsp;</td></tr></table>";
	$("#accessRightsContent").html(html);
 }

function updateUI() {
	$('#userName').text(sessvars.userName);
	if(typeof sessvars.footer == "undefined" || sessvars.footer== "" || null == sessvars.footer) {
		var systemInformation =  restService.get('/rest/managementinformation/v2/systemInformation');
		sessvars.footer = jQuery.i18n.prop('info.powered.by') + " "  + systemInformation.productName + " " + systemInformation.releaseName + " " + " [" + systemInformation.productVersion + " - " + version + "] " + jQuery.i18n.prop('info.licenced.to') + " " + (typeof systemInformation.licenseCompanyName == "undefined" || systemInformation.licenseCompanyName == "" || systemInformation.licenseCompanyName == null ? jQuery.i18n.prop('info.no.licence') : systemInformation.licenseCompanyName);
	}
	$('#footerVersion').text(sessvars.footer);
	$('#currentBranch').html(sessvars.branchName);
 }

function getRegionForBranch(brId) {
	tempReg = "--";
	for (var r = 0; r < regionTreeSettings.length; r++)  {
		for ( var i = 0; i < currentSettings.showRegionName.length; i++){
			var rootRegion = regionTreeSettings[r].fullName
			if ( regionTreeSettings[r].fullName.indexOf("/") > -1) {
				rootRegion =  regionTreeSettings[r].fullName.substring(0, regionTreeSettings[r].fullName.indexOf("/"));
			}
			
			if (rootRegion == currentSettings.showRegionName[i]) {
				idsInTree = regionTreeSettings[r].branchIds;
				for (var j = 0; j < idsInTree.length; j++){
					if (idsInTree[j] === parseInt(brId,10) && tempReg == "--"){
						tempReg = regionTreeSettings[r].name
					}
				}
			}
		}
	}
	return tempReg;
}

function getBranches() {
	queryString = window.location.search;
	if (queryString.indexOf("settingsadmin") > -1) {
		accessRights[5] = 1;
		displayAdminSettings(true);
		showAdminSettings();
	}
	branches = restService.get('/rest/entrypoint/branches');
	for (var a = 0; a < branches.length; a++){
		branches[a].region = "--";
		branches[a].branchActive = true;
		branchesToHide = currentSettings.hideBranchesByIdSetting.split(",")
		for (var h = 0; h < branchesToHide.length; h++){
			if ( parseInt(branchesToHide[h], 10) == parseInt(branches[a].id, 10)) {
				branches[a].branchActive = false;
			}
		}
		
		if (currentSettings.regionView != 'noRegion') {
			branches[a].region = getRegionForBranch(branches[a].id);
			if (branches[a].region == "--") {
				branches[a].branchActive = false;
			}
		} 
	}

	if( currentSettings.hideInActiveBranches === true){
		for (var a = 0; a < branches.length; a++){
			for(var aa in currentSettings.inactiveBranches){
				if(parseInt(currentSettings.inactiveBranches[aa] , 10) == parseInt(branches[a].id, 10)){
					branches[a].branchActive = false;
				}
			}
		}
	}

	branchInfo = new Array();
	for (var br = 0; br < branches.length; br++){
		if (branches[br].branchActive === true) {
			branchInfo.push(branches[br]);
		}
	}

	if (currentSettings.regionView != 'noRegion'){
		branchInfo.sort( function( a, b ) {
				return ( a.region.localeCompare( b.region )|| a.name.localeCompare( b.name ));
			} 
		); 
	} else {
		branchInfo.sort( function( a, b ) {
				return ( a.name > b.name ) ? 1 : ( ( b.name > a.name ) ? -1 : 0);
			} 
		); 	
	}

	userMapping = util.getGlobalVariable('opsusermapping_'+ oasUser);
	if (userMapping !== null && userMapping != undefined) {
		userMapping = JSON.parse(userMapping.value)
		if (userMapping.queueNames !== null && userMapping.queueNames != undefined) {
			showQueuesByName = userMapping.queueNames;
		}
	} else {
		 restService.setGlobalVariable('opsusermapping_'+ oasUser, '{"graphView":1,"tableDensity":0,"visibilitySchema":0}');
		 userMapping = JSON.parse('{"graphView":1,"tableDensity":0,"visibilitySchema":0}');
	}

	if (userMapping.graphView == undefined) {
		userMapping.graphView = 1;
	}
	
	if (userMapping.tableDensity == undefined) {
		userMapping.tableDensity = 0;
	}

	if (userMapping.visibilityTheme == undefined) {
		userMapping.visibilityTheme = 0;
		saveUserMapping();
	} 
	updateVisibilityTheme(true);
	updateTableDensity(userMapping.tableDensity);
	

	if ((branches.length === 1 || branchInfo.length === 1) && currentSettings.showTabIfBranchEqualOne !== 0) {
		if (branchInfo.length === 1 ) {
			branchGetInfo(branchInfo[0].id );
			selectedBranchId = branchInfo[0].id
		} else {
			branchGetInfo(branches[0].id );
			selectedBranchId = branches[0].id
		}
		
		var tabToLoad = currentSettings.showTabIfBranchEqualOne;
		if (tabToLoad == 1 || (tabToLoad == 2 && currentSettings.servicePointSummaryLocation == "spTab") 
				|| (tabToLoad == 7 && currentSettings.queueServicePointSummaryLocation == "queueSpTab") ) {
			loadData(currentSettings.showTabIfBranchEqualOne);
		} else {
			checkTabUrl();
		}
	} else {
		checkTabUrl();
	}

	if (parseInt(userMapping.graphView,10) == 0) {
		hideGraphContainer();
	} else {
		$("#showButton").hide();
	}
	
	loadSearchBranchList();	
}

function checkTabUrl() {
	var urlParams = new URLSearchParams(window.location.search);
	var view =urlParams.get('summary');
	var urlBranchId = parseInt(urlParams.get('branchId'),10);
	var tabToLoad = 0;
	var branchValid = false;
	var urlBranchName = "";
	for (var a = 0; a < branches.length; a++){
		if (branches[a].id == urlBranchId && branches[a].branchActive == true){
			branchValid = true;
			urlBranchName = branches[a].name;
		}
	}

	if (view == 'queue') {
		tabToLoad = 1;
	}
	if (view == 'servicepoint' && currentSettings.servicePointSummaryLocation == "spTab") {
		tabToLoad = 2;
	}
	if (view == 'queueservicepoint' && currentSettings.queueServicePointSummaryLocation == "queueSpTab") {
		tabToLoad = 7;
	}

	if (tabToLoad > 0 && branchValid == true) {
		
		selectedBranchId = urlBranchId;
		branchGetInfo(urlBranchId);
		selectedBranchName = urlBranchName;
		loadData (tabToLoad);
	} else {
		loadData();
	}
}

function loadSearchBranchList(){
	var br = restService.get('/rest/entrypoint/branches');
	br.sort( function( a, b ) {
			return ( a.name > b.name ) ? 1 : ( ( b.name > a.name ) ? -1 : 0);
		} 
	); 

	var selectBr = document.getElementById( "branchesSearch" );

	var opt = document.createElement( "option" );
	opt.value = "-1";
	opt.text = jQuery.i18n.prop( 'select.select.branch' );
	try {
		selectBr.add( opt, null ); // standards compliant; doesn't work in IE
	} catch(ex) {
		selectBr.add( opt ); // IE only
	}
	
	if( br.length > 0 ) {
		// it's an array (more than one branch)
		for( i = 0; i < br.length; i++ ) {
			var opt = document.createElement( "option" );
			opt.value = br[i].id;
			opt.text = br[i].name;
			try {
				selectBr.add( opt, null ); // standards compliant; doesn't work in IE
			} catch(ex) {
				selectBr.add( opt ); // IE only
			}
		}
	}
	
	$("#searchFormTitle").empty();
    $("#searchFormTitle").html(
       '<a href=\"#\" class=\"closeButton\" onclick="javascript:util.hideModal(\'searchTicketPage\');util.hideModal(\'transferToQueueDialogue\');"></a>' +
       jQuery.i18n.prop('search.form.title'));
	loadQueueBranchList(br);
}

function loadQueueBranchList(br){
	var selectBrQueue = document.getElementById( "branchesQueueGroup" );

	var opt = document.createElement( "option" );
	opt.value = "-1";
	opt.text = jQuery.i18n.prop( 'select.select.branch' );

	try {
		selectBrQueue.add( opt, null ); // standards compliant; doesn't work in IE
	} catch(ex) {
		selectBrQueue.add( opt ); // IE only
	}
	
	if( br.length > 0 ) {
		// it's an array (more than one branch)
		for( i = 0; i < br.length; i++ ) {
			var opt = document.createElement( "option" );
			opt.value = br[i].id;
			opt.text = br[i].name;
			try {
				selectBrQueue.add( opt, null ); // standards compliant; doesn't work in IE
			} catch(ex) {
				selectBrQueue.add( opt ); // IE only
			}
		}
	}
}

function loadData(val,reg) {
	if (val == undefined){
		val = (currentSettings.regionView != 'regionSeparated' ? 0 : 6);
	}
	if((selectedView == 6 && val != 0) || val == 6) {
		selectedRegion = "";
		buildRegionOverview(val);
	}
	if ( selectedView <= 0 || val <= 0 ) {
		buildBranchOverview(val,reg);
	}
	if ( selectedView == 10 || (val == 1 && selectedView > 0)) {
		branchQueueOverview( selectedBranchId, selectedBranchName);
	}
	if (currentSettings.servicePointSummaryLocation == 'spTab' && (selectedView == 20 || (val == 2 && selectedView > 0))) {
		branchServicePointOverview( selectedBranchId, selectedBranchName);
	}
	if (currentSettings.npsEnabled &&( selectedView == 30 || (val == 3 && selectedView > 0))) {
		branchNpsOverview( selectedBranchId, selectedBranchName);
	}
	if (currentSettings.webCamEnabled &&( selectedView == 40 || (val == 4 && selectedView > 0))) {
		branchWebCamOverview( selectedBranchId, selectedBranchName);
	}
	
	if ( selectedView == 70 || (val == 7 && selectedView > 0)) {
		branchQueueSpOverview( selectedBranchId, selectedBranchName);
	}
	if ( selectedView == 50 || val == 5 ) {
		buildBranchHistory( selectedBranchId, selectedBranchName );
	}
	clearTimeout(updateInterval);
	loadDataReg = reg;
	loadDataVal = val;
	updateInterval = setTimeout(function(){loadData(val,reg)},refreshInterval*1000);
}

function buildBranchHistory(id) {

	var name = "";
	for (var i = 0; i < branchInfo.length; i++) {
			if (branchInfo[i].id == id) {
				name = branchInfo[i].name;
			}
	}

	if (selectedView != 5) {
		showPanel(5, id, name);
	}
	$("#historyHeader").html(name);
	varTemp = util.todayYYYYMMDD();
	for (j=0; j < variableAll.length; j++ ) {
		// finding stored global var for this branch
		if ( variableAll[j].name == 'branchHistoryStatInfo_' + id ) {
				varTemp = variableAll[j].value;
		}
	}
	var s = new Array();
	var t = varTemp.split("@");
	var u;
	var noOfTicks = currentSettings.historyShowTime/5;
	var emptyTicks = noOfTicks + 1 - t.length
	var firstTick = 1;
	var interval = 5;
	var z = getFirstTickHHMM(currentSettings.historyShowTime, interval);
	var x = parseInt(z/100 , 10);
	var y = parseInt (z%100 , 10);

	if (parseInt(t[0],10) != parseInt(util.todayYYYYMMDD(),10)) {
		t=[util.todayYYYYMMDD()]
	}

	for (var a = 0; a < emptyTicks && ((x * 100) + y ) < util.nowHHMM(0); a++ ) {

		z = ((x * 100) + y ) + "";
		u = [z ,"0","0", "0", x, y];
		if (y > 50) {
			x += 1;
			y = 0;

		} else {
			y+= interval;
		}

		timeInList = false;
		for (var b = 1; b < t.length; b++) {
			v = t[b].split(",");
			if (parseInt(v[0],10) == parseInt(z,10)){
				timeInList=true;	// to avoid two times in the same list
			}
		}
		if (!timeInList){
			s.push(u);
		}
	}

	if (t.length > noOfTicks) {
		firstTick = t.length - noOfTicks;
	}

	for (var a = firstTick; a < t.length; a++ ) {
		u = t[a].split(",");
		u.push(parseInt(u[0]/100 , 10));
		u.push(u[0]%100);
		s.push(u);
	}
	graphHistory(s);
}

function setHistoryLength() {
	currentSettings.historyShowTime = parseInt($("#historyLength").val(),10);
	loadData();
}

function getFirstTickHHMM(ln, n) {
	var date = new Date();
	var hours = parseInt(date.getHours(), 10);
	var minutes = parseInt(date.getMinutes(), 10);
	var totMin = (hours*60) + minutes;
	var firstMin = totMin - ln + n;
	firstMin = firstMin - (firstMin%n); // round down to the first interval.
	hours = parseInt(firstMin/60 , 10);
	minutes = parseInt (firstMin%60 , 10);
	if (minutes > 15) {
		if (minutes > 30) {
			if (minutes > 45) {
				minutes = 45;
			} else {
				minutes = 30;
			}
		} else {
			minutes = 15;
		}
	} else {
		minutes = 0;
	}


	var formatted = ( hours * 100 ) + minutes;
	if (formatted < currentSettings.historyFirstTime){
		formatted = currentSettings.historyFirstTime;
	}
	return formatted;
}

function drawGraphs(id) {
// calculate totals

	if (currentSettings.gauge1 == "avgWt") {
		gauge1Val = getAvg(graphData.wtTot, graphData.waitTot);
	} 
	if (currentSettings.gauge1 == "maxWt") {
		gauge1Val = parseInt(graphData.maxWt/60,10);
	} 
	if (currentSettings.gauge1 == "avgWtToday") {
		gauge1Val = getAvg(graphData.wtTotToday, graphData.waitTotToday);
	} 
	if (currentSettings.gauge1 == "maxWtToday") {
		gauge1Val = parseInt(graphData.maxWtToday/60,10);
	} 
	
	if (currentSettings.gauge2 == "avgTrt") {
		gauge2Val = getAvg(graphData.trtTot , graphData.servedTot);
	} else {
		gauge2Val = parseInt(graphData.maxTrt/60,10);
	}
	if ( graphData.openTot > 0) {
		wtOpenTot = parseInt(graphData.waitTot / graphData.openTot, 10);
	} else {
		wtOpenTot = 0;
	}

// check if graph has changed
	if (graphData.wtBelowTot != totals[0] || graphData.wtAboveTot != totals[1] || graphData.servedTot != totals[2] 
		|| graphData.waitTot != totals[3] || graphData.servingTot != totals[4] || needRedraw == true ) {
		totals=[graphData.wtBelowTot,graphData.wtAboveTot,graphData.servedTot,graphData.waitTot,graphData.servingTot];
		needRedraw = false;
		graphWaiting(totals);
	}
// refresh gauges
	g1.refresh(gauge1Val);
	g2.refresh(gauge2Val);
	if (currentSettings.gauge3 === "openCounter") {
		if (gauge3Max == 0) {
			gauge3Max = 10;
		}
		reinitGauge3(parseInt(appSettings[6] * gauge3Max/100,10),parseInt(appSettings[7] * gauge3Max/100,10),gauge3Max);
		g3.refresh(graphData.openTot);
	}
	
	if (currentSettings.gauge3 === "waitOpenCounter") {
		g3.refresh(wtOpenTot);
	}
	if (currentSettings.gauge3 === "openCounterAvg") {
		var branchCount = 1;
		if (selectedView <= 0) {
			branchCount = branchInfo.length;
		}
		reinitGauge3(parseInt(appSettings[6]),parseInt(appSettings[7]),gauge3Max);
		g3.refresh(Math.round(graphData.openTot/branchCount));
	}
	if (currentSettings.showExpressiaGraph){
		getExpressiaData(id);
	}
}

function getGaugelevel(val , max){
	return parseInt(val * max / 100,10);
}

function resetGraphTotals () {
	totBranches = 0;
	onlineBranches = 0;
	noShowTot = 0;
	awtTot = 0;
	atrtTot = 0;
	wtOpenTot= 0;
	maxWtTot = 0;
	queueGroupGraphData ={"servedTot": 0, "wtBelowTot" : 0, "wtAboveTot" : 0, "waitTot" : 0, "wtTot" : 0, "trtTot" : 0, "openTot" : 0, "servingTot" : 0, "maxWt" : 0, "wtTotToday" : 0, "waitTotToday" :0, "maxTrt" : 0, "maxWtToday" : 0 };
	graphData ={"servedTot": 0, "wtBelowTot" : 0, "wtAboveTot" : 0, "waitTot" : 0, "wtTot" : 0, "trtTot" : 0, "openTot" : 0, "servingTot" : 0, "maxWt" : 0, "wtTotToday" : 0, "waitTotToday" :0, "maxTrt" : 0, "maxWtToday" : 0 };
}

function getAvg(val, div) {
	var avg = 0;
	if ( parseInt(div, 10) > 0) {
		avg = parseInt(( parseInt(val, 10) / parseInt(div, 10) )/60, 10);
	}
	return avg;
}

function getEntryPoint(id){
	var ep = restService.get("/rest/entrypoint/branches/" + id +"/entryPoints/deviceTypes/SW_VISION15_TOUCH");
	if (ep !== undefined && ep !== null) {
		if (ep.length > 0){
			entrypointId = ep[0].id;
		} else {
			ep = restService.get("/rest/entrypoint/branches/" + id +"/entryPoints/deviceTypes/SW_RECEPTION");
			
			if (ep.length > 0){
				entrypointId = ep[0].id;
			} else {
				ep = restService.get("/rest/entrypoint/branches/" + id +"/entryPoints/deviceTypes/TP311X");
				entrypointId = ep[0].id;
			}
		}
	}
}

function showPanel(val, id, name){
	resetGraphTotals ();
	selectedView = val;
	if ( selectedBranchId != entryPointBranchId && id > 0) {
		//find an entry point
		getEntryPoint(id);
		entryPointBranchId = selectedBranchId
	}
	selectedBranchId = id;
	for (var i = 0; i < branches.length; i++) {
		if (branches[i].id == id) {
			name = branches[i].name;
		}
	}
	selectedBranchName = name;

	$("#webcamView").find("tr:gt(0)").remove();
	$('#queuePanel').hide();
	$('#queueSpPanel').hide();
	$('#servicepointPanel').hide();
	$('#npsPanel').hide();
	$('#webcamPanel').hide();
	$('#appointPanel').hide();
	$('#branchPanel').hide();
	$('#regionPanel').hide();
	$('#historyPanel').hide();
	$("#mainDatacontainer").scrollTop( 0 );
	if (val == 5) {
		$('#branchPanel').hide();
		$('#graphPanel').hide();
		$('#historyPanel').css("visibility","visible");
		$('#historyPanel').css("display","")

	} else {
		$('#historyPanel').hide();
		$('#graphPanel').css("visibility","visible");
		$('#graphPanel').css("display","")

		if (val == 0 || val == -1 || val == 6) {
			$('#graphHeader').text(jQuery.i18n.prop('graph.header.enterprise'));
			if (val == 0) {
				$('#branchPanel').css("visibility","visible");
				$('#branchPanel').css("display","")
			} else if (val == 6) {
				$('#regionPanel').show()
				$('#regionPanel').css("visibility","visible");
				$('#regionPanel').css("display","")
			} else {
				$('#appointPanel').css("visibility","visible");
				$('#appointPanel').css("display","")
			}
		} else {
			$('#graphHeader').text(jQuery.i18n.prop('graph.header.branch')+ " " + name);
			$('#onlineBranchPerc').text(" ");

			if (val == 1) {
				$('#queuePanel').css("visibility","visible");
				$('#queuePanel').css("display","");
			}
			if (val == 2) {
				$('#servicepointPanel').css("visibility","visible");
				$('#servicepointPanel').css("display","");
			}
			if (val == 3) {
				$('#npsPanel').css("visibility","visible");
				$('#npsPanel').css("display","");
			}
			if (val == 4) {
				$('#webcamPanel').css("visibility","visible");
				$('#webcamPanel').css("display","");
			}
			if (val == 7) {
				$('#queueSpPanel').css("visibility","visible");
				$('#queueSpPanel').css("display","");
			}
		}
	}
}

function getTypeName(type,queueId){
	name = "";
	if (type == "queue") {
		for (var q = 0; q < queueInfo.length; q++) {
			if (queueId == queueInfo[q].id){
				name = queueInfo[q].name;
			}
		}
	}
	if (type === "sppool") {
		for (var q = 0; q < servicepointInfo.length; q++) {
			if (queueId == parseInt(servicepointInfo[q].id/100000000000, 10) ){
				name = servicepointInfo[q].name
			}
		}
	}
	if (type === "staffpool") {
		for (var q = 0; q < servicepointInfo.length; q++) {
			if (queueId == servicepointInfo[q].staffId){
				name = servicepointInfo[q].staffFullName
			}
		}
	}
	return name;
}

 function showSearch() {
 	$('#foundTicketId').html("");
	$('#foundActions').html("");
	$('#foundWaitingTime').html("");
	$('#foundCustomerName').html("");
	$("#searchTicketInput").val("");
	$('#foundService').html("");
	$('#foundAppointTime').html("");
	$('#foundNotes').html("");
	$('#foundQueue').html("");
    util.showModal('searchTicketPage');
}

// -------------------------------------------------------------------
// Store variable value into the branch variable for the selected branch
// -------------------------------------------------------------------

function setGlobalVariable(variable,val) {
	restService.setGlobalVariable(variable, val);
}

function setBranchVariable(id,variable,val) {
	restService.setBranchVariable(id,variable,val);
}

function getBranchVariable(id,variable) {
	resource = '/rest/entrypoint/branches/' + id + '/variables/'+ variable;
	var x=restService.get(resource);
	return x;
}

function handleHome() {
	sessvars.$.clearMem();
    window.location.href = portalUrl;
}

function handleLogout() {
	try {
        sessvars.$.clearMem();
        restService.put('/rest/entrypoint/logout');
        window.location.href = "/faces/pages/common/logout.xhtml";
    } catch(ex) {
        util.showError(jQuery.i18n.prop('error.logout.qes.failed') + ': ' + ex);
        return false;
    }
}

function showDisabledModal () {
	$("#disabledBranchModal").html(
		'<a href=\"#\" class=\"closeButton\" onclick="javascript:util.hideModal(\'disabledPage\')"></a>' +
			jQuery.i18n.prop('disabled.page.title'));
	$("#disabledBranchBody").html(jQuery.i18n.prop('disabled.page.body'));
		util.showModal('disabledPage');
}
