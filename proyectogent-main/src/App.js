import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Donar from './components/Donar/Donar';
import PreguntasFrecuentes from './components/PreguntasFrecuentes/PreguntasFrecuentes';
import QuienesSomos from './components/QuienesSomos/QuienesSomos';
import RecibirDonacion from './components/RecibirDonacion/RecibirDonacion';
import DonacionForm from './components/Donar/DonacionForm';
import RecibirDonacionesForm from './components/RecibirDonacion/RecibirDonacionesForm';
import Inicio from './components/Inicio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Donar" element={<Donar />} />
        <Route path="/PreguntasFrecuentes" element={<PreguntasFrecuentes />} />
        <Route path="/QuienesSomos" element={<QuienesSomos />} />
        <Route path="/RecibirDonacion" element={<RecibirDonacion />} />
        <Route path="/DonacionForm" element={<DonacionForm />} />
        <Route path="/RecibirDonacionesForm" element={<RecibirDonacionesForm />} />
        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>
    </Router>
  );
}

export default App;
