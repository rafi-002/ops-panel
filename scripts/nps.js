var selectedService = 0;
var gaugeNps1,gaugeNps2;
var refreshTimer;

function branchNpsOverview( ) {
	variableAll = util.getStatVariables(3);
	if (services == undefined) {
		services = restService.get('/rest/entrypoint/branches/' + selectedBranchId + '/services')
	}
	services.sort( function( a, b ) {
		return ( a.internalName > b.internalName ) ? 1 : ( ( b.internalName > a.internalName ) ? -1 : 0);
		} 
	); 
	if (selectedView != 3) {
		showPanel(3, selectedBranchId, selectedBranchName);
		createServiceSelection();
	}

	getBranchGraphData(selectedBranchId);
	
}


function createServiceSelection() {
		var selectorDiv = $('<div id="aa" ></div>').addClass('npsServiceSelector');
		var selector = $('<select id="serviceSelect"/>');
		selectorDiv.append(selector);
		selectedService = 0;

		for(var i=0;i<services.length;i++) {
			option = $('<option />').val(services[i].id).html(services[i].externalName);
			if (selectedService == 0 ) {
				selectedService = parseInt(services[i].id,10);
			}
			selector.append(option);
		}
		selector.change(function() {
			var serviceId = parseInt($(this).val(), 10);
			if(serviceId >= 0) {
				selectedService = serviceId;
				graphNps2(selectedService);
			} 
		});
		$('#serviceSelector').html(selectorDiv);
		graphNps1();
		if (npsDataRefresh < 60) {
			npsDataRefresh = 60 ;
		}
		refreshTimer = setInterval(function() {graphNps1();},npsDataRefresh*1000);
	}


function removeOldGaugeAndGraph() {
	var ticks=["0","1","2","3","4","5","6","7","8","9","10"];
	var s1 = [0,0,0,0,0,0,0,0,0,0,0];
	graphNpsDraw(s1,ticks,true);
}


function getNpsScore(score, skip) {
		var promoters = 0;
		var passives = 0;
		var detractors = 0;
		var s1 = [];
		var ticks=["0","1","2","3","4","5","6","7","8","9","10"];
		if ( score.length == 11) {
			for (var i = 0 ; i < 11 ; i++) {
				if ( i < 7 ) {
				detractors += parseInt(score[i],10);
				} else {
					if  ( i < 9 ) {
					passives += parseInt(score[i],10);
					} else {
						promoters += parseInt(score[i],10);
					}
				}
			s1.push(parseInt(score[i],10));	
			}
		}
	var npsEntered = detractors + passives + promoters;
	var npsScore = ( 0 ).toFixed(1);
	if ( npsEntered > 0 ) {
		npsScore = ((( promoters*100 ) / (npsEntered)) - (( detractors*100 ) / (npsEntered))).toFixed(1);
	}
	return npsScore;
}

function getBranchNps(branchId){
	var dataNps = ""; 
	for (j=0; j < variableAll.length; j++ ) {
	// finding stored global var for this branch
			if ( variableAll[j].name == 'branchNpsStatInfo_' + branchId ) {
				dataNps = variableAll[j].value;
			}
		}
	var data;

	var defaultData = util.getCurrentDate("YYYYMMDD") +  "@0@0,0,0,0,0,0,0,0,0,0,0";
		if (dataNps != undefined ) {
			data = (dataNps).split("@");
			if ( util.getCurrentDate("YYYYMMDD") != data[0] || data.length != 3) {
				data = (defaultData).split("@");
			} 
		} else {
			setBranchVariable(branchId,"nps_score_0",defaultData)
			data = (defaultData).split("@");
		}
	var score = data[2].split(",");	
	var skip = parseInt( data[1], 10);
	var npsScore = getNpsScore(score,skip)
	return npsScore;
}


function initNps(){
	gaugeNps1="";
	var gaugeColors =['#f34548','#f34548','#f34548','#cd1f29','#cd1f29','#fece0a','#fece0a','#fece0a','#aed60a','#aed60a','#aed60a']
	$('#gaugeNps1').html("");
	gaugeNps1 = new JustGage({
		id: "gaugeNps1" 							//string container element id
		,value: 0 								//int value gauge is showing
		,valueFontColor : gaugeValueColor 						//string color of value text
		,min: -100									//int minimum value
		,max: 100					//int maximum value
		,showMinMax : true						//bool hide or display min and max values
		,title: jQuery.i18n.prop('gauge.nps.branch.title') 								//string gauge title text
//		,titleFontColor : 						//string color title text
		,titleFontSize : 12						// size of the title font (added to justgage by BvD)
		,label: ""								//string text to show below value
//		,labelFontColor : 						//string color of label showing label under value
		,showInnerShadow : true					//bool whether to display inner shadow
		,shadowOpacity : 1 						//float shadow opacity, values 0 ~ 1
		,shadowSize : 5							//int inner shadow size
		,shadowVerticalOffset : 5 				//int how much is shadow offset from top		
		,levelColorsGradient: true				//bool use gradual or sector-based color change
		,levelColors: gaugeColors	//array of strings colors of indicator, from lower to upper, in hex format
//		,gaugeWidthScale : 	1.0					//float width of the gauge element
//		,gaugeColor : "#123456"					//string background color of gauge element
//		,startAnimationTime : 					//int length of initial load animation
//		,startAnimationType : 					//string type of initial animation (linear, >, <, <>, bounce)
//		,refreshAnimationTime : 				//int length of refresh animation
//		,refreshAnimationType : 				//string type of refresh animation (linear, >, <, <>, bounce)
	});
	gaugeNps2="";
	var gaugeColors =['#f34548','#f34548','#f34548','#cd1f29','#cd1f29','#fece0a','#fece0a','#fece0a','#aed60a','#aed60a','#aed60a']
	$('#gaugeNps2').html("");
	gaugeNps2 = new JustGage({
		id: "gaugeNps2" 							//string container element id
		,value: 0 
		,valueFontColor : gaugeValueColor						//string color of value text
		,min: -100									//int minimum value
		,max: 100					//int maximum value
		,showMinMax : true						//bool hide or display min and max values
		,title: jQuery.i18n.prop('gauge.nps.service.title') 								//string gauge title text
//		,titleFontColor : 						//string color title text
		,titleFontSize : 12						// size of the title font (added to justgage by BvD)
		,label: ""								//string text to show below value
//		,labelFontColor : 						//string color of label showing label under value
		,showInnerShadow : true					//bool whether to display inner shadow
		,shadowOpacity : 1 						//float shadow opacity, values 0 ~ 1
		,shadowSize : 5							//int inner shadow size
		,shadowVerticalOffset : 5 				//int how much is shadow offset from top		
		,levelColorsGradient: true				//bool use gradual or sector-based color change
		,levelColors: gaugeColors	//array of strings colors of indicator, from lower to upper, in hex format
//		,gaugeWidthScale : 	1.0					//float width of the gauge element
//		,gaugeColor : "#123456"					//string background color of gauge element
//		,startAnimationTime : 					//int length of initial load animation
//		,startAnimationType : 					//string type of initial animation (linear, >, <, <>, bounce)
//		,refreshAnimationTime : 				//int length of refresh animation
//		,refreshAnimationType : 				//string type of refresh animation (linear, >, <, <>, bounce)
	});
	
}
	
function graphNps1() {
	if ( selectedView != 3 ) {
		clearInterval (refreshTimer);
	} else {
		var dataNps = getBranchVariable(selectedBranchId, "nps_score_0" );
		if (dataNps != undefined ) {
			data = (dataNps.value).split("@");
			if ( util.getCurrentDate("YYYYMMDD") != data[0] || data.length != 3) {
				data = util.getCurrentDate("YYYYMMDD") +  "@0@0,0,0,0,0,0,0,0,0,0,0";
				data = (data).split("@");
			} 
		} else {
			data = util.getCurrentDate("YYYYMMDD") +  "@0@0,0,0,0,0,0,0,0,0,0,0";
			setBranchVariable(selectedBranchId,"nps_score_" + selectedService,data)
			data = (data).split("@");
		}
		var score = data[2].split(",");	
		var skip = parseInt( data[1], 10);
		var npsScore = getNpsScore(score,skip)
		gaugeNps1.refresh(npsScore);
		graphNps2();
	}
}

function graphNps2() {
		var dataNps = getBranchVariable(selectedBranchId, "nps_score_" + selectedService);
		if (dataNps != undefined ) {
			data = (dataNps.value).split("@");
			if ( util.getCurrentDate("YYYYMMDD") != data[0] || data.length != 3) {
				data = util.getCurrentDate("YYYYMMDD") +  "@0@0,0,0,0,0,0,0,0,0,0,0";
				data = (data).split("@");
			} 
		} else {
			data = util.getCurrentDate("YYYYMMDD") +  "@0@0,0,0,0,0,0,0,0,0,0,0";
			setBranchVariable(selectedBranchId,"nps_score_" + selectedService,data)
			data = (data).split("@");
		}
		var score = data[2].split(",");	
		var skip = parseInt( data[1], 10);
		var npsScore = getNpsScore(score,skip);
		gaugeNps2.refresh(npsScore);
}

function graphNpsDraw(s1,ticks,first) {
	$('#npsGraph').html("");
	$.jqplot.config.enablePlugins = true;
	plot1 = $.jqplot('npsGraph', [s1], {
// Only animate if we're not using excanvas (not in IE 7 or IE 8)..
//		animate: !$.jqplot.use_excanvas,
		title: {
			text : jQuery.i18n.prop('panel.nps.result'),
			fontSize:'18px',
			textColor:graphTextColor
		},
		seriesColors:graphNpsSeriesColor,
		seriesDefaults:{
			renderer:$.jqplot.BarRenderer,
			rendererOptions: {
            // Set varyBarColor to tru to use the custom colors on the bars.
				varyBarColor: true
			},
			pointLabels: { show: false }
		},
		grid: {
			background:  graphBackgroundColor,
			drawBorder: false,
			shadow: false,
			gridLineColor: graphGridLineColor,
			gridLineWidth: 0.5
		},
		axes: {
			xaxis: {
				renderer: $.jqplot.CategoryAxisRenderer,
				ticks: ticks,
				drawMajorGridlines: false,
				tickOptions: {
					fontSize:'12px',
					textColor:graphTextColor
				}
			},
			yaxis: {
				tickOptions: {
					fontSize:'12px',
					textColor:graphTextColor
				}
			}
		},
		highlighter: { show: false }
	});
			 
	$('#npsGraph').bind('jqplotDataClick',
		function (ev, seriesIndex, pointIndex, data) {
			$('#info1').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
		}
	);
	if (first) {
		setTimeout(function() {graphNps();},1*1000);
	} 
}
