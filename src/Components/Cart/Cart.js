import React from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart= props.cart;
    const totals = cart.reduce((total, prd)=> total + prd.price *prd.quantity,0)
    let shipping = 0;
    if (totals < 0){
        shipping= 10;
    }
    else if(totals > 10){
        shipping= 3;
    }
   
    const tax = Math.round(totals/10);

    return (
        <div className='cart-container'>
                <h3 className='bg-danger'>this is cart</h3>
                <h5>Item Number {cart.length}</h5>
                <p><small>Shipping Cost : ${shipping}</small></p>
                <p><small>tax : {tax}</small></p>
                <h4>Total {totals + shipping + tax}</h4>
                <br/>
                <br/>
               {
                   props.children
               }


            </div>
    );
};

export default Cart;