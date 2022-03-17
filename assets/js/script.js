var cityNameDate = $("#cityNameDate");
var temp = $("#temp");
var wind = $("#wind");
var humidity = $("#humidity");
var uv = $("#uv");
var oneDate = $("#oneDayDate");
var oneTemp = $("#oneDayTemp");
var oneWind = $("#oneDayWind");
var oneHumidity = $("#oneDayHumid");
var twoDate = $("#twoDayDate");
var twoTemp = $("#twoDayTemp");
var twoWind = $("#twoDayWind");
var twoHumidity = $("#twoDayHumid");
var threeDate = $("#threeDayDate");
var threeTemp = $("#threeDayTemp");
var threeWind = $("#threeDayWind");
var threeHumidity = $("#threeDayHumid");
var fourDate = $("#fourthDayDate");
var fourTemp = $("#fourthDayTemp");
var fourWind = $("#fourthDayWind");
var fourHumidity = $("#fourthDayHumid");
var fiveDate = $("#fiveDayDate");
var fiveTemp = $("#fiveDayTemp");
var fiveWind = $("#fiveDayWind");
var fiveHumidity = $("#fiveDayHumid");
var cityInput = $("#cityInput");
var fiveDay = $("#fiveDay");
var searchBtn = $("#searchBtn");
var pastSearches = $("#pastSearches");
var storedCities = []

function weatherInfo() {
    var requestedCity = cityInput.val().replace(/\s+/g, "+")
    var locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + requestedCity + "&limit=1&appid=23343143cc261b0ecb35b3be3eb91e01"
    console.log(locationURL)
  
    fetch(locationURL)
      .then(function (response) {
        if (response.status === 404) {
          console.log(response.status);
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
        console.log(response.status);
      } else {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);
      temp.text("Temp: " + data.current.temp)
      wind.text("Wind: " + data.current.wind_speed)
      humidity.text("Humidity: " + data.current.humidity)
      if (data.current.uvi < 2) {
        uv.text("UV Index: " + data.current.uvi).addClass("greenback")
      } else if (data.current.uvi < 5) {
        uv.text("UV Index: " + data.current.uvi).addClass("yellowback")
      } else if (data.current.uvi < 7) {
        uv.text("UV Index: " + data.current.uvi).addClass("orangeback")
      } else if (data.current.uvi < 10) {
        uv.text("UV Index: " + data.current.uvi).addClass("redback")
      } else if (data.current.uvi >= 11) {
        uv.text("UV Index: " + data.current.uvi).addClass("purpleback")
      }
      time = moment().add(i+1, "d").format("(M/D/YYYY)")
      oneDate.text(moment().add(1, "d").format("(M/D/YYYY)"))
      oneTemp.text("Temp: " + data.daily[0].temp.day)
      oneWind.text("Wind: " + data.daily[0].wind_speed)
      oneHumidity.text("Humidity: " + data.daily[0].humidity)
      twoDate.text(moment().add(2, "d").format("(M/D/YYYY)"))
      twoTemp.text("Temp: " + data.daily[1].temp.day)
      twoWind.text("Wind: " + data.daily[1].wind_speed)
      twoHumidity.text("Humidity: " + data.daily[1].humidity)
      threeDate.text(moment().add(3, "d").format("(M/D/YYYY)"))
      threeTemp.text("Temp: " + data.daily[2].temp.day)
      threeWind.text("Wind: " + data.daily[2].wind_speed)
      threeHumidity.text("Humidity: " + data.daily[2].humidity)
      fourDate.text(moment().add(4, "d").format("(M/D/YYYY)"))
      fourTemp.text("Temp: " + data.daily[3].temp.day)
      fourWind.text("Wind: " + data.daily[3].wind_speed)
      fourHumidity.text("Humidity: " + data.daily[3].humidity)
      fiveDate.text(moment().add(5, "d").format("(M/D/YYYY)"))
      fiveTemp.text("Temp: " + data.daily[4].temp.day)
      fiveWind.text("Wind: " + data.daily[4].wind_speed)
      fiveHumidity.text("Humidity: " + data.daily[4].humidity)
    })
  })
}

function storeSearch() {
    var requestedCity = cityInput.val();
    storedCities = JSON.parse(localStorage.getItem("Cities"))
    if (storedCities == null) {
        storedCities = []
    }
    storedCities.push(requestedCity)
    localStorage.setItem("Cities", JSON.stringify(storedCities))
    var li = $("<li>").text(requestedCity).addClass("li")
    pastSearches.append(li)
}

function getPastSearch() {
    storedCities = JSON.parse(localStorage.getItem("Cities"))
    for(i = 0;storedCities.length > i; i++) {
        if (storedCities.length === null) {
            storedCities = []
        } else {
        var li = $("<li>").text(storedCities[i]).addClass("li")
    pastSearches.append(li)
        }
    }
}

searchBtn.on("click", function(event) {
    event.preventDefault();
    event.stopPropagation();
    weatherInfo();
    storeSearch();
})

pastSearches.on("click", function (event) {
    var element = event.target;
    event.preventDefault();
    event.stopPropagation();

    if (element.matches("li")) {
    var input = element.textContent
    var locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + input + "&limit=1&appid=23343143cc261b0ecb35b3be3eb91e01"
    console.log(locationURL)
  
    fetch(locationURL)
      .then(function (response) {
        if (response.status === 404) {
          console.log(response.status);
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
        console.log(response.status);
      } else {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);
      temp.text("Temp: " + data.current.temp)
      wind.text("Wind: " + data.current.wind_speed)
      humidity.text("Humidity: " + data.current.humidity)
      if (data.current.uvi < 2) {
        uv.text("UV Index: " + data.current.uvi).addClass("greenback")
      } else if (data.current.uvi < 5) {
        uv.text("UV Index: " + data.current.uvi).addClass("yellowback")
      } else if (data.current.uvi < 7) {
        uv.text("UV Index: " + data.current.uvi).addClass("orangeback")
      } else if (data.current.uvi < 10) {
        uv.text("UV Index: " + data.current.uvi).addClass("redback")
      } else if (data.current.uvi >= 11) {
        uv.text("UV Index: " + data.current.uvi).addClass("purpleback")
      }
      time = moment().add(i+1, "d").format("(M/D/YYYY)")
      oneDate.text(moment().add(1, "d").format("(M/D/YYYY)"))
      oneTemp.text("Temp: " + data.daily[0].temp.day)
      oneWind.text("Wind: " + data.daily[0].wind_speed)
      oneHumidity.text("Humidity: " + data.daily[0].humidity)
      twoDate.text(moment().add(2, "d").format("(M/D/YYYY)"))
      twoTemp.text("Temp: " + data.daily[1].temp.day)
      twoWind.text("Wind: " + data.daily[1].wind_speed)
      twoHumidity.text("Humidity: " + data.daily[1].humidity)
      threeDate.text(moment().add(3, "d").format("(M/D/YYYY)"))
      threeTemp.text("Temp: " + data.daily[2].temp.day)
      threeWind.text("Wind: " + data.daily[2].wind_speed)
      threeHumidity.text("Humidity: " + data.daily[2].humidity)
      fourDate.text(moment().add(4, "d").format("(M/D/YYYY)"))
      fourTemp.text("Temp: " + data.daily[3].temp.day)
      fourWind.text("Wind: " + data.daily[3].wind_speed)
      fourHumidity.text("Humidity: " + data.daily[3].humidity)
      fiveDate.text(moment().add(5, "d").format("(M/D/YYYY)"))
      fiveTemp.text("Temp: " + data.daily[4].temp.day)
      fiveWind.text("Wind: " + data.daily[4].wind_speed)
      fiveHumidity.text("Humidity: " + data.daily[4].humidity)
    })
  })
}
})

getPastSearch();