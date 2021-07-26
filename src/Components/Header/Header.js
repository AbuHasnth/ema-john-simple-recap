import React from 'react';
import logo from '../../images/log.png'
import './Header.css'



const Header = () => {
    return (
        <div className="header">
            
                <img   src={logo}></img>
                <nav className= 'navbar'>
                    <a href='/shop'>Shop</a>
                    <a href='/order-review'>Order-review</a>
                    <a href='/manage-inventory'>Manage Inventory</a>
                </nav>

            </div>
    );
};

export default Header;