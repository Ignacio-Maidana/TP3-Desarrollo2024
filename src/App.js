import React, { useState } from 'react';
import ProductSearch from './pages/ProductSearch';
import ProductDetails from './pages/ProductDetails';
import ShoppingCart from './pages/ShoppingCart';
import Toast from './components/Toast'; // Importa el componente Toast
import Footer from './components/Footer';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState(''); // 'success' o 'error'
  const [toastVisible, setToastVisible] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setToastMessage('Producto añadido al carrito!');
    setToastType('success');
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000); // Ocultar toast después de 3 segundos
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    setToastMessage('Producto eliminado del carrito!');
    setToastType('error');
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000); // Ocultar toast después de 3 segundos
  };

  const handleProductSelect = (productId) => {
    setSelectedProduct(productId);
    setShowCart(false);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  const handleBackToSearch = () => {
    setShowCart(false);
    setSelectedProduct(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">E-commerce Mercado Libre</h1>
        <button className="cart-button" onClick={() => setShowCart(!showCart)}>
          Carrito ({cart.length})
        </button>
      </header>

      {/* Muestra el toast si es visible */}
      {toastVisible && <Toast message={toastMessage} type={toastType} />}

      <main className="app-main">
        {showCart ? (
          <ShoppingCart
            cart={cart}
            removeFromCart={removeFromCart}
            onBackToSearch={handleBackToSearch}
          />
        ) : selectedProduct ? (
          <ProductDetails
            productId={selectedProduct}
            onBack={handleBack}
            addToCart={addToCart}
          />
        ) : (
          <ProductSearch onProductSelect={handleProductSelect} addToCart={addToCart} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
