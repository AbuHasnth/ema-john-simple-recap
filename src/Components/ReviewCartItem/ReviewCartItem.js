import React from 'react';

const ReviewCartItem = (props) => {

    const product= props.product;
    const {key,price,quantity}= product;
    const reviewStyle= {
        borderBottom:'2px solid lightgray',
        marginBottom : '10px',
        color: 'blue'
    }
    const buttonStyle= {
        backgroundColor: 'goldenrod',
        height: '30px',
        weight: '200px',
        borderRadius: '5px',
        padding: '5px',
        border: '1px solid lightgray',
        cursor: 'pointer'
    }
    return (
        <div style={reviewStyle}className='review-item'>
            <h3 className='product-name'>{product.name}</h3>
            <h4>Quantity {quantity}</h4>
            <p><small>${price}</small></p>
            <br />
            <button onClick={() => props.removeProduct(key)} style={buttonStyle} className='main-button'>Remove Item</button>
        </div>
    );
};

export default ReviewCartItem;