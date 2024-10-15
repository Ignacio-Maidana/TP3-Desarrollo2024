import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartItemList from '../components/CartiItemList';
import '../styles/style.css';

const ShoppingCart = ({ cart, removeFromCart }) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleBackToSearch = () => {
    navigate('/');
  };

  return (
    <div className="shopping-cart-container">
      <h2 className="cart-title">Carrito de Compras</h2>
      <div className="cart-items">
        <CartItemList
          cart={cart}
          removeFromCart={removeFromCart}
        />
      </div>
      <h3 className="cart-total">Total: ${total.toFixed(2)}</h3>
      <button className="back-to-search-button" onClick={handleBackToSearch}>
        Volver a la búsqueda
      </button>
    </div>
  );
};

export default ShoppingCart;