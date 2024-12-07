document.addEventListener('DOMContentLoaded', function() {

    const form = document.querySelector('form');

    const { documento, nombre, apellidos, email } = form.elements; // Destructuring: recupera los elementos del formulario

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que se recargue la página

        const data = {
            documento: documento.value,
            nombre: nombre.value,
            apellidos: apellidos.value,
            email: email.value
        }

        // enviar los datos
        fetch("http://localhost:3000/cliente", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            form.reset();
        })
        .catch(err => console.error(err))

    })
})