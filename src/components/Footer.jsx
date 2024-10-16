import React from 'react';
import '../styles/style.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} E-commerce Mercado Libre. Todos los derechos reservados.</p>
      <ul className="footer-links">
        <li><a href="#main">Política de Privacidad</a></li>
        <li><a href="#main">Términos y Condiciones</a></li>
        <li><a href="#main">Contacto</a></li>
      </ul>
    </footer>
  );
};

export default Footer;
