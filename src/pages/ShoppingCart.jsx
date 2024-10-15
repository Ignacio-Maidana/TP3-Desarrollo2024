import React from 'react';
import CartItemList from '../components/CartiItemList';
import '../styles/style.css'; // Importa el archivo CSS

const ShoppingCart = ({ cart, removeFromCart, onBackToSearch }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="shopping-cart-container">
      <h2 className="cart-title">Carrito de Compras</h2>
      <div className="cart-items">
      <CartItemList 
        cart={cart} 
        removeFromCart={removeFromCart} />
      </div>
      <h3 className="cart-total">Total: ${total.toFixed(2)}</h3>
      <button className="back-to-search-button" onClick={onBackToSearch}>
        Volver a la búsqueda
      </button>
    </div>
  );
};

export default ShoppingCart;
