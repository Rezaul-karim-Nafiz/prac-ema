import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([])

    const removeProduct = (productKey) => {
        const newCart = cart.filter( pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const prodcutKeys = Object.keys(savedCart);

        const cartProducts = prodcutKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = savedCart[key];
            return product
        });
        setCart(cartProducts)
    },[])

    return (
        <div className= "twin-container">
            <div className="product-container">
                <h1>This is Review</h1>
                {
                    cart.map( pd => <ReviewItem  
                        product = {pd}
                        key = {pd.key}
                        removeProduct = {removeProduct}
                        />)
                }
            </div>
            <div className="cart-container">
                <Cart cart = {cart}/>
            </div>
        </div>
    );
};

export default Review;
