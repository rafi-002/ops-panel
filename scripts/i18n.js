
    var i18nSafe = function(elementName, propName, padding) {
        try {
            var value = propName;
            if (! (elementName == null || typeof elementName == 'undefined' ||
                propName == null || typeof propName == 'undefined') &&
                (jQuery.i18n.prop(propName))) {
                value = jQuery.i18n.prop(propName);
            }
            var element = $("#" + elementName);
            if (element != null && typeof element != 'undefined') {
                element.html(value + (typeof padding !== 'undefined' ? padding : ''));
            }
        } catch(e) {}
    };

    // prepends the i18n text to the start of the inner html string
    var i18nSafePrepend = function(elementName, propName, padding) {
        try {
            var value = propName;
            if (! (elementName == null || typeof elementName == 'undefined' ||
                propName == null || typeof propName == 'undefined') &&
                (jQuery.i18n.prop(propName))) {
                value = jQuery.i18n.prop(propName);
            }
            var element = $("#" + elementName);
            if (element != null && typeof element != 'undefined') {
                element.html(value + (typeof padding !== 'undefined' ? padding : '') + $("#" + elementName).html());
            }
        } catch(e) {}
    };

    // appends the i18n text to the end of the inner html string
    var i18nSafeAppend = function(elementName, propName, padding) {
        try {
            var value = propName;
            if (! (elementName == null || typeof elementName == 'undefined' ||
                propName == null || typeof propName == 'undefined') &&
                (jQuery.i18n.prop(propName))) {
                value = jQuery.i18n.prop(propName);
            }
            var element = $("#" + elementName);
            if (element != null && typeof element != 'undefined') {
                element.html($("#" + elementName).html() + value + (typeof padding !== 'undefined' ? padding : ''));
            }
        } catch(e) {}
    };
	
var gauge1Title = "";
var gauge2Title = "";
var gauge3Title = "";
function i18nPage() {
	
	//document title in web browser header
    document.title = jQuery.i18n.prop('title.application_name');
    $('#appName').text(jQuery.i18n.prop('title.header.application_name'));
	
	//header links
	$('#appTitle').text(jQuery.i18n.prop('application.title'));
	$('#settingsLink').text(jQuery.i18n.prop('application.settings'));
	$('#settingsAdminLink').text(jQuery.i18n.prop('application.admin.settings'));
	$('#searchLink').text(jQuery.i18n.prop('button.find.visit'));
	$('#helpLink').text(jQuery.i18n.prop('button.help'));
	$('#experienceLink').text(jQuery.i18n.prop('button.experience.portal'));
    $('#logoutLink').text(jQuery.i18n.prop('button.logout'));
	
	//forms

	$('#branchFormTitle').text(jQuery.i18n.prop('form.branch.title'));
	$('#branchSelect').text(jQuery.i18n.prop('form.branch.select'));
	$('#profileSelect').text(jQuery.i18n.prop('form.profile.select'));
	$('#webCamFormTitle').text(jQuery.i18n.prop('form.web.cam.title'));
	$('#accessRightsFormTitle').text(jQuery.i18n.prop('form.access.rights.title'));
	$('#accesRightsForm').text(jQuery.i18n.prop('form.access.rights'));
	$('#userLogoutFormTitle').text(jQuery.i18n.prop('form.user.logout.title'));
	$('#visitRemoveFormTitle').text(jQuery.i18n.prop('form.visit.remove.title'));
	$('#visitsRemoveFormTitle').text(jQuery.i18n.prop('form.visits.remove.title'));
	

	//buttons
	$('#branchFormOK').val(jQuery.i18n.prop('button.ok'));
	$('#profileFormOK').val(jQuery.i18n.prop('button.ok'));
	$('#profileFormCancel').val(jQuery.i18n.prop('button.cancel'));
	$('#webCamOpen').val(jQuery.i18n.prop('button.web.cam.open'));
	$('#webCamClose').val(jQuery.i18n.prop('button.web.cam.close'));
	$('#settingsFormOK').val(jQuery.i18n.prop('button.save'));
	$('#adminSettingsFormOK').val(jQuery.i18n.prop('button.save'));
	$('#settingsFormCancel').val(jQuery.i18n.prop('button.cancel'));
	$('#opspanelClose').val(jQuery.i18n.prop('button.opspanel.close'));
	$('#userLogoutOK').val(jQuery.i18n.prop('button.ok'));
	$('#saveGroupsFormOK').val(jQuery.i18n.prop('button.save.group.branch'));
	$('#saveGroupsAllFormOK').val(jQuery.i18n.prop('button.save.group.all'));
	$('#addGroupBt').val(jQuery.i18n.prop('button.queue.group.'));
	$('#addGroupBt').val(jQuery.i18n.prop('button.queue.group.add'));
	$('#saveEditGroupOK').val(jQuery.i18n.prop('button.save.edit.group'));
	$('#visitRemoveCancel').val(jQuery.i18n.prop('button.cancel'));
	$('#visitRemoveOK').val(jQuery.i18n.prop('button.ok'));
	$('#visitsRemoveCancel').val(jQuery.i18n.prop('button.cancel'));
	$('#visitsRemoveOK').val(jQuery.i18n.prop('button.ok'));
	$('#hideGraph').html(jQuery.i18n.prop('button.hide.graph')+"&nbsp;&nbsp;&nbsp;&nbsp;");
	$('#showGraph').html(jQuery.i18n.prop('button.show.graph')+"&nbsp;&nbsp;&nbsp;&nbsp;");
//	$('#').val(jQuery.i18n.prop('button.queue.group.'));
	
	$('#graphSettingTitle1').text(jQuery.i18n.prop('graph.setting.title.one'));
	$('#graphSettingTitle2').text(jQuery.i18n.prop('graph.setting.title.two'));
	$('#graphSettingTitle3').text(jQuery.i18n.prop('graph.setting.title.three'));
	
	gauge1Title = jQuery.i18n.prop('gauge.avg.wt.title');
	if (currentSettings.gauge1 === "maxWt") {
		gauge1Title = jQuery.i18n.prop('gauge.max.wt.title');
	}
	if (currentSettings.gauge1 === "avgWtToday") {
		gauge1Title = jQuery.i18n.prop('gauge.avg.wt.today.title');
	}
	if (currentSettings.gauge1 === "maxWtToday") {
		gauge1Title = jQuery.i18n.prop('gauge.max.wt.today.title');
	}

	gauge2Title = jQuery.i18n.prop('gauge.avg.trt.title');
	if (currentSettings.gauge2 === "maxTrt") {
		gauge2Title = jQuery.i18n.prop('gauge.max.trt.title');
	}	
	$('#graphSettingTitle5').text(jQuery.i18n.prop('graph.setting.title.six.app'));
	$('#graphSettingGreen1').text(jQuery.i18n.prop('graph.setting.green'));
	$('#graphSettingGreen2').text(jQuery.i18n.prop('graph.setting.green'));
	$('#graphSettingGreen3').text(jQuery.i18n.prop('graph.setting.green'));
	$('#graphSettingGreen5').text(jQuery.i18n.prop('graph.setting.green'));
	$('#graphSettingAmber1').text(jQuery.i18n.prop('graph.setting.amber'));
	$('#graphSettingAmber2').text(jQuery.i18n.prop('graph.setting.amber'));
	$('#graphSettingAmber3').text(jQuery.i18n.prop('graph.setting.amber'));
	$('#graphSettingAmber4').text(jQuery.i18n.prop('graph.setting.amber'));
	$('#graphSettingAmber5').text(jQuery.i18n.prop('graph.setting.amber'));
	$('#graphSettingRed1').text(jQuery.i18n.prop('graph.setting.red'));
	$('#graphSettingRed2').text(jQuery.i18n.prop('graph.setting.red'));
	$('#graphSettingRed3').text(jQuery.i18n.prop('graph.setting.red'));
	$('#graphSettingRed4').text(jQuery.i18n.prop('graph.setting.openred'));
	$('#graphSettingRed5').text(jQuery.i18n.prop('graph.setting.red'));
	
	$('#graphValueRed3').show();
	$('#graphSetting3Perc1').hide();
	$('#graphSetting3Perc2').hide();
	
	if (currentSettings.gauge3 === "openCounter") {
		$('#graphSettingTitle3').text(jQuery.i18n.prop('graph.setting.title.three'));
		$('#gaugeWtOpenTitle').text(jQuery.i18n.prop('gauge.open.title'));	
		gauge3Title	= jQuery.i18n.prop('gauge.open.title');	
		$('#graphSettingRed3').text('     ');
		$('#graphValueRed3').hide()
		$('#graphSetting3Perc1').show();
		$('#graphSetting3Perc2').show();
		$('#graphSettingGreen3').text(jQuery.i18n.prop('graph.setting.openred'));
	}
	
	if (currentSettings.gauge3 === "openCounterAvg") {
		$('#graphSettingTitle3').text(jQuery.i18n.prop('graph.setting.title.five'));
		$('#gaugeWtOpenTitle').text(jQuery.i18n.prop('gauge.avg.open.title'));	
		gauge3Title	= jQuery.i18n.prop('gauge.avg.open.title');	
		$('#graphSettingGreen3').text(jQuery.i18n.prop('graph.setting.openred'));
	}

	if (currentSettings.gauge3 === "waitOpenCounter") {
		$('#graphSettingTitle3').text(jQuery.i18n.prop('graph.setting.title.four'));
		$('#gaugeWtOpenTitle').text(jQuery.i18n.prop('gauge.wait.open.title'));
		gauge3Title	= jQuery.i18n.prop('gauge.wait.open.title');	
	}
	
	$('#graphSettingTitle4').text(jQuery.i18n.prop('graph.setting.title.closed.open'));
	
		// graph panel
	$('#graphWaitingTitle').text(jQuery.i18n.prop('graph.waiting.title'));	
	$('#graphServedTitle').text(jQuery.i18n.prop('graph.served.title'));	
	$('#gaugeAvgWtTitle').text(jQuery.i18n.prop('gauge.avg.wt.title'));	
	$('#gaugeAvgTrtTitle').text(jQuery.i18n.prop('gauge.avg.trt.title'));
	
	
	//data panels
	//Branch overview panels
	$('#branchTitle').text(jQuery.i18n.prop('panel.branch.title'));
	if (currentSettings.regionView != 'regionSeparated' && currentSettings.regionView != 'regionColapsed'){													 
		$('#branchHeaderId').text( jQuery.i18n.prop('panel.branch.header.id'));
		$('#branchAppointHeaderId').text( jQuery.i18n.prop('panel.branch.header.id'));
	}
	$('#branchHeaderName').text(jQuery.i18n.prop('panel.branch.header.name'));
	$('#branchAppointHeaderName').text(jQuery.i18n.prop('panel.branch.header.name'));
	$('#branchHeaderServed').text(jQuery.i18n.prop('panel.branch.header.served'));
	$('#branchHeaderNps').text(jQuery.i18n.prop('panel.branch.header.served'));
	if (currentSettings.showBranchNoShow == true) {
		$('#branchHeaderNoShow').text(jQuery.i18n.prop('panel.branch.header.noShow'));
	}
	if (currentSettings.showNpsOnBranchTab == true) {
		$('#branchHeaderNps').text(jQuery.i18n.prop('panel.branch.header.nps'));
	}
	if (currentSettings.regionView == 'regionSeparated' || currentSettings.regionView == 'regionColapsed'){
		$('#branchHeaderRegion').text(jQuery.i18n.prop('panel.branch.header.region'));
		$('#branchAppointHeaderRegion').text(jQuery.i18n.prop('panel.branch.header.region'));
	}
	
	$('#branchHeaderWaiting').text(jQuery.i18n.prop('panel.branch.header.waiting'));
	$('#branchHeaderAvgWt').text(jQuery.i18n.prop('panel.branch.header.avg.wt'));
	$('#branchHeaderAvgTrt').text(jQuery.i18n.prop('panel.branch.header.avg.trt'));
	$('#branchHeaderOpen').text(jQuery.i18n.prop('panel.branch.header.open'));
	$('#branchHeaderClosed').text(jQuery.i18n.prop('panel.branch.header.closed'));
	$('#branchHeaderUpdated').text(jQuery.i18n.prop('panel.branch.header.updated'));
	$('#branchHeaderStatus').text(jQuery.i18n.prop('panel.branch.header.status'));	
	$('#branchHeaderLogon').text(jQuery.i18n.prop('panel.branch.header.logon'));	
	$('#branchHeaderSL').text(jQuery.i18n.prop('panel.branch.header.trt'));
	$('#branchHeaderMaxWt').text(jQuery.i18n.prop('panel.branch.header.max.wt'));
	$('#branchHeaderMaxTrt').text(jQuery.i18n.prop('panel.branch.header.max.trt'));
	$('#branchHeaderWaitedAboveSl').text(jQuery.i18n.prop('panel.branch.header.waited.above.sl'));
	$('#branchHeaderMaxWtToday').text(jQuery.i18n.prop('panel.header.max.wt.today'));
	$('#branchHeaderAvgWtToday').text(jQuery.i18n.prop('panel.header.avg.wt.today'));
	$('#branchHeaderWaitingDelayed').text(jQuery.i18n.prop('panel.header.delayed'));
	$('#branchHeaderTickets').text(jQuery.i18n.prop('panel.header.tickets'));
	$('#branchHeaderHistory').text(jQuery.i18n.prop('panel.header.history'));
	$('#branchHeaderAction').text(jQuery.i18n.prop('panel.header.action'));
	
	
	if (currentSettings.showAppointments) {
		$('#branchTitleAppoint').text(jQuery.i18n.prop('panel.branch.title'));
		$('#appointTitle').text(jQuery.i18n.prop('panel.appoint.title'));
		$('#appointTitleAppoint').text(jQuery.i18n.prop('panel.appoint.title'));
	}
	if (currentSettings.regionView == 'regionSeparated' || currentSettings.regionView == 'regionColapsed') {
		$('#branchRegionTitle').text(jQuery.i18n.prop('panel.branch.title'));
		$('#appointRegionTitle').text(jQuery.i18n.prop('panel.appoint.title'));
	}
	
	$('#regionTitle').text(jQuery.i18n.prop('panel.region.title'));
	$('#regionRegionTitle').text(jQuery.i18n.prop('panel.region.title'));
	$('#regionTitleAppoint').text(jQuery.i18n.prop('panel.region.title'));
	$('#queueSpTitleRegion').text(jQuery.i18n.prop('panel.region.title'));
	$('#queueTitleRegion').text(jQuery.i18n.prop('panel.region.title'));
	$('#servicepointTitleRegion').text(jQuery.i18n.prop('panel.region.title'));
	$('#npsTitleRegion').text(jQuery.i18n.prop('panel.region.title'));
	$('#webcamTitleRegion').text(jQuery.i18n.prop('panel.region.title'));
	
	
	$('#branchAppointHeaderBooked').text(jQuery.i18n.prop('panel.branch.appoint.header.booked'));
	$('#branchAppointHeaderArrived').text(jQuery.i18n.prop('panel.branch.appoint.header.arrived'));
	$('#branchAppointHeaderPending').text(jQuery.i18n.prop('panel.branch.appoint.header.pending'));
	
	//queue overview panels
	$('#queueTitleBranch').text(jQuery.i18n.prop('panel.branch.title'));
	$('#queueTitleQueue').text(jQuery.i18n.prop('panel.queue.title'));
	$('#queueTitleQueueServicepoint').text(jQuery.i18n.prop('panel.queue.servicepoint.title'));
	$('#queueHeaderId').text(jQuery.i18n.prop('panel.queue.header.id'));
	$('#queueHeaderName').text(jQuery.i18n.prop('panel.queue.header.name'));
	$('#queueHeaderServed').text(jQuery.i18n.prop('panel.queue.header.served'));
	$('#queueHeaderSL').text(jQuery.i18n.prop('panel.branch.header.trt'));
	$('#queueHeaderMaxTrt').text(jQuery.i18n.prop('panel.branch.header.max.trt'));
	$('#queueHeaderWaitedAboveSl').text(jQuery.i18n.prop('panel.branch.header.waited.above.sl'));
	$('#queueHeaderMaxWtToday').text(jQuery.i18n.prop('panel.header.max.wt.today'));
	$('#queueHeaderAvgWtToday').text(jQuery.i18n.prop('panel.header.avg.wt.today'));
	$('#queueHeaderWaitingDelayed').text(jQuery.i18n.prop('panel.header.delayed'));
	
	if (currentSettings.queueShowRecycled == true) {
		$('#queueHeaderRecycled').text(jQuery.i18n.prop('panel.queue.header.recycled'));
	}

	if (currentSettings.queueShowServices == true) {
		$('#queueHeaderServices').text(jQuery.i18n.prop('panel.queue.header.services'));
	}
	
	if (currentSettings.queueShowTransactions == true) {
		$('#queueHeaderTransactions').text(jQuery.i18n.prop('panel.queue.header.transactions'));
	}

	
	if (currentSettings.showQueueNoShow == true) {
		$('#queueHeaderNoShow').text(jQuery.i18n.prop('panel.queue.header.noShow'));
	}
	
	$('#queueHeaderWaiting').text(jQuery.i18n.prop('panel.queue.header.waiting'));
	$('#queueHeaderRealWt').text(jQuery.i18n.prop('panel.queue.header.real.wt'));
	$('#queueHeaderEstWt').text(jQuery.i18n.prop('panel.queue.header.est.wt'));	
	$('#queueHeaderAvgWt').text(jQuery.i18n.prop('panel.queue.header.avg.wt'));
	$('#queueHeaderMaxWt').text(jQuery.i18n.prop('panel.queue.header.max.wt'));
	$('#queueHeaderAvgTrt').text(jQuery.i18n.prop('panel.queue.header.avg.trt'));
	$('#queueHeaderOpen').text(jQuery.i18n.prop('panel.queue.header.open'));
	$('#queueHeaderAction').text(jQuery.i18n.prop('panel.header.action'));
	
	//servicepoint overview panels
	$('#servicepointTitleBranch').text(jQuery.i18n.prop('panel.branch.title'));
	$('#servicepointTitleQueue').text(jQuery.i18n.prop('panel.queue.title'));
	$('#servicepointTitleQueueServicepoint').text(jQuery.i18n.prop('panel.queue.servicepoint.title'));
	$('#servicepointHeaderId').text(jQuery.i18n.prop('panel.servicepoint.header.id'));
	$('#servicepointHeaderName').text(jQuery.i18n.prop('panel.servicepoint.header.name'));
	if (currentSettings.showServicePointStaff == true) {
		$('#servicepointHeaderStaff').text(jQuery.i18n.prop('panel.servicepoint.header.staff'));
		$('#queueServicepointHeaderStaff').text(jQuery.i18n.prop('panel.servicepoint.header.staff'));
	}

	$('#servicepointHeaderFirstLogin').text(jQuery.i18n.prop('panel.servicepoint.header.firstlogin'));
	$('#servicepointHeaderLastLogout').text(jQuery.i18n.prop('panel.servicepoint.header.lastlogout'));
	$('#servicepointHeaderQueue').text(jQuery.i18n.prop('panel.servicepoint.header.queue'));
	$('#servicepointHeaderService').text(jQuery.i18n.prop('panel.servicepoint.header.service'));
	$('#servicepointHeaderTicket').text(jQuery.i18n.prop('panel.servicepoint.header.ticket'));
	$('#servicepointHeaderCustomer').text(jQuery.i18n.prop('panel.servicepoint.header.customer'));
	$('#servicepointHeaderServed').text(jQuery.i18n.prop('panel.servicepoint.header.served'));
	if (!currentSettings.userServed && currentSettings.showUserServedAboveSl ){
		$('#servicepointHeaderServed').text(jQuery.i18n.prop('panel.servicepoint.header.servedAboveSl'));
	}
	
	
	$('#servicepointHeaderTrt').text(jQuery.i18n.prop('panel.servicepoint.header.trt'));
	$('#servicepointHeaderProfile').text(jQuery.i18n.prop('panel.servicepoint.header.profile'));
	if (currentSettings.userForceLogout){
	$('#servicepointHeaderLogout').text(jQuery.i18n.prop('panel.servicepoint.header.logout'));
	}
	$('#servicepointHeaderExpressia').text(jQuery.i18n.prop('panel.servicepoint.header.expressia'));
	$('#servicepointHeaderWt').text(jQuery.i18n.prop('panel.servicepoint.header.wt'));
	$('#servicepointHeaderAvgTrt').text(jQuery.i18n.prop('panel.servicepoint.header.trt.avg'));
	$('#servicepointHeaderMaxTrt').text(jQuery.i18n.prop('panel.servicepoint.header.trt.max'));
	$('#servicepointHeaderStatusSp').text(jQuery.i18n.prop('panel.servicepoint.header.status.sp'));
	$('#servicepointHeaderCurrentIdleTime').text(jQuery.i18n.prop('panel.servicepoint.header.idle.current'));
	$('#servicepointHeaderTotalIdleTime').text(jQuery.i18n.prop('panel.servicepoint.header.idle.total'));
	$('#servicepointHeaderAvgIdleTime').text(jQuery.i18n.prop('panel.servicepoint.header.idle.avg'));
	
	// logout popup
	
	$("#userLogoutFormTitle").html(
		'<a href=\"#\" class=\"closeButton\" onclick="util.hideModal(\'userLogoutPage\');"></a>' +
			jQuery.i18n.prop('form.user.logout.title'));
	

	// queue groups
	$('#queueGroupName').text(jQuery.i18n.prop('queue.group.name'));
	$('#queueGroupQueues').text(jQuery.i18n.prop('queue.group.queues'));
	$('#queueGroupActions').text(jQuery.i18n.prop('queue.group.actions'));
	$('#includedViewQueues').text(jQuery.i18n.prop('queue.group.queues'));
	$('#queueGroupNameLabel').text(jQuery.i18n.prop('queue.group.name'));
	
	
	// ticket search
	$('#branchSelectSearch').text(jQuery.i18n.prop('branch.select.search'));
	$('#ticketSearch').text(jQuery.i18n.prop('ticket.search'));
	$('#searchFormSearch').val(jQuery.i18n.prop('button.search'));
	$('#searchFormCancel').val(jQuery.i18n.prop('button.cancel'));
	$('#searchTicketId').text(jQuery.i18n.prop('search.ticket.id'));
	$('#searchActions').text(jQuery.i18n.prop('search.actions'));
	$('#searchQueue').text(jQuery.i18n.prop('search.queue'));
	$('#searchService').text(jQuery.i18n.prop('search.service'));
	$('#searchAppointTime').text(jQuery.i18n.prop('search.appoint.time'));
	$('#searchWaitingTime').text(jQuery.i18n.prop('search.waiting.time'));
	$('#searchCustomerName').text(jQuery.i18n.prop('search.customer.name'));
	$('#searchNotes').text(jQuery.i18n.prop('search.notes'));
	
	// admin settings
	$('#themeLabel').text(jQuery.i18n.prop('label.admin.theme'));

	$('#branchSelectQueueGroup').text(jQuery.i18n.prop('branch.select.search'));

	$('#branchOnlinePerc').text(jQuery.i18n.prop('branch.online.perc'));	
	
	//nps overview panels
	$('#npsTitleBranch').text(jQuery.i18n.prop('panel.branch.title'));
	$('#npsTitleQueue').text(jQuery.i18n.prop('panel.queue.title'));
	$('#npsTitleQueueServicepoint').text(jQuery.i18n.prop('panel.queue.servicepoint.title'));
	
	//webcam overview panels
	$('#webcamTitleBranch').text(jQuery.i18n.prop('panel.branch.title'));
	$('#webcamTitleQueue').text(jQuery.i18n.prop('panel.queue.title'));
	$('#webcamTitleQueueServicepoint').text(jQuery.i18n.prop('panel.queue.servicepoint.title'));
	
	if (currentSettings.npsEnabled) {
		$('#branchTitleNps').text(jQuery.i18n.prop('panel.nps.title'));
		$('#queueTitleNps').text(jQuery.i18n.prop('panel.nps.title'));
		$('#servicepointTitleNps').text(jQuery.i18n.prop('panel.nps.title'));
		$('#npsTitleNps').text(jQuery.i18n.prop('panel.nps.title'));
		$('#webcamTitleNps').text(jQuery.i18n.prop('panel.nps.title'));
	}
	
	if (currentSettings.servicePointSummaryLocation == 'spTab' ) {
		$('#queueTitleServicepoint').text(jQuery.i18n.prop('panel.servicepoint.title'));
		$('#servicepointTitleServicepoint').text(jQuery.i18n.prop('panel.servicepoint.title'));
		$('#npsTitleServicepoint').text(jQuery.i18n.prop('panel.servicepoint.title'));
		$('#webcamTitleServicepoint').text(jQuery.i18n.prop('panel.servicepoint.title'));
	}
	
	if (currentSettings.servicePointSummaryLocation == 'queueTab' ) {
		$('#queueTitleQueue').text(jQuery.i18n.prop('panel.queue.servicepoint.title'));
		$('#npsTitleQueue').text(jQuery.i18n.prop('panel.queue.servicepoint.title'));
		$('#webcamTitleQueue').text(jQuery.i18n.prop('panel.queue.servicepoint.title'));
		$('#queueSummaryHeaderQueues').html("<br>" + jQuery.i18n.prop('panel.queue.title'));
		$('#queueSummaryHeaderSp').html("<br>" + jQuery.i18n.prop('panel.servicepoint.title'));
	}
	
	
	if (currentSettings.webCamEnabled) {
		$('#branchTitleWebcam').text(jQuery.i18n.prop('panel.webcam.title'));
		$('#queueTitleWebcam').text(jQuery.i18n.prop('panel.webcam.title'));
		$('#servicepointTitleWebcam').text(jQuery.i18n.prop('panel.webcam.title'));
		$('#npsTitleWebcam').text(jQuery.i18n.prop('panel.webcam.title'));
		$('#webcamTitleWebcam').text(jQuery.i18n.prop('panel.webcam.title'));
	}
	// region panel
	$('#regionHeaderTitle').text(jQuery.i18n.prop('panel.region.header.region'));
	$('#regionHeaderBranches').text(jQuery.i18n.prop('panel.region.header.branches'));
	$('#regionHeaderServed').text(jQuery.i18n.prop('panel.region.header.served'));
	$('#regionHeaderNoShow').text(jQuery.i18n.prop('panel.region.header.noShow'));
	$('#regionHeaderNps').text(jQuery.i18n.prop('panel.region.header.nps'));
	$('#regionHeaderWaiting').text(jQuery.i18n.prop('panel.region.header.waiting'));
	$('#regionHeaderAvgWt').text(jQuery.i18n.prop('panel.region.header.avg.wt'));
	$('#regionHeaderMaxWt').text(jQuery.i18n.prop('panel.region.header.max.wt'));
	$('#regionHeaderWaitedAboveSl').text(jQuery.i18n.prop('panel.region.header.waited.above.sl'));
	$('#regionHeaderAvgWtToday').text(jQuery.i18n.prop('panel.header.avg.wt.today'));
	$('#regionHeaderMaxWtToday').text(jQuery.i18n.prop('panel.header.max.wt.today'));
	$('#regionHeaderAvgTrt').text(jQuery.i18n.prop('panel.region.header.avg.trt'));
	$('#regionHeaderMaxTrt').text(jQuery.i18n.prop('panel.region.header.max.trt'));
	$('#regionHeaderSL').text(jQuery.i18n.prop('panel.region.header.trt'));
	$('#regionHeaderOpen').text(jQuery.i18n.prop('panel.region.header.open'));
	$('#regionHeaderClosed').text(jQuery.i18n.prop('panel.region.header.closed'));
	$('#regionHeaderWaitingDelayed').text(jQuery.i18n.prop('panel.header.delayed'));
	
	// queue and sp overview
	$('#queueSummaryHeaderQueueQueues').html( jQuery.i18n.prop('panel.queue.title'));
	$('#queueSummaryHeaderQueueSp').html(jQuery.i18n.prop('panel.servicepoint.title'));
	$('#queueSpTitleBranch').text(jQuery.i18n.prop('panel.branch.title'));
	$('#queueSpTitleQueue').text(jQuery.i18n.prop('panel.queue.title'));
	$('#queueSpTitleQueueServicepoint').text(jQuery.i18n.prop('panel.queue.servicepoint.title'));
	$('#queueSpTitleServicepoint').text(jQuery.i18n.prop('panel.servicepoint.title'));
	$('#queueSpTitleNps').text(jQuery.i18n.prop('panel.nps.title'));
	$('#queueSpTitleWebcam').text(jQuery.i18n.prop('panel.webcam.title'));
	$('#queueQueueHeaderId').text(jQuery.i18n.prop('panel.queue.header.id'));
	$('#queueQueueHeaderName').text(jQuery.i18n.prop('panel.queue.header.name'));
	$('#queueQueueHeaderServed').text(jQuery.i18n.prop('panel.queue.header.served'));
	$('#queueQueueHeaderSL').text(jQuery.i18n.prop('panel.branch.header.trt'));
	$('#queueQueueHeaderMaxTrt').text(jQuery.i18n.prop('panel.branch.header.max.trt'));
	$('#queueQueueHeaderWaitedAboveSl').text(jQuery.i18n.prop('panel.branch.header.waited.above.sl'));
	$('#queueQueueHeaderWaitingDelayed').text(jQuery.i18n.prop('panel.header.delayed'));
	$('#queueQueueHeaderMaxWtToday').text(jQuery.i18n.prop('panel.header.max.wt.today'));
	$('#queueQueueHeaderAvgWtToday').text(jQuery.i18n.prop('panel.header.avg.wt.today'));
	$('#queueQueueHeaderRecycled').text(jQuery.i18n.prop('panel.queue.header.recycled'));
	$('#queueQueueHeaderServices').text(jQuery.i18n.prop('panel.queue.header.services'));
	$('#queueQueueHeaderTransactions').text(jQuery.i18n.prop('panel.queue.header.transactions'));
	$('#queueQueueHeaderNoShow').text(jQuery.i18n.prop('panel.queue.header.noShow'));
	$('#queueQueueHeaderWaiting').text(jQuery.i18n.prop('panel.queue.header.waiting'));
	$('#queueQueueHeaderRealWt').text(jQuery.i18n.prop('panel.queue.header.real.wt'));
	$('#queueQueueHeaderEstWt').text(jQuery.i18n.prop('panel.queue.header.est.wt'));	
	$('#queueQueueHeaderAvgWt').text(jQuery.i18n.prop('panel.queue.header.avg.wt'));
	$('#queueQueueHeaderMaxWt').text(jQuery.i18n.prop('panel.queue.header.max.wt'));
	$('#queueQueueHeaderAvgTrt').text(jQuery.i18n.prop('panel.queue.header.avg.trt'));
	$('#queueQueueHeaderOpen').text(jQuery.i18n.prop('panel.queue.header.open'));
	$('#queueQueueHeaderAction').text(jQuery.i18n.prop('panel.header.action'));
	$('#queueServicepointHeaderId').text(jQuery.i18n.prop('panel.servicepoint.header.id'));
	$('#queueServicepointHeaderName').text(jQuery.i18n.prop('panel.servicepoint.header.name'));
	$('#queueServicepointHeaderFirstLogin').text(jQuery.i18n.prop('panel.servicepoint.header.firstlogin'));
	$('#queueServicepointHeaderLastLogout').text(jQuery.i18n.prop('panel.servicepoint.header.lastlogout'));
	$('#queueServicepointHeaderQueue').text(jQuery.i18n.prop('panel.servicepoint.header.queue'));
	$('#queueServicepointHeaderService').text(jQuery.i18n.prop('panel.servicepoint.header.service'));
	$('#queueServicepointHeaderTicket').text(jQuery.i18n.prop('panel.servicepoint.header.ticket'));
	$('#queueServicepointHeaderCustomer').text(jQuery.i18n.prop('panel.servicepoint.header.customer'));
	$('#queueServicepointHeaderServed').text(jQuery.i18n.prop('panel.servicepoint.header.served'));
	if (!currentSettings.userServed && currentSettings.showUserServedAboveSl ){
		$('#ervicepointHeaderServed').text(jQuery.i18n.prop('panel.servicepoint.header.servedAboveSl'));
	}
	$('#queueServicepointHeaderTrt').text(jQuery.i18n.prop('panel.servicepoint.header.trt'));
	$('#queueServicepointHeaderProfile').text(jQuery.i18n.prop('panel.servicepoint.header.profile'));
	$('#queueServicepointHeaderLogout').text(jQuery.i18n.prop('panel.servicepoint.header.logout'));
	$('#queueServicepointHeaderExpressia').text(jQuery.i18n.prop('panel.servicepoint.header.expressia'));
	$('#queueServicepointHeaderWt').text(jQuery.i18n.prop('panel.servicepoint.header.wt'));
	$('#queueServicepointHeaderAvgTrt').text(jQuery.i18n.prop('panel.servicepoint.header.trt.avg'));
	$('#queueServicepointHeaderMaxTrt').text(jQuery.i18n.prop('panel.servicepoint.header.trt.max'));
	
	$('#queueServicepointHeaderStatusSp').text(jQuery.i18n.prop('panel.servicepoint.header.status.sp'));
	$('#queueServicepointHeaderCurrentIdleTime').text(jQuery.i18n.prop('panel.servicepoint.header.idle.current'));
	$('#queueServicepointHeaderTotalIdleTime').text(jQuery.i18n.prop('panel.servicepoint.header.idle.total'));
	$('#queueServicepointHeaderAvgIdleTime').text(jQuery.i18n.prop('panel.servicepoint.header.idle.avg'));
	
	// transfer popup
	$('#transferPopupQueueBtn').text(jQuery.i18n.prop('action.transfer.to.queue'));
	$('#transferPopupStaffBtn').text(jQuery.i18n.prop('action.transfer.to.user'));
	$('#transferPopupSpBtn').text(jQuery.i18n.prop('action.transfer.to.counter'));
	
	// tooltips
	$('#regionVisibilityToolTip').text(jQuery.i18n.prop('tooltip.visibility.enable'));
	$('#branchVisibilityToolTip').text(jQuery.i18n.prop('tooltip.visibility.enable'));
	$('#appointVisibilityToolTip').text(jQuery.i18n.prop('tooltip.visibility.enable'));
	$('#queueVisibilityToolTip').text(jQuery.i18n.prop('tooltip.visibility.enable'));
	$('#servicepointVisibilityToolTip').text(jQuery.i18n.prop('tooltip.visibility.enable'));
	$('#queueSpVisibilityToolTip').text(jQuery.i18n.prop('tooltip.visibility.enable'));
	
	$('#regionDensityToolTip').text(jQuery.i18n.prop('tooltip.density'));
	$('#branchDensityToolTip').text(jQuery.i18n.prop('tooltip.density'));
	$('#appointDensityToolTip').text(jQuery.i18n.prop('tooltip.density'));
	$('#queueDensityToolTip').text(jQuery.i18n.prop('tooltip.density'));
	$('#servicepointDensityToolTip').text(jQuery.i18n.prop('tooltip.density'));
	$('#queueSpDensityToolTip').text(jQuery.i18n.prop('tooltip.density'));
}