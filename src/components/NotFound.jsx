// src/components/NotFound.js
import React from 'react';
import '../styles/style.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>No se encontraron resultados, realice una búsqueda nueva</h2>
      <p>Lo sentimos, no hemos podido encontrar lo que buscas. Intenta con otra búsqueda o explora nuestras categorías.</p>
    </div>
  );
};

export default NotFound;
