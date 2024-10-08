import React, { useState } from 'react';
import axios from 'axios';
import ProductDetails from './ProductDetails';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${searchTerm}`);
      setProducts(response.data.results);
    } catch (err) {
      setError('Ocurrió un error al buscar los productos. Por favor, intente nuevamente.');
      console.error('Error en la búsqueda de productos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSelect = (productId) => {
    setSelectedProduct(productId);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  if (selectedProduct) {
    return <ProductDetails productId={selectedProduct} onBack={handleBack} />;
  }

  return (
    <div>
      <h1>Búsqueda de Productos</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Ingrese el nombre del producto"
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Precio: ${product.price}</p>
            <button onClick={() => handleProductSelect(product.id)}>Ver Detalles</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;