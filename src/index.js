/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const cities = ['London','Paris','Tokio'];
const apiKey = 'b3093bd1de5429955c010ac133531e04';
const constKelvin = 273.15;
const appNode = document.querySelector("#app");
let searchedCityName = '';

let converseKelvinCelsius = (temp) => { return Math.round(temp - constKelvin) };

const url = (cityName) => {
        return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
};
const urlIcon = `https://openweathermap.org/img/wn/`;
const urlIconExt = `@2x.png`;


let weatherCity = (cityName1) => {
window
.fetch(url(cityName1))
.then(respuesta => respuesta.json())
.then((responseJson) => {

    console.log(responseJson)

    const cityNameL1 = cityName1.toLowerCase().split(' ').join('-');

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
};

cities.map((city) => { return weatherCity(city) });

const formSearch = document.getElementById('form-search');
const resetSearch = document.getElementById('btn-reset');
let count = 4;

let accionSearchCity = (event) => {
    // <div class="text-lg font-serif p-4 cards bg-blue-500 w-52 m-2.5
    //        border-2 border-black rounded-2xl">
    //         <h1 class="bg-gray-300 bg-white rounded-md city-name-${searchedCityName}"></h1>
    //         <div class="pt-4 text-5xl main-temp-${searchedCityName}"></div>
    //         <div class="card-img-${searchedCityName} w-full"></div>
    //         <div class="text-xl main-temp-max-${searchedCityName}"></div>
    //         <div class="text-xl main-temp-min-${searchedCityName}"></div>
    //         <div class="description-${searchedCityName}"></div>
    // </div>

    event.preventDefault();
    
    const inputSearch = document.getElementById('input-search');

    if(inputSearch.value !== ''){

        let searchedCityName = inputSearch.value.toLowerCase().split(' ').join('-');
        formSearch.reset();

            const h1 = document.createElement('h1');
            h1.className = `bg-gray-300 bg-white rounded-md city-name-${searchedCityName}`;

            const div1 = document.createElement('div');
            div1.className = `pt-4 text-5xl main-temp-${searchedCityName}`;

            const div2 = document.createElement('div');
            div2.className = `card-img-${searchedCityName} w-full`;

            const div3 = document.createElement('div');
            div3.className = `text-xl main-temp-max-${searchedCityName}`;        

            const div4 = document.createElement('div');
            div4.className = `text-xl main-temp-min-${searchedCityName}`;

            const div5 = document.createElement('div');
            div5.className = `description-${searchedCityName}`;

            const container = document.createElement('div');
            container.append(h1, div1, div2, div3, div4, div5);
            container.className = 'text-lg font-serif p-4 cards bg-blue-500 w-52 m-2.5 border-2 border-black rounded-2xl';
            container.id = `count-${count}`
        
        searchedCityName = searchedCityName[0].toUpperCase() + searchedCityName.slice(1).toLowerCase().split('-').join(' ');

        fetch( url(searchedCityName) )
            .then(response => {
               if(response.status == 200) { 

                appNode.insertAdjacentHTML("afterbegin", container.outerHTML);
                weatherCity(searchedCityName);
                count ++ ;
                
                if(count > 6) {                   
                    document.getElementById(`count-${count - 6}`).remove();
                }

                } else {
                    throw ('LA CIUDAD NO ES VÁLIDA')
                }
            })
            .catch((err) => alert(err));
    }
}

    formSearch.addEventListener('submit', accionSearchCity);
    resetSearch.addEventListener('click', () => window.location.reload());
    
