import React from 'react';
import NotFound from './NotFound';

const ProductList = ({ products, onProductSelect, addToCart }) => {
    return (
        <div className="product-list">
            {products.length === 0 ? (
            <NotFound /> 
            ) : (
            products.map((product) => (
            <div key={product.id} className="product-item">
                <img className="product-thumbnail" src={product.thumbnail} alt={product.title}/>
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">Precio: ${product.price}</p>
                <button className="details-button" onClick={() => onProductSelect(product.id)}>
                    Ver Detalles
                </button>
                <button className="add-to-cart-button" onClick={() => addToCart(product)}>
                    Añadir al Carrito
                </button>
            </div>
            )))}
        </div>
    );
}

export default ProductList;
