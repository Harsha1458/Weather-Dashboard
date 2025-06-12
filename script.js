const weatherDataContainer = document.getElementById("weatherDataContainer");

const inputData = document.getElementById("inputData");

const searchButton = document.getElementById("searchButton");

const cityDetailsContainer = document.getElementById("cityDetailsContainer");


function cityDetailsContainerFunction(cityData) {
    weatherDataContainer.textContent = "";
    const cityDetailsContainer = document.createElement("div");
    cityDetailsContainer.classList.add("city-details-container");
    weatherDataContainer.appendChild(cityDetailsContainer);

    const headingIconContainer = document.createElement("div");
    headingIconContainer.classList.add("city-heading-container");
    cityDetailsContainer.appendChild(headingIconContainer);

    //Heading Element
    const headingElement = document.createElement("h1");
    headingElement.classList.add("city-heading");
    headingElement.textContent = `${cityData.city.name} (${new Date().toLocaleDateString()})`
    headingIconContainer.appendChild(headingElement);
    //image Element
    const imgElement = document.createElement("img");
    imgElement.src = `https://openweathermap.org/img/wn/${cityData.list[0].weather[0].icon}@2x.png`;
    headingIconContainer.appendChild(imgElement);
    //paragraph Element
    const tempParagraphElement = document.createElement("p");
    tempParagraphElement.textContent = "Temp: " + `${Math.round(cityData.list[0].main.temp) -273} C`;
    cityDetailsContainer.appendChild(tempParagraphElement);
    //paragraph Element
    const humidityParagraphElement = document.createElement("p");
    humidityParagraphElement.textContent = "Humidity: " + `${cityData.list[0].main.humidity}%`;
    cityDetailsContainer.appendChild(humidityParagraphElement);
    //paragraph Element
    const windParagraphElement = document.createElement("p");
    windParagraphElement.textContent = "Wind: " + `${cityData.list[0].wind.speed}m/s`;
    cityDetailsContainer.appendChild(windParagraphElement);

    //4 Day Forecast heading Element
    const foreCastHeadingElement = document.createElement("h3");
    foreCastHeadingElement.textContent = "4-Day Forecast";
    foreCastHeadingElement.classList.add("forecast-heading-element");
    weatherDataContainer.appendChild(foreCastHeadingElement);

    const forecastListData = cityData.list

    const forecastItemsContainer = document.createElement("div");
    forecastItemsContainer.classList.add("forecast-container");
    weatherDataContainer.appendChild(forecastItemsContainer);

    const otherdaysData = forecastListData.filter(eachItem => new Date(eachItem.dt_txt).toLocaleDateString() !== new Date().toLocaleDateString());
    console.log(otherdaysData);

    function filterFourData(upcomingData) {
        const filteredData = upcomingData.filter((eachItem, index) => {
            return index % 9 === 0;
        });
        return filteredData;
    }

    const fourdaysData = filterFourData(otherdaysData);
    console.log(fourdaysData);

    fourdaysData.map(eachItem => {
        const eachDayForeCast = document.createElement("div");
        eachDayForeCast.classList.add("eachdayForecast");
        forecastItemsContainer.appendChild(eachDayForeCast);
        console.log(eachItem);
        // dateItem heading Element 
        const dateItem = document.createElement("h5");
        dateItem.textContent = `${new Date(eachItem.dt_txt).toLocaleDateString()}`;
        eachDayForeCast.appendChild(dateItem);
        //Img Element 
        const iconElement = document.createElement("img");
        iconElement.src = `https://openweathermap.org/img/wn/${eachItem.weather[0].icon}@2x.png`;
        eachDayForeCast.appendChild(iconElement);

        //paragraph Element
        const tempParagraphElement = document.createElement("p");
        tempParagraphElement.textContent = "Temp: " + `${Math.round(eachItem.main.temp) -273} C`;
        eachDayForeCast.appendChild(tempParagraphElement);
        //paragraph Element
        const humidityParagraphElement = document.createElement("p");
        humidityParagraphElement.textContent = "Humidity: " + `${eachItem.main.humidity}%`;
        eachDayForeCast.appendChild(humidityParagraphElement);
        //paragraph Element
        const windParagraphElement = document.createElement("p");
        windParagraphElement.textContent = "Wind: " + `${eachItem.wind.speed}mt/s`;
        eachDayForeCast.appendChild(windParagraphElement);
    });




    // const differentDays = otherdaysData.filter((eachItem,index) => )
    // console.log(otherfourdaysData)

}

const fetchData = async (data) => {
    try {
        const apiKey = "a96163e503281b9aa1ee5db157136e65"
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${data}&appid=${apiKey}`
        const response = await fetch(url)
        const responsedata = await response.json()
        console.log(responsedata)
        if (responsedata.cod === "200") {
            console.log("success code triggered")
            cityDetailsContainerFunction(responsedata)
        } else {
            weatherDataContainer.textContent = "";
            const headingElement = document.createElement("h3")
            headingElement.textContent = responsedata.message
            headingElement.classList.add("error-message");
            weatherDataContainer.appendChild(headingElement);
        }

    } catch (e) {
        console.log(e)
        console.log(e.message)
    }
}

searchButton.addEventListener("click", async () => {
    const inputDataValue = inputData.value.trim();
    await fetchData(inputDataValue)

})
