import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import  './Shop.css';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {   
    // const firstTen = fakeData.slice(0,10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch('http://localhost:4000/products')
        .then(res => res.json())
        .then(result => setProducts(result))
    },[])
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
    },[])

     
    const handleAddProduct = (product) =>{
        const toBeAddedKey = product.key
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey)
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter( pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct]
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product]
        }
        
        setCart(newCart)
        
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="twin-container">
           <div className="product-container">
                {
                    products.map(pd => <Product
                        showAddToCart={true}                        
                        key={pd.key}
                        handleAddProduct={handleAddProduct}
                        product={pd}                     
                    />)
                }
                
           </div>
           <div className="cart-container">
               <Cart cart={cart}>
                <Link to="/review"><button className="main-button">Order Review</button></Link>
               </Cart>
           </div>
        </div>
    );
};

export default Shop;