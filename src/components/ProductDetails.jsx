import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetails = ({ productId, onBack }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://api.mercadolibre.com/items/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError('Error al cargar los detalles del producto.');
        console.error('Error en la carga de detalles del producto:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) return <p>Cargando detalles del producto...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!product) return null;

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.pictures[0].url} alt={product.title} />
      <p>Precio: ${product.price}</p>
      <p>{product.description}</p>
      <button onClick={onBack}>Volver a la búsqueda</button>
    </div>
  );
};

export default ProductDetails;