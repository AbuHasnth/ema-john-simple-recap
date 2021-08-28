import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewCartItem from '../ReviewCartItem/ReviewCartItem';
import Cart from '../Cart/Cart';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const OrderRw = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const removeProduct = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    const history = useHistory();
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys= Object.keys(savedCart);

        const cartProducts = productKeys.map( key => {
            const product = fakeData.find( pd => pd.key === key);
            product.quantity= savedCart[key];
            return product;
        });

        setCart(cartProducts)
        
        
    },[])
    //order place korar por cart and order review theke sokol data delete korar jonno
    const handleProceedCheckout= () =>{
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
        history.push('/shipment')

    }

    let thankYou;
    if(orderPlaced){
        thankYou= <img src= {happyImage} alt=''/>
    }

    return (
        <div className='twin-container'>
                <div className='product-container'>
                    {
                    cart.map( pd => <ReviewCartItem 
                    removeProduct={removeProduct}
                    product={pd}></ReviewCartItem>)
                    }
                </div>
                {
                    thankYou
                }
                <div className='cart-container'>
                    <Cart cart={cart}>
                    <button onClick={handleProceedCheckout}> 
                        <FontAwesomeIcon icon={faShoppingCart} />   
                                Proceed Checkout
                    </button>
                    </Cart>

                </div>
               
                
        </div>
    );
};

export default OrderRw;