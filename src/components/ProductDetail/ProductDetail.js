import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({})
    useEffect(() => {
        fetch('http://localhost:4000/product/' + productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[productKey])
    // const product = fakeData.find(pd => pd.key === productKey);
    
    return (
        <div>
            <h2>{productKey} our product detail</h2>
            <Product showAddToCart={false} product={product}/>
        </div>
    );
};

export default ProductDetail;
