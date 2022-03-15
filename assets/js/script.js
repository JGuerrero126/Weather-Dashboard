var cityNameDate = $("#cityNameDate")
var temp = $("#temp")
var wind = $("#wind")
var humidity = $("#humidity") 
var uv = $("#uv")
var cityInput = $("#cityInput")



function weatherInfo() {
    var locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + "london" + "&limit=1&appid=23343143cc261b0ecb35b3be3eb91e01"
  
    fetch(locationURL)
      .then(function (response) {
        if (response.status === 404) {
          console.log(response);
        } else {
          return response.json();
        }
      })
      .then(function (data) {
        console.log(data);
        var rightNow = moment().format("(M/D/YYYY)")
        cityNameDate.text(data[0].name + " " + rightNow)
        var requestedLat = data[0].lat
        var requestedLon = data[0].lon
        console.log(requestedLat)
        console.log(requestedLon)
        var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + requestedLat + "&lon=" + requestedLon + "&exclude=minutely,hourly&units=imperial&appid=23343143cc261b0ecb35b3be3eb91e01"
    console.log(weatherURL)
    fetch(weatherURL)
    .then(function (response) {
      if (response.status === 404) {
        console.log(response);
      } else {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);
      temp.text("Temp: " + data.current.temp)
      wind.text("Wind: " + data.current.wind_speed)
      humidity.text("Humidity: " + data.current.humidity)
      uv.text("UV Index: " + data.current.uvi)
      
    });
    });
}
  weatherInfo();