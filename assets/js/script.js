import { api } from "./utils.js";

import "./funcionesCliente.js";


// abrir el modal
export const modal = new bootstrap.Modal("#formulario-gestion", {
  keyboard: false,
});

document.addEventListener("DOMContentLoaded", function () {
  cargarDatosCliente(); // llamado a la funcion cargarDatosCliente

  const form = document.querySelector("form");

  const { documento, nombre, apellidos, email, fecha_nacimiento, editar, image } = form.elements; // Destructuring: recupera los elementos del formulario

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que se recargue la página

    const data = {
      documento: documento.value,
      nombre: nombre.value,
      apellidos: apellidos.value,
      email: email.value,
      fecha_nacimiento: fecha_nacimiento.value,
      image: image.value
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
        modal.hide()
      })
      .catch((err) =>
        Swal.fire("Error!", err?.response?.data?.message, "error")
      );
  });
});

export function cargarDatosCliente(pagina = 1) {
  const wrapper = document.querySelector("#card-wrapper");
  wrapper.innerHTML = "";
  // peticion a localhost:3000/clientes del server de node
  api.get(`/clientes?page=${pagina}&perPage=9`).then(({ data }) => {
     
    for (const cliente of data) {
          
      const dateConverted = dayjs(cliente.fecha_nacimiento).format("DD-MM-YYYY");

      wrapper.innerHTML += `
          <div class="card" style="width: 18rem;">
            <img src="${cliente.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${cliente.nombre} ${cliente.apellidos}</h5>
              <small>${cliente.email}</small>
              <p class="card-text">${dateConverted}</p>
              <div class="d-grid gap-2">
                <button class="btn btn-primary" onclick="editarCliente(${cliente.id})">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" onclick="eliminarCliente(${cliente.id})">
                  <i class="fas fa-trash"></i>
                </button
              </div>
            </div>
          </div>`;
    }
  });
}
