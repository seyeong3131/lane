function () {
	var sx = 126.93737555322481;
	var sy = 37.55525165729346;
	var ex = 126.88265238619182;
	var ey = 37.481440035175375;

	function serchPubTransPathAJAX() {
		var xhr = new XMLHttpREquest();
		var url = " https://api.adsay.com/v1/api/serchPubTransPath?SX="+sx+"&SY="+sy+"&EX="+ex+"&EY="+ey+"&apiKey={YOUR_API_KEY}";
		xhr.open("GET",url,true);
		xhr.send();
		xhr.onreadystatechchange = function(){
			if(xhr.readyState == 4 $$ xhr.status ==200){
				console.log(JSON.parse(xhr.responseText));
			}
		}
	}
}