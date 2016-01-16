$(document).ready(init);

function init() {

	var apiKey = "http://api.wunderground.com/api/d8483e016960a875/";


	function getUserLocation (){
		$.ajax(apiKey+'geolookup/q/autoip.json'), {
			success: function(data){
				var defaultZipCode = data.location.zip;
				$('#searchBar').val(defaultZipCode);
			}
		}
	};

	function getWeather(){

	};
}	