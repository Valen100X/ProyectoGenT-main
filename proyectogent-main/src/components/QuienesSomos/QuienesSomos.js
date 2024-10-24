import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link
import './QuienesSomos.css';

function QuienesSomos() {
  return (
    <main>
      <header>
        <Link to="/" className="icono"> {/* Cambia a Link aquí */}
        <img src={require('../images/logo.png')} alt="AccessPrint logo" />
          <h2>AccessPrint</h2>
        </Link>
        <nav>
          <Link to="/">Inicio</Link> {/* Cambia a Link aquí */}
          <Link to="/PreguntasFrecuentes">Preguntas frecuentes</Link> {/* Cambia a Link aquí */}
        </nav>
      </header>
      <section className="section_informacion">
        <h1>¿Quiénes somos?</h1>
        <p>
          <span>AccessPrint</span> es una innovadora plataforma creada a principios de 2024 con la misión de ser el vínculo eficaz entre los donantes y aquellos que necesitan las donaciones. Nuestro objetivo es facilitar la conexión entre generosos donantes y personas o comunidades que requieren apoyo, brindando una solución que optimiza el proceso de donación y ayuda a maximizar el impacto de cada contribución.
          <br />
          <br />
          Nuestra visión es expandir nuestra red y llegar a todo el país, asegurando que cada donación encuentre su destino adecuado y que cada necesidad sea atendida con la mayor eficiencia y transparencia.
          <br />
          <br />
          En <span>AccessPrint</span>, nos guiamos por el valor de la innovación. Creemos en utilizar la tecnología y soluciones creativas para mejorar el sistema de donaciones y hacer que el proceso sea más accesible y efectivo para todos.
          <br />
          <br />
          Ofrecemos una plataforma única para gestionar y facilitar donaciones, diferenciándonos de la competencia a través de nuestra dedicación a la innovación y la optimización de cada etapa del proceso de donación.
          <br />
          <br />
          Nuestro equipo está formado por Juan Pablo Castro, Jerónimo Martín Patrón, Cristian Dikran Daglaroglu y Valentino Scotti. Lo que hace especial a nuestro equipo es nuestra experiencia compartida en programación y nuestra sólida amistad, que se refleja en la colaboración armoniosa y la eficiencia con la que trabajamos juntos.
          <br />
          <br />
          Aunque aún no hemos recibido reconocimientos importantes, estamos comprometidos en seguir creciendo y mejorando. Nuestra implicación social se manifiesta en nuestra misión de conectar a quienes desean donar con quienes necesitan ayuda, haciendo una contribución significativa a la comunidad.
          <br />
          <br />
          En <span>AccessPrint</span>, estamos enfocados en crear un impacto positivo y duradero. Nos enorgullece estar a la vanguardia de la innovación en el ámbito de las donaciones y estamos comprometidos a seguir desarrollando soluciones que beneficien a todos los involucrados.
        </p>
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

export default QuienesSomos;
