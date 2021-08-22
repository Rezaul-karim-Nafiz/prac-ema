import React, { useState } from 'react';
import './Shipment.css'
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useForm } from 'react-hook-form';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
const Shipment = () => {
    const { register, handleSubmit, watch, formState: {errors} } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  
  const onSubmit = data => {
      console.log('form submitted', data)
      const saveCart = getDatabaseCart();
      const orderDetails = {...loggedInUser, products: saveCart, Shipment: data, orderTime: new Date()}
      fetch('http://localhost:4000/addOrder',{
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(orderDetails)
      })
      .then(res => res.json())
      .then(result => {
        if (result) {
          processOrder()
          alert('order successfully done')
        }
      })
      .catch(error => console.log(error))
      
    };

  return (
    <>
      <h1>shipment</h1>
      
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                <input name="name" defaultValue={loggedInUser.name} {...register('name',{required: true})} placeholder="Your Name" />
                {errors.name && <span className="error">Name is required</span>}

                <input name="email" defaultValue={loggedInUser.email} {...register('email',{ required: true })} placeholder="Your Email" />
                {errors.email && <span className="error">Email is required</span>}

                <input name="address" {...register('address',{ required: true })} placeholder="Your Address" />
                {errors.address && <span className="error">Address is required</span>}

                <input name="phone" {...register('phone',{ required: true })} placeholder="Your Phone Number" />
                {errors.phone && <span className="error">Phone Number is required</span>}

                <input type="submit" />
            </form>
    </>
  );
};

export default Shipment;