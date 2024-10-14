function getExpressiaData(id){
	var eId =[];
	if (id == 0) {
		for ( a = 0; a < branches.length; a++){
			eId.push(branches[a].id)
		}
	} else {
		eId.push(id)
	}
	var eData = [0,0,0,0,0]
	var eDataPerc = [0,0,0,0,0]
	for ( a= 0; a < eId.length; a++) {
		eDataId = eId[a];
		varTemp = "20200302@1,0@2,0@3,0@4,0@5,0"
		for (j=0; j < variableAll.length; j++ ) {
			// finding stored global var for this branch
			if ( variableAll[j].name == 'branchExpressiaStatInfo_' + eDataId ) {
				varTemp = variableAll[j].value;
			}
		}
		
		varTemp = varTemp.split("@");
		if (util.todayYYYYMMDD() == parseInt(varTemp[0], 10)) {
			eData[0] += parseInt (varTemp[1].split(",")[1],10);
			eData[1] += parseInt (varTemp[2].split(",")[1],10);
			eData[2] += parseInt (varTemp[3].split(",")[1],10);
			eData[3] += parseInt (varTemp[4].split(",")[1],10);
			eData[4] += parseInt (varTemp[5].split(",")[1],10);
		}
		
		
	}
	var eDataTot = eData[0] + eData[1] + eData[2] + eData[3] + eData[4];
	
	if (eDataTot > 0) {
		var eDataAvg = ((eData[0]*100) + (eData[1]*75) + (eData[2]*50) + (eData[3]*25))/eDataTot;
		
		eDataPerc[0] = parseInt(100 * eData[0]/eDataTot, 10);
		eDataPerc[1] = parseInt(100 * eData[1]/eDataTot, 10);
		eDataPerc[2] = parseInt(100 * eData[2]/eDataTot, 10);
		eDataPerc[3] = parseInt(100 * eData[3]/eDataTot, 10);
		eDataPerc[4] = parseInt(100 * eData[4]/eDataTot, 10);

		eDataAvg = parseInt(eDataAvg*10,10)/10;
	}

	graphExpressia(eDataPerc,eDataTot,eDataAvg,eData);
}

function getExpressiaWsData(id) {
	var avgSatisfaction = noDataChar
	for (j=0; j < variableAll.length; j++ ) {
			// finding stored global var for this branch
			if ( variableAll[j].name == 'branchExpressiaWsStatInfo_' + selectedBranchId ) {
				var varTemp = variableAll[j].value;
				varTemp = varTemp.split("#");
				if (util.todayYYYYMMDD() == parseInt(varTemp[0], 10)) {
					for ( b = 1; b < varTemp.length; b++){
						var t = varTemp[b].split("@");
						if ( (t[0]+"") == (id+"") ){
							var eData =[0,0,0,0,0]
							eData[0] += parseInt (t[1].split(",")[1],10);
							eData[1] += parseInt (t[2].split(",")[1],10);
							eData[2] += parseInt (t[3].split(",")[1],10);
							eData[3] += parseInt (t[4].split(",")[1],10);
							eData[4] += parseInt (t[5].split(",")[1],10);
							var eDataTot = eData[0] + eData[1] + eData[2] + eData[3] + eData[4];
							if (eDataTot > 0) {
								var eDataAvg = ((eData[0]*100) + (eData[1]*75) + (eData[2]*50) + (eData[3]*25))/eDataTot;
								avgSatisfaction = parseInt(eDataAvg*10,10)/10 + "% (" + eDataTot + ")" ;	
							}
						}
					}
				}
			}
		}	
	return avgSatisfaction;
}
