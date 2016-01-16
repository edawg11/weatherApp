$(document).ready(init);

function init() {
	var apiKey = "http://api.wunderground.com/api/d8483e016960a875/";
	


	getUserLocation();
	getWeather();
	setBackground();

	$('#searchButton').on('click', searchWeather);

	function setBackground (){
		var d = new Date();
		var n = d.getHours();
		if (n > 19 || n < 6) {
		  $('body').addClass('night')
		
		}else if (n > 16 && n < 19) {
			$('body').addClass('suset')

		}else if (n > 6 || n < 12) {
			  $('body').addClass('morning')

		} else {
			$('body').addClass('day')
		}
	
	}

	function getUserLocation() {
	  $.ajax(apiKey + "geolookup/q/autoip.json", {
	    success: function(data) {
	    	var defaultZipCode;
	    	defaultZipCode = data.location.zip;
	    	$('#searchBar').val(data.location.zip);
	    	$('.place').text(data.location.city+", "+ data.location.state)
	    	getWeather(defaultZipCode);

	      
	    }
	  }) 
	}

	function searchWeather(){
		var $search = $('#searchBar').val()
		getWeather($search);
	 }  
	  

	function getWeather (location) {

		var url = apiKey + 'conditions/q/' + location + '.json';
		var forecastURL = "http://www.wunderground.com/US/CA/San_Francisco.html";
			//http://api.wunderground.com/api/d8483e016960a875/conditions/q/CA/San_Francisco.json
		$.get(url)
			.done(function(data){
	
				// var todayLocation = data.location.city+", "+ data.location.state;
				var todayTemp = (data.current_observation.temperature_string) + ' ' ;
				var todayImage = data.current_observation.icon_url;
				var todayWind = (data.current_observation.wind_string) + ' ';
				var todayDescription = data.current_observation.weather;
				var todayHumidity = data.current_observation.relative_humidity;
				
				var time = data.current_observation.local_time_rfc822;

		
				$('.todayTemperature').text(todayTemp)
				$('.todayDescription').text(todayDescription);
				$('.todayHumidity').text(todayHumidity);
				$('.todayImage').attr('src', todayImage);
				$('.todayWind').text(todayWind);

				
				// $('#currentTemp').empty();
				// $('#currentWind').empty();
				// $('#currentTime').empty();
				// $('#currentTemp').append('Your current temperature is: ')
				// $('#currentTemp').append(currentTemp);
				// $('#currentTemp').append('<img src="' + currentImage + '" alt="Current Weather condition image">');
				// $('#currentWind').append('Wind is currently: ')
				// $('#currentWind').append(currentWind);
				// $('#currentTime').append('Your current local time is: ')
				// $('#currentTime').append(currentTime);
			})
		.fail(function(error){
			console.error(error);
			});
		};
}	