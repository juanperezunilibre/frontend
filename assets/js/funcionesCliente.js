import {cargarDatosCliente} from "./script.js";

const form = document.querySelector("form");


window.editarCliente = function (id) {
  fetch("http://localhost:3000/cliente/" + id)
    .then((response) => response.json())
    .then((data) => {
      const { editar, documento, nombre, apellidos, email, fecha_nacimiento } =
        form.elements;

      const dateConverted = dayjs(data.fecha_nacimiento).format("YYYY-MM-DD");

      // asignar los valores a los campos del formulario
      editar.value = data.id;
      documento.value = data.documento;
      nombre.value = data.nombre;
      apellidos.value = data.apellidos;
      email.value = data.email;
      fecha_nacimiento.value = dateConverted;
    });
};

window.limpiarFormulario = function () {
  form.reset();
};

window.eliminarCliente = function (id) {
  Swal.fire({
    title: "Estas seguro?",
    text: "No podras revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borrar!",
    cancelButtonText: "Cancelar",
  }).then(function (result) {
    if (result.isConfirmed) {
      fetch(`http://localhost:3000/cliente/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          Swal.fire("Eliminado!", data.message, "success");
          cargarDatosCliente();
        });
    }
  });
};
