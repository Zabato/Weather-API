import {onButtonClick} from "./java2.js";

export function Chicago(city){
console.info("Inside Chicago");
if (city == null){
    console.info("bailing out");
    return;
    console.log("info");
}
var chicagoURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city +"&units=imperial&appid=5c99d212268aebc8d4bc84ec41ff2da2";
console.info(chicagoURL);
 return $.ajax({
    url: chicagoURL,
    method: "GET"
  })
  .then(function(response) {
    var cityDiv = $("<div class = 'container'>")
   
    var results = response.data;

    console.log(response);
    
    var city = response.name; 
   
    var date = response.dt; 
    date = new Date(date*1000);

    console.log("info");

    var dateString = `${date.getMonth()+1}/ ${date.getDate()}/${date.getFullYear()}`;
    var pCity = $("<p>").text(city + " " + dateString);

    cityDiv.append(pCity);
    
    var temp = response.main.temp;
    var pOne = $("<p>").text("Temperature: " + temp +" \u00B0F");
    cityDiv.append(pOne);

    console.log("info");

    var humi = response.main.humidity; 
    var pTwo = $("<p>").text("Humidity: " + humi);
    cityDiv.append(pTwo);

    var WS = response.wind.speed; 
    var pThree = $("<p>").text("Wind Speed: " + WS);
    cityDiv.append(pThree);

    console.log("info");

    var UV = response.sys.type; 
    var pFour = $("<p>").text("UV index: " + UV);
    cityDiv.append(pFour);

    $("#Forecast").empty();
   $("#Forecast").prepend(cityDiv);
   console.log("info");
   return response; 
  });
}

export function forecastFunction (lat,lon){
  let queryUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=5c99d212268aebc8d4bc84ec41ff2da2`;

return $.ajax({
    url: queryUrl,
    method: "GET"
  })
  .then(function(result){
    console.info(result);
    var loopChild = document.getElementById("forecast-cards").children;
    for (let i = 1; i <= 5; i++){
      var day1Date = result.daily[i].dt;
      var day1Temp = result.daily[i].temp.max;
      var day1Humi = result.daily[i].humidity;
      var day1Icon = `http://openweathermap.org/img/wn/${result.daily[i].weather[0].icon}.png`;
      var card = loopChild[i - 1].children;

      var dateDaily = day1Date; 
     dateDaily = new Date(dateDaily*1000);

     var dateString = `${dateDaily.getMonth()+1}/ ${dateDaily.getDate()}/${dateDaily.getFullYear()}`;
    
     card[0].textContent= dateString;

     card[1].src = day1Icon;

     card[2].textContent = `Temp: ${day1Temp} \u00B0F`;

     card[3].textContent = `Humidity: ${day1Humi} %`;
    }
  });
}

function getHistory (){
  if(!window.localStorage.getItem("history")){
    window.localStorage.setItem("history","");
  }
  let currHistString = window.localStorage.getItem("history");

  return currHistString === "" ? [] : currHistString.split(",");
}

export function updateHistory(newCity){
  let currentHistory = getHistory();

  if (!currentHistory.includes(newCity)){
    currentHistory.push(newCity);
  }

  window.localStorage.setItem("history",currentHistory.join(","));

  refreshHistory();
}

export function refreshHistory(){
  let currentChildren = document.getElementById("button-list");
  let currentChildrenNames = [];

  for (let i=0; i < currentChildren.children.length; i++){
    currentChildrenNames.push(currentChildren.children[i].textContent)
  }
  let history = getHistory();
  
  console.info("inside get history");

  history.forEach(item => {
    if (!currentChildrenNames.includes(item)){
      let newButton = document.createElement("button");
      newButton.className = "row";
      newButton.textContent = item; 
      newButton.onclick = function (){
        onButtonClick(newButton);
      };
      currentChildren.appendChild(newButton);
    }
  });
}