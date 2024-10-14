var tableConfig = {
	"bDestroy": true,
    "sScrollX": "100%",
    "sScrollY": "300px",
    "oLanguage": {
        "sSearch": jQuery.i18n.prop('info.search')
    },
    "bFilter": false,
    "bLengthChange": false,
    "bPaginate": false,
    "bProcessing": true,
	"bInfo":false
}

var tableConfigNoSort = {
	"bDestroy": true,
    "sScrollX": "100%",
    "sScrollY": "300px",
    "oLanguage": {
        "sSearch": jQuery.i18n.prop('info.search')
    },
    "bFilter": false,
    "bLengthChange": false,
    "bPaginate": false,
    "bProcessing": true,
	"bSort": false,
	"bInfo":false
}

function initTableSort(tableToSort, columnToSortOn, defaultSortOrder, allowSort, columnToSortTwo){
	var listForSort = [[columnToSortOn ,defaultSortOrder]]
	if ( columnToSortTwo !== undefined){
		listForSort = [[columnToSortOn ,defaultSortOrder],[columnToSortTwo,0]]
	}
	if (allowSort == true){
		$(tableToSort).tablesorter( { 
				sortList: listForSort
				,sortReset : true
				,usNumberFormat : sortUsNumberFormat 
				,widgets: [ 'stickyHeaders' ]
				,widgetOptions: {
				// extra class name added to the sticky header row
				stickyHeaders : 'stickyAdded',
				// number or jquery selector targeting the position:fixed element
				stickyHeaders_offset : tableSorterOffset,
				// added to table ID, if it exists
				stickyHeaders_cloneId : '-sticky',
				// trigger "resize" event on headers
				stickyHeaders_addResizeEvent : true,
				// if false and a caption exist, it won't be included in the sticky header
				stickyHeaders_includeCaption : true,
				// The zIndex of the stickyHeaders, allows the user to adjust this to their needs
				stickyHeaders_zIndex : 2,
				// jQuery selector or object to attach sticky header to
				stickyHeaders_attachTo :null,
				// jQuery selector or object to monitor horizontal scroll position (defaults: xScroll > attachTo > window)
				stickyHeaders_xScroll : null,
				// jQuery selector or object to monitor vertical scroll position (defaults: yScroll > attachTo > window)
				stickyHeaders_yScroll : null,
				// scroll table top into view after filtering
				stickyHeaders_filteredToTop: true
			}
		});
	} else {
		$(tableToSort).tablesorter( { 
			widgets: [ 'stickyHeaders' ]
			,widgetOptions: {
				stickyHeaders : 'stickyAdded',
				stickyHeaders_offset : tableSorterOffset,
				stickyHeaders_cloneId : '-sticky',
				stickyHeaders_addResizeEvent : true,
				stickyHeaders_includeCaption : true,
				stickyHeaders_zIndex : 2,
				stickyHeaders_attachTo :null,
				stickyHeaders_xScroll : null,
				stickyHeaders_yScroll : null,
				stickyHeaders_filteredToTop: true
			},
			headers: {
				0: { sorter: false},1: { sorter: false},2: { sorter: false},3: { sorter: false},4: { sorter: false},5: { sorter: false}
				,6: { sorter: false},7: { sorter: false},8: { sorter: false},9: { sorter: false},10: { sorter: false}
				,11: { sorter: false},12: { sorter: false},13: { sorter: false},14: { sorter: false},15: { sorter: false}
				,16: { sorter: false},17: { sorter: false},18: { sorter: false},19: { sorter: false},20: { sorter: false}
				,21: { sorter: false},22: { sorter: false},23: { sorter: false},24: { sorter: false},25: { sorter: false}
			}
		});
	}
}

var tableSorterOffset = 54;

function addToolTipsToTables(){
	if (currentSettings.enableToolTipsOnHeaders){
		addTooltips('regionView', false);
		addTooltips('branchView', false);
		addTooltips('queueView', false);
		addTooltips('appointView', false);
		addTooltips('servicepointView', false);
		addTooltips('queueQueueView', false);
		addTooltips('queueServicepointView', false);
		addTooltips('regionView-sticky', false);
		addTooltips('branchView-sticky', false);
		addTooltips('queueView-sticky', false);
		addTooltips('appointView-sticky', false);
		addTooltips('servicepointView-sticky', false);
		addTooltips('queueQueueView-sticky', false);
		addTooltips('queueServicepointView-sticky', false);
	}
}

function setTableConfig(){
//	$("#branchView").DataTable(tableConfig);
//	$("#queueView").dataTable(tableConfig); 
//	$("#queueView_info").hide()
//	$("#regionView").dataTable(tableConfig);
//	$("#branchView").dataTable(tableConfig);
//	$("#appointView").dataTable(tableConfig);
//	$("#servicepointView").dataTable(tableConfig);
//	$("#queueQueueView").dataTable(tableConfig);
//	$("#queueServicepointView").dataTable(tableConfig);
}


function addTooltips (tableName) {
	var tableView = document.getElementById(tableName);
	tableName = tableName.replace('-sticky','');
	if (tableView !== null){
	// temp removed - needed to find the header when using datatables
	//tableView = document.getElementById(tableName+"_wrapper").getElementsByClassName("dataTables_scroll")[0].getElementsByClassName("dataTables_scrollHead")[0].getElementsByClassName("dataTables_scrollHeadInner")[0].getElementsByClassName("display")[0]
		for(var i = 0 ; i < tableView.children.length ; i++) {
			if(tableView.children[i].localName !== 'thead') break;
			var th = tableView.children[i].children[0].children;
			for(var j = 0 ; j < th.length ; j++) {
				var tooltipId = th[j].id;
				tooltipId = (tableName === 'regionView') ? tooltipId.replace("region", "") : (tableName === 'branchView') ? tooltipId.replace("branch", "") : 
					(tableName === 'appointView') ? tooltipId.replace("branchAppoint", "") : (tableName === 'servicepointView') ? tooltipId.replace("servicepoint", "") : 
					(tableName === 'queueView') ? tooltipId.replace("queue", "") : tooltipId.replace("queueQueue", "").replace("queueServicepoint", "") 
				if(tooltipId ==='HeaderGroup' ) {
					continue;
				}
				if((tableName === 'branchView' && tooltipId === 'HeaderServed' && currentSettings.showBranchServedAboveSl) || (tooltipId === 'HeaderWaiting' && currentSettings.showBranchWaitedAboveSl)) {
					th[j].innerHTML += '<span class="tooltiptext">'+jQuery.i18n.prop(`tooltip.${tooltipId}SL`)+'</span>'
					continue;
				}
				if((tableName === 'queueView' &&tooltipId === 'HeaderServed' && currentSettings.showQueueServedAboveSl) || (tooltipId === 'HeaderWaiting' && currentSettings.showQueueWaitedAboveSl)) {
					th[j].innerHTML += '<span class="tooltiptext">'+jQuery.i18n.prop(`tooltip.${tooltipId}SL`)+'</span>'
					continue;
				}
				if((tableName === 'queueQueueView' &&tooltipId === 'HeaderServed' && currentSettings.showQueueSpServedAboveSl) || (tooltipId === 'HeaderWaiting' && currentSettings.showQueueSpWaitedAboveSl)) {
					th[j].innerHTML += '<span class="tooltiptext">'+jQuery.i18n.prop(`tooltip.${tooltipId}SL`)+'</span>'
					continue;
				}
				if((tableName === 'servicepointView' &&tooltipId === 'HeaderServed' && currentSettings.showUserServedAboveSl)) {
					th[j].innerHTML += '<span class="tooltiptext">'+jQuery.i18n.prop(`tooltip.${tooltipId}SL`)+'</span>'
					continue;
				}
				if((tableName === 'queueServicepointView' &&tooltipId === 'HeaderServed' && currentSettings.showQueueSpUserServedAboveSl)) {
					th[j].innerHTML += '<span class="tooltiptext">'+jQuery.i18n.prop(`tooltip.${tooltipId}SL`)+'</span>'
					continue;
				}
				if(tooltipId === 'HeaderName') {
					var name = (tableName === 'branchView') ? jQuery.i18n.prop(`tooltip.branch`) :  (tableName === 'appointView') ? jQuery.i18n.prop(`tooltip.branch`) :  (tableName === 'queueView' || tableName === 'queueQueueView' ) ? jQuery.i18n.prop(`tooltip.queue`) : jQuery.i18n.prop(`tooltip.servicepoint`)
					th[j].innerHTML += '<span class="tooltiptext">'+jQuery.i18n.prop(`tooltip.${tooltipId}`) + ' ' + name +'</span>';
					continue;
				}
				
				if (tooltipId !== 'HeaderDensity' && tooltipId !== 'HeaderStatusIcon') {
					if (j == 0) {
						th[j].innerHTML += '<span class="tooltiptextfirst">'+jQuery.i18n.prop(`tooltip.${tooltipId}`)+'</span>'
					} else {
						if ( j > th.length-4) {
							th[j].innerHTML += '<span class="tooltiptextlast">'+jQuery.i18n.prop(`tooltip.${tooltipId}`)+'</span>'
						} else {
							th[j].innerHTML += '<span class="tooltiptext">'+jQuery.i18n.prop(`tooltip.${tooltipId}`)+'</span>'
						}
					}
				}
			}
		}
	}
}


function saveTableDensity() {
	val = parseInt(userMapping.tableDensity,10);
	if (val >= 0 && val < 1){
		val += 1;
	} else {
		val = 0;
	}
	userMapping.tableDensity = val;
	newVar= JSON.stringify(userMapping);
	setGlobalVariable('opsusermapping_'+ oasUser,newVar);
	updateTableDensity(val);
}

function updateTableDensity(val){
	newRowHeight = 52;
	if (val == 1) {
		newRowHeight = 30;
	}
	loadjscssfile("./css/tableDensity"+val+".css", "css");
}

function addColumn(table, column, type, width) {
	th = '<th id="' + column + '"'
	if (type == 0) {
		th += ' class="tooltip">'
	}
	if (type == 1) {
		th += ' width="' + width + 'px" class="tooltip">'
	}

	if (type == 2) {
		th += ' width="10px" class="tooltip"><img src="images/icon_status_green.png" width="10px" height="10px">'
	}
	th += '</th>' 
	$('#' + table + ' thead tr').append(th)
}	