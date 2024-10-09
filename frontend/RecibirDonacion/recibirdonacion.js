document.querySelectorAll('input[name="radio"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    const otherInputDiv = document.getElementById("other-input");
    if (this.value === "otros" && this.checked) {
      otherInputDiv.style.display = "block";
    } else {
      otherInputDiv.style.display = "none";
    }
  });
});

// Asegurarte de que el campo DNI solo acepte números y tenga un máximo de 8 caracteres
const dniInputs = document.querySelectorAll('input[name="dni"]');
dniInputs.forEach((dniInput) => {
  dniInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
    if (this.value.length > 8) {
      this.value = this.value.slice(0, 8);
    }
  });
});

// Validar el formato del correo electrónico
const emailInputs = document.querySelectorAll('input[name="email"]');
emailInputs.forEach((emailInput) => {
  emailInput.addEventListener("input", function () {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón básico para correos
    if (!emailPattern.test(this.value)) {
      this.setCustomValidity("Formato de correo electrónico no válido");
    } else {
      this.setCustomValidity(""); // Restablece el mensaje de error
    }
  });
});

// Función para manejar el envío del formulario de donación
document.getElementById("donationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.querySelector('input[name="nombre"]');
  const email = document.querySelector('input[name="email"]');
  const dni = document.querySelector('input[name="dni"]');
  const causa = document.querySelector('input[name="causa"]');
  const tipo_donacion = document.querySelector('input[name="radio"]:checked');
  const otro_tipo_donacion = document.querySelector('input[name="otro_tipo_donacion"]');

  const formData = {
    nombre: nombre ? nombre.value : "",
    email: email ? email.value : "",
    dni: dni ? dni.value : "",
    causa: causa ? causa.value : "",
    tipo_donacion: tipo_donacion 
      ? (tipo_donacion.value === "otros" ? otro_tipo_donacion.value : tipo_donacion.value) 
      : "",
  };

  console.log("Datos a enviar:", formData);

  // Mostrar mensaje de "Cargando..."
  const loadingMessage = document.getElementById("loadingMessage");
  loadingMessage.style.display = "flex";

  fetch("http://localhost:3000/recibirdonacion", {
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
    })
    .finally(() => {
      document.getElementById("donationForm").reset(); // Reiniciar el formulario
      document.getElementById("other-input").style.display = "none"; // Ocultar el campo "otro" si estaba visible
      loadingMessage.style.display = "none"; // Ocultar el mensaje de "Cargando..."
    });
});

// Función para manejar el envío del formulario de recibir donación
document.getElementById("receiveDonationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.querySelector('input[name="nombre"]');
  const email = document.querySelector('input[name="email"]');
  const dni = document.querySelector('input[name="dni"]');
  const causa = document.querySelector('input[name="causa"]');
  const tipo_donacion = document.querySelector('input[name="tipo_donacion"]:checked');
  const otro_tipo_donacion = document.querySelector('input[name="otro_tipo_donacion"]');

  const formData = {
    nombre: nombre ? nombre.value : "",
    email: email ? email.value : "",
    dni: dni ? dni.value : "",
    causa: causa ? causa.value : "",
    tipo_donacion: tipo_donacion 
      ? (tipo_donacion.value === "otros" ? otro_tipo_donacion.value : tipo_donacion.value) 
      : "",
  };

  console.log("Datos a enviar:", formData);

  // Mostrar mensaje de "Cargando..."
  const loadingMessage = document.getElementById("loadingMessage");
  loadingMessage.style.display = "block";

  fetch("http://localhost:3000/recibirdonacion", {
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
    })
    .finally(() => {
      document.getElementById("receiveDonationForm").reset(); // Reiniciar el formulario
      document.getElementById("other-input").style.display = "none"; // Ocultar el campo "otro" si estaba visible
      loadingMessage.style.display = "none"; // Ocultar el mensaje de "Cargando..."
    });
});
