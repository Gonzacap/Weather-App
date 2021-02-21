/* Utiliza el API de Geolocalización de tu navegador para obtener el clima de tu ubicación. */

const api = {

    key: "35a94154ce8fdd37a635f7406a438915",
    url: "https://api.openweathermap.org/data/2.5/weather"
    //url: "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"
}

const card = document.getElementById('card');

const city = document.getElementById('city');
const date = document.getElementById('date');
const tempImg = document.getElementById('temp-img');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');

function updateImages(data) {
  const temp = toCelsius(data.main.temp);
  const rain = data.weather[0].main;

  let src = 'Images/temp-mid.png';

  if (temp > 26) {
    src = 'Images/temp-high.png';
  } else if (temp < 20) {
    src = 'Images/temp-low.png';
  }

  if(rain=='rain'){
    src = 'Images/temp-rain.png';
  }

  tempImg.src = src;
}

async function search(query) {
  try {
    const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
    const data = await response.json();
    console.log(data);

    card.style.display = 'block';

    city.innerHTML = `${data.name}, ${data.sys.country}`;
    data.innerHTML = (new Date()).toLocaleDateString();
    temp.innerHTML = `${toCelsius(data.main.temp)}°c`;
    weather.innerHTML = data.weather[0].description;
    range.innerHTML = `${toCelsius(data.main.temp_min)}°c min - ${toCelsius(data.main.temp_max)}°c max`;
    
    updateImages(data);

  } catch (err) {
    console.log(err);
    alert('Hubo un error');
    document.getElementById('card').style.display ='none';
  }
}

function toCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

function onSubmit(event) {
  
  event.preventDefault();

  if(event.preventDefault){
    event.preventDefault();
  }
  else{
    event.returnValue = false;
  }

  //alert(searchbox.value);
  search(searchbox.value);
}

const searchform = document.getElementById("search-form");
const searchbox = document.getElementById("searchbox");

if(searchform){
  searchform.addEventListener("submit", onSubmit, true);
}
else{
  
  alert('algo anda mal');
}


/*function initialize() {
  // Cree el objeto de autocompletado, restringiendo la búsqueda

  autocomplete = new google.maps.places.Autocomplete(document.getElementById('searchbox'));

  // Cuando el usuario selecciona una dirección en el menú desplegable,
  // rellena los campos de dirección en el formulario.
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    fillInAddress();
  });

}*/