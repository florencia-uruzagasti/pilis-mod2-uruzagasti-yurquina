function onClick(event) {
  event.preventDefault(); //preventDefault anula la acción asociada al botón por defecto.

  //captura del contenido del mensaje.
  const mensaje = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
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
