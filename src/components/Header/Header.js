import React, { useContext } from 'react';
import { BrowserRouter as Router, Link, NavLink, Route, Switch } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import Shop from '../Shop/Shop';
import './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className='header'>
            <img src={logo} alt="" />
            <nav>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/review">Order Review</NavLink>
                <NavLink to="/inventory">Manage Inventory</NavLink>
                {
                    loggedInUser.email ? <button onClick={() => { setLoggedInUser({}) }}>Sign out</button> :
                       <Link to="/login"> <button onClick={() => { setLoggedInUser({}) }}>Sign in</button></Link>
                }
            </nav>


        </div>
    );
};

export default Header