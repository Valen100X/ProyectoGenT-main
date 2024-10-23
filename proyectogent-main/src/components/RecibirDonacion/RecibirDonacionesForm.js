import React, { useState } from "react";
import "./RecibirDonacion.css";

const RecibirDonacionesForm = () => {
  const [donationData, setDonationData] = useState({
    nombre: "",
    email: "",
    dni: "",
    causa: "",
    tipo_donacion: "",
    otro_tipo_donacion: "",
  });

  const [loading, setLoading] = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "tipo_donacion") {
      setShowOtherInput(value === "otros"); // Mostrar input si "otros" está seleccionado
    }

    setDonationData({
      ...donationData,
      [name]: value,
    });
  };

  const handleDniInput = (e) => {
    const { value } = e.target;
    const cleanedValue = value.replace(/[^0-9]/g, ""); // Solo permite números

    if (cleanedValue.length <= 8) {
      setDonationData({ ...donationData, dni: cleanedValue });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = {
      ...donationData,
      tipo_donacion:
        donationData.tipo_donacion === "otros"
          ? donationData.otro_tipo_donacion
          : donationData.tipo_donacion,
    };

    console.log("Datos a enviar:", dataToSend);

    fetch("http://localhost:3000/recibirdonacion", {
      method: "POST",
      body: JSON.stringify(dataToSend),
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
        setDonationData({
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
      <h1>Formulario para recibir donaciones</h1>
      <form id="receiveDonationForm" onSubmit={handleSubmit}>
        <div className="coolinput">
          <label htmlFor="nombre" className="text">
            Nombre completo:
          </label>
          <input
            type="text"
            name="nombre"
            value={donationData.nombre}
            onChange={handleInputChange}
            placeholder="Escriba aqui..."
            className="input"
            required
          />
        </div>

        <div className="coolinput">
          <label htmlFor="email" className="text">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={donationData.email}
            onChange={handleInputChange}
            placeholder="Escriba aqui..."
            className="input"
            required
          />
        </div>

        <div className="coolinput">
          <label htmlFor="dni" className="text">
            DNI:
          </label>
          <input
            type="text"
            name="dni"
            value={donationData.dni}
            onChange={handleDniInput}
            placeholder="Escriba aqui..."
            className="input"
            maxLength="8"
            required
          />
        </div>

        <div className="coolinput">
          <label htmlFor="causa" className="text">
            Causa por la cual deseas recibir donación:
          </label>
          <input
            type="text"
            name="causa"
            value={donationData.causa}
            onChange={handleInputChange}
            placeholder="Escriba aqui..."
            className="input"
            required
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
                checked={donationData.tipo_donacion === "ropa"}
                onChange={handleInputChange}
              />
              <span>Ropa</span>
            </label>
            <label>
              <input
                type="radio"
                name="tipo_donacion"
                value="alimentos"
                checked={donationData.tipo_donacion === "alimentos"}
                onChange={handleInputChange}
              />
              <span>Alimentos no perecederos</span>
            </label>
            <label>
              <input
                type="radio"
                name="tipo_donacion"
                value="dinero"
                checked={donationData.tipo_donacion === "dinero"}
                onChange={handleInputChange}
              />
              <span>Dinero</span>
            </label>
            <label>
              <input
                type="radio"
                name="tipo_donacion"
                value="otros"
                checked={donationData.tipo_donacion === "otros"}
                onChange={handleInputChange}
              />
              <span>otros</span>
            </label>
          </div>
          {showOtherInput && (
            <div className="coolinput" id="other-input">
              <input
                type="text"
                name="otro_tipo_donacion"
                value={donationData.otro_tipo_donacion}
                onChange={handleInputChange}
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

export default RecibirDonacionesForm;
