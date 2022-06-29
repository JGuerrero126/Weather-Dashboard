// These Variables all reference important elements from the index.html that will need to be accessed throughout the script.js
var cityNameDate = $("#cityNameDate");
var temp = $("#temp");
var wind = $("#wind");
var humidity = $("#humidity");
var uv = $("#uv");
var cityInput = $("#cityInput");
var fiveDay = $("#fiveDay");
var searchBtn = $("#searchBtn");
var pastSearches = $("#pastSearches");
var storedCities = [];
var weatherArea = $("#weather");

function weatherInfo(event) {
  weatherArea[0].setAttribute("style", "display: block");

  while (fiveDay[0].hasChildNodes()) {
    fiveDay[0].removeChild(fiveDay[0].firstChild);
  }

  if (event.target.matches("li")) {
    var input = event.target.textContent;

    var locationURL =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      input +
      "&limit=1&appid=23343143cc261b0ecb35b3be3eb91e01";
    console.log(locationURL);
  } else {
    var locationURL =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      cityInput.val().replace(/\s+/g, "+") +
      "&limit=1&appid=23343143cc261b0ecb35b3be3eb91e01";
    console.log(locationURL);
  }
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
      cityNameDate.text(data[0].name + " " + moment().format("(M/D/YYYY)"));
      console.log(data[0].lat);
      console.log(data[0].lon);
      var weatherURL =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        data[0].lat +
        "&lon=" +
        data[0].lon +
        "&exclude=minutely,hourly&units=imperial&appid=23343143cc261b0ecb35b3be3eb91e01";
      console.log(weatherURL);
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
          var mainWeather = data.current.weather[0].main;
          console.log(mainWeather);
          temp.text(data.current.temp + "°F");
          wind.text(data.current.wind_speed + " MPH");
          humidity.text(data.current.humidity + " %");
          if (data.current.uvi < 2) {
            uv.text(data.current.uvi).addClass("greenback");
            uv.removeClass("yellowback orangeback redback purpleback");
          } else if (data.current.uvi < 5) {
            uv.text(data.current.uvi).addClass("yellowback");
            uv.removeClass("greenback orangeback redback purpleback");
          } else if (data.current.uvi < 7) {
            uv.text(data.current.uvi).addClass("orangeback");
            uv.removeClass("yellowback greenback redback purpleback");
          } else if (data.current.uvi < 10) {
            uv.text(data.current.uvi).addClass("redback");
            uv.removeClass("yellowback orangeback greenback purpleback");
          } else if (data.current.uvi >= 11) {
            uv.text(data.current.uvi).addClass("purpleback");
            uv.removeClass("yellowback orangeback redback greenback");
          }
          if (mainWeather === "Clear") {
            document.body.style.backgroundImage =
              "url(https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618_960_720.jpg)";
          }
          if (mainWeather === "Clouds") {
            document.body.style.backgroundImage =
              "url(https://cdn.pixabay.com/photo/2018/06/26/18/42/sky-3499982_960_720.jpg)";
          }
          if (mainWeather === "Rain") {
            document.body.style.backgroundImage =
              "url(https://cdn.pixabay.com/photo/2014/09/21/14/35/surface-455120_960_720.jpg)";
          }
          for (j = 0; j < 5; j++) {
            var outerCard = document.createElement("div");
            outerCard.setAttribute("class", "card custom-card");
            var newCard = document.createElement("div");
            newCard.setAttribute("class", "card-body");
            var newTitle = document.createTextNode(
              moment()
                .add(j + 1, "d")
                .format("(M/D/YYYY)")
            );
            var newImage = document.createElement("img");
            newImage.setAttribute("alt", "Weather Icon");
            newImage.setAttribute(
              "src",
              "http://openweathermap.org/img/w/" +
                data.daily[j].weather[0].icon +
                ".png"
            );
            var newTemp = document.createElement("p");
            newTemp.innerText = "Temp: " + data.daily[j].temp.day + "°F";
            var newWind = document.createElement("p");
            newWind.innerText = "Wind: " + data.daily[j].wind_speed + " MPH";
            var newHumid = document.createElement("p");
            newHumid.innerText = "Humidity: " + data.daily[j].humidity + " %";
            outerCard.appendChild(newCard);
            newCard.append(newTitle, newImage, newTemp, newWind, newHumid);
            fiveDay.append(outerCard);
          }
        });
    });
}

function storeSearch() {
  var requestedCity = cityInput.val();
  storedCities = JSON.parse(localStorage.getItem("Cities"));
  if (storedCities == null) {
    storedCities = [];
  }
  storedCities.push(requestedCity);
  localStorage.setItem("Cities", JSON.stringify(storedCities));
  var li = $("<li>").text(requestedCity).addClass("li");
  pastSearches.append(li);
}

function getPastSearch() {
  storedCities = JSON.parse(localStorage.getItem("Cities"));
  for (i = 0; storedCities.length > i; i++) {
    if (storedCities.length === null) {
      storedCities = [];
    } else {
      var li = $("<li>").text(storedCities[i]).addClass("li");
      pastSearches.append(li);
    }
  }
}

searchBtn.on("click", function (event) {
  event.preventDefault();
  event.stopPropagation();
  weatherInfo(event);
  storeSearch();
});

pastSearches.on("click", function (event) {
  event.preventDefault();
  event.stopPropagation();

  weatherInfo(event);
});

getPastSearch();
