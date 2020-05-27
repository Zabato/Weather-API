import { refreshHistory, updateHistory, Chicago, forecastFunction} from "./java.js";
//import { refreshCurrentConditions, showCurrentConditions} from "./java";
//import { refreshForecast, showForecast} from "./java";

export function onLoad(){
    //showCurrentConditions();
    //showForecast();
    refreshHistory();
}
export function onButtonClick(button){
    if(!button) {
        return; 
    }

    refreshWeatherData(button.textContent);
}

export function onSearch (){
    let queryCity = document.getElementById("input").value; 
    console.info("HERE");
    refreshWeatherData(queryCity);
}
export function refreshWeatherData(city){
    if(!city){
        return;
    }

    Chicago(city).then(item => forecastFunction(item.coord.lat,item.coord.lon)).then(item => updateHistory(city));
}

export function onKeyUp(event){
    if(event.keyCode === 13){
        event.preventDefault();
        document.getElementById("search-button").click();
    }
}


document.addEventListener("DOMContentLoaded", onLoad);
document.getElementById("search-button").addEventListener("click", onSearch);
document.getElementById("input").addEventListener("keyup", onKeyUp);