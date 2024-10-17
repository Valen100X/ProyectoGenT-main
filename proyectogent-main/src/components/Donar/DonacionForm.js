import React, { useState } from "react";

const DonacionForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    dni: "",
    causa: "",
    tipo_donacion: "",
    otro_tipo_donacion: "",
  });

  const [loading, setLoading] = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Manejar la entrada de DNI solo con números
    if (name === "dni") {
      const sanitizedValue = value.replace(/[^0-9]/g, "").slice(0, 8);
      setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      
      // Mostrar u ocultar el campo "otro" basado en la selección del tipo de donación
      if (name === "tipo_donacion") {
        setShowOtherInput(value === "otros");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Enviar datos a la API
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
        setFormData({
          nombre: "",
          email: "",
          dni: "",
          causa: "",
          tipo_donacion: "",
          otro_tipo_donacion: "",
        });
        setShowOtherInput(false);
        setLoading(false);
      });
  };

  return (
    <div>
      {loading && (
        <div id="loadingMessage" style={{ display: "flex" }}>
          <div className="loader"></div>
        </div>
      )}
      <h1>Formulario para recibir donación</h1>
      <form id="donationForm" onSubmit={handleSubmit}>
        <div className="coolinput">
          <label htmlFor="nombre" className="text">Nombre completo:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Escriba aqui..."
            className="input"
          />
        </div>

        <div className="coolinput">
          <label htmlFor="email" className="text">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Escriba aqui..."
            className="input"
          />
        </div>

        <div className="coolinput">
          <label htmlFor="dni" className="text">DNI:</label>
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            placeholder="Escriba aqui..."
            className="input"
            maxLength="8"
          />
        </div>

        <div className="coolinput">
          <label htmlFor="causa" className="text">Causa por la cual deseas donar:</label>
          <input
            type="text"
            name="causa"
            value={formData.causa}
            onChange={handleChange}
            placeholder="Escriba aqui..."
            className="input"
          />
        </div>

        <h2 className="sec">Seleccione el tipo de donación:</h2>
        <div className="nombre">
          <div className="container">
            <label>
              <input
                type="radio"
                name="tipo_donacion"
                value="ropa"
                checked={formData.tipo_donacion === "ropa"}
                onChange={handleChange}
              />
              <span>Ropa</span>
            </label>
            <label>
              <input
                type="radio"
                name="tipo_donacion"
                value="alimentos"
                checked={formData.tipo_donacion === "alimentos"}
                onChange={handleChange}
              />
              <span>Alimentos no perecederos</span>
            </label>
            <label>
              <input
                type="radio"
                name="tipo_donacion"
                value="dinero"
                checked={formData.tipo_donacion === "dinero"}
                onChange={handleChange}
              />
              <span>Dinero</span>
            </label>
            <label>
              <input
                type="radio"
                name="tipo_donacion"
                value="otros"
                checked={formData.tipo_donacion === "otros"}
                onChange={handleChange}
              />
              <span>Otros</span>
            </label>
          </div>
          {showOtherInput && (
            <div className="coolinput" id="other-input">
              <input
                type="text"
                name="otro_tipo_donacion"
                value={formData.otro_tipo_donacion}
                onChange={handleChange}
                placeholder="Especifica aqui..."
                className="input"
              />
            </div>
          )}
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default DonacionForm;
