import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import  './Shop.css';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager';

const Shop = () => {   
    const firstTen = fakeData.slice(0,10);
    const [products, setProducts] = useState(firstTen);
    
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map( existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product
        })
        
        setCart(previousCart)
    },[])

    const [cart, setCart] = useState([]) 
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
               <Cart cart={cart}/>
           </div>
        </div>
    );
};

export default Shop;