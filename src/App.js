import React, { useState } from 'react';
import ProductSearch from './components/ProductSearch';
import ProductDetails from './components/ProductDetails';
import ShoppingCart from './components/ShoppingCart';

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

  return (
    <div className="App">
      <header>
        <h1>E-commerce Mercado Libre</h1>
        <button onClick={() => setShowCart(!showCart)}>
          Carrito ({cart.length})
        </button>
      </header>

      {showCart ? (
        <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
      ) : selectedProduct ? (
        <ProductDetails 
          productId={selectedProduct} 
          onBack={handleBack}
          addToCart={addToCart}
        />
      ) : (
        <ProductSearch onProductSelect={handleProductSelect} />
      )}
    </div>
  );
}

export default App;