function branchWebCamOverview( ) {
	variableAll = util.getStatVariables(4);
	if (selectedView != 4) {
		showPanel(4, selectedBranchId, selectedBranchName);
		$("#webcamView").find("tr:gt(0)").remove();
		var s = '<tr align="center"><td align="center"><iframe scrolling="no" height="' + currentSettings.webCamFrameHeight + 'px"  width="' + currentSettings.webCamFrameWidth + 'px" src="'+ webCamUrl +'" ></iframe></td></tr>';
		$('#webcamView').append(s);
	}
	getBranchGraphData(selectedBranchId);
}


function showCam() {
	if (webCamWindow == true ) {
		window.open(webCamUrl,'Waiting Area', 'width=800,height=600, location=no, menubar=no, scrollbars=no, toolbar=no, status=no' );
	} else {
		var html = '<iframe scrolling="no" height="600" width="100%" src="'+ webCamUrl +'" ></iframe>';
		document.getElementById('webCamScr').innerHTML = html;
		util.showModal('webCamPage');
	}
}


function hideCam() {
	var html = '&nbsp;';
	document.getElementById('webCamScr').innerHTML = html;
	util.hideModal('webCamPage');
}