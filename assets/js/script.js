function weatherInfo() {
    var userRequest = localStorage.getItem("userInput");
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
        var requestedLat = data[0].lat
        var requestedLon = data[0].lon
        console.log(requestedLat)
        console.log(requestedLon)
        var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + requestedLat + "&lon=" + requestedLon + "&exclude=minutely,hourly&appid=23343143cc261b0ecb35b3be3eb91e01"
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

      for (i = 0; i < 5; i++) {
        var date = moment(data[i].datetime).format("MMM Do, YYYY");
        console.log(moment(date).format("MMM Do, YYYY"));
        var li = $("<li>");
        $("<a>")
          .attr("href", data[i].url)
          .text(
            data[0].artist.name +
              " Performing At " +
              data[i].venue.name +
              " " +
              data[i].venue.location +
              " " +
              date
          )
          .appendTo(li);
        li.appendTo(concertList);
      }
    });
    });
}
  weatherInfo();