let weatherDataContainer = document.getElementById("weatherDataContainer");
let inputData = document.getElementById("inputData");
let searchButton = document.getElementById("searchButton");
let currentLocationButton = document.getElementById("currentLocationButton");

function showCityWeather(data) {
    weatherDataContainer.textContent = "";
    let cityBox = document.createElement("div");
    cityBox.classList.add("city-details-container");
    weatherDataContainer.appendChild(cityBox);
    let topRow = document.createElement("div");
    topRow.classList.add("city-heading-container");
    cityBox.appendChild(topRow);

    let heading = document.createElement("h1");
    heading.classList.add("city-heading");
    heading.textContent = data.city.name + " (" + new Date().toLocaleDateString() + ")";
    topRow.appendChild(heading);

    let icon = document.createElement("img");
    icon.src = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png";
    topRow.appendChild(icon);


    let temp = document.createElement("p");
    temp.textContent = "Temp: " + (Math.round(data.list[0].main.temp) - 273) + " C";
    cityBox.appendChild(temp);

    let humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";
    cityBox.appendChild(humidity);

    let wind = document.createElement("p");
    wind.textContent = "Wind: " + data.list[0].wind.speed + " m/s";
    cityBox.appendChild(wind);


    let forecastHeading = document.createElement("h3");
    forecastHeading.textContent = "4-Day Forecast";
    forecastHeading.classList.add("forecast-heading-element");
    weatherDataContainer.appendChild(forecastHeading);


    let forecastBox = document.createElement("div");
    forecastBox.classList.add("forecast-container");
    weatherDataContainer.appendChild(forecastBox);

    
    let todayDate = new Date().toLocaleDateString();
    let upcoming = [];

    for (let i = 0; i < data.list.length; i++) {
        let itemDate = new Date(data.list[i].dt_txt).toLocaleDateString();
        if (itemDate !== todayDate) {
            upcoming.push(data.list[i]);
        }
    }
    let fourDays = [];
    for (let i = 0; i < upcoming.length; i += 8) {
        fourDays.push(upcoming[i]);
    }
    for (let i = 0; i < fourDays.length; i++) {
        let day = fourDays[i];

        let dayBox = document.createElement("div");
        dayBox.classList.add("eachdayForecast");
        forecastBox.appendChild(dayBox);

        let date = document.createElement("h5");
        date.textContent = new Date(day.dt_txt).toLocaleDateString();
        dayBox.appendChild(date);

        let dayIcon = document.createElement("img");
        dayIcon.src = "https://openweathermap.org/img/wn/" + day.weather[0].icon + "@2x.png";
        dayBox.appendChild(dayIcon);

        let temp = document.createElement("p");
        temp.textContent = "Temp: " + (Math.round(day.main.temp) - 273) + " C";
        dayBox.appendChild(temp);

        let humidity = document.createElement("p");
        humidity.textContent = "Humidity: " + day.main.humidity + "%";
        dayBox.appendChild(humidity);

        let wind = document.createElement("p");
        wind.textContent = "Wind: " + day.wind.speed + " m/s";
        dayBox.appendChild(wind);
    }
}


function fetchWeather(cityName) {
    let apiKey = "a96163e503281b9aa1ee5db157136e65";
    let url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;

    fetch(url)
        .then(function(response) {
            return response.json(); 
        })
        .then(function(data) {
            if (data.cod === "200") {
                
                showCityWeather(data);
            } else {
               
                weatherDataContainer.textContent = "";
                let error = document.createElement("h3");
                error.textContent = "Error: " + data.message;
                error.classList.add("error-message");
                weatherDataContainer.appendChild(error);
            }
        });
}


function fetchCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            let apiKey = "a96163e503281b9aa1ee5db157136e65";
            let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            fetch(url)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    if (data.cod === "200") {
                        showCityWeather(data);
                    }
                });
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}


searchButton.addEventListener("click", function() {
    fetchWeather(inputData.value);
});

currentLocationButton.addEventListener("click", function() {
    fetchCurrentLocationWeather(); 
});