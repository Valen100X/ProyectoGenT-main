import React, { useState } from 'react';
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

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Mostrar el campo de entrada "otro" si se selecciona "otros"
    if (name === 'tipo_donacion') {
      setShowOtherInput(value === 'otros');
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDniInput = (e) => {
    const { value } = e.target;
    const cleanedValue = value.replace(/[^0-9]/g, ''); // Solo permite números

    if (cleanedValue.length <= 8) {
      setFormData({ ...formData, dni: cleanedValue });
    }
  };

  const handleEmailInput = (e) => {
    const { value } = e.target;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón básico de email

    if (!emailPattern.test(value)) {
      e.target.setCustomValidity('Formato de correo electrónico no válido');
    } else {
      e.target.setCustomValidity('');
    }

    setFormData({ ...formData, email: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const dataToSend = {
      form: 'formulario2',
      nombre: formData.nombre,
      email: formData.email,
      dni: formData.dni,
      causa: formData.causa,
      tipo_donacion:
        formData.tipo_donacion === 'otros'
          ? formData.otro_tipo_donacion
          : formData.tipo_donacion,
    };

    fetch(
      'https://script.google.com/a/macros/lasalleflorida.edu.ar/s/AKfycbxr5SFY2K1E_bifNlkm8v-ZqkNXKiHULtxVIZuzp_jkOTji21Rd3yDg2T7mqvwS600o/exec',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        alert('Formulario enviado con éxito');
        setSubmitted(true);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Hubo un problema al enviar el formulario');
      })
      .finally(() => {
        // Reiniciar formulario después del envío
        setFormData({
          nombre: '',
          email: '',
          dni: '',
          causa: '',
          tipo_donacion: '',
          otro_tipo_donacion: '',
        });
        setShowOtherInput(false);
        setIsLoading(false);
      });
  };

  return (
    <div>
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
                  placeholder="Escriba aquí..."
                  className="input"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="coolinput">
                <label className="text" htmlFor="email">
                  Email:
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Escriba aquí..."
                  className="input"
                  value={formData.email}
                  onChange={handleEmailInput}
                  required
                />
              </div>

              <div className="coolinput">
                <label className="text" htmlFor="dni">
                  DNI:
                </label>
                <input
                  type="text"
                  name="dni"
                  placeholder="Escriba aquí..."
                  className="input"
                  value={formData.dni}
                  onChange={handleDniInput}
                  required
                />
              </div>

              <div className="coolinput">
                <label className="text" htmlFor="causa">
                  Causa por la cual necesitas la donación:
                </label>
                <input
                  type="text"
                  name="causa"
                  placeholder="Escriba aquí..."
                  className="input"
                  value={formData.causa}
                  onChange={handleInputChange}
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
                      checked={formData.tipo_donacion === 'ropa'}
                      onChange={handleInputChange}
                    />
                    <span>Ropa</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="tipo_donacion"
                      value="alimentos"
                      checked={formData.tipo_donacion === 'alimentos'}
                      onChange={handleInputChange}
                    />
                    <span>Alimentos no perecederos</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="tipo_donacion"
                      value="dinero"
                      checked={formData.tipo_donacion === 'dinero'}
                      onChange={handleInputChange}
                    />
                    <span>Dinero</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="tipo_donacion"
                      value="otros"
                      checked={formData.tipo_donacion === 'otros'}
                      onChange={handleInputChange}
                    />
                    <span>Otros</span>
                  </label>
                  {showOtherInput && (
                    <div className="coolinput" id="other-input">
                      <input
                        type="text"
                        name="otro_tipo_donacion"
                        placeholder="Especifica aquí..."
                        className="input"
                        value={formData.otro_tipo_donacion}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Cargando...' : 'Enviar'}
              </button>
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
