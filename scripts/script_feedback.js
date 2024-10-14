function refreshFeedbackPanel() {
	
	if (feedbackPanel) {
		
		var data = getBranchVariable(sessvars.branchId, "cfuScore" + selectedService);
		if (data != undefined ) {
			data = readData(data.value);
			var s1 = [];
			var ticks=[];
		//        var s1 = [2, 6, 7, 10];
		//        var ticks = ['a', 'b', 'c', 'd'];
		if (data != undefined && feedbackPanel) {
			$('#chartFeedback').html("");
			
			var totalMarks = getTotalMarks(data);

			for (i = 0 ; i < data.length ; i++) {
				var t ='<img src="images/cfu_'+(i+1)+'.png" width="50">'
				t += "\nAWT: "
				if (parseInt(data[i].marks,10) > 0) {
					t += Math.round(parseInt(data[i].wt,10)/(parseInt(data[i].marks,10)*60)) + " Min"
				} else {
					t += " - Min"
				}
				ticks.push(t);
				if (totalMarks > 0 ) {
					s1.push(100 * (parseInt(data[i].marks,10)/totalMarks));
				} else {
					s1.push(0)
				}
			}
			 $.jqplot.config.enablePlugins = true;
				plot1 = $.jqplot('chartFeedback', [s1], {
					// Only animate if we're not using excanvas (not in IE 7 or IE 8)..
//					animate: !$.jqplot.use_excanvas,
					title: {
						text : jQuery.i18n.prop('panel.feedback.average'),
						fontSize:'18px',
						textColor:'#fff'
					},
					seriesColors:['#34ED34','#BFFF00','#FFFF00','#FFD900','#F72F20'],
					seriesDefaults:{
										renderer:$.jqplot.BarRenderer,
										rendererOptions: {
                // Set varyBarColor to tru to use the custom colors on the bars.
															varyBarColor: true
														},
										pointLabels: { show: false }
					},
					grid: {
							background: '#000',
							drawBorder: false,
							shadow: false,
							gridLineColor: '#fff',
							gridLineWidth: 1

					},
					axes: {
						xaxis: {
							renderer: $.jqplot.CategoryAxisRenderer,
							ticks: ticks,
							drawMajorGridlines: false,
							tickOptions: {
								fontSize:'12px',
								textColor:'#fff'
							}
						},
						yaxis: {
							tickOptions: {
								fontSize:'12px',
								textColor:'#fff'
							
							}
						}
					},
					highlighter: { show: false }
				});
			 
				$('#chartFeedback').bind('jqplotDataClick',
					function (ev, seriesIndex, pointIndex, data) {
						$('#info1').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
					}
				);
				
				
			} else {
			 $('#chartFeedback').html(jQuery.i18n.prop('panel.no.data'));
			}
		} else {
			 $('#chartFeedback').html(jQuery.i18n.prop('panel.no.data'));
		}
		setTimeout(refreshFeedbackPanel,feedbackDataRefresh*1000);
	}
}

function readData (json) {
	var jsonData = JSON.parse(json);
	
	var dateInJson="20000101";
	var currentDate = util.getCurrentDate("YYYY-MM-DD");

	$.each( jsonData, function(k, v){  
		jsonData = v
		dateInJson = k;
	});
  	
	if (currentDate == dateInJson) {
		var dataObject= new Array();
		$.each( jsonData, function(k, v){  
			var feedbackData = {name:k, wt:v.t, marks:v.v};
			dataObject.push(feedbackData);
		});
	} else {
		var dataObject;
	};
	return 	dataObject ;
}

function getTotalMarks(data) {
	var calc=0;
	for (i = 0 ; i < data.length ; i++) {
		calc+=parseInt(data[i].marks,10);
	}
	return calc;	
}