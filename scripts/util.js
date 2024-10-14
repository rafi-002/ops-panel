/**
 * www.datatables.net contains documentation and source code of the data table model used in
 * e.g. the walk direct table
 */
var util = new function() {

    var hideErrorTime;
    var hideMessageTime;

    this.disableOnChange = function(select) {
        //Temporarily remove selection box event listeners to avoid firing the onchange event...
        if(select.removeEventListener) {
            //...in nice browsers...
            select.removeEventListener('onchange', select.onchange, false);
        }
        else if(select.detachEvent) {
            //...in crappy browsers
            select.detachEvent('onchange', select.onchange);
        }
        else {
            select.onchange = "";
        }
    };

    this.enableOnChange = function(select) {
        //Enable selection box firing of the onchange event...
        if(select.addEventListener) {
            //...in nice browsers...
            select.addEventListener('onchange', select.onchange, false);
        }
        else if(select.attachEvent) {
            //...in crappy browsers
            select.attachEvent('onchange', select.onchange);
        }
        else {
            select.onchange = "";
        }
    };

    this.clearSelect = function(select) {
        select.find('option[value != "-1"]').remove();
    };

    /**
     *
     * @param select the jquery select object
     * @param value the value to set
     */
    this.setSelect = function(select, value) {
        select.prop('selectedIndex', $("#" + select.prop('id') + " option[value=" + value + "]").index());
//        for(i = 0; i < select.length; i++) {
//            if(select.options[i].value == value) {
//                select.selectedIndex = select.options[i].index;
//                break;
//            }
//        }
    };

    /**
     * Initializes jQuery.dataTables on a plain HTML table element
     * tableId: the HTML id
     * url: populate the table with data from this RESTful resource identifier, e.g. "/rest/workstation/branches/" + sessvars.branchId + "/services"
     * rowCallback: called when a row is clicked
     * columns: defines visibility and searchability for the table columns
     * filter: boolean to enable a search field in the table
     * headerCallback: modifies the table header. Called each time the table is drawn
     * popup: if the table should be placed in a popup, the scroll height is bigger
     */
    this.buildTable = function(tableId, url, rowCallback, columns, filter, headerCallback, popup) {
        var table;
        table = $('#' + tableId).dataTable( {
            "bDestroy": true,
            "sScrollX": "95%",
            "sScrollY": (popup ? "300px" : "158px"),
            "oLanguage": {
                "sEmptyTable": "",
                "sInfo": "",
                "sInfoEmpty": "",
                "sZeroRecords": "",
                "sSearch": jQuery.i18n.prop('info.search')
            },
            "bFilter": filter,
            "fnRowCallback": rowCallback,
            "fnHeaderCallback": headerCallback,
            "bLengthChange": false,
            "bPaginate": false,
            "aoColumns": columns,
            "bProcessing": true,
            "sAjaxSource": url,
            "fnServerData": function(sSource, aoData, fnCallback) {
                $.getJSON(sSource, aoData, function(json) {
                    fnCallback({"iTotalRecords":json.length,"iTotalDisplayRecords":json.length, "aaData":json});
                });
            }
        });
        return table;
    };

    /**
     * Initializes jQuery.dataTables on a plain HTML table element
     * @param config
     * tableId: the HTML id
     * url: populate the table with data from this RESTful resource identifier, e.g. "/rest/workstation/branches/" + sessvars.branchId + "/services"
     * rowCallback: called when a row is clicked
     * columns: defines visibility and searchability for the table columns
     * filter: boolean to enable a search field in the table
     * headerCallback: modifies the table header. Called each time the table is drawn
     */
    this.buildTableJson = function(config) {
    	// QP-1285, IE caches things way too aggressively
    	if (typeof lowfiie !== 'undefined' && lowfiie) {
	    	if (config.url.indexOf('?') == -1) {
	    		config.url = config.url + '?breakcache=' + Math.random();
	    	} else {
	    		config.url = config.url + '&breakcache=' + Math.random();
	    	}
	    }
        var table;
//        table = $('#' + config.tableId).dataTable( {
		var tableConfig = {
            "bDestroy": true,
            "sScrollX": (config.scrollXWidth ? config.scrollXWidth : "95%"),
            "sScrollY": (config.scrollYHeight ? config.scrollYHeight : "158px"),
            "oLanguage": {
                "sEmptyTable": typeof config.emptyTableLabel !== 'undefined' ? translate.msg(config.emptyTableLabel): "",
                "sInfo": "",
                "sInfoEmpty": "",
                "sZeroRecords": "",
                "sSearch": jQuery.i18n.prop('info.search')
            },
            "bFilter": config.filter,
            "fnRowCallback": config.rowCallback,
            "fnHeaderCallback": config.headerCallback,
            "bLengthChange": false,
            "bPaginate": false,
            "aoColumns": config.columns,
            "bProcessing": true,
            "aaSorting": [],
            "sAjaxSource": config.url,
            "fnServerData": function(sSource, aoData, fnCallback) {
                $.getJSON(sSource, aoData, function(json) {
                    if(typeof config.filterData !== 'undefined' ){
                        config.filterData(json);
                    }
                    fnCallback({"iTotalRecords":json.length,"iTotalDisplayRecords":json.length, "aaData":json});
                });
            }
 //       });
         };
        if(typeof config.infoFiltered !== 'undefined') {
        	tableConfig.oLanguage.sInfoFiltered = translate.msg(config.infoFiltered, ["_MAX_"]);
        }
        table = $('#' + config.tableId).dataTable(tableConfig);
        $(window).bind('resize', function () {
			if ($('#'+ config.tableId +'Dialogue').is(':visible')){			
				table.fnAdjustColumnSizing();
			}
        } );
        return table;
    };

    /**
     *
     * @param tableId
     * @param url
     * @param rowCallback
     * @param columns
     * @param filter
     * @param headerCallback
     * @param popup
     */
    this.buildSubtable = function(table, data, rowCallback, subtableId, columns) {
        var subtable = $('<table class="subTable" cellpadding="0" cellspacing="0"><tbody></tbody></table>');
        $.each(data, function(i, item) {
            if(typeof item[columns.id] !== 'undefined') {
                subtable.find('tbody')
                    .append($('<tr>').prop('id', item[columns.id]).click(function() {
                    rowCallback(item[columns.id]);
                })
                        .append($('<td>')
                            .append($('<span>' + item[columns.name] + '</span>')
                            )
                        )
                    )
            }
        });
        return subtable;
    };

    this.sortArrayCaseInsensitive = function (array, property, sortOrder) {
        if (!!!array) return;
        // Default Sort is Asc
        array.sort(function (a, b) {
            var multiplier = 0;
            var ax = [], bx = [];

            var a = multiplier ? (parseFloat(a[property]) * multiplier).toString() : a[property].toString();
            var b = multiplier ? (parseFloat(b[property]) * multiplier).toString() : b[property].toString();

            a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
            b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });

            while (ax.length && bx.length) {
                var an = ax.shift();
                var bn = bx.shift();
                var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
                if (nn) return nn;
            }

            return ax.length - bx.length;
        });
        if (sortOrder == "desc") {
            array.reverse();
        }
    };
    this.clearTable = function(table) {
        if(typeof table != "undefined") {
            if(table != null) {
                if(table.fnClearTable instanceof Function) {
                    table.fnClearTable();
                }
            }
        }
    };

    this.buttonHover = function(button) {
        if(button.className != button.id+"_dim")
            button.className = button.id+"_over";
    };

    this.buttonOut = function(button) {
        if(button.className != button.id+"_dim")
            button.className = button.id;
    };

    this.formatIntoHHMMSS = function(secsIn) {
        if(secsIn == -1) {
            return "";
        }
        var hours = parseInt(secsIn / 3600);
        var remainder = secsIn % 3600;
        var minutes = parseInt(remainder / 60);
        var seconds = remainder % 60;
        var formatted =  (hours < 10 ? "0" : "") + hours
                + ":" + (minutes < 10 ? "0" : "") + minutes
                + ":" + (seconds< 10 ? "0" : "") + seconds;
        return formatted;
    };

    this.formatIntoHHMM = function(secsIn) {
        if(secsIn == -1) {
            return "";
        }
        var hours = parseInt(secsIn / 3600);
        var remainder = secsIn % 3600;
        var minutes = parseInt(remainder / 60);
        var formatted =  (hours < 10 ? "0" : "") + hours
                + ":" + (minutes < 10 ? "0" : "") + minutes;
        return formatted;
    };
	
	this.formatDateIntoHHMMSS = function(timeAsDateObject) {
        if(timeAsDateObject == null) {
            return "";
        }
        var hours = timeAsDateObject.getHours();        
        var minutes = timeAsDateObject.getMinutes();
		var seconds = timeAsDateObject.getSeconds();		
        var formatted =  (hours < 10 ? "0" : "") + hours
                + ":" + (minutes < 10 ? "0" : "") + minutes
				+ ":" + (seconds < 10 ? "0" : "") + seconds;
        return formatted;
    };

    this.validateProfile = function(profileSel) {
        if (profileSel.val() == -1) {
            util.showError(jQuery.i18n.prop("error.no.profile"));
            return false;
        }
        return true;
    };

    this.populateSettingsSelect = function(items, select) {
        util.populateSelect(items, select);
        if(items.length <= 1) {
            select.prop('selectedIndex', 1);
        }
    };

    /**
     *
     * @param items
     * @param select
     */
    this.populateSelect = function(items, select, metaDataProp) {
        $.each(items, function(key, value) {
            select
                .append($('<option>', { value : typeof metaDataProp !== 'undefined' ? value[metaDataProp] : value.id})
                .text(value.name));
        });
    };

    this.showMessage = function(text, isError) {
        var messageDiv = $('<div/>').text(text).css({"width": "auto"});
        if(isError) {
            messageDiv.addClass("message errmsg");
        } else {
            messageDiv.addClass("message warningmessage");
        }

        // Do not show more than 3 messages
        if ($('#message').children().length > 2) {
            $('#message').children().first().remove();
        }

        $("#message").css('left', 0);
        $("#message").css("top", (parseInt($("#header").height())) + "px");
        messageDiv.appendTo($('#message'));

        var removeFunction = function() {
            messageDiv.remove();
            if($("#message").children().length == 0) {
                $("#message").css("visibility", "hidden");
                $("#message").css("top", 0);
            }
        };

        hideMessageTime = setTimeout(removeFunction, 5000);

        // set id to one bigger than last
        var messageId = "message_" + hideMessageTime;
        messageDiv.prop('id', messageId);

        messageDiv.append('<a href="#" onClick="util.removeMe(' + messageId + ', ' + hideMessageTime + ');" class="dismiss">X</a>');
        $('#message').css("visibility", "visible");
    };

    this.removeMe = function(toBeRemovedId, hideMessageTime) {
        window.clearTimeout(hideMessageTime);
        $(toBeRemovedId).remove();
        if($("#message").children().length == 0) {
            $("#message").css("visibility", "hidden");
            $("#message").css("top", 0);
        }
    };

    /**
     * @param errorMessage the name of a property in
     * graphicalDisplayMessages.properties
     */
    this.showError = function(errorMessage) {
		if (errorMessage != "[error.server_error_8002]") {
			util.showMessage(errorMessage, true);
		}
    };

    /**
     * Not used yet
     * @param errorMessage
     * @param paramArray
     */
    this.showCometDError = function(errorMessage, paramArray) {
        if(typeof paramArray === 'undefined' || !paramArray) {
            var errorDiv = $('<div/>').text(translate.msg(errorMessage));
        } else {
            var errorDiv = $('<div/>').text(translate.msg(errorMessage, paramArray));
        }
        errorDiv.appendTo($('#error'));
        var removeFunction = function() { errorDiv.remove(); };
        var hideErrorTime = setTimeout(removeFunction, 15000);
    };

    /**
     * Turns a Unit ID such as "GBG:WDP:1" into "GBG/WDP/1"
     */
    this.asChannelStr = function(str) {
        return str.replace(new RegExp(':', 'g'),'/');
    };

    this.asChannelStrWithUserName = function(unitId, userName) {
        return this.asChannelStr(unitId) + "/" + userName;
    }	
    this.showPermanentError = function(text) {
        setError(text);
    };

    var setError = function(text) {
        var err = $("#error");
        var errorTextDiv = $("<div/>").text(text).css({"width": "auto"});;
        errorTextDiv.prop("id", 'text');
        errorTextDiv.addClass("message errmsg");
        err.css('left', 0);
        err.css("top", (parseInt($("#header").height())) + "px");

        errorTextDiv.appendTo(err);

        err.css("visibility", "visible");
    };

    this.hideError = function() {
        $("#text").remove();
        $("#error").css("visibility", "hidden");
    };

    this.showModal = function(divId) {
        window.onscroll = function () {
            $("#" + divId).css("top", document.body.scrollTop);
        };
        $("#" + divId).css("display", "block");
        $("#" + divId).css("top", document.body.scrollTop);
    };

    this.hideModal = function(divId) {
        $("#" + divId).hide();
    };

    this.zeroPad = function(num,count) {
        var numZeropad = num + '';
        while(numZeropad.length < count) {
            numZeropad = "0" + numZeropad;
        }
        return numZeropad;
    };

    this.secondsToHms = function(secs) {
        var t = new Date(1970,0,1);
        t.setSeconds(secs);
        return t.toTimeString().substr(0,8);
    };

    this.secondsToHm = function(secs) {
        var t = new Date(1970,0,1);
        t.setSeconds(secs);
        return t.toTimeString().substr(0,5);
    };

    this.log = function(object) {
        if (typeof console !== 'undefined' && console.log) {
            if(typeof Date.now === 'function') {
                var timestamp = '[' + Date.now() + '] ';
                console.log(timestamp, object);
            } else {
                console.log(object);
            }
        }
    };

    /**
     * Initializes jQuery.dataTables on a plain HTML table element
     * @param config
     * tableId: the HTML id
     * url: populate the table with data from this RESTful resource identifier, e.g. "/rest/workstation/branches/" + sessvars.branchId + "/services"
     * rowCallback: called when a row is clicked
     * columns: defines visibility and searchability for the table columns
     * filter: boolean to enable a search field in the table
     * headerCallback: modifies the table header. Called each time the table is drawn
     */
    this.buildTableJsonNoUrl = function(config) {
        var table;
        table = $('#' + config.tableId).dataTable( {
            "bDestroy": true,
            "sScrollX": "95%",
            "sScrollY": (config.scrollYHeight ? config.scrollYHeight : "158px"),
            "oLanguage": {
                "sEmptyTable": typeof config.emptyTableLabel !== 'undefined' ? translate.msg(config.emptyTableLabel): "",
                "sInfo": "",
                "sInfoEmpty": "",
                "sZeroRecords": "",
                "sSearch": jQuery.i18n.prop('info.search')
            },
            "bFilter": config.filter,
            "fnRowCallback": config.rowCallback,
            "fnHeaderCallback": config.headerCallback,
            "bLengthChange": false,
            "bPaginate": false,
            "aoColumns": config.columns,
            "bProcessing": true,
            "data": config.data
        });
        $(window).bind('resize', function () {
            table.fnAdjustColumnSizing();
        } );
        return table;
    };
	
	this.createParams = function() {
        var params = {};
        params.branchId = parseInt(selectedBranchId);
        params.entryPointId = entrypointId;
        return params;
    };
	
	this.todayYYYYMMDD = function() {
		var date = new Date();
        var day = parseInt(date.getDate(), 10);
		var month = parseInt(date.getMonth()+1, 10);
		var year = date.getFullYear()
        var formatted =  year
                + ( month < 10 ? "0" : "") + month
                + ( day< 10 ? "0" : "") + day;
        return formatted;
    };
	
	this.nowHHMM = function(val) {
		var date = new Date();
		var hours = parseInt(date.getHours(), 10);
		var minutes = parseInt(date.getMinutes(), 10);
		if (minutes < val) {
			hours -=1;
			minutes+=(60-val);
		} else {	
			minutes = minutes - val;
		}
		
		var formatted = ( hours * 100 ) + minutes;
		return formatted;
	}
	
	this.nowOnline = function(val, branchDate, brTimeZone, branchTime) {
		var date = new Date();
		var myTimeZone = 0-date.getTimezoneOffset();
		var branchTimeZone = (brTimeZone*60)/100;
		var myDate = (date.getFullYear()*100*100) + ((date.getMonth()+1) * 100) + (date.getDate() * 1);
		var myMinutes= (parseInt(date.getHours(), 10)*60) + parseInt(date.getMinutes(), 10);
		var branchMinutes = branchTime - parseInt(branchTime/100, 10)*40;

		var t = 24*60;    // always add 1 day to be able to deduct the timezone
		var u = 0;
		var v = 0;
		if (myDate > branchDate) {
			u= 24*60;
		}
		if (myDate < branchDate) {
			v= 24*60;
		}
		

		branchMinutes += t + v - branchTimeZone;
		myMinutes += t + u -myTimeZone;
		var online = false;
		if ((branchMinutes+val >= myMinutes && branchMinutes <= myMinutes ) || branchMinutes > myMinutes) {
			online = true;
		}
		return online;
	}
	
	this.getCurrentDate = function(val) {
			var d = new Date();
			var m = "";
			var n = "";
			var year = d.getUTCFullYear();
			//-- current month of year --//
			var month = d.getUTCMonth() + 1;
			if (month < 10) {
				m= "0";
			}
			//-- current day of month --//
			var day = d.getUTCDate();
			if (day < 10) {
				n="0";
			}
			if (val == "YYYY-MM-DD") {
				var currentDate = year + "-" + m + month + "-" + n + day;
			} else {
				var currentDate = day+(100*month)+(10000*year);
			}
	return currentDate;
	}
	
	this.todayWithOffsetYYYYMMDD = function(offset) {
		var date = new Date();
		var hours = parseInt(offset,10)/100
		var myTimeZone = (0 - date.getTimezoneOffset())/60;

		date.setHours(date.getHours() + hours - myTimeZone)
        var day = parseInt(date.getDate(), 10);
		var month = parseInt(date.getMonth()+1, 10);
		var year = date.getFullYear()
        var formatted =  year
                + ( month < 10 ? "0" : "") + month
                + ( day< 10 ? "0" : "") + day;
        return formatted;
    };

	this.enterTimeSec = function (val){
		//"2022-12-22T07:11:01.614+0000"
		var timeObj = val.substring(11, 19).split(":")
		var hour = parseInt(timeObj[0]);
		var min = parseInt(timeObj[1]);
		var sec = parseInt(timeObj[2]);
		var total = (hour * 3600) + (min * 60)  + sec;
		return total;
	}
	
	this.appointTimeSec = function (val){
		//"2022-12-22T08:30:00"
		var timeObj = val.substring(11, 19).split(":");
		var hour = parseInt(timeObj[0]);
		var min = parseInt(timeObj[1]);
		var total = (hour * 3600) + (min * 60) ;
		return total;
	}
	
	this.branchTimeSec = function (val){
		//"08:30:00"
		var timeObj = val.split(":");
		var hour = parseInt(timeObj[0]);
		var min = parseInt(timeObj[1]);
		var sec = parseInt(timeObj[2]);
		var total = (hour * 3600) + (min * 60)  + sec;
		return total;
	}
	
	this.buildFooter = function (tableName) {
		var fs = '<tfoot><tr>'
		cols = $("#"+ tableName).find("th").length
		for ( i = 0; i < cols; i++){
			colspan = $("#" + tableName ).find('th:eq(' + i +')').attr("colspan");
			footerId = $("#" + tableName ).find('th:eq(' + i +')').attr("id").replace("Header", "Footer");
			if (colspan !== undefined) {
				colspan = "colspan=" + colspan;
			}
			fs+= "<td align='right' " + colspan + " id='" + footerId + "'>&nbsp;</td>";
		}
		fs+= '</tr></tfoot>';
		return fs;
	}
	
	this.getStatVariables = function (view) {

		if ( getGlobalVariableMethod == 2 && _isCentral == true) {
			varNamePart = "StatInfo_"
			if ((view > 0 && view < 6) || view == 7) {
				varNamePart += selectedBranchId;
			}
			globalvar = this.searchGlobalVariables(varNamePart);
		} else {
			if (_isCentral == true ) {
				method = "/rest/entrypoint/variables/";
			} else {
				method = "/rest/entrypoint/branches/" + selectedBranchId + "/variables/";
			}
			if (view == 0) { globalvar = this.getAllVariables(method);}
			if (view == 1) { globalvar = this.getQueueVariables(method);}
			if (view == 2) { globalvar = this.getServicePointVariables(method);}
			if (view == 3) { globalvar = this.getNpsVariables(method);}				
			if (view == 4) { globalvar = this.getWebcamVariables(method);}				
			if (view == 7) { globalvar = this.getQueueSpVariables(method);}				
		}
		
		if (!firstRun) {
			util.verifyUttData(globalvar);
		}
	
		return globalvar;
	}
	
	this.verifyUttData = function (val) {
		incorrectBranches = [];
		noDataBranches = [];
		unitTypeDataFound = false;
		initErrorMessage = "";
		if (loadError != "") {
			initErrorMessage += jQuery.i18n.prop(loadError) + "<br>"
		}
		for (bb = 0; bb < branchInfo.length; bb++) {
			if (branchInfo[bb].branchActive == true){
				thisBranchFound = false;
				for (ut = 0; ut < val.length; ut++){
					if (val[ut].name == "branchStatInfo_"+ branchInfo[bb].id ) {
						unitTypeDataFound = true;
						thisBranchFound = true;
						uttData = val[ut].value.split("@")
						if (uttData.length >= 25){
							if (parseInt(uttData[24], 10) < unitTypeDataVersion) {
								incorrectBranches.push(uttData[13])
							}
						} else {
							incorrectBranches.push(uttData[13])
						}
					}
				}
				if (thisBranchFound == false){
					noDataBranches.push(branchInfo[bb].name)
				}
			}
		}
		
		if (unitTypeDataFound == false) {
			console.log( "No data from unit type found, please make sure to install the statToOpspanelInfo unit type")
			initErrorMessage += jQuery.i18n.prop("error.no.utt.data");
		} 
		if (incorrectBranches.length > 0){
			console.log( "Branches with wrong unit type: " + incorrectBranches);
			initErrorMessage += jQuery.i18n.prop("error.wrong.utt.data");
		}
		if (noDataBranches.length > 0){
			console.log( "Branches without any data: " + noDataBranches);
		}
		
		if (initErrorMessage != ""){
			util.showUttError(initErrorMessage);
			setTimeout(util.hideUttError, 30 * 1000);
		}
		
		firstRun = true;
	}
	
	this.getAllVariables = function (val) {
		if ((_isCentral == false && branchInfo.length == 1) || branchInfo.length == 1) {
			variables = restService.get("/rest/entrypoint/branches/" + branchInfo[0].id + "/variables")
		} else {
			variables = restService.get("/rest/entrypoint/variables")
		}
		return variables;
	}

	this.searchGlobalVariables = function (val) {
		variables = restService.get("/rest/entrypoint/variables?name=" +  val + "&option=CONTAINS");
		return variables;
	}
	
	this.getGlobalVariable = function (val) {
		variable = restService.get('/rest/entrypoint/variables/'+val);
		return variable;
	}
	
	this.getQueueVariables = function (val) {
		var variable = [];
		tmp = restService.get( val + 'queueStatInfo_' +selectedBranchId);
		if (tmp !== null && tmp != undefined) {
			variable.push(tmp)
		}
		tmp = restService.get( val + 'branchStatInfo_' +selectedBranchId);
		if (tmp !== null && tmp != undefined) {
			variable.push(tmp)
		}
		if (currentSettings.showExpressiaGraph == true){
			tmp = restService.get( val + 'branchExpressiaStatInfo_' +selectedBranchId);
			if (tmp !== null && tmp != undefined) {
				variable.push(tmp)
			}else {
				this.createMissingVariables(val, "branchExpressiaStatInfo_" +selectedBranchId, "20230101@1,0@2,1@3,1@4,1@5,0")
				variable.push("20230101@1,0@2,1@3,1@4,1@5,0")
			}
		}
		return variable;
	}
	this.getServicePointVariables = function (val) {
		var variable = [];
		tmp = restService.get( val + 'servicePointMiStatInfo_' +selectedBranchId);
		if (tmp !== null && tmp != undefined) {
			variable.push(tmp)
		}
		tmp = restService.get( val + 'userStatInfo_' +selectedBranchId);
		if (tmp !== null && tmp != undefined) {
			variable.push(tmp)
		} else {
			this.createMissingVariables(val, 'userStatInfo_' +selectedBranchId,"20230101")
			variable.push("20230101")
		}
		tmp = restService.get( val + 'branchStatInfo_' +selectedBranchId);
		if (tmp !== null && tmp != undefined) {
			variable.push(tmp)
		}
		if (currentSettings.showExpressiaGraph == true){
			tmp = restService.get( val + 'branchExpressiaStatInfo_' +selectedBranchId);
			if (tmp !== null && tmp != undefined) {
				variable.push(tmp)
			} else {
				this.createMissingVariables(val, "branchExpressiaStatInfo_" +selectedBranchId, "20230101@1,0@2,1@3,1@4,1@5,0")
				variable.push("20230101@1,0@2,1@3,1@4,1@5,0")
			}
			tmp = restService.get( val + 'branchExpressiaWsStatInfo_' +selectedBranchId);
			if (tmp !== null && tmp != undefined) {
				variable.push(tmp)
			} else {
				this.createMissingVariables(val, 'branchExpressiaWsStatInfo_' +selectedBranchId,"20230101")
				variable.push("20230101")
			}
		}
		return variable;
	}
	
	this.getNpsVariables = function (val) {
		var variable = [];
		tmp = restService.get( val + 'branchNpsStatInfo_' +selectedBranchId);
		if (tmp !== null && tmp != undefined) {
			variable.push(tmp)
		} else {
			this.createMissingVariables(val, 'branchNpsStatInfo_' +selectedBranchId,"20230101")
			variable.push("20230101")
		}
		tmp = restService.get( val + 'branchStatInfo_' +selectedBranchId);
		if (tmp !== null && tmp != undefined) {
			variable.push(tmp)
		}
		if (currentSettings.showExpressiaGraph == true){
			tmp = restService.get( val + 'branchExpressiaStatInfo_' +selectedBranchId);
			if (tmp !== null && tmp != undefined) {
				variable.push(tmp)
			} else {
				this.createMissingVariables(val, "branchExpressiaStatInfo_" +selectedBranchId, "20230101@1,0@2,1@3,1@4,1@5,0")
				variable.push("20230101@1,0@2,1@3,1@4,1@5,0")
			}
		}
		return variable;
	}

	this.getWebcamVariables = function (val) {
		var variable = [];
		tmp = restService.get( val + 'branchStatInfo_' +selectedBranchId);
		if (tmp !== null && tmp != undefined) {
			variable.push(tmp)
		}
		if (currentSettings.showExpressiaGraph == true){
			tmp = restService.get( val + 'branchExpressiaStatInfo_' +selectedBranchId);
			if (tmp !== null && tmp != undefined) {
				variable.push(tmp)
			} else {
				this.createMissingVariables(val, "branchExpressiaStatInfo_" +selectedBranchId, "20230101@1,0@2,1@3,1@4,1@5,0")
				variable.push("20230101@1,0@2,1@3,1@4,1@5,0")
			}
		}
		return variable;
	}
	
	this.getQueueSpVariables = function (val) {
		var variable = [];
		tmp = restService.get( val + 'queueStatInfo_' +selectedBranchId);
		if (tmp !== null && tmp != undefined) {
			variable.push(tmp)
		}
		
		tmp = restService.get( val + 'servicePointMiStatInfo_' +selectedBranchId);
		if (tmp !== null && tmp != undefined) {
			variable.push(tmp)
		}
		tmp = restService.get( val + 'userStatInfo_' +selectedBranchId);
		if (tmp !== null && tmp != undefined) {
			variable.push(tmp)
		} else {
			this.createMissingVariables(val, 'userStatInfo_' +selectedBranchId,"20230101")
			variable.push("20230101")
		}
		tmp = restService.get( val + 'branchStatInfo_' +selectedBranchId);
		if (tmp !== null && tmp != undefined) {
			variable.push(tmp)
		}
		if (currentSettings.showExpressiaGraph == true){
			tmp = restService.get( val + 'branchExpressiaStatInfo_' +selectedBranchId);
			if (tmp !== null && tmp != undefined) {
				variable.push(tmp)
			} else {
				this.createMissingVariables(val, "branchExpressiaStatInfo_" +selectedBranchId, "20230101@1,0@2,1@3,1@4,1@5,0")
				variable.push("20230101@1,0@2,1@3,1@4,1@5,0")
			}
			tmp = restService.get( val + 'branchExpressiaWsStatInfo_' +selectedBranchId);
			if (tmp !== null && tmp != undefined) {
				variable.push(tmp)
			} else {
				this.createMissingVariables(val, 'branchExpressiaWsStatInfo_' +selectedBranchId,"20230101")
				variable.push("20230101")
			}
		}
		return variable;
	}

	this.createMissingVariables = function(method, name,value){
		var params = {};
		json= {"name" : name, "value" : value}
		params.json = JSON.stringify(json)
		restService.putParams(method, params)
	}
	
	this.showUttError = function (msg){
	    $('#uttError').html(msg);
        $('#uttError').css("visibility", "visible");	
	}

	this.hideUttError = function (){
	    $('#uttError').html("");
        $('#uttError').css("visibility", "hidden");	
	}

	
	this.getAlert = function (val, type, column) {
		level_1 = parseInt(appSettings[0],10);
		level_2 = parseInt(appSettings[1],10);
		if (type == "trt" ) {
			level_1 = parseInt(appSettings[3],10);
			level_2 = parseInt(appSettings[4],10);
		} 
		if (type == "wtApp" ) {
			level_1 = parseInt(appSettings[12],10);
			level_2 = parseInt(appSettings[13],10);
		} 
		
		var alertVal= 0;
		if (parseInt(val,10) < level_1) {
			alertVal = 0;
		} else {
			if (parseInt(val,10) < level_2) {
				alertVal = 2;
			} else {
				alertVal = 3;
			}
		}
		columnSetting = "show" + column + "Sla";
		if (currentSettings[columnSetting] == false && currentSettings[columnSetting] != undefined) {
			alertVal = 4;
		}
	
		return alertVal;
	}

	this.getAlertSp = function (openSp, closedSp, column) {
		level_1 = parseInt(appSettings[9],10);
		level_2 = parseInt(appSettings[10],10);
		perc = (openSp * 100)/(openSp + closedSp);
		var alertVal= 0;
		if (perc < level_1) {
			alertVal = 3;
		} else {
			if (perc < level_2) {
				alertVal = 2;
			} else {
				alertVal = 0;
			}
		}
		columnSetting = "show" + column + "Sla";
		if (currentSettings[columnSetting] == false && currentSettings[columnSetting] != undefined) {
			alertVal = 4;
		}
	
		return alertVal;
	}
	
	this.localeFormatNum = function (val) {
		newVal = val
		if (val !== noDataChar){
			intVal = parseInt(val,10);
			newVal = intVal.toLocaleString(currentSettings.numberFormat);
		}
		return newVal;
	}
	
	this.refreshAfterAction = function(){
		if (selectedView == 2){
			branchServicePointOverview();
		}
		if (selectedView == 7){
			branchQueueSpOverview();
		}
	}
	
	this.showHelp = function (){
		url = "../help"
		if (isExperience == true) {
			url= "https://experiencecloud.qmatic-qa.io/user-manual/monitor_operations/monitor-operations/";
		}
		window.open(url)
	}
	
	this.formatTime= function(val) {
		if (val.length == 4) {
			val = "0" + val;
		}
		newTime = moment('2000-01-01 ' + val).format(timeFormat);
		return newTime;
	}
	
	this.formatDate = function(dateVal){
		newDateTime = moment(dateVal).format(dateFormat);
		return newDateTime;
	}
	
	this.logVariableToConsole = function(id,debugInfo){
		if (debugInfo[0] == 1){
			logVar = util.getGlobalVariable("branchStatInfo_" + id);
			data =  ["date [0]","updated [1]","waiting now [2]","waiting below sl now [3]","total waiting time now [4]","served today [5]","total trt today [6]","open counters [7]","closed counters [8]","branchTimeOffset [9]",
					  "noShow today [10]","called today [11]","total waiting time today [12]","branchname [13]","total waiting including pools now [14]","total wait time including pools now [15]","called below sl wt [16]",
					  "max waiting time now [17]","waited above sl today [18]","max waiting time today [19]","max trt today [20]","served above sl trt [21]","served below sl trt [22]","total waiting above sl wt now [23]",
					  "dataversion [24]","service points serving [25] ","total appoint waiting time now [26] ","total appoint waiting [27] ","max appoint waiting time now [28]",
					  "total appoint waiting time today [29]","total appoint waiting today [30]","max appoint waiting time today [31]"];
			logData = [];
			if (logVar !== undefined && logVar !== null ){
				logVar = logVar.value.split("@")
				console.log("branchStatInfo_" + id + " - " + logVar[0]);
				for (j = 0; j < logVar.length; j++){
					x={};
					x[data[j]] = logVar[j];
					logData.push(x);
				}
			console.log(logData);
			}
		}

		if (debugInfo[1] == 1){
			logVar = util.getGlobalVariable("queueStatInfo_" + id);
			data =  ["queue id [0]","avg trt today [1]","avg waiting time now [2]","waiting now [3]","est waiting time now [4]","open servicepoints now [5]","noShow today [6]","called today [7]","total waiting time today [8]",
					  "Customer Served today [9]","Number Of Served Services today [10]","Waiting Time now [11]","Appointment Waiting Time Now [12]","getServiceLevel [13]","queue name [14]","waited below sl wt today [15]",
					  "waiting above sl wt now [16]","waited above sl wt today [17]","max waiting time today [18]","max trt today [19]","served above sl trt today [20]","served below sl trt today [21]",
					  "queue data included in branch summary [22]","show queue in queue summary [23]","queueCustomersDelayed [24]","service points serving [25]","total appoint waiting time now [26]",
					  "total appoint waiting [27]", "max appoint waiting time now [28]","total appoint waiting time today [29]", "total appoint waiting today [30]", "max appoint waiting time today [31]"];
				
			if (logVar !== undefined && logVar !== null ){
				logVar = logVar.value.split("@");
				console.log("queueStatInfo_" + id + " - " + logVar[0]);
				for (k = 1; k < logVar.length; k++){
					logVarSub = logVar[k].split(",");
					logData = [];
					for (j = 0; j < logVarSub.length; j++){
						x={};
						x[data[j]] = logVarSub[j];
						logData.push(x);
					}
					console.log(logData);
				}
			}
		}

		if (debugInfo[2] == 1){
			logVar = util.getGlobalVariable("servicePointMiStatInfo_" + id)
			data =  ["servicePointId [0]", "Status [1]", "CustomersServed [2]", "CurrentTransactionTime [3]", "CurrentServiceCurrentTransactionTime [4]", "getServiceTargetTransTime [5]", "sp name [6]", "waiting time [7]", 
					  "served above sl trt [8]", "first login [9]", "last logout [10]", "show in summary [11]", "poolWt [12]", "poolEnterTime [13]", "totalIdleTime [14]", "idleCounts [15]", "startIdle [16]" ];
				
			if (logVar !== undefined && logVar !== null ){
				logVar = logVar.value.split("@");
				console.log("servicePointMiStatInfo_" + id + " - " + logVar[0]);
				for (k = 1; k < logVar.length; k++){
					logVarSub = logVar[k].split(",");
					logData = [];
					for (j = 0; j < logVarSub.length; j++){
						x={};
						x[data[j]] = logVarSub[j];
						logData.push(x);
					}
					console.log(logData);
				}
			}
		}
	
	
		if (debugInfo[3] == 1){
			logVar = util.getGlobalVariable("serviceStatInfo_" + id)
			data =  ["service [0]","served [1]", "waiting [2]" ];
				
			if (logVar !== undefined && logVar !== null ){
				logVar = logVar.value.split("@");
				console.log("serviceStatInfo_" + id + " - " + logVar[0]);
				for (k = 1; k < logVar.length; k++){
					logVarSub = logVar[k].split(",");
					logData = [];
					for (j = 0; j < logVarSub.length; j++){
						x={};
						x[data[j]] = logVarSub[j];
						logData.push(x);
					}
					console.log(logData);
				}
			}			
		}
		
		if (debugInfo[4] == 1){
			logVar = util.getGlobalVariable("userStatInfo_" + id)
			data =  ["userName [0]", "CustomersServed [1]", "Total TransactionTime [2]","Max TransactionTime [3]", "waiting in pool [4]", "userId [5]", "first enter time in pool [6]" ];
				
			if (logVar !== undefined && logVar !== null ){
				logVar = logVar.value.split("@");
				console.log("userStatInfo_" + id + " - " + logVar[0]);
				for (k = 1; k < logVar.length; k++){
					logVarSub = logVar[k].split(",");
					logData = [];
					for (j = 0; j < logVarSub.length; j++){
						x={};
						x[data[j]] = logVarSub[j];
						logData.push(x);
					}
					console.log(logData);
				}
			}
		}
		
		if (debugInfo[5] == 1){
			logVar = util.getBranchVariable(id, "servicePointStatInfo")
			data =  ["service point id [0]", "waiting time current ticket [1]", "served above sl trt [2]", "firstLogin [3]", "lastLogout [4]", "waiting in pool [5]", "last queue served [6]",
					"first enter time in pool [7]", "total Idle Time [8]", "number of idle time periods [9]", "last start for idle time [10]" ];
				
			if (logVar !== undefined && logVar !== null ){
				logVar = logVar.value.split("@");
				console.log("servicePointStatInfo" + " - " + logVar[0]);
				for (k = 1; k < logVar.length; k++){
					logVarSub = logVar[k].split(",");
					logData = [];
					for (j = 0; j < logVarSub.length; j++){
						x={};
						x[data[j]] = logVarSub[j];
						logData.push(x);
					}
					console.log(logData);
				}
			}
		}
	}

	this.getBranchVariable = function (id, name) {
		var method = "/rest/entrypoint/branches/" + id + "/variables/" + name;
		tmp = restService.get( method);	
		return tmp;
	}

};