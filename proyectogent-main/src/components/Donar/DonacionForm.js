import React, { useState } from 'react';
import "./Donar.css";

const DonationForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    dni: '',
    causa: '',
    tipo_donacion: '',
    otro_tipo_donacion: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'tipo_donacion') {
      setShowOtherInput(value === 'otros'); // Mostrar input si "otros" está seleccionado
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
      ...formData,
      tipo_donacion:
        formData.tipo_donacion === 'otros'
          ? formData.otro_tipo_donacion
          : formData.tipo_donacion,
    };

    console.log('Datos a enviar:', dataToSend);

    fetch('https://script.google.com/a/macros/lasalleflorida.edu.ar/s/AKfycbxr5SFY2K1E_bifNlkm8v-ZqkNXKiHULtxVIZuzp_jkOTji21Rd3yDg2T7mqvwS600o/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Respuesta del servidor:', data);
        alert('Formulario enviado con éxito');
      })
      .catch((error) => {
        console.error('Error al enviar formulario:', error);
        alert('Hubo un problema al enviar el formulario');
      })
      .finally(() => {
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
    <form id="donationForm" onSubmit={handleSubmit}>
      <h1>Formulario para realizar donación</h1>

      <div className="coolinput">
        <label htmlFor="nombre" className="text">Nombre completo:</label>
        <input type="text" name="nombre" placeholder="Escriba aquí..." className="input" value={formData.nombre} onChange={handleInputChange} required />
      </div>

      <div className="coolinput">
        <label htmlFor="email" className="text">Email:</label>
        <input type="text" name="email" placeholder="Escriba aquí..." className="input" value={formData.email} onChange={handleEmailInput} required />
      </div>

      <div className="coolinput">
        <label htmlFor="dni" className="text">DNI:</label>
        <input type="text" name="dni" placeholder="Escriba aquí..." className="input" value={formData.dni} onChange={handleDniInput} required />
      </div>

      <div className="coolinput">
        <label htmlFor="causa" className="text">Causa por la cual deseas donar:</label>
        <input type="text" name="causa" placeholder="Escriba aquí..." className="input" value={formData.causa} onChange={handleInputChange} required />
      </div>

      <h2 className="sec">Seleccione el tipo de donación:</h2>
      <div className="nombre">
        <div className="container">
          <label>
            <input type="radio" name="tipo_donacion" value="ropa" onChange={handleInputChange} checked={formData.tipo_donacion === 'ropa'} />
            <span>Ropa</span>
          </label>
          <label>
            <input type="radio" name="tipo_donacion" value="alimentos" onChange={handleInputChange} checked={formData.tipo_donacion === 'alimentos'} />
            <span>Alimentos no perecederos</span>
          </label>
          <label>
            <input type="radio" name="tipo_donacion" value="dinero" onChange={handleInputChange} checked={formData.tipo_donacion === 'dinero'} />
            <span>Dinero</span>
          </label>
          <label>
            <input type="radio" name="tipo_donacion" value="otros" onChange={handleInputChange} checked={formData.tipo_donacion === 'otros'} />
            <span>Otros</span>
          </label>
          {showOtherInput && (
  <div className="coolinput">
    <input 
      type="text" 
      name="otro_tipo_donacion" 
      placeholder="Escriba aquí..." 
      className="inputOther" 
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
  );
};

export default DonationForm;
