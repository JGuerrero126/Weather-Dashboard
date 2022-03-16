var cityNameDate = $("#cityNameDate");
var temp = $("#temp");
var wind = $("#wind");
var humidity = $("#humidity");
var uv = $("#uv");
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
      uv.text("UV Index: " + data.current.uvi)
       for( i = 0; i < 5 ; i++ ) {
        var time = moment().add(i+1, "d").format("(M/D/YYYY)")
        var cardContainer = $("<div>").addClass("card").attr("style", "width: 200px; margin-left: 10px;")
        var cardBody = $("<div>").addClass("card-body")
        var date = $("<h5>").addClass("card-title").text(time)
        var daytemp = $("<p>").addClass("card-text").text("Temp: " + data.daily[i].temp.day)
        var daywind = $("<p>").addClass("card-text").text("Wind: " + data.daily[i].wind_speed)
        var dayhumidity =  $("<p>").addClass("card-text").text("Humidity: " + data.daily[i].humidity)
        cardBody.append(date)
        cardBody.append(daytemp)
        cardBody.append(daywind)
        cardBody.append(dayhumidity)
        cardContainer.append(cardBody)
        fiveDay.append(cardContainer)
       }
    });
    });
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

getPastSearch();