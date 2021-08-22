 import React from 'react';


const Inventory = () => {
    const handleAddProduct = () =>{
        const product = {}
        fetch('http://localhost:4000/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(product)
        })
    }
    return (
        <div>
            <form action="">
                <p><span>Name: </span><input type="text" /></p>
                <p><span>Price: </span><input type="text" /></p>
                <p><span>Quantity: </span><input type="text" /></p>
                <p><span>Product Image: </span><input type="file" /></p>
            </form>
            <button onClick={handleAddProduct}>Add product</button>
        </div>
    );
};

export default Inventory;