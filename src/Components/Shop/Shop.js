import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

const Shop = () => {
    const firs10 = fakeData.slice(0,10);

    const [product, setProduct]= useState(firs10);

    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) => {
        const sameProduct= cart.find(pd => pd.key === product.key);
        let count= 1;
        let newCart;
        if(sameProduct){
            count= sameProduct.quantity + 1;
            sameProduct.quantity= count;
            const otherProduct= cart.filter(pd => pd.key !== product.key);
             newCart= [...otherProduct, sameProduct];
            
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product ];
        }
        setCart(newCart)  // handleAddProduct e click kore item add korar jonno setCart er modde newCart parmeter hisabe deya hoise// 
        
        

        addToDatabaseCart(product.key, count); //utilities theke database e add korar function ta add korsi
       
    }
    // module no 38-5, database er cart e j sokol product add kora hoise segula theke product key er maddome product gula ber kortesi
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKeys=>{
            const product = fakeData.find(pd=> pd.key ===existingKeys);
            product.quantity = savedCart[existingKeys];
            console.log(product.quantity)
            return product;
        } )
        setCart(previousCart)
        
     
    },[])
    
    

    return (
        <div className='twin-container'>
            <div className='product-container'>
                {
                    product.map(pd=><Product 
                        ShowAddCart= {true}
                        key={pd.key}
                        handleAddProduct = {handleAddProduct}
                        product={pd}>

                        </Product>)
                }
            </div>
            <Cart cart = {cart}>
            <Link to="/order-review">
                    <button className='main-button'> 
                        <FontAwesomeIcon icon={faShoppingCart} />   
                                Review Order
                    </button>
                </Link>
            </Cart>
            
        </div>
    );
};

export default Shop;