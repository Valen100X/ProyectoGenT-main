import React, { useState } from 'react';
import RecibirDonacionesForm from './RecibirDonacionesForm'; // Ajusta la ruta según sea necesario
import { Link } from 'react-router-dom';
import './RecibirDonacion.css'; // Si tienes estilos específicos

function RecibirDonacion() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    dni: '',
    causa: '',
    tipo_donacion: '',
    otro_tipo_donacion: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedDonationType = formData.tipo_donacion || formData.otro_tipo_donacion;

    const dataToSend = {
      form: 'formulario2',
      nombre: formData.nombre,
      email: formData.email,
      dni: formData.dni,
      causa: formData.causa,
      tipo_donacion: selectedDonationType,
    };

    fetch(
      'https://script.google.com/a/macros/lasalleflorida.edu.ar/s/AKfycbxr5SFY2K1E_bifNlkm8v-ZqkNXKiHULtxVIZuzp_jkOTji21Rd3yDg2T7mqvwS600o/exec',
      {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        alert('Formulario enviado con éxito');
        setSubmitted(true);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <div style={{ display: 'none' }} id="loadingMessage">
        <div className="loader"></div>
      </div>
      <main>
      <header>
        <Link to="/" className="icono"> 
        <img src={require('../images/logo.png')} alt="AccessPrint logo" />
          <h2>AccessPrint</h2>
        </Link>
        <nav>
          <Link to="/QuienesSomos">¿Quiénes somos?</Link> 
          <Link to="/PreguntasFrecuentes">Preguntas frecuentes</Link> 
        </nav>
      </header>

        <section className="formulario">
          <h1>Formulario para recibir donación</h1>
          {!submitted ? (
            <form id="donationForm" onSubmit={handleSubmit}>
              <div className="coolinput">
                <label className="text" htmlFor="nombre">
                  Nombre completo:
                </label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Escriba aqui..."
                  className="input"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>

              <div className="coolinput">
                <label className="text" htmlFor="email">
                  Email:
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Escriba aqui..."
                  className="input"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="coolinput">
                <label className="text" htmlFor="dni">
                  DNI:
                </label>
                <input
                  type="text"
                  name="dni"
                  placeholder="Escriba aqui..."
                  className="input"
                  value={formData.dni}
                  onChange={handleChange}
                />
              </div>

              <div className="coolinput">
                <label className="text" htmlFor="causa">
                  Causa por la cual necesitas la donación:
                </label>
                <input
                  type="text"
                  name="causa"
                  placeholder="Escriba aqui..."
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
                      checked={formData.tipo_donacion === 'ropa'}
                      onChange={handleChange}
                    />
                    <span>Ropa</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="tipo_donacion"
                      value="alimentos"
                      checked={formData.tipo_donacion === 'alimentos'}
                      onChange={handleChange}
                    />
                    <span>Alimentos no perecederos</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="tipo_donacion"
                      value="dinero"
                      checked={formData.tipo_donacion === 'dinero'}
                      onChange={handleChange}
                    />
                    <span>Dinero</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="tipo_donacion"
                      value="otros"
                      checked={formData.tipo_donacion === 'otros'}
                      onChange={handleChange}
                    />
                    <span>Otros</span>
                  </label>
                </div>
                {formData.tipo_donacion === 'otros' && (
                  <div className="coolinput" id="other-input">
                    <input
                      type="text"
                      name="otro_tipo_donacion"
                      placeholder="Especifica aqui..."
                      className="input"
                      value={formData.otro_tipo_donacion}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>

              <button type="submit">Enviar</button>
            </form>
          ) : (
            <div>
              <h2>¡Gracias por enviar tu solicitud!</h2>
              <p>Haz click en el siguiente enlace para continuar:</p>
            </div>
          )}
        </section>
      </main>

      <footer>
        <div>
          <p>&copy; 2024 AccessPrint. Todos los derechos reservados.</p>
        </div>
        <div className="redes_sociales">
          <a href="">
            <i className="fa-brands fa-youtube"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-square-instagram"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-square-x-twitter"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default RecibirDonacion;
