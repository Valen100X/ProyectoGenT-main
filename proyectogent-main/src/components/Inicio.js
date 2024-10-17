import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

function Inicio() {
  return (
    <main>
      <header>
        <div className="icono">
        <img src={require('./images/logo.png')} alt="AccessPrint logo" />
          <h2>AccessPrint</h2>
        </div>
        <nav>
          <Link to="/QuienesSomos">¿Quiénes somos?</Link>
          <Link to="/PreguntasFrecuentes">Preguntas frecuentes</Link>
        </nav>
      </header>
      <section className="section_titulo">
        <div className="corazon">
          <img
            src="https://media-public.canva.com/zjD58/MAF44qzjD58/1/t.png"
            alt=""
          />
        </div>
        <div className="section_texto">
          <h1>Ayudar a conectar corazones</h1>
          <p className="subtitulo">
            Donar es un acto de solidaridad que cambia realidades. Tu apoyo
            brinda recursos esenciales y esperanza a quienes más lo necesitan.
          </p>

          <p className="letra_chica">
            "Mucha gente pequeña, en lugares pequeños, haciendo cosas pequeñas,
            puede cambiar el mundo" - Eduardo Galeano
          </p>
          <article className="botones">
            <Link to="/Donar">Haz una donación</Link>
            <Link to="/RecibirDonacion">Recibir una donación</Link>
          </article>
        </div>
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
    </main>
  );
}

export default Inicio;
