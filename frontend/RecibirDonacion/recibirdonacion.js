document.querySelectorAll('input[name="tipo_donacion"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    const otherInputDiv = document.getElementById("other-input");
    if (this.value === "otros" && this.checked) {
      otherInputDiv.style.display = "block";
    } else {
      otherInputDiv.style.display = "none";
    }
  });
});

document
  .getElementById("donationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Selecciona los elementos del formulario
    const nombre = document.querySelector('input[name="nombre"]');
    const email = document.querySelector('input[name="email"]');
    const dni = document.querySelector('input[name="dni"]');
    const causa = document.querySelector('input[name="causa"]');
    const tipo_donacion = document.querySelector('input[name="radio"]:checked');
    const otro_tipo_donacion = document.querySelector(
      'input[name="otro_tipo_donacion"]'
    );

    // Verifica si los elementos existen antes de acceder a su valor
    const formData = {
      nombre: nombre ? nombre.value : "",
      email: email ? email.value : "",
      dni: dni ? dni.value : "",
      causa: causa ? causa.value : "",
      tipo_donacion: tipo_donacion ? tipo_donacion.value : "", // Verifica que haya un radio seleccionado
      otro_tipo_donacion: otro_tipo_donacion ? otro_tipo_donacion.value : "", // Si el campo es opcional
    };

    // Agregar un console.log para verificar los datos antes de enviarlos
    console.log("Datos a enviar:", formData);

    // Envia los datos a tu API en el servidor local
    fetch("http://localhost:3000/recibirdonacion", {
      // Cambié la URL a tu API local
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        alert("Formulario enviado con éxito");
      })
      .catch((error) => {
        console.error("Error al enviar formulario:", error);
      });
  });

document
  .getElementById("receiveDonationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Selecciona los elementos del formulario
    const nombre = document.querySelector('input[name="nombre"]');
    const email = document.querySelector('input[name="email"]');
    const dni = document.querySelector('input[name="dni"]');
    const causa = document.querySelector('input[name="causa"]');
    const tipo_donacion = document.querySelector(
      'input[name="tipo_donacion"]:checked'
    );
    const otro_tipo_donacion = document.querySelector(
      'input[name="otro_tipo_donacion"]'
    );

    // Verifica si los elementos existen antes de acceder a su valor
    const formData = {
      nombre: nombre ? nombre.value : "",
      email: email ? email.value : "",
      dni: dni ? dni.value : "",
      causa: causa ? causa.value : "",
      tipo_donacion: tipo_donacion ? tipo_donacion.value : "", // Verifica que haya un radio seleccionado
      otro_tipo_donacion: otro_tipo_donacion ? otro_tipo_donacion.value : "", // Si el campo es opcional
    };

    // Agregar un console.log para verificar los datos antes de enviarlos
    console.log("Datos a enviar:", formData);

    // Envia los datos a tu API en el servidor local
    fetch("http://localhost:3000/recibirdonacion", {
      // Cambié la URL a tu API local
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        alert("Formulario enviado con éxito");
      })
      .catch((error) => {
        console.error("Error al enviar formulario:", error);
      });
  });
