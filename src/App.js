import React, { useState } from 'react';
import ProductSearch from './pages/ProductSearch';
import ProductDetails from './pages/ProductDetails';
import ShoppingCart from './pages/ShoppingCart';
import './App.css'

function App() {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
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
    <div className="App">
      <header>
        <h1>E-commerce Mercado Libre</h1>
        <button onClick={() => setShowCart(!showCart)}>
          Carrito ({cart.length})
        </button>
      </header>

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
    </div>
  );
}

export default App;