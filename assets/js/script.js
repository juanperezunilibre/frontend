import { api } from "./utils.js";

document.addEventListener("DOMContentLoaded", function () {
  cargarDatosCliente(); // llamado a la funcion cargarDatosCliente

  const form = document.querySelector("form");

  const { documento, nombre, apellidos, email } = form.elements; // Destructuring: recupera los elementos del formulario

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que se recargue la página

    const data = {
      documento: documento.value,
      nombre: nombre.value,
      apellidos: apellidos.value,
      email: email.value,
    };

    // enviar los datos
    api
      .post("/cliente", data)
      .then(({ data }) => {
        console.log(data);
        alert(data.message);
        cargarDatosCliente();
        form.reset();
      })
      .catch((err) => alert("Error!: " + err?.response?.data?.message));
  });
});

function editarCliente() {
    alert("Editar cliente");
}

function cargarDatosCliente() {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  // peticion a localhost:3000/clientes del server de node
  api.get("/clientes").then(({ data }) => {
    
    for (const cliente of data) {
      tbody.innerHTML += `
          <tr>
            <td>${cliente.id}</td>
            <td>${cliente.documento}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.apellidos}</td>
            <td>${cliente.email}</td>
            <td>${cliente.fecha_nacimiento}</td>
            <td>
                <div class="btn-group" role="group" aria-label="actions">
                    <button type="button" class="btn btn-primary">
                       <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button type="button" class="btn btn-danger">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </td>
          </tr>`;
    }
  });
}


