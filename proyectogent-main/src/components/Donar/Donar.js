import React, { useState } from "react";
import DonacionForm from './DonacionForm';
import { Link } from "react-router-dom";
import "./Donar.css";

const Donar = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    dni: "",
    causa: "",
    tipo_donacion: "",
    otro_tipo_donacion: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      "https://script.google.com/a/macros/lasalleflorida.edu.ar/s/AKfycbxr5SFY2K1E_bifNlkm8v-ZqkNXKiHULtxVIZuzp_jkOTji21Rd3yDg2T7mqvwS600o/exec",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data) => alert("Formulario enviado con éxito"))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <header>
        <Link to="/" className="icono"> {/* Cambia a Link aquí */}
        <img src={require('../images/logo.png')} alt="AccessPrint logo" />
          <h2>AccessPrint</h2>
        </Link>
        <nav>
          <Link to="/QuienesSomos">¿Quiénes somos?</Link> {/* Cambia a Link aquí */}
          <Link to="/PreguntasFrecuentes">Preguntas frecuentes</Link> {/* Cambia a Link aquí */}
        </nav>
      </header>
      <section className="formulario">
        <h1>Formulario para realizar donación</h1>
        <form id="donationForm" onSubmit={handleSubmit}>
          <div className="coolinput">
            <label htmlFor="nombre" className="text">
              Nombre completo:
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Escriba aquí..."
              className="input"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>

          <div className="coolinput">
            <label htmlFor="email" className="text">
              Email:
            </label>
            <input
              type="text"
              name="email"
              placeholder="Escriba aquí..."
              className="input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="coolinput">
            <label htmlFor="dni" className="text">
              DNI:
            </label>
            <input
              type="text"
              name="dni"
              placeholder="Escriba aquí..."
              className="input"
              value={formData.dni}
              onChange={handleChange}
            />
          </div>

          <div className="coolinput">
            <label htmlFor="causa" className="text">
              Causa por la cual deseas donar:
            </label>
            <input
              type="text"
              name="causa"
              placeholder="Escriba aquí..."
              className="input"
              value={formData.causa}
              onChange={handleChange}
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
                  onChange={handleChange}
                />
                <span>Ropa</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="tipo_donacion"
                  value="alimentos"
                  onChange={handleChange}
                />
                <span>Alimentos no perecederos</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="tipo_donacion"
                  value="dinero"
                  onChange={handleChange}
                />
                <span>Dinero</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="tipo_donacion"
                  value="otros"
                  onChange={handleChange}
                />
                <span>Otros</span>
              </label>
            </div>
            <div className="coolinput" id="other-input">
              <input
                type="text"
                name="otro_tipo_donacion"
                placeholder="Especifica aquí..."
                className="input"
                value={formData.otro_tipo_donacion}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit">Enviar</button>
        </form>
      </section>
      <footer>
        <div>
          <p>&copy; 2024 AccessPrint. Todos los derechos reservados.</p>
        </div>
        <div className="redes_sociales">
          <a href=""><i className="fa-brands fa-youtube"></i></a>
          <a href=""><i className="fa-brands fa-square-instagram"></i></a>
          <a href=""><i className="fa-brands fa-github"></i></a>
          <a href=""><i className="fa-brands fa-square-x-twitter"></i></a>
        </div>
      </footer>
    </div>
  );
};

export default Donar;
