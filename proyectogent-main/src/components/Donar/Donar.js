import React from "react";
import { Link } from "react-router-dom";
import DonationForm from "./DonacionForm";
import "./Donar.css";

const Donar = () => {
  return (
    <div>
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
        <DonationForm />
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
