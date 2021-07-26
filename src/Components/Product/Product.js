import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";

const Product = (props) => {
    

    const {name, img, seller, price, stock, key} = props.product;
    

    return (
        <div className='product'> 
           <div>
               <img src={img} alt="" />
           </div>
           <div className='product-name'>
               <h2><Link to={"/product/"+key}>{name}</Link></h2>
               <p>by: {seller}</p>
               <p>${price}</p>
               <p>
                   <small>Only {stock} is left in stock - Order Soon</small>
               </p>
               {
                   props.ShowAddCart &&
                   <button 
               onClick= {() => props.handleAddProduct(props.product)}> 
               <FontAwesomeIcon icon={faShoppingCart} />   
                            Add to Cart
               </button>}
           </div>
        </div>
    );
};

export default Product;