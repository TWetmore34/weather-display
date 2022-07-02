// TODO list
// add logo display to daily forecast and 5 day
// fix the math happening on wind speed

// DOM variables
let searchEl = document.getElementById('search')
let submitEl = document.getElementById('submit')
let dateEl = document.getElementById('date')
let logoEl = document.getElementById('logo')
let dailyEl = document.querySelectorAll('.dailyInfo')
let imgLogo = document.createElement('img');
let cityEl = document.getElementById('city')
let searchDisplay = document.getElementById('display-search')
let fiveDay = document.getElementById('fiveDay')

// set date variables
dateEl.innerHTML = moment().format('(MMMM Do YYYY)')
fiveDay.children[0].children[0].innerHTML = moment().add(1, 'days').format('l')
fiveDay.children[1].children[0].innerHTML = moment().add(2, 'days').format('l')
fiveDay.children[2].children[0].innerHTML = moment().add(3, 'days').format('l')
fiveDay.children[3].children[0].innerHTML = moment().add(4, 'days').format('l')
fiveDay.children[4].children[0].innerHTML = moment().add(5, 'days').format('l')


// This is mroe or less the final function. When finished, it will run the url that our first function will create through geocoding and then placing lat and lon in the url
function getLocation() {
    let search = searchEl.value;
    console.log(search)
    cityEl.innerHTML = search + ' ' + moment().format('(MMMM Do YYYY)');
    let requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + search + '&appid=3c2f8a6a82995e1b4a0ed32b6149c563'
    
    fetch(requestUrl).then(function(response){
        return response.json();
    }).then(function(data){
        let requestWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data[0].lat + '&lon=' + data[0].lon + '&appid=3c2f8a6a82995e1b4a0ed32b6149c563'
        console.log(data[0].lat)
        console.log(data[0].lon)
        fetch(requestWeather).then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data)
            // create and append logo for daily report
            // TO DO
            let logoCode = data.current.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + logoCode + ".png";
            
            logoEl.setAttribute('src', iconurl);
            
            
            
            // display daily info
            // temp
            let tempK = data.current.temp;
           
            let tempF = 1.8*(tempK-278) + 32;
            
            dailyEl[0].innerHTML = tempF.toFixed(2) + ' F';

            // wind
            windSpeed = data.current.wind_speed * 2.237;
            dailyEl[1].innerHTML = windSpeed.toFixed(2) + ' MPH';

            // humidity
            let humidity = data.current.humidity;
            dailyEl[2].innerHTML = humidity;

            // UVI
            let uvi = data.daily[0].uvi;
            dailyEl[3].innerHTML = uvi;

            // 5 day forecast
            // temp
            fiveDay.children[0].children[2].innerHTML = 'Temp: ' + (1.8*(data.daily[0].temp.day-278)+32).toFixed(2);
            fiveDay.children[1].children[2].innerHTML = 'Temp: ' + (1.8*(data.daily[1].temp.day-278)+32).toFixed(2);
            fiveDay.children[2].children[2].innerHTML = 'Temp: ' + (1.8*(data.daily[2].temp.day-278)+32).toFixed(2);
            fiveDay.children[3].children[2].innerHTML = 'Temp: ' + (1.8*(data.daily[3].temp.day-278)+32).toFixed(2);
            fiveDay.children[4].children[2].innerHTML = 'Temp: ' + (1.8*(data.daily[4].temp.day-278)+32).toFixed(2);
            // Wind
            fiveDay.children[0].children[3].innerHTML = 'Wind: ' + (data.daily[0].wind_speed * 2.237).toFixed(2) + 'MPH';
            fiveDay.children[1].children[3].innerHTML = 'Wind: ' + (data.daily[1].wind_speed * 2.237).toFixed(2) + 'MPH';
            fiveDay.children[2].children[3].innerHTML = 'Wind: ' + (data.daily[2].wind_speed * 2.237).toFixed(2) + 'MPH';
            fiveDay.children[3].children[3].innerHTML = 'Wind: ' + (data.daily[3].wind_speed * 2.237).toFixed(2) + 'MPH';
            fiveDay.children[4].children[3].innerHTML = 'Wind: ' + (data.daily[4].wind_speed * 2.237).toFixed(2) + 'MPH';
            // Humidity
            fiveDay.children[0].children[4].innerHTML = 'Humidity: ' + data.daily[0].humidity;
            fiveDay.children[1].children[4].innerHTML = 'Humidity: ' + data.daily[1].humidity;
            fiveDay.children[2].children[4].innerHTML = 'Humidity: ' + data.daily[2].humidity;
            fiveDay.children[3].children[4].innerHTML = 'Humidity: ' + data.daily[3].humidity;
            fiveDay.children[4].children[4].innerHTML = 'Humidity: ' + data.daily[4].humidity;
            createButton();
            handleButtonClick();
        })
    })
};

function createButton(){
    let search = searchEl.value;
    // create previous search buttons
    let saveCityEl = document.createElement('button')
    saveCityEl.classList.add('btn', 'btn-secondary', 'w-100', 'text-dark', 'mt-2');
    saveCityEl.setAttribute('value', search)
    saveCityEl.innerHTML = search
    searchDisplay.appendChild(saveCityEl);
    console.log(saveCityEl)
    
    // removes repeat buttons
    for(i=0;i<searchDisplay.children.length-1;i++) {
        if(searchDisplay.children[i].value.toUpperCase() == search.toUpperCase()){
            searchDisplay.children[searchDisplay.children.length-1].remove();
        }
    }
}

function handleButtonClick(){

    for(i=0;i<searchDisplay.children.length;i++){
        searchDisplay.children[i].addEventListener('click', function(e){
            e.preventDefault
            
            let search = e.target.value;

        console.log(search)
    cityEl.innerHTML = search + ' ' + moment().format('(MMMM Do YYYY)');
    let requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + search + '&appid=3c2f8a6a82995e1b4a0ed32b6149c563'
    
    fetch(requestUrl).then(function(response){
        return response.json();
    }).then(function(data){
        let requestWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data[0].lat + '&lon=' + data[0].lon + '&appid=3c2f8a6a82995e1b4a0ed32b6149c563'
        console.log(data[0].lat)
        console.log(data[0].lon)
        fetch(requestWeather).then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data)
            // create and append logo for daily report
            
            let logoCode = data.current.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + logoCode + ".png";
            imgLogo.setAttribute('src', iconurl);
            dateEl.append(imgLogo);
            
            
            // display daily info
            // temp
            let tempK = 0;
            if(moment().format('H') < 12){
                tempK = data.daily[0].temp.morn;
            } else if (moment().format('H') >= 12){
                tempK = data.daily[0].temp.day;
            } else if (moment().format('H') > 17){
                tempK = data.daily[0].temp.eve;
            } else if (moment().format('H') > 20)
            console.log(data.daily[0].temp)
            
            let tempF = 1.8*(tempK-278) + 32;
            
            dailyEl[0].innerHTML = tempF.toFixed(2) + ' F';

            // wind
            windSpeed = data.daily[0].wind_speed * 2.237;
            dailyEl[1].innerHTML = windSpeed.toFixed(2) + ' MPH';

            // humidity
            let humidity = data.daily[0].humidity;
            dailyEl[2].innerHTML = humidity;

            // UVI
            let uvi = data.daily[0].uvi;
            dailyEl[3].innerHTML = uvi;


        })
    })
})}}


submitEl.addEventListener('click', getLocation)
