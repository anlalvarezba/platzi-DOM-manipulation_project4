/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

console.log('Happy hacking :)')

const limit = 5;
const APIkey = '0393447d970cee9070f71962da578e9f';
var latitude;
var longitude;


 //HACE FALTA: que al autocompletar con las sugerencias funcione.

const citiesMain = document.getElementById("citiesMain");


const form = document.getElementById('form');
const cityEntered = document.getElementById('city');
const submitCity = document.getElementById('submitCity');

var arrayCity = [];

submitCity.addEventListener('click', handleSearch);
cityEntered.addEventListener('keyup', (event) => {
    if(event.keyCode === 13){
        handleSearch();
    }
});


function handleSearch(){
    const cityWanted = arrayCity.join('');
    console.log(cityWanted);
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityWanted}&limit=${limit}&appid=${APIkey}`;
    city.value = '';
    citiesMain.innerHTML = '';
    searchWeather(geoUrl);
    arrayCity = [];
}



cityEntered.addEventListener('input', event => {
    if(event.inputType === "insertText"){
        arrayCity.push(event.data);
    }    
    else {
        arrayCity.pop();
    }
    console.log(arrayCity);
} )


function searchWeather(geoUrl){
    fetch(geoUrl)
    .then(response => response.json())
    .then(responseJson => {
        
        const citiesContainer = document.createElement('div');
        citiesContainer.style.display = "flex";
        citiesContainer.style.flexWrap = "wrap";
        citiesContainer.style.justifyContent = "center";

        const todosLosItems = [];
        responseJson.forEach(city => {

            const cityContainer = document.createElement('div');
            const cityName      = document.createElement('h4');
            const cityState     = document.createElement('p');
            const cityTemp      = document.createElement('p')
            const weatherImg    = document.createElement('img');
            const weatherDesc   = document.createElement('p');

            cityContainer.style.width = "200px";
            cityContainer.style.minWidth = "200px";
            cityContainer.style.height = "280px";
            cityContainer.style.margin = "10px"; 	
            cityContainer.style.backgroundColor = "rgb(121, 157, 250)";
            cityContainer.style.borderRadius = "20px";
            cityContainer.style.padding = "20px 0";
            weatherImg.style.width = "150px";
            weatherImg.style.height = "auto";
            weatherImg.style.margin = "0 auto";
            weatherDesc.style.zIndex = "1";
            
            cityContainer.append(cityName, cityState, cityTemp, weatherImg, weatherDesc);
            

            cityName.innerHTML = `${city.name}, ${city.country}`;
            if(!!city.state){
                cityState.innerHTML = `${city.state}`;
            }
            const latitude = city.lat;
            const longitude = city.lon;  
            const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIkey}`;
            fetch(weatherUrl)
                .then(weatherResponse => weatherResponse.json())
                .then(weatherJson => {
                    cityTemp.innerHTML = `Temp: ${weatherJson.main.temp}`;
                    weatherImg.src = `http://openweathermap.org/img/wn/${weatherJson.weather[0].icon}@2x.png`
                    weatherDesc.innerHTML = `${weatherJson.weather[0].description}`;
                });    
            todosLosItems.push(cityContainer);
        });
        citiesContainer.append(...todosLosItems);
        citiesMain.appendChild(citiesContainer);
    })
}


