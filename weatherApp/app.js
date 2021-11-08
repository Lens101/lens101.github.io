//Weather application using OpenWeatherMap weather API.
//openweathermap.org/

const currLocationBtn = document.getElementById("locationBtn");
const searchButton = document.querySelector(".searchBtn");

//api key, language and units (to make not kelvin) options.
const API_KEY = "afbeaaf8acfc29b79cb6054be5c6197a";
let lang = "en";
let units = "metric";

currLocationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      //get longditude, and latitude
      let lon = position.coords.longitude;
      let lat = position.coords.latitude;
      //api call
      let apiCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}&lang=${lang}`;

      //fetch the api with custom lat and long
      fetch(apiCall)
        //.then wait for info to be retreieved from server and "then" uses it.
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }

          return response.json();
        })
        .then((data) => {
          showWeather(data);
        })
        .catch(console.err);
    });
  }
});

searchButton.addEventListener("click", () => {
  //get cityName from the search input.
  const cityName = document.querySelector(".inputVal").value;

  //N.B: remember to add the HTTP:// before the link, you spent an hour wondering why the api call wasn't working....
  let apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${API_KEY}`;

  fetch(apiCall)
    //.then = wait for info to be retreieved from server and "then" uses it.
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      showSearchWeather(data);
    })
    .catch(console.err);
});

function showSearchWeather(resp) {
  let row = document.querySelector(".insert-content");
  row.innerHTML = `
        <div class="col">
              <div class="cardOne">
              <h5 >${resp.name}</h5>
                <img
                  src="https://openweathermap.org/img/wn/${
                    resp.weather[0].icon
                  }@2x.png"
                  
                  alt="${resp.weather[0].description}"
                />
                <div>
                  <h3>${resp.weather[0].main}</h3>
                  <p>High: ${Math.floor(resp.main.temp_max)}&deg;C</p>
                  <p>Low: ${Math.floor(resp.main.temp_min)}&deg;C</p>
                  <p>Feels like: ${Math.floor(resp.main.feels_like)}&deg;C</p>
                  <p>Humidity: ${resp.main.humidity}%</p>
                  <p>Wind speed: ${resp.wind.speed}m/s</p>
                </div>
              </div>
            </div>
          </div>`;
}

function showWeather(resp) {
  let row = document.querySelector(".insert-content");
  row.innerHTML = resp.daily
    .map((day, idx) => {
      if (idx <= 2) {
        let dt = new Date(day.dt * 1000); //timestamp * 1000
        //let sr = new Date(day.sunrise * 1000).toTimeString();
        //let ss = new Date(day.sunset * 1000).toTimeString();
        return `
        <div class="col">
              <div class="cardTwo">
              <h5>${dt.toDateString()}</h5>
                <img
                  src="https://openweathermap.org/img/wn/${
                    day.weather[0].icon
                  }@2x.png"
                  alt="${day.weather[0].description}"
                />
                <div>
                  <h3>${day.weather[0].main}</h3>
                  <p>High: ${day.temp.max}&deg;C</p>
                  <p>Low: ${day.temp.min}&deg;C</p>
                  <p>Feels like: ${day.feels_like.day}&deg;C</p>
                  <p>Humidity: ${day.humidity}%</p>
                  <p>Precipitation: ${day.pop * 100}%</p>
                  <p>Dewpoint: ${day.dew_point}</p>
                  <p>Wind speed: ${day.wind_speed}m/s</p>
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

//icon
