//Weather application using OpenWeatherMap weather API.
//openweathermap.org/

let ourGetButton = document.getElementById("btnGet");

ourGetButton.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      //get longditude, and latitude
      let lon = position.coords.longitude;
      let lat = position.coords.latitude;
      let lang = "en";
      let units = "metric";
      //set API KEY
      const API_KEY = "afbeaaf8acfc29b79cb6054be5c6197a";
      //api call
      let apiCall = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}&lang=${lang}`;

      //fetch the api with custom lat and long
      fetch(apiCall)
        //.then wait for info to be retreieved from server and "then" uses it.
        .then((response) => {
          if (!response.ok) throw new Error(response.statusText);
          return response.json();
        })
        .then((data) => {
          showWeather(data);
        })
        .catch(console.err);
    });
  }
});

function showWeather(resp) {
  console.log(resp);
  let row = document.querySelector(".weather.row");
  //clear out the old weather and add the new
  // row.innerHTML = '';
  row.innerHTML = resp.daily
    .map((day, idx) => {
      if (idx <= 2) {
        let dt = new Date(day.dt * 1000); //timestamp * 1000
        let sr = new Date(day.sunrise * 1000).toTimeString();
        let ss = new Date(day.sunset * 1000).toTimeString();
        return `
        <div class="col">
              <div class="card">
              <h5 class="card-title p-2">${dt.toDateString()}</h5>
                <img
                  src="http://openweathermap.org/img/wn/${
                    day.weather[0].icon
                  }@2x.png"
                  class="card-img-top"
                  alt="${day.weather[0].description}"
                />
                <div class="card-body">
                  <h3 class="card-title">${day.weather[0].main}</h3>
                  <p class="card-text">High: ${day.temp.max}&deg;C</p>
                  <p class="card-text">Low: ${day.temp.min}&deg;C</p>
                  <p class="card-text">Feels like: ${
                    day.feels_like.day
                  }&deg;C</p>
                  <p class="card-text">Humidity: ${day.humidity}%</p>
                  <p class="card-text">Precipitation: ${day.pop * 100}%</p>
                  <p class="card-text">Dewpoint: ${day.dew_point}</p>
                  <p class="card-text">Wind speed: ${day.wind_speed}m/s</p>
                </div>
              </div>
            </div>
          </div>`;
      }
    })
    .join(" ");
}

//navigator

//navigator.geoloction

//fetch()

//.then - promises.
