import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/log.png'
import './Header.css'



const Header = () => {
    return (
        <div className="header">
            
                <img   src={logo}></img>
                <nav className= 'navbar'>
                    <Link to='/shop'>Shop</Link>
                    <Link to='/order-review'>Order-review</Link>
                    <Link to='/manage-inventory'>Manage Inventory</Link>
                </nav>

            </div>
    );
};

export default Header;