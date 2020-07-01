const api={
    key: "5fdd54ca045f7580716e628811b2901b",
    base: "https://api.openweathermap.org/data/2.5/"
}
const searchBox= document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchBox.value);
    }
}

function getResults(query){
    // fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    // .then(weather => weather.json())
    // .then(displayResults);
    fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
    .then(weather => weather.json())
    .then(displayResults);
}

function displayResults(weather){

    console.log(weather);
    let city= document.querySelector('.location .city');
    city.innerHTML= `${weather.name} , ${weather.sys.country}`;
    
    let now= new Date();
    let date= document.querySelector('.location .date');
    date.innerHTML= dateBuilder(now);
    
    let temp= document.querySelector('.current .temp');
    let tempCel= Math.round(weather.main.temp) - 273;
    temp.innerHTML= `${tempCel}<span>°C</span>`;

    let weather_el= document.querySelector('.current .weather');
    weather_el.innerHTML= weather.weather[0].main;

    let hilow= document.querySelector('.current .high-low');
    let tempLowCel= Math.round(weather.main.temp_min)-273;
    let tempHighCel= Math.round(weather.main.temp_max) - 273;
    hilow.innerHTML= `${tempLowCel}°C / ${tempHighCel}°C`;
}

function dateBuilder(d){
    let months= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day= days[d.getDay()];
    let date= d.getDate();
    let month= months[d.getMonth()];
    let year= d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}