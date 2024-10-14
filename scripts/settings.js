/*
	ops_e_settings
	{\"refresh\":null,\"gauge3\":\"waitOpenCounter\",\"usePersonalSlaSettings\":true,\"allowChangeSlaSettings\":false,\"showTabIfBranchEqualOne\":1,\"defaultColumnSortingOrder\":1,\"defaultColumnQueueSortingOrder\":1,	\"showAppointments\":false,\"showExpressiaGraph\":false,\"npsEnabled\":false,\"webCamEnabled\":false,\"webCamFrameHeight\":\"600px\",\"webCamFrameWidth\":\"1000px\",\"showOldData\":false,\"timeBeforeOldData\":120,
	\"onlineTime\":5,\"showAppointWt\":true,\"buttonRemoveFromQueueEnabled\":true,\"buttonTransferFromQueueEnabled\":true,\"buttonTransferFirstEnabled\":true,\"buttonTransferLastEnabled\":true,	\"buttonTransferSortEnabled\":true,\"buttonTransferServicepointAlways\":true,\"regionView\":\"noRegion\",\"showRegionName\":[\"Region I\",\"Region II\",\"Region III\",\"Region IV\",\"Remote Serving\"],
	\"branchDefaultColumnSort\":\"branchHeaderWaiting\",\"hideBranchesByIdSetting\":\"\",\"hideInActiveBranches\":false,\"showPoolWt\":false,\"showBranchIdColumn\":true,\"showBranchServedAboveSl\":true,	\"showBranchNoShow\":false,\"showNpsOnBranchTab\":false,\"showBranchWaitingAboveSLNow\":false,\"showBranchAvgWt\":true,\"showBranchMaxWt\":false,\"showBranchWaitedAboveSl\":false,\"showBranchAvgWtToday\":true,
	\"showBranchMaxWtToday\":false,\"showBranchAvgTrt\":true,\"showMaxTrt\":false,\"showBranchBelowSlColumn\":false,\"showBranchTickets\":true,\"showBranchOpen\":true,\"showBranchClosed\":true,\"showBranchUpdated\":true,	\"showBranchStatus\":true,\"historyEnabled\":true,\"historyShowTime\":120,\"historyFirstTime\":0,\"historySL\":20,\"historyMinuteMax\":30,\"showBranchTotals\":false,\"showBranchDelayed\":false,
	\"queueDefaultColumnSort\":\"queueHeaderWaiting\",\"orderTicketsInQueue\":1,\"queueGroupingEnabled\":false,\"queueGroupingExpanded\":false,\"queueGroupingGauges\":false,\"queueGroupingSetting\":[{\"branchId\":3,	\"groups\":[{\"groupName\":\"Appointment\",\"queueIds\":[7,9,11,13]},{\"groupName\":\"Arabic\",\"queueIds\":[18,19]},{\"groupName\":\"Polish\",\"queueIds\":[16,17]},{\"groupName\":\"Russian\",\"queueIds\":[15,14]},
	{\"groupName\":\"Walkin\",\"queueIds\":[6,8,10,12]}]},{\"branchId\":2,\"groups\":[{\"groupName\":\"Appointments\",\"queueIds\":[22,23,24,25,44]},{\"groupName\":\"Englis\",\"queueIds\":[37,39,41,43,46]},{\"groupName\":\"Vip\",\"queueIds\":[]},{\"groupName\":\"Walkin\",\"queueIds\":[1,2,3,4,5]}]}],\"showQueueIdColumn\":true,\"queueShowServed\":true,\"showQueueServedAboveSl\":false,\"queueShowRecycled\":false,
	\"queueShowServices\":false,\"queueShowTransactions\":false,\"showQueueNoShow\":true,\"showQueueWaitingAboveSLNow\":false,\"showRealWt\":true,\"showQueueDelayed\":false,\"showEstWt\":true,\"showQueueMaxWt\":false,\"showQueueWaitedAboveSl\":true,\"showQueueAvgWtToday\":true,\"showQueueMaxWtToday\":false,\"showQueueMaxTrtColumn\":false,\"showQueueBelowSlColumn\":false,\"showAvgWt\":true,\"showQueueAvgTrt\":true,\"showQueueOpen\":true,
	\"showQueueTotals\":false,\"servicePointSummaryLocation\":\"spTab\",\"showSpIdColumn\":true,\"showServicePointStatusSp\":false,\"showServicePointStaff\":true,\"showLoginLogout\":false,\"showServicePointService\":true,\"showServicePointQueue\":false,\"showServicePointCustomer\":false,\"showWaitTime\":false,\"showQueueTrtTime\":true,\"showServicePointExpressia\":false,\"showUserAvgTrt\":false,\"showUserMaxTrt\":false,\"userServed\":false,
	\"showUserServedAboveSl\":false,\"showServicePointWorkProfile\":true,\"userForceLogout\":true,\"showServicepointTotals\":true,\"queueServicePointSummaryLocation\":\"disabled\",\"queueQueueDefaultColumnSort\":\"queueQueueHeaderWaiting\",\"showQueueQueueIdColumn\":false,\"showQueueSpServed\":false,\"showQueueSpServedAboveSl\":false,\"showQueueSpRecycled\":false,\"showQueueSpServices\":false,
	\"showQueueSpTransactions\":false,\"showQueueSpNoShow\":false,\"showQueueSpWaitingAboveSLNow\":false,\"showQueueSpRealWt\":false,\"showQueueQueueDelayed\":false,\"showQueueSpEstWt\":false,\"showQueueSpMaxWt\":false,\"showQueueSpWaitedAboveSl\":false,\"showQueueSpAvgWtToday\":false,\"showQueueSpMaxWtToday\":false,\"showQueueSpMaxTrtColumn\":false,\"showQueueSpBelowSlColumn\":false,\"showQueueSpAvgWt\":true,\"showQueueSpAvgTrt\":false,
	\"showQueueSpOpen\":true,\"showQueueSpTotals\":false,\"showQueueSpIdColumn\":false,\"showQueueSpStatusSp\":false,\"showQueueSpLoginLogout\":false,\"showQueueSpServicePointService\":false,\"showQueueSpServicePointQueue\":false,\"showQueueSpCustomer\":false,\"showQueueSpWaitTime\":false,\"showQueueSpTrtTime\":true,\"showQueueSpExpressia\":false,\"showQueueSpUserAvgTrt\":false,\"showQueueSpUserMaxTrt\":false,
	\"showQueueSpUserServed\":false,\"showQueueSpUserServedAboveSl\":false,\"showQueueSpWorkProfile\":true,\"showQueueSpUserForceLogout\":true,\"showQueueSpServicepointTotals\":false}
	
	ops_region_settings

*/
var loadTry = 0;
var loadError = "";
var refreshInterval = 60;
var minRefreshTime = 15;
var defaultAppSettings = [10,15,20,15,20,25,20,25,30,25,50,0,10,15,20];
var gaugesSettings ;
var settingsRetrieveError = false;
var slaSettingsVar = "ops_e_default";
var queueData;
var grFound;
var npsDataRefresh = 60;
var hideBranchesById = [];
var restVersion = 2;
var currentSettings = {};
var isExperience = false;
var regionTreeSettings = {};
var settingObj = {}
var sortUsNumberFormat = true;
var tempSettings ={};
	tempSettings.columnOrderBranch = [];
	tempSettings.columnOrderQueue = [];
	tempSettings.columnOrderQueueSpQueue = [];
	tempSettings.columnOrderQueueSpSp = [];
	tempSettings.columnOrderSp = [];
var firstRun = true;

// general settings
	//currentSettings.theme = "black";
	currentSettings.inactiveBranches = [];
	currentSettings.refresh = 60;
	currentSettings.gauge1 = "avgWt";
	currentSettings.gauge2 = "avgTrt";
	currentSettings.gauge3 = "waitOpenCounter";
	currentSettings.usePersonalSlaSettings = true;
	currentSettings.allowChangeSlaSettings = false;
	currentSettings.showTabIfBranchEqualOne = 0;			// tab to show when only 1 branch present 0 = summary, 1 = queue, 2 = service point
	currentSettings.defaultColumnSortingOrder = 0 			//  ascending = 0, descending = 1 
	currentSettings.defaultColumnQueueSortingOrder = 0 			//  ascending = 0, descending = 1 
	currentSettings.defaultColumnSpSortingOrder = 0 			//  ascending = 0, descending = 1 
	currentSettings.showAppointments = false;				// enable/disable appointments tab
	currentSettings.showExpressiaGraph = false;				// show a graph about the expressia satisfaction
	currentSettings.npsEnabled = false;						// enable/disable nps tab
	currentSettings.webCamEnabled = false;					// enable/disable webcam tab
	currentSettings.webCamFrameHeight = "600px"				// height for the webcam iframe
	currentSettings.webCamFrameWidth = "1000px"				// width for the webcam iframe

	currentSettings.showOldData = false;					// if set to false, timeBeforeOldData will be used to caculate old data
	currentSettings.timeBeforeOldData = 120;				// if data older than x minutes the info will not be shown
	currentSettings.onlineTime = 5;							// if data older then onlineTime, the led will turn red	
	
	currentSettings.showAppointWt = true;	                // set tot true if the waiting time should be calculated against the appointment time for appointment queues
	var showAppointNegativeWt = true;	        // set tot true if negative waiting time should be calculated against the appointment time when appointment arrives to early	
	currentSettings.buttonRemoveFromQueueEnabled = true;	// Enable/disable visits to be removed
	currentSettings.buttonTransferFromQueueEnabled = true;	// Enable/disable transfer for visits
	currentSettings.buttonTransferFirstEnabled = true;		// Enable/disable transfer to first position in the queue
	currentSettings.buttonTransferLastEnabled = true;		// Enable/disable transfer to last position in the queue
	currentSettings.buttonTransferSortEnabled = true;		// Enable/disable transfer based on sorted by arrival time
	currentSettings.buttonTransferServicepointAlways = true; // Enable to allow transfer to closed service points
	currentSettings.barCurrentlyServed = false;
	currentSettings.enableToolTipsOnHeaders = true;
	currentSettings.numberFormat = "fr";
	//currentSettings.timeFormat = "HH:mm";					// can be HH:mm, hh:mm a, H:mm, h:mm a

	currentSettings.columnOrderBranch =  [];
	currentSettings.columnOrderQueue = [];
	currentSettings.columnOrderQueueSpQueue = [];
	currentSettings.columnOrderQueueSpSp = [];
	currentSettings.columnOrderSp = [];
	
// ticket list
	currentSettings.showTicketListNotes = true;				// show noted
	currentSettings.showTicketListAppointmentTime = true;	// show appointment time
	currentSettings.showTicketListWt = true;					// show waiting time
	currentSettings.showTicketListCustomer = true;			// show customer
	
// sla column	
	currentSettings.showAvgWtSla = true;
	currentSettings.showMaxWtSla = false;
	currentSettings.showAvgWtTodaySla = false;
	currentSettings.showMaxWtTodaySla = false;
	currentSettings.showAvgTrtSla = true;
	currentSettings.showMaxTrtSla = false;
	currentSettings.showTicketTrtSla = true;
	currentSettings.showOpenCloseSla = false;
	
// branch settings
	currentSettings.regionView = 'noRegion';
	currentSettings.showRegionName = "";
	currentSettings.branchDefaultColumnSort = 'branchHeaderId';
	currentSettings.hideBranchesByIdSetting = "";
	currentSettings.hideInActiveBranches = false;			// hide inactive branches
	currentSettings.showPoolWt = false;						// add pool waiting and wt to branch total
	currentSettings.showBranchDelayed = false				// show total delayed customers
	currentSettings.showBranchWaiting = true;				// show waiting
	currentSettings.showBranchMaxWt = false;				// show max waiting time
	currentSettings.showBranchAvgWt = false;				// show average waiting time
	currentSettings.showBranchServed = true;				// show served
	currentSettings.showBranchNoShow = false;				// show no show
	currentSettings.showNpsOnBranchTab = false;				// show NPS value
	currentSettings.showBranchWaitedAboveSl = false			// show Waited Above SL Column
	currentSettings.showBranchBelowSlColumn = false;		// show below sl column
	currentSettings.showBranchAvgWtToday = false			// show Avg waiting time today in branch tab
	currentSettings.showBranchMaxWtToday = false			// show Max waiting time for today
	currentSettings.showBranchAvgTrt = true;				// show average trt time
	currentSettings.showMaxTrt = false						// show Max TRT Column
	currentSettings.showBranchTickets = false				// adds option to show all tickets in a popup
	currentSettings.showBranchOpen = true					// show open servicepoints
	currentSettings.showBranchClosed = true					// show closed servicepoints
	currentSettings.showBranchUpdated = true				// show last uodate time stamp
	currentSettings.showBranchStatus = true					// show branch status
	currentSettings.showBranchAction = false				// show action to delete all from branch
	currentSettings.historyEnabled = false;					// enable/disable history for today on branch level, when select a daily graph will be available
	currentSettings.historyShowTime = 120;					// Length of the daily history graph
	currentSettings.historyFirstTime = 0;					// First possible start of the history graph
	currentSettings.historySL = 20;							// History Service Level in minutes
	currentSettings.historyMinuteMax = 30;					// max value for history waiting time	
	currentSettings.showBranchTotals = false				// show totals in branch tab
	currentSettings.showBranchIdColumn = false;				// show branch id
	currentSettings.showBranchWaitingAboveSLNow = false		// show Waiting above SL Now
	currentSettings.showBranchServedAboveSl = false			// show Served Above Waiting SL

// queue settings
	currentSettings.queueDefaultColumnSort = 'queueHeaderMaxWt';
	currentSettings.orderTicketsInQueue = 1;				// Option to short the visits in the queue, option can be unSorted, ticketNumber or waitingTime
	currentSettings.queueGroupingEnabled = false;				// Enable/disable grouping of queues
	currentSettings.queueGroupingExpanded = true;				// On enabled show the queue groups expended
	currentSettings.queueGroupingGauges = false;				// show graph data based on selected queue group
	currentSettings.queueGroupingSetting = [];	
	currentSettings.showQueueDelayed = false					// show queue customers delayed
	currentSettings.showQueueWaiting = true;					// show waiting
	currentSettings.showRealWt = true;							// show real waiting time
	currentSettings.showQueueMaxWt = true;						// show max waiting time
	currentSettings.showAvgWt = false;							// show average waiting time
	currentSettings.showEstWt = false;							// show estimated waiting time
	currentSettings.queueShowServed = true;						// show Served
	currentSettings.queueShowRecycled = false;					// show recycled visits
	currentSettings.queueShowServices = false;					// show served services
	currentSettings.queueShowTransactions = false;				// show served transactions
	currentSettings.showQueueNoShow = false;					// show no show
	currentSettings.showQueueWaitedAboveSl = false				// show Waited Above SL Column
	currentSettings.showQueueBelowSlColumn = false;				// show below sl column
	currentSettings.showQueueAvgWtToday = false					// show Avg waiting time today
	currentSettings.showQueueMaxWtToday = false					// show Max waiting time for today
	currentSettings.showQueueMaxTrtColumn = false				// show Max TRT Column
	currentSettings.showQueueAvgTrt = true;						// show averagetrt time
	currentSettings.showQueueOpen = true;						// show open servicepoints
	currentSettings.showQueueAction = false						// show action to delete all from queue
	currentSettings.showQueueTotals = false						// show totals in queue tab
	currentSettings.showQueueIdColumn = true;					// show queue id
	currentSettings.showQueueWaitingAboveSLNow = false			// show Waiting above SL Now
	currentSettings.showQueueServedAboveSl = false				// show Served Above Waiting SL

// service point settings
	currentSettings.servicePointSummaryLocation = "spTab"; 		// show servicepoint summary (spTab), disable sp summary (disabled)
	currentSettings.spDefaultColumnSort = 'servicepointHeaderName';
	currentSettings.showSpIdColumn = true;						// show Service point id
	currentSettings.showServicePointStatusIcon = false;
	currentSettings.showServicePointStatusSp = false;			// show if the Service point will close soone (only Experience Cloud!!!)
	currentSettings.showServicePointStaff = true;				// show staff name
	currentSettings.showLoginLogout = true;						// show login and logout time
	currentSettings.showServicePointService = true;				// show the service the visit comes from
	currentSettings.showServicePointQueue = false;				// show the queue the visit comes from
	currentSettings.showServicePointTicket = true;				// show the ticket number
	currentSettings.showServicePointCustomer = true;			// show the customer name
	currentSettings.showWaitTime = true;						// show waiting time of the visit
	currentSettings.showQueueTrtTime = true;					// show transaction time of the visit
	currentSettings.showServicePointExpressia = false;			// show the Expressia score
	currentSettings.showUserAvgTrt = true;						// show avg transaction time for user
	currentSettings.showUserMaxTrt = true;						// show max transaction time for user
	currentSettings.userServed = true;							// show served for user
	currentSettings.showUserServedAboveSl = true;				// show served above sl for user
	currentSettings.showCurrentIdleTime = false;				// show current idle time
	currentSettings.showTotalIdleTime = false;					// show total idle time
	currentSettings.showAvgIdleTime = false;					// show avg idle time
	currentSettings.showServicePointWorkProfile = true;			// show choosen workprofile
	currentSettings.userForceLogout = true;						// show option to logout user from servicepoint
	currentSettings.showPoolLongestWt = false;					// show the waiting time for the longest waiting in the pool
	currentSettings.showServicepointTotals = true;				// show totals

// queue sp settings
	currentSettings.queueServicePointSummaryLocation = "queueSpTab"; // show queue/servicepoint summary (queueSpTab) disable queue/sp summary (disabled)
	currentSettings.queueQueueDefaultColumnSort = 'queueQueueHeaderMaxWt';
	//currentSettings.showQueueQueueIdColumn = true;				// show Queue id in queue table
	currentSettings.showQueueSpWaiting = true;					// show waiting
	currentSettings.showQueueSpRealWt = false;					// show real waiting time in queue table
	currentSettings.showQueueSpMaxWt = true;					// show max waiting time in queue table
	currentSettings.showQueueSpAvgWt = false;					// show average waiting time in queue table
	currentSettings.showQueueSpEstWt = false;					// show estimated waiting time in queue table
	currentSettings.showQueueSpServed = true;					// show Served in queue table
	currentSettings.showQueueSpRecycled = false;				// show recycled visits in queue table
	currentSettings.showQueueSpServices = false;				// show served services in queue table
	currentSettings.showQueueSpTransactions = false;			// show served transactions in queue table
	currentSettings.showQueueSpNoShow = false;					// show no shows in queue table
	currentSettings.showQueueQueueDelayed = false				// show queue customers delayed
	currentSettings.showQueueSpWaitedAboveSl = false			// show Waited Above SL Column in queue table
	currentSettings.showQueueSpBelowSlColumn = false;			// show below sl column in queue table
	currentSettings.showQueueSpAvgWtToday = false				// show Avg waiting time today in queue table
	currentSettings.showQueueSpMaxWtToday = false				// show Max waiting time for today in queue table
	currentSettings.showQueueSpAvgTrt = true;					// show average trt time in queue table
	currentSettings.showQueueSpMaxTrtColumn = false				// show Max TRT Column in Queue table
	currentSettings.showQueueSpOpen = true;						// show open service points in queue table
	currentSettings.showQueueQueueAction = false				// show action to delete all from queue
	currentSettings.showQueueSpTotals = false					// show totals in queue table
	//currentSettings.showQueueSpWaitingAboveSLNow = false		// show Waiting above SL Now in queue table
	//currentSettings.showQueueSpServedAboveSl = false			// show Served Above Waiting SL in queue table	

	currentSettings.queueSpDefaultColumnSort = 'queueServicepointHeaderName';
	//currentSettings.showQueueSpIdColumn = true;					// show Service point id in servicepoint table
	currentSettings.showQueueSpStatusIcon = false;
	currentSettings.showQueueSpStatusSp = false;				// show if the Service point will close soon (only Experience Cloud!!!)
	currentSettings.showQueueSpLoginLogout = false;				// show login and logout time in servicepoint table
	currentSettings.showQueueSpServicePointService = true;		// show the service the visit comes from in servicepoint table
	currentSettings.showQueueSpServicePointQueue = false;		// show the queue the visit comes from in servicepoint table
	currentSettings.showQueueSpTicket = true;				// show the ticket number
	currentSettings.showQueueSpCustomer = false;				// show the customer name	in servicepoint tab
	currentSettings.showQueueSpWaitTime = false;				// show waiting time of the visit in servicepoint table
	currentSettings.showQueueSpTrtTime = true;					// show transaction time of the visit in servicepoint table
	currentSettings.showQueueSpExpressia = false;				// show the Expressia column in servicepoint tab
	currentSettings.showQueueSpUserAvgTrt = false;				// show avg transaction time for user in servicepoint table
	currentSettings.showQueueSpUserMaxTrt = false;				// show max transaction time for user in servicepoint table
	currentSettings.showQueueSpUserServed = true;				// show served for user in servicepoint table
	//currentSettings.showQueueSpUserServedAboveSl = false;		// show served above sl for user in servicepoint table
	currentSettings.showQueueSpCurrentIdleTime = false;			// show current idle time
	currentSettings.showQueueSpTotalIdleTime = false;			// show total idle time
	currentSettings.showQueueSpAvgIdleTime = false;				// show avg idle time
	currentSettings.showQueueSpWorkProfile = true;				// show workprofile in servicepoint table
	currentSettings.showQueueSpUserForceLogout = false;			// show option to logout user from servicepoint in servicepoint table
	//currentSettings.showQueueSpPoolLongestWt = false;			// show the waiting time for the longest waiting in the pool
	currentSettings.showQueueSpServicepointTotals = true;		// show totals in servicepoint table	
	

var generalSettings = ['theme' ,'refresh','gauge1' ,'gauge2' ,'gauge3' ,'defaultColumnSortingOrder' ,'showTabIfBranchEqualOne' ,'usePersonalSlaSettings' ,'allowChangeSlaSettings' ,'hideInActiveBranches' ,'showOldData' ,'timeBeforeOldData' 
 ,'onlineTime' ,'showAppointments' ,'npsEnabled', 'webCamEnabled', 'webCamFrameHeight', 'webCamFrameWidth','showExpressiaGraph','buttonRemoveFromQueueEnabled',
'buttonTransferFromQueueEnabled', 'buttonTransferFirstEnabled', 'buttonTransferLastEnabled', 'buttonTransferSortEnabled', 'showAppointWt', 'buttonTransferServicepointAlways'
, 'defaultColumnQueueSortingOrder', 'defaultColumnSpSortingOrder', 'barCurrentlyServed','enableToolTipsOnHeaders','numberFormat', 'timeFormat']

var slaColumnSettings = ['showAvgWtSla','showMaxWtSla','showAvgWtTodaySla','showMaxWtTodaySla','showAvgTrtSla','showMaxTrtSla','showTicketTrtSla','showOpenCloseSla']

var ticketListColumnSettings = ['showTicketListNotes','showTicketListAppointmentTime','showTicketListWt','showTicketListCustomer']

var branchSettings = ['hideBranchesByIdSetting', 'showRegionName', 'hideInActiveBranches', 'branchDefaultColumnSort', 'showBranchTotals', 'regionView', 'historyEnabled', 'historyShowTime'
					 , 'historyFirstTime', 'historySL', 'historyMinuteMax', 'showBranchTickets', 'showPoolWt', 'showBranchWaitingAboveSLNow', 'showBranchServedAboveSl','showBranchIdColumn']

var branchColumnSettings = ['showBranchDelayed', 'showBranchWaiting', 'showBranchMaxWt',  'showBranchAvgWt', 'showBranchServed', 'showBranchNoShow', 'showNpsOnBranchTab'
							, 'showBranchWaitedAboveSl', 'showBranchBelowSlColumn', 'showBranchAvgWtToday', 'showBranchMaxWtToday', 'showBranchAvgTrt', 'showMaxTrt' 
							, 'showBranchOpen', 'showBranchClosed','showBranchUpdated','showBranchStatus', 'showBranchAction']

var queueSettings = ['orderTicketsInQueue', 'queueGroupingEnabled', 'queueGroupingExpanded', 'queueGroupingSetting',  'queueDefaultColumnSort', 'showQueueTotals', 'queueGroupingGauges'
					, 'showQueueWaitingAboveSLNow', 'showQueueIdColumn','showQueueServedAboveSl']

var queueColumnSettings = ['showQueueDelayed', 'showQueueWaiting', 'showRealWt', 'showQueueMaxWt', 'showAvgWt', 'showEstWt', 'queueShowServed', 'queueShowRecycled' 
							, 'queueShowServices', 'queueShowTransactions', 'showQueueNoShow', 'showQueueWaitedAboveSl', 'showQueueBelowSlColumn', 'showQueueAvgWtToday'
							, 'showQueueMaxWtToday', 'showQueueMaxTrtColumn', 'showQueueAvgTrt', 'showQueueOpen', 'showQueueAction']

var spSettings = ['showServicePointStatusIcon','showSpIdColumn', 'servicePointSummaryLocation', 'spDefaultColumnSort','showServicePointStaff', 'showServicepointTotals','showPoolLongestWt', 'showUserServedAboveSl']

var spColumnSettings = [ 'showServicePointStatusSp', 'showLoginLogout', 'showServicePointService', 'showServicePointQueue', 'showServicePointTicket'
						, 'showServicePointCustomer', 'showWaitTime',  'showQueueTrtTime', 'showServicePointExpressia', 'showUserAvgTrt', 'showUserMaxTrt', 'userServed'
						, 'showCurrentIdleTime', 'showTotalIdleTime', 'showAvgIdleTime', 'userForceLogout', 'showServicePointWorkProfile']

var queueSpSettings = ['showQueueSpStatusIcon','showQueueQueueIdColumn', 'showQueueSpIdColumn', 'queueServicePointSummaryLocation','queueQueueDefaultColumnSort','queueSpDefaultColumnSort', 'showQueueSpTotals','showQueueSpServicepointTotals','showQueueSpPoolLongestWt'
	,'showQueueSpWaitingAboveSLNow','showQueueSpServedAboveSl','showQueueSpUserServedAboveSl']

var queueQueueColumnSettings = ['showQueueQueueDelayed', 'showQueueSpWaiting', 'showQueueSpRealWt', 'showQueueSpMaxWt', 'showQueueSpAvgWt', 'showQueueSpEstWt', 'showQueueSpServed'
								, 'showQueueSpRecycled', 'showQueueSpServices', 'showQueueSpTransactions', 'showQueueSpNoShow', 'showQueueSpWaitedAboveSl', 'showQueueSpBelowSlColumn'
								, 'showQueueSpAvgWtToday', 'showQueueSpMaxWtToday', 'showQueueSpMaxTrtColumn', 'showQueueSpAvgTrt', 'showQueueSpOpen', 'showQueueQueueAction']
	
var queueSpColumnSettings = [ 'showQueueSpStatusSp', 'showQueueSpLoginLogout', 'showQueueSpServicePointService', 'showQueueSpServicePointQueue', 'showQueueSpTicket'
							 , 'showQueueSpCustomer', 'showQueueSpWaitTime', 'showQueueSpTrtTime', 'showQueueSpExpressia', 'showQueueSpUserAvgTrt', 'showQueueSpUserMaxTrt', 'showQueueSpUserServed'
							 , 'showQueueSpCurrentIdleTime','showQueueSpTotalIdleTime','showQueueSpAvgIdleTime', 'showQueueSpUserForceLogout', 'showQueueSpWorkProfile']
	
// theme colors
var gaugeValueColor = "#191919";			//#999999
var gaugeColorLevel1 = "#49A800";
var gaugeColorLevel2 = "#F4812F";
var gaugeColorLevel3 = "#BE193D";
var gaugeLabelColor =  "#666666";
var graphTextColor = "#63635E";				//#999999
var graphGridLineColor = "#63635E";			//#999999
var graphBackgroundColor = "#FFFFFF";		//#ffffff
var graphWaitingSeriesColor = ["#999999",'#0079c2','#49A800'];
var graphNpsSeriesColor = ['#cd1f29','#cd1f29','#cd1f29','#cd1f29','#cd1f29','#cd1f29','#cd1f29','#989898','#989898','#fece0a','#fece0a'];

var graphExpressiaSeriesColor = ['#86DD5A','#BEEDA6','#FFDD63','#F4812F','#D0526E'];
var graphHistorySeriesColor = ['#000099','#0e9f0e','#9e0d0d','#000000'];

function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}



function loadSettings() {
	settingsRetrieveError = false;
	settingsUrl = "/rest/entrypoint/variables/ops_e_settings";

	var retrievedVar;
	$.ajax({
		type: 'GET',
		url: settingsUrl,
		dataType: 'json',
		async: false,
		cache: false,
		success: function(val) {
			retrievedVar = val.value;
		},
		error: function(xhr, type) {
			if (xhr.status == 404){
				loadError = "error.no.settings.found";
				loadTry += 10
			} else {
				loadError = "error.no.retrieving.settings";
				settingsRetrieveError = true;
			}
		}
	});

	if ((retrievedVar != undefined && retrievedVar != null) || loadTry > 2 ) {
		processSettings(retrievedVar);
	} else {
		setTimeout(loadSettings, 1000);
		loadTry += 1;		
	}
}


function processSettings(setVar) {
	hideBranchesById = [];	
	columnOrderExist = false;
	if (setVar != undefined && setVar != null) {
		setVarValue = JSON.parse(setVar);
		Object.keys(setVarValue).forEach(function(key) {
			if (key === 'columnOrderBranch') {
					columnOrderExist = true;
			}
			
			if (currentSettings[key] !== undefined && setVarValue[key] !== null) {
				if ( typeof currentSettings[key] == 'number' ) {
					if ( parseInt(setVarValue[key],10) > -1) {
						currentSettings[key] = parseInt(setVarValue[key],10);
					}
				} else {
					currentSettings[key] = setVarValue[key];
				}
			}
		});
		if (columnOrderExist == false) {
			convertSettings(true);
		}
		if (currentSettings.hideBranchesByIdSetting != "") {
			var t = currentSettings.hideBranchesByIdSetting.split(",");
			for ( var u = 0; u < t.length; u++) {
				if ( parseInt(t[u],10) > 0 ) {
					hideBranchesById.push(parseInt(t[u],10));
				}
			}
		}
	} else {
		if (_isCentral === true){
			convertSettings(false);
		} else {
			util.showError(jQuery.i18n.prop('error.no.settings.found'));
		}
	}
	
	if (userHasAdmin === true && _isCentral === true ) {
		currentSettings.inactiveBranches = getInactiveBranchesSettings();
	}
	
	
	if (isExperience == false) {
		$("#bottomSpaceExp").hide();
		currentSettings.showServicePointStatusSp = false;
		currentSettings.showQueueSpStatusSp = false;
		currentSettings.showBranchDelayed = false;
		currentSettings.showQueueDelayed = false;
		currentSettings.showQueueQueueDelayed = false;
		deleteColumn('main-header-view','header-start-exp');
		deleteColumn('header-actions','exp-link-string');		
		deleteColumn('header-actions','exp-link-icon');
		deleteColumn('header-actions','exp-link-spacer');
		$("#header").css('background-color', '#323232');
		$("#appName").css('color', 'rgba(255, 255, 255, 0.7)');
		$("#settingsAdminLink").css('color', 'rgba(255, 255, 255, 0.7)');
		$("#helpLink").css('color', 'rgba(255, 255, 255, 0.7)');
		$("#userName").css('color', 'rgba(255, 255, 255, 0.7)');
		$("#searchLink").css('color', 'rgba(255, 255, 255, 0.7)');
		$(".header-icon-search").attr("src","images/iconorchsearch.svg");
		$(".header-icon-setting").attr("src","images/iconorchmainsetting.svg");
		$(".header-icon-help").attr("src","images/iconorchhelp.svg");
		$(".header-icon-user").attr("src","images/iconorchuser.svg");
		$(".header-icon-logout").attr("src","images/iconorchlogout.svg");
		$(".logo").attr("src","images/brand_logo_header_orch.png");
		//loadjscssfile("./css/orch_header.css", "css") ////dynamically load and add this .css file
	
	} else {
		$("#footerContent").hide();
		$("#bottomSpaceOrch").hide();
		deleteColumn('main-header-view','header-start-orch');

	}

	if (currentSettings.regionView	!= 'regionColapsed' && currentSettings.regionView	!= 'regionExpanded') {
		$('#branchHeaderRegion').remove();
		$('#branchAppointHeaderRegion').remove();
	}
	
	if (currentSettings.regionView != "noRegion" ){
		setRegionVar = restService.get("/rest/entrypoint/variables/ops_region_settings");
		if (setRegionVar != undefined ) {
			regionTreeSettings = JSON.parse(setRegionVar.value);
		} else {
			if (settingsRetrieveError == false) {
				restService.setGlobalVariable("ops_region_settings", "{}");
			}
		}
		if (userHasAdmin === true && _isCentral === true ) {
			regionTreeSettings = getBranchGroupsSettings();
		}
	}
	
	if (currentSettings.queueGroupingEnabled === false) {
			$('#queueHeaderGroup').remove();
			$('#queueQueueHeaderGroup').remove();
	} 
	
	if (currentSettings.showAppointments === false) {
		deleteColumn('branchMenuTabs','appointTab')
		deleteColumn('regionMenuTabs','appointTab')
	}
	
	if ( currentSettings.npsEnabled	== false){
		deleteColumn('queueSpMenuTabs','queueServicePointNpsTab')
		deleteColumn('queueMenuTabs','queueNpsTab')
		deleteColumn('servicepointMenuTabs','servicepointNpsTab')
		deleteColumn('webcamMenuTabs','webcamNpsTab')
	}
	if ( currentSettings.webCamEnabled	== false){
		deleteColumn('queueSpMenuTabs','queueServicePointWebcamTab')
		deleteColumn('queueMenuTabs','queueWebcamTab')
		deleteColumn('servicepointMenuTabs','servicepointWebcamTab')
		deleteColumn('npsMenuTabs','npsWebcamTab')
	}
	if ( currentSettings.queueServicePointSummaryLocation !== "queueSpTab" ){
		deleteColumn('queueMenuTabs','queueQueueServicePointTab')
		deleteColumn('servicepointMenuTabs','servicepointQueueServicePointTab')
		deleteColumn('npsMenuTabs','npsQueueServicePointTab')
		deleteColumn('webcamMenuTabs','webcamQueueServicePointTab')
	}
	if (getGlobalVariableMethod == 2) {
		refreshInterval = currentSettings.refresh
		if (refreshInterval < minRefreshTime) {
			refreshInterval = minRefreshTime;
		}
	}
	
	if (currentSettings.barCurrentlyServed == false) {
		graphWaitingSeriesColor = ['#0079c2','#49A800',"#999999"];
	}
	
	if (currentSettings.numberFormat == 'de'){
		sortUsNumberFormat = false;
	}
	
	if (accessRights[5] === 0){
		if (currentSettings.allowChangeSlaSettings == false && currentSettings.usePersonalSlaSettings == false){
			$("#settingsAdminIcon").hide()
			$("#settingsAdminLink").hide()
		}
	}
	initDone();
}

function convertSettings(saveNew){
	convertColumnOrder(branchColumnSettings, 'columnOrderBranch');
	convertColumnOrder(queueColumnSettings, 'columnOrderQueue');
	convertColumnOrder(queueQueueColumnSettings, 'columnOrderQueueSpQueue');
	convertColumnOrder(queueSpColumnSettings, 'columnOrderQueueSpSp');
	convertColumnOrder(spColumnSettings, 'columnOrderSp');

	// conversion done there for save and reload
	if (saveNew == true) {
		saveSettingsToVar(true, true);			
	}
}

function convertColumnOrder(settings, saveList){
		for ( y = 0; y < settings.length; y++){
		if (currentSettings[settings[y]] == true) {
			currentSettings[saveList].push(settings[y]);
		}
	}
}

function saveAdminSettings(reload, closeModal) {
	currentSettings.columnOrderBranch = tempSettings.columnOrderBranch;
	currentSettings.columnOrderQueue=tempSettings.columnOrderQueue;
	currentSettings.columnOrderQueueSpQueue = tempSettings.columnOrderQueueSpQueue;
	currentSettings.columnOrderQueueSpSp = tempSettings.columnOrderQueueSpSp ;
	currentSettings.columnOrderSp = tempSettings.columnOrderSp;
	
	Object.keys(currentSettings).forEach(function(key) {
		if (key !== 'columnOrderBranch' && key !== 'columnOrderQueue'&& key !== 'columnOrderQueueSpQueue' && key !== 'columnOrderQueueSpSp' && key !== 'columnOrderSp' ){
			if (key !== "queueGroupingSetting" && key !== "showRegionName" && key !== 'inactiveBranches' ){
				if (settingObj[key].indexOf("Select") > -1){
					selectedValues = $('#'+ settingObj[key] + 'Value' ).val()
					currentSettings[key] = selectedValues.includes(key)
				} else {
					if ( typeof currentSettings[key] == 'boolean' ) {
						currentSettings[key] = $('#'+ key + 'Value' ).prop('checked');
					}

					if ( typeof currentSettings[key] == 'number' ) {
						currentSettings[key] = parseInt($('#'+ key + 'Value' ).val(),10);
					}

					if ( typeof currentSettings[key] == 'string' ) {
						currentSettings[key] = $('#'+ key + 'Value' ).val();
					}
				}
			}
			
			if (key == "showRegionName" && userHasAdmin == true && _isCentral === true){
				currentSettings[key] = $('#'+ key + 'Value' ).val()
			}
		}
		
	});
	if (currentSettings.refresh < minRefreshTime) {
		currentSettings.refresh = minRefreshTime;
	}

	saveSettingsToVar(reload, closeModal);
}

function getColumnOrder( setting, tableName) {
	 var countries = [];
        $.each($("."+tableName+ " option:selected"), function(){            
            countries.push($(this).val());
        });
        alert("You have selected the country - " + countries.join(", "));
}

function saveSettingsToVar(reload, closeModal) {
	newVar= JSON.stringify(currentSettings);
	if(closeModal){
		util.hideModal('settingsAdminPage');
	}

	if (settingsRetrieveError == false) {
		setGlobalVariable("ops_e_settings",newVar);
		if (reload === true) {
			if (location.href.search("settingsadmin") > -1) { 
				window.location.href = location.href.replace("?settingsadmin","");
			} else {
				location.reload();
			}
		}
	} else {
		util.hideModal('settingsAdminPage');
		util.showUttError(jQuery.i18n.prop("error.no.retrieving.settings"));
	}
}


function showAdminSettings() {
	showSettings();
	if (accessRights[5] == 1 && firstRun == true){
		buildAdminSettings();
	}
	$("#settingsAdminFormTitle").html(
		'<a href=\"#\" class=\"closeButton\" onclick="javascript:util.hideModal(\'settingsAdminPage\')"></a>');
	document.getElementById("graph-tab").innerHTML = jQuery.i18n.prop('form.settings.title')
	util.showModal('settingsAdminPage');
}	

function buildAdminSettings() {	
	tempSettings.columnOrderBranch = []
	tempSettings.columnOrderQueue = []
	tempSettings.columnOrderQueueSpQueue = []
	tempSettings.columnOrderQueueSpSp = []
	tempSettings.columnOrderSp = []
	var regionGroups;
	var configBranches;
	if (userHasAdmin == true && _isCentral === true){
		regionGroups = getBranchGroupsSettings();
		configBranches = getInactiveBranchesSettings();	
	}
	var generalTable = document.getElementById("general-table")
	var branchTable = document.getElementById("branch-table")
	var queueTable = document.getElementById("queue-table")
	var queueGroupsTable = document.getElementById("queueGroups-content")
	var spTable = document.getElementById("sp-table")
	var queueSpTable = document.getElementById("queueSp-table")
	resetTables([generalTable,branchTable,queueTable,spTable,queueSpTable])
	
	var rows = {
		general: createRow(generalTable, "height:30px"),
		branch: createRow(branchTable, "height:30px"),
		queue: createRow(queueTable, "height:30px"),
		sp: createRow(spTable, "height:30px"),
		queueSp: createRow(queueSpTable, "height:30px"),
	}
	var objCols = {
		generalTable: 0,
		branchTable: 0,
		queueTable: 0,
		spTable: 0,
		queueSpTable: 0
	}

	br = parseInt($("#branchesQueueGroup").val(),10);
	if (br < 0) {
		$("#addGroupDiv").hide();
		$("#queueGroupView").find("tr:gt(0)").remove();
	}

	document.getElementById("general-tab").innerHTML = jQuery.i18n.prop('form.admin.tab.general')
	document.getElementById("branch-tab").innerHTML = jQuery.i18n.prop('form.admin.tab.branch')
	document.getElementById("queue-tab").innerHTML = jQuery.i18n.prop('form.admin.tab.queue')
	document.getElementById("queueGroups-tab").innerHTML = jQuery.i18n.prop('form.admin.tab.queueGroups')
	document.getElementById("sp-tab").innerHTML = jQuery.i18n.prop('form.admin.tab.sp')
	document.getElementById("queueSp-tab").innerHTML = jQuery.i18n.prop('form.admin.tab.queue.sp')

	if (restVersion === 2 ) {
		currentSettings.queueShowRecycled = false;
		currentSettings.queueShowServices = false;
		currentSettings.queueShowTransactions = false;
		currentSettings.showAppointments = false;
	}
	
	const _tabs = document.querySelectorAll("[data-tab]");
	const _content = document.getElementsByClassName("active");
	
	const toggleContent = function () {
	
		if (!this.classList.contains("active")) {
			Array.from(_content).forEach((item) => {
				item.classList.remove("active");
				item.classList.add("inactive");
			});
			this.classList.remove("inactive");
			this.classList.add("active");
				
			let currentTab = this.getAttribute("data-tab");
			var _tabContent = document.getElementById(currentTab);
			(currentTab !== 'graph-content') ? ($('#settingsFormOK').hide(), $('#adminSettingsFormOK').show()) : ($('#adminSettingsFormOK').hide(), $('#settingsFormOK').show())
			_tabContent.classList.add("active");
		}
	};

	
	Array.from(_tabs).forEach((item) => {
	/*	if(currentSettings["queueGroupingEnabled"]) {
			item.classList.remove('hide')
		}*/
		item.addEventListener("click", toggleContent);
	});
	
	for (const key in currentSettings) {
		if(generalSettings.indexOf(key) !== -1) settingObj[key] = 'general'
		if(slaColumnSettings.indexOf(key) !== -1) settingObj[key] = 'slaSelect'
		if(ticketListColumnSettings.indexOf(key) !== -1) settingObj[key] = 'ticketListSelect'
		if(branchSettings.indexOf(key) !== -1) settingObj[key] = 'branch'
		if(branchColumnSettings.indexOf(key) !== -1) settingObj[key] = 'branchSelect'
		if(queueSettings.indexOf(key) !== -1) settingObj[key] = 'queue'
		if(queueColumnSettings.indexOf(key) !== -1) settingObj[key] = 'queueSelect'
		if(spSettings.indexOf(key) !== -1) settingObj[key] = 'sp'
		if(spColumnSettings.indexOf(key) !== -1) settingObj[key] = 'spSelect'
		if(queueSpSettings.indexOf(key) !== -1) settingObj[key] = 'queueSp'
		if(queueQueueColumnSettings.indexOf(key) !== -1) settingObj[key] = 'queueQueueSelect'
		if(queueSpColumnSettings.indexOf(key) !== -1) settingObj[key] = 'queueSpSelect'
	}

	var slaSelect = '<select multiple name="slaSelect" id="slaSelectValue">'; 
	var ticketListSelect = '<select multiple name="ticketListSelect" id="ticketListSelectValue">'; 
	var branchSelect = '<select multiple name="branchSelect" id="branchSelectValue">'; 
	var queueSelect = '<select multiple name="queueSelect" id="queueSelectValue">' ;
	var spSelect = '<select multiple name="spSelect" id="spSelectValue">';
	var queueSpSelect = '<select multiple name="queueSpSelect" id="queueSpSelectValue">';
	var queueQueueSelect = '<select multiple name="queueQueueSelect" id="queueQueueSelectValue">';

	Object.keys(currentSettings).forEach(function(key) {
		var showKey = true;
		var keyInMultiSelect = false;
		if (restVersion === 2 && ( key === 'queueShowRecycled' || key === 'queueShowServices' || key === 'queueShowTransactions' ||
			key === 'showQueueSpRecycled' || key === 'showQueueSpServices' || key === 'showQueueSpTransactions' || key === 'showAppointments' 
			||  key === 'theme' )){
			showKey = false;
		}
		
		if ( key === 'columnOrderBranch' ||  key === 'columnOrderQueue' ||  key === 'columnOrderQueueSpQueue' ||  key === 'columnOrderQueueSpSp' ||  key === 'columnOrderSp') {
			showKey = false;
		}
	
		
		// hiding items which are only for Experience Cloud
		if (isExperience == false && ( key === 'showServicePointStatusSp' || key === 'showQueueSpStatusSp' || key === 'showQueueDelayed' 
		|| key === 'showQueueQueueDelayed' || key == 'showBranchDelayed')) {
			showKey = false;
		}
		
		
		if ((getGlobalVariableMethod == 1  && key == 'refresh' ) || key == 'inactiveBranches' ) {
			showKey = false;
		}
		
		if (key !== 'queueGroupingSetting' && showKey === true	) {
			if (settingObj[key].indexOf("Select") > -1){

				regSel = ""
				if ((settingObj[key] == "slaSelect" || settingObj[key] == "ticketListSelect") && currentSettings[key] == true){
					regSel = 'selected = "selected"';
				}
				selectLine = '<option ' + regSel + ' value="' + key + '">' + jQuery.i18n.prop('label.admin.' + key) + '</option>'

				if (settingObj[key] == "slaSelect") {
					slaSelect += selectLine;
				}				
				if (settingObj[key] == "ticketListSelect") {
					ticketListSelect += selectLine;
				}
				if (settingObj[key] == "branchSelect") {
					branchSelect += selectLine;
				}
				if (settingObj[key] == "queueSelect") {
					queueSelect += selectLine;
				}
				if (settingObj[key] == "spSelect") {
					spSelect += selectLine;
				}
				if (settingObj[key] == "queueSpSelect") {
					queueSpSelect += selectLine;
				}
				if (settingObj[key] == "queueQueueSelect") {
					queueQueueSelect += selectLine;
				}
			} else {	
				if ( typeof currentSettings[key] == 'boolean' ) {
					typeInput ='<input type="checkbox" id="' + key + 'Value">'
					createElement(rows[[settingObj[key]]], "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
					createElement(rows[[settingObj[key]]], "width:50px;align:left'", "td", null, htmlToElement(typeInput))
					objCols[[settingObj[key]+'Table']] = objCols[[settingObj[key]+'Table']] + 1
				}
				
				if ( typeof currentSettings[key] == 'number' ) {
					if(key !== 'showTabIfBranchEqualOne' && key !== 'defaultColumnSortingOrder' 
						 && key !== 'defaultColumnQueueSortingOrder'  && key !== 'defaultColumnSpSortingOrder' && key !== 'orderTicketsInQueue') {
						typeInput ='<input type="number" id="' + key + 'Value" value = "' + currentSettings[key] + '">'
						createElement(rows[[settingObj[key]]], "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
						createElement(rows[[settingObj[key]]], "width:50px;align:left'", "td", null, htmlToElement(typeInput))
						objCols[[settingObj[key]+'Table']] = objCols[[settingObj[key]+'Table']] + 1
					}
				}

				if ( typeof currentSettings[key] == 'string' ) {
					if(key !== 'theme' && key !== 'gauge3' && key !== 'queueDefaultColumnSort' && key !== 'branchDefaultColumnSort' 
						&& key !== 'regionView' && key !== 'servicePointSummaryLocation' && key !== 'queueServicePointSummaryLocation'
						&& key !== 'showRegionName' && key !== 'queueQueueDefaultColumnSort' && key !== 'numberFormat' && key !=='timeFormat'
						&& key !== 'spDefaultColumnSort' && key !== 'queueSpDefaultColumnSort'  && key !== 'gauge1'  && key !== 'gauge2'){
						typeInput ='<input type="text" id="' + key + 'Value" value = "' + currentSettings[key] + '">'
						createElement(rows[[settingObj[key]]], "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
						createElement(rows[[settingObj[key]]], "width:50px;align:left'", "td", null, htmlToElement(typeInput))
						objCols[[settingObj[key]+'Table']] = objCols[[settingObj[key]+'Table']] + 1
					}
				}	
				if ( key == 'numberFormat' ) {
					typeInput = '<select name="numberFormatValue" id="numberFormatValue"><option value="en">' + jQuery.i18n.prop('form.admin.settings.select.format.en') + '</option>'
						+ '<option value="fr">' + jQuery.i18n.prop('form.admin.settings.select.format.fr') + '</option>'
						+ '<option value="de">' + jQuery.i18n.prop('form.admin.settings.select.format.de') + '</option></select>';
					
					createElement(rows.general, "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
					createElement(rows.general, "width:50px;align:left'", "td", null, htmlToElement(typeInput))
					objCols.generalTable++
				}	
				if ( key == 'timeFormat' ) {
					typeInput = '<select name="timeFormatValue" id="timeFormatValue"><option value="HH:mm">HH:mm</option>'
						+ '<option value="H:mm">H:mm</option>' + '<option value="hh:mm a">hh:mm a</option>'
						+ '<option value="h:mm a">h:mm a</option></select>';
					
					createElement(rows.general, "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
					createElement(rows.general, "width:50px;align:left'", "td", null, htmlToElement(typeInput))
					objCols.generalTable++
				}	

				if ( key == 'gauge1' ) {
					typeInput = '<select name="gauge1Value" id="gauge1Value"><option value="avgWt">' + jQuery.i18n.prop('form.admin.settings.select.avg.wt') + '</option>'
						+ '<option value="maxWt">' + jQuery.i18n.prop('form.admin.settings.select.max.wt') + '</option>'
						+ '<option value="avgWtToday">' + jQuery.i18n.prop('form.admin.settings.select.avg.wt.today') + '</option>'
						+ '<option value="maxWtToday">' + jQuery.i18n.prop('form.admin.settings.select.max.wt.today') + '</option></select>';
					
					createElement(rows.general, "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
					createElement(rows.general, "width:50px;align:left'", "td", null, htmlToElement(typeInput))
					objCols.generalTable++
				}
				if ( key == 'gauge2' ) {
					typeInput = '<select name="gauge2Value" id="gauge2Value"><option value="avgTrt">' + jQuery.i18n.prop('form.admin.settings.select.avg.trt') + '</option>'
						+ '<option value="maxTrt">' + jQuery.i18n.prop('form.admin.settings.select.max.trt') + '</option></select>';
					
					createElement(rows.general, "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
					createElement(rows.general, "width:50px;align:left'", "td", null, htmlToElement(typeInput))
					objCols.generalTable++
				}
				if ( key == 'gauge3' ) {
					typeInput = '<select name="gauge3Value" id="gauge3Value"><option value="waitOpenCounter">' + jQuery.i18n.prop('form.admin.settings.select.wait.open.counter') + '</option>'
						+ '<option value="openCounter">' + jQuery.i18n.prop('form.admin.settings.select.open.counter') + '</option>'
						+ '<option value="openCounterAvg">' + jQuery.i18n.prop('form.admin.settings.select.open.counter.avg') + '</option></select>';
					
					createElement(rows.general, "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
					createElement(rows.general, "width:50px;align:left'", "td", null, htmlToElement(typeInput))
					objCols.generalTable++
				}
				
				if ( key == 'orderTicketsInQueue' ) {
					typeInput = '<select name="orderTicketsInQueueValue" id="orderTicketsInQueueValue"><option value=0>' + jQuery.i18n.prop('form.admin.settings.select.unsorted') + '</option>' +
						'<option value=1>' + jQuery.i18n.prop('form.admin.settings.select.ticket.number') + '</option><option value=5>' + jQuery.i18n.prop('form.admin.settings.select.waiting.time') + '</option></select>';
					createElement(rows.queue, "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
					createElement(rows.queue, "width:50px;align:left'", "td", null, htmlToElement(typeInput))
					objCols.queueTable++
				}

				if ( key == 'branchDefaultColumnSort' ) {
					typeInput = '<select name="branchDefaultColumnSortValue" id="branchDefaultColumnSortValue">' 
						+ '<option value="branchHeaderId">' + jQuery.i18n.prop('form.admin.settings.select.branch.id') + '</option>'
						+ '<option value="branchHeaderName">' + jQuery.i18n.prop('form.admin.settings.select.branch.name') + '</option>'
						//+ '<option value="branchHeaderServed">' + jQuery.i18n.prop('form.admin.settings.select.branch.served') + '</option>'
						+ '<option value="branchHeaderWaiting">' + jQuery.i18n.prop('form.admin.settings.select.branch.waiting') + '</option>'
						+ '<option value="branchHeaderAvgWt">' + jQuery.i18n.prop('form.admin.settings.select.branch.avgWt') + '</option>'
						+ '<option value="branchHeaderMaxWt">' + jQuery.i18n.prop('form.admin.settings.select.branch.maxWt') + '</option>'
						+ '<option value="branchHeaderSL">' + jQuery.i18n.prop('form.admin.settings.select.branch.aboveSl') + '</option>'
						+ '<option value="branchHeaderOpen">' + jQuery.i18n.prop('form.admin.settings.select.branch.open') + '</option>'
						+ '</select>';
					createElement(rows.branch, "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
					createElement(rows.branch, "width:50px;align:left'", "td", null, htmlToElement(typeInput))
					objCols.branchTable++
				}	

				if ( key == 'regionView' ) {
					typeInput = '<select name="regionViewValue" id="regionViewValue">' 
						+ '<option value="noRegion">' + jQuery.i18n.prop('form.admin.settings.select.no.region') + '</option>'
						+ '<option value="regionSeparated">' + jQuery.i18n.prop('form.admin.settings.select.region.separated') + '</option>'
						+ '<option value="regionColapsed">' + jQuery.i18n.prop('form.admin.settings.select.region.colapsed') + '</option>'
						+ '<option value="regionExpanded">' + jQuery.i18n.prop('form.admin.settings.select.region.expanded') + '</option>'
						+ '</select>';
					createElement(rows.branch, "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
					createElement(rows.branch, "width:50px;align:left'", "td", null, htmlToElement(typeInput))
					objCols.branchTable++
				}	
				
				if ( key == 'servicePointSummaryLocation' ) {
					typeInput = '<select name="servicePointSummaryLocationValue" id="servicePointSummaryLocationValue">' 
						+ '<option value="spTab">' + jQuery.i18n.prop('form.admin.settings.sp.tab') + '</option>'
						+ '<option value="disabled">' + jQuery.i18n.prop('form.admin.settings.sp.disabled') + '</option>'
						+ '</select>';
					createElement(rows.sp, "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
					createElement(rows.sp, "width:50px;align:left'", "td", null, htmlToElement(typeInput))
					objCols.spTable++
				}	
				
				if ( key == 'queueServicePointSummaryLocation' ) {
					typeInput = '<select name="queueServicePointSummaryLocationValue" id="queueServicePointSummaryLocationValue">' 
						+ '<option value="queueSpTab">' + jQuery.i18n.prop('form.admin.settings.sp.tab') + '</option>'
						+ '<option value="disabled">' + jQuery.i18n.prop('form.admin.settings.sp.disabled') + '</option>'
						+ '</select>';
					createElement(rows.queueSp, "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
					createElement(rows.queueSp, "width:50px;align:left'", "td", null, htmlToElement(typeInput))
					objCols.queueSpTable++
				}	
				
				if ( key == 'defaultColumnSortingOrder' ) {
					typeInput = '<select name="defaultColumnSortingOrderValue" id="defaultColumnSortingOrderValue"><option value=0>' + jQuery.i18n.prop('form.admin.settings.select.ascending') + '</option>'
						+ '<option value=1>' + jQuery.i18n.prop('form.admin.settings.select.descending') + '</option></select>';
					createElement(rows.general, "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
					createElement(rows.general, "width:50px;align:left'", "td", null, htmlToElement(typeInput))
					objCols.generalTable++
				}

				if ( key == 'defaultColumnQueueSortingOrder' ) {
					typeInput = '<select name="defaultColumnQueueSortingOrderValue" id="defaultColumnQueueSortingOrderValue"><option value=0>' + jQuery.i18n.prop('form.admin.settings.select.ascending') + '</option>'
						+ '<option value=1>' + jQuery.i18n.prop('form.admin.settings.select.descending') + '</option></select>';
					createElement(rows.general, "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
					createElement(rows.general, "width:50px;align:left'", "td", null, htmlToElement(typeInput))
					objCols.generalTable++
				}
				
				if ( key == 'defaultColumnSpSortingOrder' ) {
					typeInput = '<select name="defaultColumnSpSortingOrderValue" id="defaultColumnSpSortingOrderValue"><option value=0>' + jQuery.i18n.prop('form.admin.settings.select.ascending') + '</option>'
						+ '<option value=1>' + jQuery.i18n.prop('form.admin.settings.select.descending') + '</option></select>';
					createElement(rows.general, "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
					createElement(rows.general, "width:50px;align:left'", "td", null, htmlToElement(typeInput))
					objCols.generalTable++
				}
				
				if ( key == 'queueDefaultColumnSort' ) {
					typeInput = '<select name="queueDefaultColumnSortValue" id="queueDefaultColumnSortValue">' 
						+ '<option value="queueHeaderId">' + jQuery.i18n.prop('form.admin.settings.select.queue.id') + '</option>'
						+ '<option value="queueHeaderName">' + jQuery.i18n.prop('form.admin.settings.select.queue.name') + '</option>' 
						+ '<option value="queueHeaderServed">' + jQuery.i18n.prop('form.admin.settings.select.queue.served') + '</option>' 
						+ '<option value="queueHeaderWaiting">' + jQuery.i18n.prop('form.admin.settings.select.queue.waiting') + '</option>' 
						+ '<option value="queueHeaderRealWt">' + jQuery.i18n.prop('form.admin.settings.select.queue.realWait') + '</option>' 
						+ '<option value="queueHeaderEstWt">' + jQuery.i18n.prop('form.admin.settings.select.queue.estWait') + '</option>' 
						+ '<option value="queueHeaderAvgWt">' + jQuery.i18n.prop('form.admin.settings.select.queue.avgWt') + '</option>' 
						+ '<option value="queueHeaderMaxWt">' + jQuery.i18n.prop('form.admin.settings.select.queue.maxWt') + '</option>' 
						+ '<option value="queueHeaderOpen">' + jQuery.i18n.prop('form.admin.settings.select.queue.open') + '</option>' 
						+ '</select>';
					createElement(rows.queue, "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
					createElement(rows.queue, "width:50px;align:left'", "td", null, htmlToElement(typeInput))
					objCols.queueTable++
				}

				if ( key == 'queueQueueDefaultColumnSort' ) {
					typeInput = '<select name="queueQueueDefaultColumnSortValue" id="queueQueueDefaultColumnSortValue">' 
						+ '<option value="queueQueueHeaderId">' + jQuery.i18n.prop('form.admin.settings.select.queue.id') + '</option>'
						+ '<option value="queueQueueHeaderName">' + jQuery.i18n.prop('form.admin.settings.select.queue.name') + '</option>' 
						+ '<option value="queueQueueHeaderServed">' + jQuery.i18n.prop('form.admin.settings.select.queue.served') + '</option>' 
						+ '<option value="queueQueueHeaderWaiting">' + jQuery.i18n.prop('form.admin.settings.select.queue.waiting') + '</option>' 
						+ '<option value="queueQueueHeaderRealWt">' + jQuery.i18n.prop('form.admin.settings.select.queue.realWait') + '</option>' 
						+ '<option value="queueQueueHeaderEstWt">' + jQuery.i18n.prop('form.admin.settings.select.queue.estWait') + '</option>' 
						+ '<option value="queueQueueHeaderAvgWt">' + jQuery.i18n.prop('form.admin.settings.select.queue.avgWt') + '</option>' 
						+ '<option value="queueQueueHeaderMaxWt">' + jQuery.i18n.prop('form.admin.settings.select.queue.maxWt') + '</option>' 
						+ '<option value="queueQueueHeaderOpen">' + jQuery.i18n.prop('form.admin.settings.select.queue.open') + '</option>' 
						+ '</select>';
					createElement(rows.queueSp, "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
					createElement(rows.queueSp, "width:50px;align:left'", "td", null, htmlToElement(typeInput))
					objCols.queueSpTable++
				}						
				
				if ( key == 'spDefaultColumnSort' ) {
					typeInput = '<select name="spDefaultColumnSortValue" id="spDefaultColumnSortValue">' 
						+ '<option value="servicepointHeaderId">' + jQuery.i18n.prop('form.admin.settings.select.sp.id') + '</option>'
						+ '<option value="servicepointHeaderName">' + jQuery.i18n.prop('form.admin.settings.select.sp.name') + '</option>' 
						+ '<option value="servicepointHeaderStatusIcon">' + jQuery.i18n.prop('form.admin.settings.select.sp.icon') + '</option>'
						//+ '<option value="servicepointHeaderStatusIconName">' + jQuery.i18n.prop('form.admin.settings.select.sp.icon')+ ' + '+jQuery.i18n.prop('form.admin.settings.select.sp.name') + '</option>'
						+ '<option value="servicepointHeaderStatusSp">' + jQuery.i18n.prop('form.admin.settings.select.sp.status') + '</option>' 
						+ '<option value="servicepointHeaderStaff">' + jQuery.i18n.prop('form.admin.settings.select.sp.staff') + '</option>' 
						+ '<option value="servicepointHeaderService">' + jQuery.i18n.prop('form.admin.settings.select.sp.service') + '</option>' 
						+ '<option value="servicepointHeaderTicket">' + jQuery.i18n.prop('form.admin.settings.select.sp.ticket') + '</option>' 
						+ '<option value="servicepointHeaderTrt">' + jQuery.i18n.prop('form.admin.settings.select.sp.trt') + '</option>' 
						+ '</select>';
					createElement(rows.sp, "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
					createElement(rows.sp, "width:50px;align:left'", "td", null, htmlToElement(typeInput))
					objCols.spTable++
				}				
				if ( key == 'queueSpDefaultColumnSort' ) {
					typeInput = '<select name="queueSpDefaultColumnSortValue" id="queueSpDefaultColumnSortValue">' 
						+ '<option value="queueServicepointHeaderId">' + jQuery.i18n.prop('form.admin.settings.select.sp.id') + '</option>'
						+ '<option value="queueServicepointHeaderName">' + jQuery.i18n.prop('form.admin.settings.select.sp.name') + '</option>' 
						+ '<option value="queueServicepointHeaderStatusIcon">' + jQuery.i18n.prop('form.admin.settings.select.sp.icon') + '</option>' 
						+ '<option value="queueServicepointHeaderStatusSp">' + jQuery.i18n.prop('form.admin.settings.select.sp.status') + '</option>' 
						+ '<option value="queueServicepointHeaderStaff">' + jQuery.i18n.prop('form.admin.settings.select.sp.staff') + '</option>' 
						+ '<option value="queueServicepointHeaderService">' + jQuery.i18n.prop('form.admin.settings.select.sp.service') + '</option>' 
						+ '<option value="queueServicepointHeaderTicket">' + jQuery.i18n.prop('form.admin.settings.select.sp.ticket') + '</option>' 
						+ '<option value="queueServicepointHeaderTrt">' + jQuery.i18n.prop('form.admin.settings.select.sp.trt') + '</option>'  
						+ '</select>';
					createElement(rows.queueSp, "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
					createElement(rows.queueSp, "width:50px;align:left'", "td", null, htmlToElement(typeInput))
					objCols.queueSpTable++
				}	
				
				if ( key == 'showTabIfBranchEqualOne' ) {
					typeInput = '<select name="showTabIfBranchEqualOneValue" id="showTabIfBranchEqualOneValue"><option value=0>' + jQuery.i18n.prop('form.admin.settings.select.branch.summary') + '</option>'
						+ '<option value=7>' + jQuery.i18n.prop('form.admin.settings.select.queueservicepoint.overview') + '</option>'
						+ '<option value=1>' + jQuery.i18n.prop('form.admin.settings.select.queue.overview') + '</option>'
						+ '<option value=2>' + jQuery.i18n.prop('form.admin.settings.select.servicepoint.overview') + '</option></select>';
					createElement(rows.general, "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
					createElement(rows.general, "width:50px;align:left'", "td", null, htmlToElement(typeInput))
					objCols.generalTable++
				}
				
				if ( key == 'showRegionName') {

					if ( regionGroups != null && regionGroups != undefined && regionGroups != "") {
						var regSubGroups = []
						for ( var r = 0; r < regionGroups.length; r++) {
							if (regionGroups[r].subgroupIds.length > 0){
								for (j in regionGroups[r].subgroupIds){
									regSubGroups.push(regionGroups[r].subgroupIds[j]);
								}
							}
						}
						typeInput = '<select multiple name="showRegionNameValue" id="showRegionNameValue">' 
							for ( var r = 0; r < regionGroups.length; r++) {
								var regName = regionGroups[r].name;
								var regSel = "";
								var isSubGroup = false;
								for (var t = 0; t < regSubGroups.length; t++) {
									if (regSubGroups[t] == regionGroups[r].id){
										isSubGroup = true;
									}
								}
								for (var s = 0; s < currentSettings.showRegionName.length; s++){
									if (currentSettings.showRegionName[s] == regName) {
										regSel = 'selected="selected"';
									}
								}
								if (!isSubGroup) {
									typeInput += '<option ' + regSel + ' value="' + regName + '">' + regName + '</option>'
								}
							}
							typeInput += '</select>';
						createElement(rows.branch, "width:200px", "td", jQuery.i18n.prop('label.admin.' + key))
						createElement(rows.branch, "width:50px;align:left'", "td", null, htmlToElement(typeInput))
						
					} else {
						createElement(rows.branch, "width:200px", "td", "")
						createElement(rows.branch, "width:50px;align:left'", "td", "")
					}
					objCols.branchTable++;
				}
				
				checkCols(objCols.generalTable, 'general', generalTable)
				checkCols(objCols.queueTable, 'queue', queueTable)
				checkCols(objCols.branchTable, 'branch', branchTable)
				checkCols(objCols.spTable, 'sp', spTable)
				checkCols(objCols.queueSpTable, 'queueSp', queueSpTable)
			}
		}
	});	
	
	slaSelect += '</select>';
	createElement(rows.general, "width:200px", "td", jQuery.i18n.prop('label.admin.sla.columns'))
	createElement(rows.general, "width:50px;align:left'", "td", null, htmlToElement(slaSelect))
	objCols.generalTable++
	checkCols(objCols.generalTable, 'general',generalTable)
	
	ticketListSelect += '</select>';
	createElement(rows.general, "width:200px", "td", jQuery.i18n.prop('label.admin.ticketList.columns'))
	createElement(rows.general, "width:50px;align:left'", "td", null, htmlToElement(ticketListSelect))
	objCols.generalTable++
	
	branchSelect += '</select>';
	createElement(rows.branch, "width:200px", "td", jQuery.i18n.prop('label.admin.branch.columns'))
	createElement(rows.branch, "width:50px;align:left'", "td", null, htmlToElement(branchSelect))
	objCols.branchTable++

	queueSelect += '</select>';
	setColsPosFirst(objCols.queueTable, 'queue', queueTable)
	createElement(rows.queue, "width:200px", "td", jQuery.i18n.prop('label.admin.queue.columns'))
	createElement(rows.queue, "width:50px;align:left'", "td", null, htmlToElement(queueSelect))
	objCols.queueTable++
	
	spSelect += '</select>';
	setColsPosFirst(objCols.spTable, 'sp', spTable)
	createElement(rows.sp, "width:200px", "td", jQuery.i18n.prop('label.admin.sp.columns'))
	createElement(rows.sp, "width:50px;align:left'", "td", null, htmlToElement(spSelect))
	objCols.spTable++
	
	queueQueueSelect += '</select>';
	setColsPosFirst(objCols.queueSpTable, 'queueSp', queueSpTable)
	createElement(rows.queueSp, "width:200px", "td", jQuery.i18n.prop('label.admin.queueQueue.columns'))
	createElement(rows.queueSp, "width:50px;align:left'", "td", null, htmlToElement(queueQueueSelect))
	
	objCols.queueSpTable++
	checkCols(objCols.queueSpTable, 'queueSp', queueSpTable)
	
	queueSpSelect += '</select>';
	createElement(rows.queueSp, "width:200px", "td", jQuery.i18n.prop('label.admin.queueSp.columns'))
	createElement(rows.queueSp, "width:50px;align:left'", "td", null, htmlToElement(queueSpSelect))
	objCols.queueSpTable++	
	
	
	function checkCols (tableCols, row, tableName) {
		if (tableCols == 2) {
			rows[row] = createRow(tableName, "height:30px")
			objCols[row+'Table'] = 0
		}
	}
	
	function setColsPosFirst (tableCols, row, tableName) {
		if (tableCols == 1) {
			rows[row] = createRow(tableName, "height:30px")
			objCols[row+'Table'] = 0
		}
	}	
	
	function resetTables(tables) {
		for (const table of tables) {
			table.replaceChildren([])
		}
	}

	Object.keys(currentSettings).forEach(function(key) {
		if ( typeof currentSettings[key] == 'boolean' ) {
			if ( currentSettings[key] === true) {
				$('#'+ key + 'Value' ).prop('checked', true);
			}
		}

		if ( key == 'theme' || key == 'gauge1' || key == 'gauge2' || key == 'gauge3' || key == 'orderTicketsInQueue'|| key == 'branchDefaultColumnSort' 
			|| key == 'defaultColumnSortingOrder' || key === 'showTabIfBranchEqualOne' || key === 'queueDefaultColumnSort' || key === 'queueQueueDefaultColumnSort' 
			|| key === 'servicePointSummaryLocation' || key === 'regionView' || key === 'queueServicePointSummaryLocation' || key == 'defaultColumnQueueSortingOrder'
			|| key == 'defaultColumnSpSortingOrder' || key === 'spDefaultColumnSort' || key === 'queueSpDefaultColumnSort' || key === 'numberFormat' || key ==='timeFormat') {
			$('#'+ key + 'Value' ).val ( currentSettings[key] );
		}

	});	
	
	$('#showRegionNameValue').multiSelect();
	$('#slaSelectValue').multiSelect();
	$('#ticketListSelectValue').multiSelect();
	setColumnOrder ('branchSelectValue',currentSettings.columnOrderBranch, "columnOrderBranch");
	setColumnOrder ('queueSelectValue',currentSettings.columnOrderQueue, 'columnOrderQueue');
	setColumnOrder ('queueQueueSelectValue',currentSettings.columnOrderQueueSpQueue, 'columnOrderQueueSpQueue'),
	setColumnOrder ('queueSpSelectValue',currentSettings.columnOrderQueueSpSp, 'columnOrderQueueSpSp');
	setColumnOrder ('spSelectValue',currentSettings.columnOrderSp, 'columnOrderSp');
	firstRun = false;
}

function setColumnOrder (tableName, list, tempList) {
	$('#'+ tableName).multiSelectOrder({ 
		keepOrder: true 	
		,afterSelect: function(values){
		//	if (firstRun == false) {
				tempSettings[tempList].push(values[0])
		//	}
		}
		, afterDeselect: function(values){
		//	if (firstRun == false) {
				var index = tempSettings[tempList].indexOf(values[0]);
				if (index !== -1) {
					tempSettings[tempList].splice(index, 1);
				}
		//	}
			}
	});
	
	for (x = 0; x < list.length; x++){
		$('#'+tableName).multiSelectOrder( 'select',list[x]);
	}
}

function getBranchGroupsSettings(){
	var regionGroupsValue = restService.get("/rest/config/branchGroups");
	if (regionGroupsValue != null && regionGroupsValue != undefined && settingsRetrieveError == false) {
		if (JSON.stringify(regionTreeSettings) !== JSON.stringify(regionGroupsValue)) {
			regionTreeSettings = regionGroupsValue;
			setGlobalVariable("ops_region_settings",JSON.stringify(regionTreeSettings));
		}
	}
	return regionTreeSettings;
}

function getInactiveBranchesSettings(){
	branchesValue = restService.get("/rest/config/branches");
	if (branchesValue != null && branchesValue != undefined) {
		currentSettings.inactiveBranches = [];
		for (j = 0; j < branchesValue.length; j++) {
			if ( branchesValue[j].enabled === false) {
				currentSettings.inactiveBranches.push( branchesValue[j].id);
			}
		}
	}
	return currentSettings.inactiveBranches;
}

function htmlToElement(html) {
	var template = document.createElement('template');
	html = html.trim();
	template.innerHTML = html;
	return template.content.firstChild;
}
function createElement (parent, style, tag, label, template) {
	var htmlTag = document.createElement(tag);
	htmlTag.style.cssText = style;
	if (label) {
		var span = document.createElement("span");
		var labelText = document.createTextNode(label);
		span.appendChild(labelText);
		htmlTag.appendChild(span);
	}
	if (template) {
		htmlTag.appendChild(template);
	}
	parent.appendChild(htmlTag);
}

function createRow (parent, style) {
	var tr = document.createElement("tr");
	tr.style.cssText = style;
	parent.appendChild(tr);
	return tr
}

function showQueueGroupSettings(reload){
	saveAdminSettings(reload, false);
	util.hideModal('settingsAdminPage');

	$("#queueGroupsAdminFormTitle").html(
		'<a href=\"#\" class=\"closeButton\" onclick="javascript:util.hideModal(\'queueGroupsAdminPage\');saveAdminSettings(true, false);;"></a>' +
			jQuery.i18n.prop('form.queue.group.settings.title'));
	$("#addGroupDiv").hide();
	$("#branchesQueueGroup").val(-1);
	$("#queueGroupView").find("tr:gt(0)").remove();
	util.showModal('queueGroupsAdminPage');
}

function editQueueGroup(br, editName, add){
	var groupsAll = currentSettings.queueGroupingSetting;
	var groups;
	grFound = -1
	sel = "--";

	for (var a= 0; a < groupsAll.length; a++) {
		if (parseInt(groupsAll[a].branchId,10) === br){
			groups = groupsAll[a].groups;
			for (var b = 0; b < groups.length; b++) {	
				if (groups[b].groupName === editName){
					grFound = b;
					sel = groups[b].queueIds;
				}
			}
		}
	}
		
	title =	jQuery.i18n.prop('form.queue.group.add.title');
	if ( add === 1) {
		title = jQuery.i18n.prop('form.queue.group.edit.title');
	}

	$("#queueGroupsEditFormTitle").html(
		'<a href=\"#\" class=\"closeButton\" onclick="javascript:util.hideModal(\'queueGroupsEditPage\')"></a>' +
			title);
	if (sel == null || sel == undefined) {
		sel = "--";
	}
			
	html = '<select id="sel_queues" multiple="multiple" class="selectBox" size="32" >'
	for (var j = 0; j < queueData.length; j++) {
		var found = false;
		var alreadySelected = findInOtherGroup(parseInt(queueData[j].id,10), groups);
	
		name = queueData[j].name;
		for (var k = 0; k < sel.length; k++) {
			if (parseInt(sel[k],10 ) == parseInt(queueData[j].id,10) ) {
				found = true;
			}
		}
  		if (!found) {
			if (alreadySelected){
				html += '<option disabled="true" value="'+queueData[j].id +'">' + name + '</option>';
			} else {
				html += '<option value="'+queueData[j].id +'">' + name + '</option>';
			}
			
		} else {
			html += '<option selected="selected" value="'+queueData[j].id +'">' + name + '</option>';
		}
	}
	
	html += '</select>'
	$("#queues").html(html);
	$("#queueGroupEditValue").val(editName);
	util.showModal('queueGroupsEditPage');
}

function findInOtherGroup( id, data ){
	v = false;
	if (data !== undefined){
		for (var y = 0; y < data.length; y++){
			u = data[y].queueIds;
			for (var z = 0; z < u.length; z++){
				if ( parseInt(u[z],10) === id){
					v = true;
				}
			}
		}
	}
	return v;	
}

function deleteQueueGroup(brId,deleteName){
	br = parseInt($("#branchesQueueGroup").val(),10);
	editName = $("#queueGroupEditValue").val();

	var groupsAll = currentSettings.queueGroupingSetting;
	for (var a= 0; a < currentSettings.queueGroupingSetting.length; a++) {
		if (parseInt(currentSettings.queueGroupingSetting[a].branchId,10) === br){
			brFound = a;
			grData = currentSettings.queueGroupingSetting[a].groups;
			
			for (var b = 0; b < currentSettings.queueGroupingSetting[a].groups.length; b++) {
				if (currentSettings.queueGroupingSetting[a].groups[b].groupName === deleteName){
					currentSettings.queueGroupingSetting[a].groups.splice(b,1);
					b = 100000;
				}
			}	
		}
	}	
	
	showBranchQueueGroups();
	saveAdminSettings(false, false);
}

function addQueueGroup(){
	br = parseInt($("#branchesQueueGroup").val(),10);
	editQueueGroup(br,"", 0)
}

function saveQueueGroupEdit(){
	br = parseInt($("#branchesQueueGroup").val(),10);
	editName = $("#queueGroupEditValue").val();

	var groupsAll = currentSettings.queueGroupingSetting;
	brFound = -1;	
	for (var a= 0; a < groupsAll.length; a++) {
		if (parseInt(groupsAll[a].branchId,10) === br){
			brFound = a;
			brData = groupsAll[a];
			grData = brData.groups[grFound];
		}
	}

	if (brFound === -1){
		brFound = groupsAll.length;
		brData = {};
		brData.branchId = br;
		brData.groups = [];
	}
	groups = brData.groups;
	nameExists = checkName(editName, brData.groups);
	
	if (nameExists === true) {
		util.showError(  jQuery.i18n.prop('error.queue.group.name.exists'));
	} else {

		if (grFound === -1){
			grFound = groups.length;
			grData = {};
		} 
		
		grData.groupName = editName;
		grData.queueIds = getListValues("queues");
		brData.groups[grFound] = grData;
		currentSettings.queueGroupingSetting[brFound] = brData;
		showBranchQueueGroups();
			
		util.hideModal('queueGroupsEditPage');
		saveAdminSettings(false, false);
	}
}

function checkName(newName, curData){
	v = false;
	if (newName.length === 0){
		v = true;
	}

	for (var x = 0; x < curData.length; x++){
		if (x !== grFound && curData[x].groupName === newName ) {
			v = true;
		}
	}
	
	return v;
}

function getListValues(box){
	x=[]
	$( "#"+box+" option:selected" ).each(function() {
		x.push(parseInt($( this ).val(),10));
	});
	return x;
}

function saveToQueueGroupVar(reload){
	saveAdminSettings(reload);
	
	br = parseInt($("#branchesQueueGroup").val(),10);
	if (br < 0) {
		$("#addGroupDiv").hide();
		$("#queueGroupView").find("tr:gt(0)").remove();
		
	} else {
		$("#addGroupDiv").show();
		queueData = restService.get("/rest/entrypoint/branches/" + br +"/queues");

		queueData.sort(function(a, b) {
			var nameA = a.name.toUpperCase(); // ignore upper and lowercase
			var nameB = b.name.toUpperCase(); // ignore upper and lowercase
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			return 0;
		});
		showBranchQueueGroups();
	}
}
	
function showBranchQueueGroups(){
		$("#queueGroupView").find("tr:gt(0)").remove();
		var groupsAll = currentSettings.queueGroupingSetting;
		
		for (var a= 0; a < groupsAll.length; a++) {
			if (parseInt(groupsAll[a].branchId,10) === br){
				groups = groupsAll[a].groups;
				
			groups.sort(function(a, b) {
				if (a.groupName < b.groupName) {
					return -1;
				}
				if (a.groupName > b.groupName) {
					return 1;
				}
				return 0;
			});
					
			for (var b = 0; b < groups.length; b++) {	
				var s = '';
				s += '<tr class="evenGroup">';
				s += '<td widthalign="left">&nbsp;&nbsp;&nbsp;' + groups[b].groupName + '</td>';
				queueNames = ""
				for (var c = 0; c < groups[b].queueIds.length; c++){
					var i = groups[b].queueIds[c]
					for ( var d = 0; d < queueData.length; d++){
						if (parseInt(queueData[d].id,10) === parseInt(i,10)) {
							if (c > 0) {
								queueNames += ", ";
							}
							queueNames += queueData[d].name;
						}
					}
				}
				s += '<td>' + queueNames + '</td>';
				var grpName = groups[b].groupName;
				grpName = grpName.replaceAll("'", "\\'")
				s += '<td width="340px" nowrap align="center" ><input type="button" onclick="javascript:editQueueGroup('+br + ', \''+ grpName  +'\',1);" value ="' + jQuery.i18n.prop('button.queue.group.edit') +'"></input>'
				s += '&nbsp;&nbsp;&nbsp;<input type="button" onclick="javascript:deleteQueueGroup('+br + ', \''+ grpName  +'\');" value = "' + jQuery.i18n.prop('button.queue.group.delete') + '"></input></td>';
				s += '</tr>';
				//s += '<tr><td colspan="3">&nbsp;</td></tr>';
				$('#queueGroupView').append(s);
			}
		}
	}
}

function saveQueueGroup(reload){
	saveAdminSettings(reload, false);
}

function saveQueueGroupAll(reload) {
	util.hideModal('queueGroupsAdminPage');
	saveAdminSettings(reload, false);
}

function showSettings() {
 	$('#graphValueGreen1').val(appSettings[0]);
	$('#graphValueAmber1').val(appSettings[1]);
	$('#graphValueRed1').val(appSettings[2]);
	$('#graphValueGreen2').val(appSettings[3]);
	$('#graphValueAmber2').val(appSettings[4]);
	$('#graphValueRed2').val(appSettings[5]);
	$('#graphValueGreen3').val(appSettings[6]);
	$('#graphValueAmber3').val(appSettings[7]);
	$('#graphValueRed3').val(appSettings[8]);
	$('#graphValueRed4').val(appSettings[9]);
	$('#graphValueAmber4').val(appSettings[10]);
	$('#graphValueGreen5').val(appSettings[12]);
	$('#graphValueAmber5').val(appSettings[13]);
	$('#graphValueRed5').val(appSettings[14]);
}

function saveSettings() {
	settingsSet = true;
	appSettings[0] = parseInt($('#graphValueGreen1').val(),10);
	appSettings[1] = parseInt($('#graphValueAmber1').val(),10);
	appSettings[2] = parseInt($('#graphValueRed1').val(),10);

	
	appSettings[3] = parseInt($('#graphValueGreen2').val(),10);
	appSettings[4] = parseInt($('#graphValueAmber2').val(),10);
	appSettings[5] = parseInt($('#graphValueRed2').val(),10);

	appSettings[6] = parseInt($('#graphValueGreen3').val(),10);
	appSettings[7] = parseInt($('#graphValueAmber3').val(),10);
	appSettings[8] = parseInt($('#graphValueRed3').val(),10);
	
	appSettings[9] = parseInt($('#graphValueRed4').val(),10);
	appSettings[10] = parseInt($('#graphValueAmber4').val(),10);
	
	appSettings[12] = parseInt($('#graphValueGreen5').val(),10);
	appSettings[13] = parseInt($('#graphValueAmber5').val(),10);
	appSettings[14] = parseInt($('#graphValueRed5').val(),10);

	//make sure the gauge levels are valid
	if (appSettings[2] == 0 ){
		appSettings[2] = 10;
	}
	if (appSettings[1] >= appSettings[2]) {
		appSettings[1] = appSettings[2] - 1;
	}
	if (appSettings[0] >= appSettings[1]) {
		appSettings[0] = appSettings[1] - 1;
	}	
	if (appSettings[5] == 0 ){
		appSettings[5] = 10;
	}
	if (appSettings[4] >= appSettings[5]) {
		appSettings[4] = appSettings[5] - 1;
	}
	if (appSettings[3] >= appSettings[4]) {
		appSettings[3] = appSettings[4] - 1;
	}
	if (appSettings[8] == 0 ){
		appSettings[8] = 10;
	}
	if (currentSettings.gauge3 === "openCounter") {
		if (appSettings[7] >= 100) {
			appSettings[7] = 80;
		}
		if (appSettings[6] >= 100 || appSettings[6] >= appSettings[7]) {
			appSettings[6] = appSettings[7] -10;
		}
	} else {
		if (appSettings[7] >= appSettings[8]) {
			appSettings[7] = appSettings[8] - 1;
		}
		if (appSettings[6] >= appSettings[7]) {
			appSettings[6] = appSettings[7] - 1;
		}	
	}
	if (appSettings[10] == 0 ){
		appSettings[10] = 50;
	}
	if (appSettings[9] >= appSettings[10]) {
		appSettings[9] = appSettings[10] - 1;
	}	
	
	if (appSettings[14] == 0 ){
		appSettings[14] = 10;
	}
	if (appSettings[13] >= appSettings[14]) {
		appSettings[13] = appSettings[14] - 1;
	}
	if (appSettings[12] >= appSettings[13]) {
		appSettings[12] = appSettings[13] - 1;
	}
	
	gaugesSettings = appSettings;
	var t = appSettings[0];
	for (i = 1 ; i < appSettings.length ; i++) {
		t += ',' + appSettings[i] ;
	}

	saveVar = restService.setGlobalVariable(slaSettingsVar, t);

if (saveVar === "Ok") {
		location.reload();
	} else {
		util.showError(jQuery.i18n.prop('error.central.cannot.be.reached'))
	}	
}

function cancelSettings() {
	if (settingsSet == false) {
		saveSettings();
	} else {
		util.hideModal('settingsPage');
	}
}

jQuery.browser = {};

(function () {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})();

function displayAdminSettings (displayTab) {
	const _tabs = document.querySelectorAll("[data-tab]");
	Array.from(_tabs).forEach((item) => {
		if(item.dataset.tab !== 'graph-content') {
			item.style.display = (displayTab) ? 'block' : 'none';
		}
	});
}