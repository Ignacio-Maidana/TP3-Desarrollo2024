import React from 'react';
import '../styles/style.css'; // Importa el archivo CSS

const ShoppingCart = ({ cart, removeFromCart, onBackToSearch }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="shopping-cart-container">
      <h2 className="cart-title">Carrito de Compras</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img className="cart-item-thumbnail" src={item.thumbnail} alt={item.title} />
            <span className="cart-item-title">{item.title}</span>
            <span className="cart-item-price">${item.price}</span>
            <button className="remove-button" onClick={() => removeFromCart(item.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
      <h3 className="cart-total">Total: ${total.toFixed(2)}</h3>
      <button className="back-to-search-button" onClick={onBackToSearch}>
        Volver a la búsqueda
      </button>
    </div>
  );
};

export default ShoppingCart;
