function showLane(startList) {
	// var sx = 126.93737555322481;
	// var sy = 37.55525165729346;
	// var ex = 126.88265238619182;
	// var ey = 37.481440035175375;
	console.log("test button cliced");
	var middlePoint = startList[startList.length-1]
	console.log(middlePoint);
	var ex = middlePoint.position.x;
	var ey = middlePoint.position.y;
	
	for(var i=0; i<(startList.length-1);i++){
		console.log(i + startList[i].position);
		var sx = startList[i].position.x;
		var sy = startList[i].position.y;

		return new Promise(function(resolve, reject) {
			fetch(`http://165.194.35.214:26656/lane/?sx=${sx}&sy=${sy}&ex=${ex}&ey=${ey}`)
			.then(function(res){
				res.json().then(body => {
					console.log("returned data :" + body);
					callMapObjApiAJAX(JSON.parse(body)["result"]["path"][0].info.mapObj);
			})
		})
	})
	}
	
}

function callMapObjApiAJAX(mapObj){
		console.log(mapObj);
		//ODsay apiKey 입력
		fetch(`http://165.194.35.214:26656/lane/loadLane/?mapObj=${mapObj}`)
		.then(function(res){
			res.json().then(body=>{
				var resultJsonData = JSON.parse(body);
				console.log(resultJsonData);
				drawNaverPolyLine(resultJsonData);		// 노선그래픽데이터 지도위 표시
				// boundary 데이터가 있을경우, 해당 boundary로 지도이동
				if(resultJsonData.result.boundary){
						var boundary = new naver.maps.LatLngBounds(
				                new naver.maps.LatLng(resultJsonData.result.boundary.top, resultJsonData.result.boundary.left),
				                new naver.maps.LatLng(resultJsonData.result.boundary.bottom, resultJsonData.result.boundary.right)
				                );
						map.panToBounds(boundary);
				}
			})
		})
	};
	
	
	// 노선그래픽 데이터를 이용하여 지도위 폴리라인 그려주는 함수
	function drawNaverPolyLine(data){
		var lineArray;
		
		for(var i = 0 ; i < data.result.lane.length; i++){
			for(var j=0 ; j <data.result.lane[i].section.length; j++){
				lineArray = null;
				lineArray = new Array();
				for(var k=0 ; k < data.result.lane[i].section[j].graphPos.length; k++){
					lineArray.push(new naver.maps.LatLng(data.result.lane[i].section[j].graphPos[k].y, data.result.lane[i].section[j].graphPos[k].x));
				}
				
			//지하철결과의 경우 노선에 따른 라인색상 지정하는 부분 (1,2호선의 경우만 예로 들음)
				if(data.result.lane[i].type == 1){
					var polyline = new naver.maps.Polyline({
					    map: map,
					    path: lineArray,
					    strokeWeight: 3,
					    strokeColor: '#003499'
					});
				}else if(data.result.lane[i].type == 2){
					var polyline = new naver.maps.Polyline({
					    map: map,
					    path: lineArray,
					    strokeWeight: 3,
					    strokeColor: '#37b42d'
					});
				}else{
					var polyline = new naver.maps.Polyline({
					    map: map,
					    path: lineArray,
					    strokeWeight: 3
					});
				}
			}
		}
	}
