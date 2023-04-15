/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const cities = ['London','Paris','Tokio'];
const apiKey = 'b3093bd1de5429955c010ac133531e04';
const constKelvin = 273.15;
let converseKelvinCelsius = (temp) => { return Math.round(temp - constKelvin) };

const url = (cityName) => {
        return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
};
const urlIcon = `https://openweathermap.org/img/wn/`;
const urlIconExt = `@2x.png`;

cities.map((cityName1) => {
window
.fetch(url(cityName1))
.then(respuesta => respuesta.json())
.then((responseJson) => {

    const cityNameL1 = cityName1.toLowerCase()

    const cityName = document.querySelector(`.city-name-${cityNameL1}`);
    cityName.textContent = cityName1 + ', ' + responseJson.sys.country;

    const mainTemp = document.querySelector(`.main-temp-${cityNameL1}`);
    mainTemp.textContent = converseKelvinCelsius(responseJson.main.temp) + '°';

    const cardImage = document.querySelector(`.card-img-${cityNameL1}`);
    const img = document.createElement('img');
    img.src = urlIcon + responseJson.weather[0].icon + urlIconExt;
    cardImage.appendChild(img);
    
    const mainTempMax = document.querySelector(`.main-temp-max-${cityNameL1}`);
    mainTempMax.textContent = 'Max: ' + converseKelvinCelsius(responseJson.main.temp_max) + '°';
    
    const mainTempMin = document.querySelector(`.main-temp-min-${cityNameL1}`);
    mainTempMin.textContent = 'Min: ' + converseKelvinCelsius(responseJson.main.temp_min) + '°';

    const description = document.querySelector(`.description-${cityNameL1}`);
    description.textContent = responseJson.weather[0].description.toUpperCase();

})
});
