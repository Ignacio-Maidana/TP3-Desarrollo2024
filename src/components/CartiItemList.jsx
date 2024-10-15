import React from 'react';

const CartItemList = ({ cart, removeFromCart }) => {
    return (
        <div className="cart-item-list">
        {cart.map((item) => (
            <div key={item.id} className="cart-item">
            <img className="cart-item-thumbnail" src={item.thumbnail} alt={item.title} />
            <span className="cart-item-title">{item.title}</span>
            <span className="cart-item-price">${item.price}</span>
            <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                Eliminar
            </button>
        </div>
        ))}
    </div>
    );
};

export default CartItemList;
