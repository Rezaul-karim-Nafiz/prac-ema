import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
const Review = () => {
    const [cart, setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false)

    const history = useHistory()

    const handleProceedCheckOut = () =>{
        history.push('/shipment')
        // setCart([]);
        // setOrderPlaced(true)
        // processOrder();
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter( pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('http://localhost:4000/productsByKeys',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
        // const cartProducts = productKeys.map(key => {
        //     const product = fakeData.find(pd => pd.key === key)
        //     product.quantity = savedCart[key];
        //     return product
        // });
        // setCart(cartProducts)
    },[])
    
    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt="" />;
    } 
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
                {thankYou}                  
                
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckOut} className="main-button">proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
