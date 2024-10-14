var g1,g2,g3;
var needRedraw = true;
var resizeReloadTimeout;

$(window).resize(function() {
  setTableConfig();
  initGraphs ();
  needRedraw = true;
  clearTimeout(resizeReloadTimeout);
  resizeReloadTimeout = setTimeout(function(){ loadData(selectedView)}, 500);
});

function setGraphWidth () {
	var tableWidth = $("#graph").width();
	var gaugeWidth = parseInt((tableWidth)/4.4 ,10);
	if (currentSettings.showExpressiaGraph) {
		gaugeWidth = parseInt((tableWidth)/5.4 ,10);
	} else {
		var row = document.getElementById("graph").rows[1];
		if (row.cells.length > 4){
			row.deleteCell(4);	
		}
	}
	
	var graphWidth = gaugeWidth;
	var minWidth= 250;
	if (gaugeWidth < minWidth) { 
		gaugeWidth = minWidth;
	}
	$("#gauge1").height(200);
	$("#gauge2").height(200);
	$("#gauge3").height(200);
	$("#gauge1").width(gaugeWidth);
	$("#gauge2").width(gaugeWidth);
	$("#gauge3").width(gaugeWidth);
	$("#graphBar").width(graphWidth);
	$("#expressiaBar").width(graphWidth);
	$('#graphWaiting').html("");
	$('#graphExpressia').html("");
	$("#gaugeNps1").height(200);
	$("#gaugeNps1").width(gaugeWidth);
	$("#gaugeNps2").height(200);
	$("#gaugeNps2").width(gaugeWidth);
	if (currentSettings.showExpressiaGraph){
		graphExpressiaDraw([0,0,0,0,0],0,0,[0,0,0,0,0])
	}
}


function initGraphs() {
	setGraphWidth ();
	var gaugesSettings = getGaugesSettings();
	$("#gauge1").html("");
	$("#gauge2").html("");
	$("#gauge3").html("");

	g1 = new JustGage({
		id: "gauge1" 							//string container element id
		,value: 0 								//int value gauge is showing
		,valueFontColor : gaugeValueColor 		//string color of value text
		,valueFontFamily : "Roboto"
		,min: 0									//int minimum value
		,max: gaugesSettings[2]					//int maximum value
		,showMinMax : true						//bool hide or display min and max values
		,title: gauge1Title								//string gauge title text
		,titleFontColor : gaugeLabelColor
		,titleFontSize : 12						// size of the title font (added to justgage by BvD)
		,titleFontFamily : "Roboto"
		,label: ""								//string text to show below value
		,labelFontColor : gaugeLabelColor 	   //string color of label showing label under value
		,showInnerShadow : true					//bool whether to display inner shadow
		,shadowOpacity : 0 						//float shadow opacity, values 0 ~ 1
		,shadowSize : 0							//int inner shadow size
		,shadowVerticalOffset : 5 				//int how much is shadow offset from top		
		,levelColorsGradient: true				//bool use gradual or sector-based color change
		,levelColors: getLevelColors(0)	//array of strings colors of indicator, from lower to upper, in hex format
//		,gaugeWidthScale : 	1.0					//float width of the gauge element
//		,gaugeColor : "#123456"					//string background color of gauge element
//		,startAnimationTime : 					//int length of initial load animation
//		,startAnimationType : 					//string type of initial animation (linear, >, <, <>, bounce)
//		,refreshAnimationTime : 				//int length of refresh animation
//		,refreshAnimationType : 				//string type of refresh animation (linear, >, <, <>, bounce)
	});

	g2 = new JustGage({
		id: "gauge2" 							//string container element id
		,value: 0 								//int value gauge is showing
		,valueFontColor : gaugeValueColor 						//string color of value text
		,valueFontFamily : "Roboto"
		,min: 0									//int minimum value
		,max: gaugesSettings[5]					//int maximum value
		,showMinMax : true						//bool hide or display min and max values
		,title: gauge2Title							//string gauge title text
		,titleFontColor : gaugeLabelColor
		,titleFontSize : 12						// size of the title font (added to justgage by BvD)
		,titleFontFamily : "Roboto"
		,label: ""								//string text to show below value
		,labelFontColor : gaugeLabelColor
		,showInnerShadow : true				//bool whether to display inner shadow
		,shadowOpacity : 0 						//float shadow opacity, values 0 ~ 1
		,shadowSize : 0						//int inner shadow size
		,shadowVerticalOffset : 5 				//int how much is shadow offset from top		
		,levelColorsGradient: true				//bool use gradual or sector-based color change
		,levelColors: getLevelColors(1)	//array of strings colors of indicator, from lower to upper, in hex format
	});

	g3 = new JustGage({
		id: "gauge3" 							//string container element id
		,value: 0 								//int value gauge is showing
		,valueFontColor : gaugeValueColor						//string color of value text
		,valueFontFamily : "Roboto"
		,min: 0									//int minimum value
		,max: gaugesSettings[8]				//int maximum value
		,showMinMax : true						//bool hide or display min and max values
		,title:gauge3Title								//string gauge title text
		,titleFontColor : gaugeLabelColor
		,titleFontSize : 12						// size of the title font (added to justgage by BvD)
		,titleFontFamily : "Roboto"
		,labelFontColor : gaugeLabelColor
		,label: ""								//string text to show below value
		,showInnerShadow : true				//bool whether to display inner shadow
		,shadowOpacity : 0 						//float shadow opacity, values 0 ~ 1
		,shadowSize : 0						//int inner shadow size
		,shadowVerticalOffset : 5 				//int how much is shadow offset from top		
		,levelColorsGradient: true				//bool use gradual or sector-based color change
		,levelColors: getLevelColors(2)	//array of strings colors of indicator, from lower to upper, in hex format
	});
}

function reinitGauge3(val1,val2,val3){
	$("#gauge3").html("");
	g3 = new JustGage({
		id: "gauge3" 							//string container element id
		,value: 0 								//int value gauge is showing
		,valueFontColor : gaugeValueColor						//string color of value text
		,valueFontFamily : "Roboto"
		,min: 0									//int minimum value
		,max: val3						//int maximum value
		,showMinMax : true						//bool hide or display min and max values
		,title: gauge3Title 					//string gauge title text
		,titleFontColor : gaugeLabelColor
		,titleFontSize : 12						// size of the title font (added to justgage by BvD)
		,titleFontFamily : "Roboto"
		,labelFontColor : gaugeLabelColor
		,label: ""								//string text to show below value
		,showInnerShadow : true					//bool whether to display inner shadow
		,shadowOpacity : 0						//float shadow opacity, values 0 ~ 1
		,shadowSize : 0							//int inner shadow size
		,shadowVerticalOffset : 5 				//int how much is shadow offset from top		
		,levelColorsGradient: true				//bool use gradual or sector-based color change
		,levelColors: getColorsForGraph3(2,val1,val2,val3)		//array of strings colors of indicator, from lower to upper, in hex format
	});	
}

function getGaugesSettings() {
	if (appSettings == undefined) {
		appSettings = defaultAppSettings;
	}
	return appSettings;
}

function getColorsForGraph3(val,val1,val2,val3) {
	var colors = getLevelColors(val,val1,val2,val3);
	if(currentSettings.gauge3 === "openCounter" || currentSettings.gauge3 === "openCounterAvg") {
		var colorsInverted = colors.map(value => {
			if(value === gaugeColorLevel1) return gaugeColorLevel3;
			if(value === gaugeColorLevel3) return gaugeColorLevel1;
			return gaugeColorLevel2;
		})
		return colorsInverted;
	}
	return colors;
}

function getLevelColors(val,val1,val2,val3){

	var colors = [];
	gaugeSteps = 100;
	if (val1 == undefined){
		val3 = appSettings[(val*3)+2];
		val1=(appSettings[val*3]);
		val2=(appSettings[(val*3)+1]);
	} 
	
	max = val3/gaugeSteps;
	break1=+ parseInt(val1/max, 10);
	break2=+ parseInt(val2/max, 10);
	if (break2 == gaugeSteps) {
		break2 = gaugeSteps-1;
	}
	if (break1 == break2) {
		break1 = break2 -1;
	}

	var i = 1;
	for (i ; i <= gaugeSteps ; i++) {
		if (i < break1) {
			colors.push(gaugeColorLevel1);
		}
		if (i >= break1 && i <= break2 ) {
			colors.push(gaugeColorLevel2);
		}
		if (i > break2) {
			colors.push(gaugeColorLevel3);
		}
	}
	return colors;
}

function graphWaiting(totals) {
	var graphBarWidth = parseInt($('#graphBar').css("width"));
	var graphBarHeight = parseInt($('#graphBar').css("height"));
	
	$('#graphWaiting').html("");

	var barWaiting = [jQuery.i18n.prop('graph.waiting.title'),totals[3]]
	var barServed = [jQuery.i18n.prop('graph.served.title'),totals[2]]
	var barServing =[jQuery.i18n.prop('graph.serving.title'),totals[4]]

	var s1 = [];
	s1.push(barWaiting)
	if (currentSettings.barCurrentlyServed == true) {
		s1.push(barServing)
	}
	s1.push(barServed)

	$.jqplot.config.enablePlugins = true;
	plot1 = $.jqplot('graphWaiting', [s1], {
		width: graphBarWidth-10,
		height: graphBarHeight-20,
		animate: false,
		// Will animate plot on calls to plot1.replot({resetAxes:true})
		animateReplot: true,
		title: {
			text : " ",
			fontSize:'12px',
			textColor: graphTextColor
		},
		seriesColors:graphWaitingSeriesColor,
		seriesDefaults:{
			renderer:$.jqplot.BarRenderer,
			rendererOptions: {
				animation: {
					speed: 2500
				},
				varyBarColor: true,
				barMargin: 0, 
				barWidth:30,
				barGradients:false,
				barAlpha:1,
				barPadding: 0,
				shadow:false
			},
			pointLabels: { 
				show: true
				,location: 'n'
				,stackedValue :	true
				,edgeTolerance : -1000						
				,xpadding : -12
			}
		},
/*		series : {
			barGradients:false,
		},
		axesDefaults: {
			rendererOptions: {
			}
		},*/
		grid: {
			background: graphBackgroundColor,
			drawBorder: false,
			shadow: false,
			gridLineColor: graphGridLineColor,
			gridLineWidth: 0.5
		},
		axes: {
			xaxis: {
				renderer: $.jqplot.CategoryAxisRenderer,
				//ticks: ticks,
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
					//,formatString: "%'.2f"
				}
			}
		},
		highlighter: { show: false	}
	});
			 
	// correction the label to be positions in the middle of the bars				
	for (var a = 0; a < 3; a++){
		styleObject = "#graphWaiting > div.jqplot-point-label.jqplot-series-0.jqplot-point-"
		move = 0
		var p = parseInt($(styleObject + a).css("top"),10);
		var l = parseInt($(styleObject + a).css("left"),10) - move;
		$(styleObject + a).html(parseInt($(styleObject + a).html(),10))
		
		axisZero = 128;
		if (p > axisZero) { 
			p = axisZero;
		} else {
			p = p + 10;
			//p = axisZero - parseInt( (axisZero - p)/2, 10)
		}
		$(styleObject + a).css({ top: p+'px' });
		// change the number format according to setting		
		$(styleObject + a).html(util.localeFormatNum($(styleObject + a).html()))
	}
	
	// change the number format on the axis according to setting
	var div = "#graphWaiting > div.jqplot-axis.jqplot-yaxis" 
	var divTick = $(div).children(); 
	for (var i = 1; i < divTick.length; i++) { 
			divTick[i].innerHTML = util.localeFormatNum(divTick[i].innerHTML)
	} 
}

function graphHistory(val) {
	var graphTimeFormat = '%H:%M';
	if (timeFormat == "h:mm a"){
		graphTimeFormat = '%#I:%M '
		graphTimeFormat = '%#I:%M %p'
	}
	
	$('#graphHistory').html("");
	setTickInterval = '15 minute';
	if (val.length > 96){
		setTickInterval = '30 minute';
	} 
	
	var s1 = [];
	var	s2 = [];
	var s3 = [];
	var s4 = [];
	var t1 = [];
	var t2 = [];
	var t3 = [];
	var t4 = [];
	var va;
	var xt;
	var maxNumberReadValue = 10;
	var maxTimeReadValue = 10;
	for (var b = 0; b < val.length; b++){
		va = val[b];
		t1 = [];
		t2 = [];
		t3 = [];	
		t4 = [];	
		
		if (va[5] < 10) {
			xt=va[4] + ":0" + va[5] 
		} else {
			xt=va[4] + ":" + va[5] 
		}
	
		t1.push(xt);
		t2.push(xt);
		t3.push(xt);
		t4.push(xt);
		t1.push(parseInt(va[1],10));
		t2.push(parseInt(va[2],10));
		if (parseInt(va[3],10)/60 > currentSettings.historyMinuteMax){
			t3.push(currentSettings.historyMinuteMax);
			if ( maxTimeReadValue < currentSettings.historyMinuteMax){
				maxTimeReadValue = currentSettings.historyMinuteMax;
			}
		} else {
			t3.push(parseInt(va[3],10)/60);
			if (maxTimeReadValue < parseInt(parseInt(va[3],10)/60,10)){
				maxTimeReadValue = parseInt(parseInt(va[3],10)/60,10);
			}
		}
		t4.push(currentSettings.historySL);
		s1.push(t1);
		s2.push(t2);
		s3.push(t3);
		s4.push(t4);
		
		if (parseInt(va[1],10) > parseInt(va[2],10)) {
			if (maxNumberReadValue < parseInt(va[1],10)){
				maxNumberReadValue = parseInt(va[1],10);
			}
		} else {
			if (maxNumberReadValue < parseInt(va[2],10)){
				maxNumberReadValue = parseInt(va[2],10);
			}
		}
	}

	maxNumberReadValue = (parseInt( maxNumberReadValue/6 , 10) + 1) *6;
	if (maxTimeReadValue < currentSettings.historySL) {
		maxTimeReadValue = currentSettings.historySL;
	}
	
	maxTimeReadValue =  (parseInt( maxTimeReadValue/6 , 10) + 1) *6;
	if (s3.length != 0) {
	plot1 = $.jqplot("graphHistory", [s3, s2, s1, s4], {
		seriesColors:graphHistorySeriesColor,
		series:[{yaxis: 'y2axis',label: jQuery.i18n.prop('history.waitingtime.title')}
			,{yaxis: 'yaxis',label: jQuery.i18n.prop('history.open.title')}
			,{yaxis: 'yaxis',label: jQuery.i18n.prop('history.waiting.title')}
			,{yaxis: 'y2axis',label: jQuery.i18n.prop('history.servicelevel.title')}],
		seriesDefaults:{
			rendererOptions: {
                smooth: true,
                animation: {
                    show: false
                }
            },
			showMarker:false,
			pointLabels: { show: false}
		},
		grid: {
			background: graphBackgroundColor,
			drawBorder: false,
			shadow: false,
			gridLineColor: graphGridLineColor,
			gridLineWidth: 1.0
		},
		 legend: {
			//renderer: $.jqplot.EnhancedLegendRenderer,
			location: 'nw',
			background:'#FF9900',
            show: true
        },
        // Turns on animatino for all series in this plot.
        animate: false,
        // Will animate plot on calls to plot1.replot({resetAxes:true})
        animateReplot: false,
        cursor: {
            show: false,
            zoom: false,
            looseZoom: true,
            showTooltip: false
        },
        axesDefaults: {
            pad: 0
        },
/*		highlighter: {
			 sizeAdjust: 10,
			 tooltipLocation: 'n',
			 tooltipAxes: 'y',
			 tooltipFormatString: '%.2f',
			 useAxesFormatters: true
			},
		cursor: {
			 show: true
			},*/
        axes: {
            // These options will set up the x axis like a category axis.
            xaxis: {
				renderer:$.jqplot.DateAxisRenderer,
				tickOptions:{formatString:graphTimeFormat},
				tickInterval:setTickInterval,
                drawMajorGridlines: false,
                drawMinorGridlines: false,
                drawMajorTickMarks: true,
                rendererOptions: {
			//		tickInset: 0.5,
			//		minorTicks: 5
				}
            },
            yaxis: { 
				min:0,
				max: maxNumberReadValue,
				labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
				//pad: 1,
                rendererOptions: {
					minorTicks: 1,
					alignTicks: true,
                    forceTickAt0: true
                },
				label:jQuery.i18n.prop('history.yaxis.number')
            },
            y2axis: {
				min:0,
				max:maxTimeReadValue,
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
				//pad: 0,
                rendererOptions: {
					minorTicks: 1,
					alignTicks: true,
                    forceTickAt0: true
                },
				label:jQuery.i18n.prop('history.yaxis.minute')
            }
        }
    });
	}	 
/*	$('#graphHistory').bind('jqplotDataClick',
		function (ev, seriesIndex, pointIndex, data) {
				$('#info1').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
		}
	);*/
}

function checkPlotPosition(){
	// console.log($("#jqplot-point-0").css("left")) 
	//"jqplot-point-label jqplot-series-0 jqplot-point-1"
	
}

function graphExpressia(perc,total,avg,values){
	setTimeout(() => {
		graphExpressiaDraw(perc,total,avg,values)
	}, 100);
}

function graphExpressiaDraw(perc,total,avg,values) {
	var expressiaBarWidth = parseInt($('#expressiaBar').css("width"));
	var expressiaBarHeight = parseInt($('#expressiaBar').css("height"));
	$('#graphExpressia').html("");
	if (avg == undefined) {
		avg = 0;
	}
	var s1 = [["<img src='images/cfu_1.svg' width='18'>",values[0]],
	["<img src='images/cfu_2.svg' width='18'>",values[1]],
	["<img src='images/cfu_3.svg' width='18'>",values[2]],
	["<img src='images/cfu_4.svg' width='18'>",values[3]],
	["<img src='images/cfu_5.svg' width='18'>",values[4]]];

//	var ticks = [jQuery.i18n.prop('graph.cfu.1.title'),jQuery.i18n.prop('graph.cfu.2.title'),jQuery.i18n.prop('graph.cfu.3.title')
//		,jQuery.i18n.prop('graph.cfu.4.title'),jQuery.i18n.prop('graph.cfu.5.title')];
	$.jqplot.config.enablePlugins = true;
	plot1 = $.jqplot('graphExpressia', [s1], {
		width: expressiaBarWidth-10,
		height: expressiaBarHeight-20,
		animate: false,
		// Will animate plot on calls to plot1.replot({resetAxes:true})
		animateReplot: true,
		title: {
			text : jQuery.i18n.prop('graph.cfu.header.1') + " " + avg + "% (" + total +")" +jQuery.i18n.prop('graph.cfu.header.2'),
			fontSize:'12px',
			textColor: graphTextColor
		},
		//stackSeries: true,
		seriesColors:graphExpressiaSeriesColor,
		seriesDefaults:{
			renderer:$.jqplot.BarRenderer,
			rendererOptions: {
				animation: {
					speed: 2500
				},
				varyBarColor: true,
				barMargin: 0, 
				barWidth:30,
				barGradients:false,
				barAlpha:1,
				barPadding: 0,
				shadow:false
			},
			pointLabels: { 
				show: true
				,location: 'n'
				,stackedValue :	true
				,edgeTolerance : -1000
				,xpadding : -12
			}
		},
		grid: {
			background: graphBackgroundColor,
			drawBorder: false,
			shadow: false,
			gridLineColor: graphGridLineColor,
			gridLineWidth: 0.5
		},
		axes: {
			xaxis: {
				renderer: $.jqplot.CategoryAxisRenderer,
				//	ticks: ticks,
				drawMajorGridlines: false,
				tickOptions: {
					fontSize:'18px',
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
		highlighter: { 
			show: true,
			tooltipAxes: "y",
			tooltipLocation: "n",
			showMarker: false
	  }
	});
			 
	/*
	$('#graphExpressia').bind('jqplotDataClick',
		function (ev, seriesIndex, pointIndex, data) {
			$('#info2').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
		}
	);
	*/
				
	for (var a = 0; a < 6; a++){
		styleObject = "#graphExpressia > div.jqplot-point-label.jqplot-series-0.jqplot-point-"
		move = 0
		var p = parseInt($(styleObject + a).css("top"),10);
		var l = parseInt($(styleObject + a).css("left"),10) - move;
		$(styleObject + a).html(parseInt($(styleObject + a).html(),10))
		axisZero = 128;
					
		if (p > axisZero) { 
			p = axisZero;
		} else {
			p = p + 10;
			//p = axisZero - parseInt( (axisZero - p)/2, 10)
		}
		$(styleObject + a).css({ top: p+'px' });
		$(styleObject + a).css({ left: l+'px' });
		//$(styleObject + a).html(perc[a] + "% (" + values[a]+ ")" )
		$(styleObject + a).html(perc[a] + "%" )
	}
}

function hideGraphContainer(){
	$("#trGraphs").hide();
	$("#trGraphsFooter").hide();
	$("#showButton").show();
	$("#hideButton").hide();
	$("#mainDatacontainer ").css({ top: '100px' });
	saveGraphView(0)
}

function showGraphContainer(){
	$("#trGraphs").show();
	$("#trGraphsFooter").show();
	$("#showButton").hide();
	$("#hideButton").show();
	$("#mainDatacontainer ").css({ top: '355px' });
	initGraphs ();
	needRedraw = true;
	loadData(selectedView);
	saveGraphView(1);

}

function saveGraphView(val) {
	if (parseInt(userMapping.graphView,10) !== val) {
		userMapping.graphView = val;
		newVar= JSON.stringify(userMapping);
		setGlobalVariable('opsusermapping_'+ oasUser,newVar);
	}
}