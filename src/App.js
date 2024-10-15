import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductSearch from './pages/ProductSearch';
import ProductDetails from './pages/ProductDetails';
import ShoppingCart from './pages/ShoppingCart';
import Toast from './components/Toast';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setToastMessage('Producto añadido al carrito!');
    setToastType('success');
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 1500);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    setToastMessage('Producto eliminado del carrito!');
    setToastType('error');
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 1500);
  };

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">E-commerce Mercado Libre</h1>
          <Link to="/cart" className="cart-button">
            Carrito ({cart.length})
          </Link>
        </header>

        {toastVisible && <Toast message={toastMessage} type={toastType} />}

        <main className="app-main">
          <Routes>
            <Route 
              path="/" 
              element={<ProductSearch addToCart={addToCart} />} 
            />
            <Route 
              path="/product/:productId" 
              element={<ProductDetails addToCart={addToCart} />} 
            />
            <Route 
              path="/cart" 
              element={<ShoppingCart cart={cart} removeFromCart={removeFromCart} />} 
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;