import { api } from "./utils.js";

import "./funcionesCliente.js";

document.addEventListener("DOMContentLoaded", function () {
  cargarDatosCliente(); // llamado a la funcion cargarDatosCliente

  const form = document.querySelector("form");

  const { documento, nombre, apellidos, email, fecha_nacimiento, editar } = form.elements; // Destructuring: recupera los elementos del formulario

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que se recargue la página

    const data = {
      documento: documento.value,
      nombre: nombre.value,
      apellidos: apellidos.value,
      email: email.value,
      fecha_nacimiento: fecha_nacimiento.value,
    };

    // enviar los datos
    api({
      method: editar.value ? "PUT" : "POST",
      url: editar.value ? `/cliente/${editar.value}` : "/cliente",
      data,
    })
      .then(({ data }) => {
        console.log(data);
        Swal.fire("Exito!", data.message, "success")
        cargarDatosCliente()
        form.reset()
      })
      .catch((err) =>
        Swal.fire("Error!", err?.response?.data?.message, "error")
      );
  });
});

export function cargarDatosCliente() {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  // peticion a localhost:3000/clientes del server de node
  api.get("/clientes").then(({ data }) => {
     
    for (const cliente of data) {
      
      const dateConverted = dayjs(cliente.fecha_nacimiento).format("DD-MM-YYYY");

      tbody.innerHTML += `
          <tr>
            <td>${cliente.id}</td>
            <td>${cliente.documento}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.apellidos}</td>
            <td>${cliente.email}</td>
            <td>${dateConverted}</td>
            <td>
                <div class="btn-group" role="group" aria-label="actions">
                    <button type="button" class="btn btn-primary" onclick="editarCliente(${cliente.id})">
                       <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button type="button" class="btn btn-danger" onclick="eliminarCliente(${cliente.id})">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </td>
          </tr>`;
    }
  });
}
