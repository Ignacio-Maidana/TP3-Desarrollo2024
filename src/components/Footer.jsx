import React from 'react';
import '../styles/style.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} E-commerce Mercado Libre. Todos los derechos reservados.</p>
      <ul className="footer-links">
        <li><a href="#">Política de Privacidad</a></li>
        <li><a href="#">Términos y Condiciones</a></li>
        <li><a href="#">Contacto</a></li>
      </ul>
    </footer>
  );
};

export default Footer;
