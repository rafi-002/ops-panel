var _isCentral = false;
var restConnector = '';
var restService = (function($) {
	
	var centralDetect = true;
	
	if ( centralDetect) {
		$.ajax({
			type: 'GET',
			url: '/qsystem/rest/entrypoint/systemInformation',
			dataType: 'json',
			async: false,
			cache: false,
			success: function() {
				_isCentral = true;
				restConnector = '/qsystem';
			},
			error: function(xhr, type) {
				showRegionOnBranchTab = false;
			}
		});
	}
	
	var getResult;
	var putResult;
	var delResult;
	var postResult;
	var putError;

	function _get(resource) {
		$.ajax({
			type: 'GET',
			url: restConnector + resource,
			dataType: 'json',
			async: false,
			cache: false,
			success: function(val) {
				_handleSuccess(val, 'GET');
			},
			error: function(xhr, type) {
				_handleError(xhr, 'GET');
			}
		});
	}

	function _getCentral(resource) {
		$.ajax({
			type: 'GET',
			url: resource,
			dataType: 'json',
			async: false,
			cache: false,
			success: function(val) {
				_handleSuccess(val, 'GET');
			},
			error: function(xhr, type) {
				_handleError(xhr, 'GET');
			}
		});
	}
	
	function _del(resource) {
		$.ajax({
			type: 'DELETE',
			url: restConnector + resource,
			dataType: 'json',
			async: false,
			cache: false,
			success: function(val) {
				_handleSuccess(val, 'DEL');
			},
			error: function(xhr, type) {
				_handleError(xhr, 'DEL');
			}
		});
	}
	
	function _post(resource) {
		$.ajax({
			type: 'POST',
			url: restConnector + resource,
			dataType: 'json',
			async: false,
			cache: false,
			success: function(val) {
				_handleSuccess(val, 'POST');
			},
			error: function(xhr, type) {
				_handleError(xhr, 'POST');
			}
		});
	}

	function _put(resource) {
		$.ajax({
			type: 'PUT',
			url: restConnector+resource,
			dataType: 'json',
			async: false,
			success: function(val) {
				_handleSuccess(val, 'PUT');
			},
			error: function(xhr, type) {
				_handleError(xhr, 'PUT')
			}
		});
	}
	
	function _postParams(resource,params) {
		$.ajax({
			type: 'POST',
			url: restConnector + resource,
			data: params.json,
			contentType: 'application/json',
			dataType: 'json',
			async: false,
			cache: false,
			success: function(val) {
				_handleSuccess(val, 'POST');
			},
			error: function(xhr, type) {
				_handleError(xhr, 'POST');
			}
		});
	}
	
	function _putParams(resource, params) {
		$.ajax({
			type: 'PUT',
			url: restConnector + resource,
			data: params.json,
			dataType: 'json',
			contentType: 'application/json',
			async: false,
			success: function(val) {
				_handleSuccess(val, 'PUT');
			},
			error: function(xhr, type) {
				_handleError(xhr, 'PUT');
			}
		});
	}

	function _putCallback(resource) {
		$.ajax({
			type: 'PUT',
			url: restConnector + resource,
			dataType: 'json',
			async: false,
			success: function (val) {
				_handleSuccess(val, 'PUT');
			},
			error: function (xhr, type) {
				_handleError(xhr, 'PUT');
			}
		});
	}
	
	var _branchTree;
	var _branchDetails;
	
	function _getBranchTree() {
		$.ajax({
			type: 'GET',
			url: 'branches',
			dataType: 'json',
			async: false,
			cache: false,
			success: function(val) {
				_branchTree = val;
			},
			error: function(xhr, type) {
				_branchTree = null;
			}
		});
	}
	
	function _getBranchDetails() {
		$.ajax({
			type: 'GET',
			url: 'branchesDetails',
			dataType: 'json',
			async: false,
			cache: false,
			success: function(val) {
				_branchDetails = val;
			},
			error: function(xhr, type) {
				_getBranchDetails = null;
			}
		});
	}
	var _setGlobalVar =""
	function _setGlobalVariable(name,value) {
		params = {};
		params.name=name;
		params.value=value;		
		$.ajax({
			type: 'PUT',
			url: restConnector +'/rest/entrypoint/variables',
			contentType: 'application/json; charset=UTF-8',
			dataType: 'json',
			data: JSON.stringify(params),
			async: false,
			success: function() {
				_setGlobalVar = "Ok"
				return "Ok";
			},
			error: function(xhr, type) {
				_setGlobalVar = "Error"
				return "Error";
			}
		});
	}
	
	function _setBranchVariable(branchId,name,value) {
		params = {};
		params.name=name;
		params.value=value;		
		$.ajax({
			type: 'PUT',
			url: restConnector +'/rest/entrypoint/branches/' + branchId + '/variables',
			contentType: 'application/json; charset=UTF-8',
			dataType: 'json',
			data: JSON.stringify(params),
			async: false,
			success: function() {
			},
			error: function(xhr, type) {
			}
		});
	}

	function _handleSuccess(val, reqType) {
		switch (reqType) {
			case 'GET':
				getResult = val;
				break;
			case 'PUT':
				putResult = val;
				break;
			case 'DEL':
				delResult = val;
				break;
			case 'POST':
				postResult = val;
				break;
		}
	}

	function _handleError(xhr, reqType) {
		switch (reqType) {
			case 'GET':
				getResult = null;
				break;
			case 'PUT':
				putResult = null;
				break;
			case 'DEL':
				delResult = null;
				break;
			case 'POST':
				postResult = null;
				break;
		}
		_logError(xhr);
	}

	function _logError(xhr) {
		var errorCode = xhr.getResponseHeader('ERROR_CODE');
		var err;
		if(typeof errorCode === 'undefined' || errorCode == null || errorCode == "") {
			// strip out html text
			var text = _stripHtml(xhr.getResponseHeader("ERROR_MESSAGE"));
			// limit the no of characters to 200
			if (text.length > 200) {
				text = text.substring(0,200);
			}
			err = translate.msg('error.server_error', [text]);
		} else {
			err = translate.msg('error.server_error_' + errorCode);
			if(err == 'error.server.error_' + errorCode) {
				err = translate.msg('error.server_error', [errorCode]);
			}
		}
//		util.showError(err);
	}
	

	// Strips any html elements within a string
	// inspired from
	// http://stackoverflow.com/questions/822452/strip-html-from-text-javascript:
	function _stripHtml(htmlString) {
		// put the string in a div and get the raw text
		var tmp = document.createElement("DIV");
		tmp.innerHTML = htmlString;
		var text = tmp.textContent || tmp.innerText;
		// remove any nested html comments
		return text.replace(/<!--*[^<>]*-->/ig, "");
	}
	
	return {
		get : function(resource) {
			_get(resource);
			return getResult;
		},

		getCentral : function(resource) {
			_getCentral(resource);
			return getResult;
		},

		del : function(resource) {
			_del(resource);
			return delResult;
		},
		
		post : function(resource) {
			_post(resource);
			return postResult;
		},
		
		put : function(resource) {
			_put(resource);
			return putResult;
		},

		getParse : function(resource, newFunction) {
			var call=eval(newFunction);
			_get(resource);
			call(getResult);
			return getResult;
		},

		postParse : function(resource, newFunction) {
			var call=eval(newFunction);
        	_post(resource);
			call(postResult);
			return postResult;
		},
		
		postParams : function(resource,params) {
			_postParams(resource,params);
			return postResult;
		},
		
		putParams : function(resource,params) {
			_putParams(resource,params);
			return putResult;
		},	
		
		putCallback : function(resource) {
			_putCallback(resource);
			return putResult;
		},

		setGlobalVariable : function(name,value) {
			_setGlobalVariable(name,value);
			return _setGlobalVar;
		},

		setBranchVariable : function(branchId,name,value) {
			_setBranchVariable(branchId,name,value);
		},	

		putError : function() {
			return putError;
		},

		getBranchTree : function() {
			_getBranchTree();
			return _branchTree;
		},
		
		getBranchDetails : function() {
			_getBranchDetails();
			return _branchDetails;
		}
	
	};

})(jQuery);