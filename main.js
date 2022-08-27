function onClick(event) {
  event.preventDefault(); //preventDefault anula la acción asociada al botón por defecto.

  //captura del contenido del mensaje.
  const mensaje = {
    name_comercio: document.getElementById("name_comercio").value,
    name_titular: document.getElementById("name_titular").value,
    phone: document.getElementById("phone").value,
  };
  console.log(mensaje);
  //PROMESA
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST", //el metodo post de Jsonplaceholder devuelve el mismo mensaje más una propiedad más, un ID.
    body: JSON.stringify(mensaje), //se transforma en string el mensaje.
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json()) //cuando se resuelva
    .then((json) => {
      console.log(json);
      Swal.fire("Enviado", "Gracias por tu comentario", "success"); //inicializado el script en el head del index.html.
      cleanForm();
      /* redirectUrl(); */ //no se utiliza.
    })
    .catch((err) => console.log(err));
}

function cleanForm() {
  let formulario = document.getElementById("formulario");
  formulario.reset(); //para que todos los input del formulario se pongan en blanco
}
function redirectUrl() {
  window.location.href = "https://google.com";
}

let boton = document.getElementById("enviar");
boton.addEventListener("click", onClick); //cuando hace click se ejecuta la función onClick definida arriba.

/* CLIMA */

const api = {
  key: '31be94f54be26bd2430df58dae0823b0',
  url: `https://api.openweathermap.org/data/2.5/weather`
}

const card = document.getElementById('card')

const city = document.getElementById('city');
const date = document.getElementById('date');
const tempImg = document.getElementById('temp-img');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');

function updateImages(data) {
  const temp = toCelsius(data.main.temp);
  let src = 'images/temp-mid.png';
  if (temp > 26) {
    src = 'images/temp-high.png';
  } else if (temp < 20) {
    src = 'images/temp-low.png';
  }
  tempImg.src = src;
}

async function search(query) {
  try {
    const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
    const data = await response.json();
    card.style.display = 'block';
    city.innerHTML = `${data.name}, ${data.sys.country}`;
    data.innerHTML = (new Date()).toLocaleDateString();
    temp.innerHTML = `${toCelsius(data.main.temp)}c`;
    weather.innerHTML = data.weather[0].description;
    range.innerHTML = `${toCelsius(data.main.temp_min)}c / ${toCelsius(data.main.temp_max)}c`;
    updateImages(data);
  } catch (err) {
    console.log(err);
    alert('Hubo un error');
  }
}

function toCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

function onSubmit(event) {
  event.preventDefault();
  search(searchbox.value);
}

const searchform = document.getElementById('search-form');
const searchbox = document.getElementById('searchbox');
searchform.addEventListener('submit', onSubmit, true);