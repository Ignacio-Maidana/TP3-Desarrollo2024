import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotFound from '../components/NotFound';
import '../styles/style.css'; // Importa el archivo CSS

const ProductSearch = ({ onProductSelect, addToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.mercadolibre.com/sites/MLA/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Error al cargar las categorías:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let url = `https://api.mercadolibre.com/sites/MLA/search?q=${searchTerm}`;
      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }
      const response = await axios.get(url);
      setProducts(response.data.results);
    } catch (err) {
      setError('Ocurrió un error al buscar los productos. Por favor, intente nuevamente.');
      console.error('Error en la búsqueda de productos:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-search-container">
      <h2 className="search-title">Búsqueda de Productos</h2>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Ingrese el nombre del producto"
        />
        <select
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button className="search-button" type="submit">Buscar</button>
      </form>

      {loading && <p className="loading-message">Cargando...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="product-list">
        {products.length === 0 ? ( // Si no hay productos, muestra NotFound
          <NotFound />
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-item">
              <img className="product-thumbnail" src={product.thumbnail} alt={product.title} />
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">Precio: ${product.price}</p>
              <button className="details-button" onClick={() => onProductSelect(product.id)}>
                Ver Detalles
              </button>
              <button className="add-to-cart-button" onClick={() => addToCart(product)}>
                Añadir al Carrito
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
