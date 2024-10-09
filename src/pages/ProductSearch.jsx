import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Búsqueda de Productos</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Ingrese el nombre del producto"
        />
        <select
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
            <button onClick={() => onProductSelect(product.id)}>Ver Detalles</button>
            <button onClick={() => addToCart(product)}>Añadir al Carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;