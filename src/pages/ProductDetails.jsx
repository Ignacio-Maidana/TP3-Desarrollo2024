import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../styles/style.css';

const ProductDetails = ({ productId, onBack, addToCart }) => {
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
    <div className="product-details-container">
      <h2>{product.title}</h2>
      <Carousel>
        {product.pictures.map((picture) => (
          <div key={picture.id}>
            <img src={picture.url} alt={product.title} />
          </div>
        ))}
      </Carousel>
      <p className="product-price">Precio: ${product.price}</p>
      <p className="product-description">{product.description}</p>
      
      <h3>Características del producto</h3>
      <table>
        <thead>
          <tr>
            <th>Característica</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {product.attributes.map((attr) => (
            <tr key={attr.id}>
              <td>{attr.name}</td>
              <td>{attr.value_name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
        Añadir al Carrito
      </button>
      <button className="back-btn" onClick={onBack}>
        Volver a la búsqueda
      </button>
    </div>
  );
};

export default ProductDetails;
