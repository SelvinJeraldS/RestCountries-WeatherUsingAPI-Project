function element(tag, classname, id, text) {
  let tags = document.createElement(tag);
  tags.classList = classname; 
  tags.id = id;
  tags.innerHTML = text;
  return tags;
}

let container = document.createElement("div");
container.className = "container";
const h1 = document.createElement("h1");
h1.id = "title";
h1.className = "text-center";
h1.innerText = "Countries Weather";
const row = element("div", "row", "", "");

const response = fetch("https://restcountries.com/v3.1/all");
response
 .then((data) => data.json())
 .then((ele) => {
   for (let i = 0; i < ele.length; i++) {
     const cardCol = document.createElement("div");
     cardCol.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4";
     const card = document.createElement("div");
     card.classList = "card h-100";
     card.innerHTML = `
       <div class="card-header" >
       <h5 class="card-title text-center">${ele[i].name.common}</h5>
       </div>
       
       <div class="card-body">
         
       <img src="${ele[i].flags.png}" class="card-img-top" >
       
        <div class="card-text">
        <p class="card-text1" >CountryCode: ${ele[i].cca2}</p>
        <p class="card-text1">Religion: ${ele[i].region}</p>
        <p class="card-text1">Capital: ${ele[i].capital}</p>
        <p class="card-text1">Population : ${ele[i].population}</p>
        </div>
         
         <a href="#" class="btn btn-primary check-weather-btn" data-lat="${ele[i].latlng[0]}" data-lon="${ele[i].latlng[1]}">Check Weather</a>
       </div>
     `;
     cardCol.appendChild(card);
     row.appendChild(cardCol);
   }
 })
 .catch(error => {
   console.error("Error fetching country data:", error);
   row.innerHTML = "<p>Error fetching country data</p>";
 });

container.append(h1, row);
document.body.append(container);

document.addEventListener("click", function(event) {
 if (event.target.classList.contains("check-weather-btn")) {
   const lat = event.target.getAttribute("data-lat");
   const lon = event.target.getAttribute("data-lon");
   fetchWeather(lat, lon);
 }
});


function fetchWeather(lat, lon) {
 const apiKey = "4514281a08dd68b59440f464d6f2abac"; 
 const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

 fetch(apiUrl)
   .then(response => response.json())
   .then(data => {
     alert(`Weather: ${data.weather[0].main}, Temperature: ${data.main.temp}°C`);
   })
   .catch(error => {
     console.error("Error fetching weather data:", error);
     alert("Error fetching weather data");
   });
}
