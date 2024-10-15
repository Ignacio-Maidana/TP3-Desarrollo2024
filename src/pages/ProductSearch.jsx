import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/style.css';
import ProductList from '../components/ProductList';

const ProductSearch = ({ addToCart }) => {
  const navigate = useNavigate();
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

  const handleProductSelect = (productId) => {
    navigate(`/product/${productId}`);
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

      <ProductList
        products={products}
        onProductSelect={handleProductSelect}
        addToCart={addToCart}
      />
    </div>
  );
};

export default ProductSearch;