import { parse } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart
    // const totalPrice = cart.reduce((total, prd) => total + prd.price, 0)
    let total = 0;
    for(let i=0; i<cart.length; i++){
        const product = cart[i];
        total = total + product.price * product.quantity;
        debugger       
    }
    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }
    const tax = (total / 10).toFixed(2);//using toFixed for 2 digit after decimal, Remove toFixed then i mean it, When we use to fixed then its convert into string and then we use Number();
    const grandTotal = (total + shipping + Number(tax)).toFixed(2)//useing Nuber for convert string to Number 

    //this function use for solving total amount of number figure
    const formatNumber = num =>{
        const precision = num.toFixed(2);
        return Number(precision)
    }
    
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Orderd: {cart.length}</p>
            <p>Product Price: {formatNumber(total)}</p>
            <p><small>Shipping: {shipping}</small></p>
            <p><small>Tax + VAT: {tax}</small></p>
            <p>Total : {grandTotal}</p>
            <Link to="/review"><button className="main-button">Order Review</button></Link>
        </div> 
    );
};

export default Cart;