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
const dniInput = document.querySelector('input[name="dni"]');
dniInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
  if (this.value.length > 8) {
    this.value = this.value.slice(0, 8);
  }
});

// Validar el formato del correo electrónico
const emailInput = document.querySelector('input[name="email"]');
emailInput.addEventListener("input", function () {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón básico para correos
  if (!emailPattern.test(this.value)) {
    this.setCustomValidity("Formato de correo electrónico no válido");
  } else {
    this.setCustomValidity(""); // Restablece el mensaje de error
  }
});

document.getElementById("donationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Selecciona los elementos del formulario
  const nombre = document.querySelector('input[name="nombre"]');
  const email = document.querySelector('input[name="email"]');
  const dni = document.querySelector('input[name="dni"]');
  const causa = document.querySelector('input[name="causa"]');
  const tipo_donacion = document.querySelector('input[name="radio"]:checked');
  const otro_tipo_donacion = document.querySelector('input[name="otro_tipo_donacion"]');

  // Verifica si los elementos existen antes de acceder a su valor
  const formData = {
    nombre: nombre ? nombre.value : "",
    email: email ? email.value : "",
    dni: dni ? dni.value : "",
    causa: causa ? causa.value : "",
    tipo_donacion: tipo_donacion 
      ? (tipo_donacion.value === "otros" ? otro_tipo_donacion.value : tipo_donacion.value) 
      : "",
  };

  // Mostrar mensaje de "Cargando..."
  const loadingMessage = document.getElementById("loadingMessage");
  loadingMessage.style.display = "flex"; // Cambiar a "flex" si se requiere

  // Agregar un console.log para verificar los datos antes de enviarlos
  console.log("Datos a enviar:", formData);

  // Envia los datos a tu API en el servidor local
  fetch("http://localhost:3000/donaciones", {
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
      alert("Hubo un problema al enviar el formulario");
    })
    .finally(() => {
      // Resetear el formulario después de enviar, sin importar si es exitoso o no
      document.getElementById("donationForm").reset();
      document.getElementById("other-input").style.display = "none"; // Ocultar el campo "otro" si estaba visible
      loadingMessage.style.display = "none"; // Ocultar el mensaje de "Cargando..."
    });
});
