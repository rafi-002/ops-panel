var maxVisibilityTheme = 1;

function saveUserMapping() {
	newVar= JSON.stringify(userMapping);
	setGlobalVariable('opsusermapping_'+ oasUser,newVar);
}

function updateVisibilityTheme(firstLoad){
	var theme = userMapping.visibilityTheme
	if ((firstLoad == true && theme > 0) || ( firstLoad == false))  {
		loadjscssfile("./css/visibilityTheme"+ theme +".css", "css")
	}
}

function changeVisibilityTheme(){
	newTheme = userMapping.visibilityTheme + 1;
	if (newTheme > maxVisibilityTheme) {
		newTheme = 0;
	}
	userMapping.visibilityTheme = newTheme;
	updateVisibilityTheme(false);
	saveUserMapping();
	changeVisibityTooltips();
}

function changeVisibityTooltips() {
	tooltipLabel = "enable";
	if (userMapping.visibilityTheme == 1) {
		tooltipLabel = "disable";
	}
	
	$('#regionVisibilityToolTip').text(jQuery.i18n.prop('tooltip.visibility.' + tooltipLabel));
	$('#branchVisibilityToolTip').text(jQuery.i18n.prop('tooltip.visibility.' + tooltipLabel));
	$('#appointVisibilityToolTip').text(jQuery.i18n.prop('tooltip.visibility.' + tooltipLabel));
	$('#queueVisibilityToolTip').text(jQuery.i18n.prop('tooltip.visibility.' + tooltipLabel));
	$('#servicepointVisibilityToolTip').text(jQuery.i18n.prop('tooltip.visibility.' + tooltipLabel));
	$('#queueSpVisibilityToolTip').text(jQuery.i18n.prop('tooltip.visibility.' + tooltipLabel));
}