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

function weatherInfo() {
  weatherArea[0].setAttribute("style", "display: block");

  while (fiveDay[0].hasChildNodes()) {
    fiveDay[0].removeChild(fiveDay[0].firstChild);
  }

  var locationURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityInput.val().replace(/\s+/g, "+") +
    "&limit=1&appid=23343143cc261b0ecb35b3be3eb91e01";
  console.log(locationURL);

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
          temp.text(data.current.temp + "°F");
          wind.text(data.current.wind_speed + " MPH");
          humidity.text(data.current.humidity + " %");
          if (data.current.uvi < 2) {
            uv.text(data.current.uvi).addClass("greenback");
          } else if (data.current.uvi < 5) {
            uv.text(data.current.uvi).addClass("yellowback");
          } else if (data.current.uvi < 7) {
            uv.text(data.current.uvi).addClass("orangeback");
          } else if (data.current.uvi < 10) {
            uv.text(data.current.uvi).addClass("redback");
          } else if (data.current.uvi >= 11) {
            uv.text(data.current.uvi).addClass("purpleback");
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
            var newHumid = document.createTextNode(
              "Humidity: " + data.daily[0].humidity + " %"
            );
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
  weatherInfo();
  storeSearch();
});

pastSearches.on("click", function (event) {
  var element = event.target;
  event.preventDefault();
  event.stopPropagation();

  if (element.matches("li")) {
    var input = element.textContent;
    var locationURL =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      input +
      "&limit=1&appid=23343143cc261b0ecb35b3be3eb91e01";
    console.log(locationURL);

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
        var rightNow = moment().format("(M/D/YYYY)");
        cityNameDate.text(data[0].name + " " + rightNow);
        var requestedLat = data[0].lat;
        var requestedLon = data[0].lon;
        console.log(requestedLat);
        console.log(requestedLon);
        var weatherURL =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          requestedLat +
          "&lon=" +
          requestedLon +
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
            var iconcode1 = data.daily[0].weather[0].icon;
            var iconcode2 = data.daily[1].weather[0].icon;
            var iconcode3 = data.daily[2].weather[0].icon;
            var iconcode4 = data.daily[3].weather[0].icon;
            var iconcode5 = data.daily[4].weather[0].icon;
            var iconurl1 =
              "http://openweathermap.org/img/w/" + iconcode1 + ".png";
            var iconurl2 =
              "http://openweathermap.org/img/w/" + iconcode2 + ".png";
            var iconurl3 =
              "http://openweathermap.org/img/w/" + iconcode3 + ".png";
            var iconurl4 =
              "http://openweathermap.org/img/w/" + iconcode4 + ".png";
            var iconurl5 =
              "http://openweathermap.org/img/w/" + iconcode5 + ".png";
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
            time = moment()
              .add(i + 1, "d")
              .format("(M/D/YYYY)");
            oneDate.text(moment().add(1, "d").format("(M/D/YYYY)"));
            icon1.attr("src", iconurl1);
            oneTemp.text("Temp: " + data.daily[0].temp.day + "°F");
            oneWind.text("Wind: " + data.daily[0].wind_speed + " MPH");
            oneHumidity.text("Humidity: " + data.daily[0].humidity + " %");
            twoDate.text(moment().add(2, "d").format("(M/D/YYYY)"));
            icon2.attr("src", iconurl2);
            twoTemp.text("Temp: " + data.daily[1].temp.day + "°F");
            twoWind.text("Wind: " + data.daily[1].wind_speed + " MPH");
            twoHumidity.text("Humidity: " + data.daily[1].humidity + " %");
            threeDate.text(moment().add(3, "d").format("(M/D/YYYY)"));
            icon3.attr("src", iconurl3);
            threeTemp.text("Temp: " + data.daily[2].temp.day + "°F");
            threeWind.text("Wind: " + data.daily[2].wind_speed + " MPH");
            threeHumidity.text("Humidity: " + data.daily[2].humidity + " %");
            fourDate.text(moment().add(4, "d").format("(M/D/YYYY)"));
            icon4.attr("src", iconurl4);
            fourTemp.text("Temp: " + data.daily[3].temp.day + "°F");
            fourWind.text("Wind: " + data.daily[3].wind_speed + " MPH");
            fourHumidity.text("Humidity: " + data.daily[3].humidity + " %");
            fiveDate.text(moment().add(5, "d").format("(M/D/YYYY)"));
            icon5.attr("src", iconurl5);
            fiveTemp.text("Temp: " + data.daily[4].temp.day + "°F");
            fiveWind.text("Wind: " + data.daily[4].wind_speed + " MPH");
            fiveHumidity.text("Humidity: " + data.daily[4].humidity + " %");
          });
      });
  }
});

getPastSearch();
