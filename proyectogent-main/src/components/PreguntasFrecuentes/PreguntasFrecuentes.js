import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link
import './PreguntasFrecuentes.css';

function PreguntasFrecuentes() {
  return (
    <main>
      <header>
        <Link to="/" className="icono"> {/* Cambia a Link aquí */}
        <img src={require('../images/logo.png')} alt="AccessPrint logo" />
          <h2>AccessPrint</h2>
        </Link>
        <nav>
          <Link to="/">Inicio</Link> {/* Cambia a Link aquí */}
          <Link to="/QuienesSomos">¿Quiénes somos?</Link>
        </nav>
      </header>
      <section className="section_informacion">
        <h1>Preguntas Frecuentes</h1>
        <div className="preguntas">
          <div className="pregunta">
            <h2>¿Qué tipos de donaciones puedo realizar?</h2>
            <p>
              Puedes donar dinero, vestimenta, alimentos no perecederos, o cualquier otro artículo que creas necesario. También puedes elegir recibir estos tipos de donaciones si las necesitas.
            </p>
          </div>
          <div className="pregunta">
            <h2>¿Cómo se gestionan las donaciones?</h2>
            <p>
              Cuando ofreces una donación, como alimentos, te pondrás en contacto con una persona que necesite específicamente lo que estás donando. Facilitamos la conexión entre donantes y beneficiarios.
            </p>
          </div>
          <div className="pregunta">
            <h2>¿Hay algún monto mínimo o máximo para donar?</h2>
            <p>
              No, puedes donar cualquier cantidad de dinero o artículos según tu preferencia y posibilidades.
            </p>
          </div>
          <div className="pregunta">
            <h2>¿Puedo recibir una donación si lo necesito?</h2>
            <p>
              Sí, nuestra plataforma te permite solicitar donaciones si te encuentras en una situación de necesidad. Puedes elegir qué tipo de ayuda te gustaría recibir.
            </p>
          </div>
          <div className="pregunta">
            <h2>¿Hay algún tipo de reconocimiento para los donantes?</h2>
            <p>
              No ofrecemos recompensas o reconocimientos por las donaciones. Nuestro objetivo es simplemente facilitar la ayuda entre personas.
            </p>
          </div>
          <div className="pregunta">
            <h2>¿Qué ocurre si necesito algo específico que no aparece en las opciones?</h2>
            <p>
              Puedes contactar a través de nuestra plataforma para realizar solicitudes específicas, y haremos lo posible para ayudarte a conectar con un donante.
            </p>
          </div>
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

export default PreguntasFrecuentes;
