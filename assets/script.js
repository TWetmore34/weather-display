// DOM variables
let searchEl = document.getElementById('search')
let submitEl = document.getElementById('submit')
let dateEl = document.getElementById('date')
let logoEl = document.getElementById('logo')
let dailyEl = document.querySelectorAll('.dailyInfo')
let imgLogo = document.createElement('img');
let cityEl = document.getElementById('city')
let searchDisplay = document.getElementById('display-search')
console.log(searchDisplay.children)

console.log(dailyEl[0])

// global variables


let urlRequest = 'https://api.openweathermap.org/data/2.5/onecall?lat=84.3880&lon=33.7490&appid=3c2f8a6a82995e1b4a0ed32b6149c563'
let request2 = 'http://api.openweathermap.org/geo/1.0/direct?q=Atlanta&appid=3c2f8a6a82995e1b4a0ed32b6149c563'

dateEl.innerHTML = moment().format('(MMMM Do YYYY)')

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
