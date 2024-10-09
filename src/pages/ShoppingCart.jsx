import React from 'react';

const ShoppingCart = ({ cart, removeFromCart, onBackToSearch }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cart.map((item) => (
        <div key={item.id}>
          <img src={item.thumbnail} alt={item.title} style={{ width: '50px' }} />
          <span>{item.title}</span>
          <span>${item.price}</span>
          <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={onBackToSearch}>Volver a la búsqueda</button>
    </div>
  );
};

export default ShoppingCart;