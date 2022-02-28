/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

console.log('Happy hacking :)')

var cityName = 'Bogota';
const limit = 5;
const APIkey = '0393447d970cee9070f71962da578e9f';
var latitude;
var longitude;


const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${APIkey}`;


const citiesContainer = document.getElementById("citiesContainer");
citiesContainer.style.display = "flex";
citiesContainer.style.flexWrap = "wrap";
citiesContainer.style.justifyContent = "center";

    

fetch(geoUrl)
    .then(response => response.json())
    .then(responseJson => {
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
            console.log(`${city.name}, ${city.country}: `);
            const latitude = city.lat;
            const longitude = city.lon;  
            const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIkey}`;
            fetch(weatherUrl)
                .then(weatherResponse => weatherResponse.json())
                .then(weatherJson => {
                    cityTemp.innerHTML = `Temp: ${weatherJson.main.temp}`;
                    weatherImg.src = `http://openweathermap.org/img/wn/${weatherJson.weather[0].icon}@2x.png`
                    weatherDesc.innerHTML = `${weatherJson.weather[0].description}`;
                    console.log(`Temp: ${weatherJson.main.temp}`);
                    // console.log('weatherJson', weatherJson);
                });    
            todosLosItems.push(cityContainer);
                // .then(weatherJson => console.log(weatherJson));   
                console.log(city);     
        });
        citiesContainer.append(...todosLosItems);
    })

