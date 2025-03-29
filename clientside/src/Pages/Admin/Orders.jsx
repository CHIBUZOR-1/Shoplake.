import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import './Orders.css'

import { BsBoxSeamFill } from "react-icons/bs";
import { FaArrowLeft } from 'react-icons/fa';

const Orders = ({ handleBackToMenu }) => {
  const [orders, setOrders] = useState([]);

  useEffect(()=> {
    getAllOrders();
  }, []);

  const getAllOrders = async() => {
    const res = await axios.get('/api/order/all_orders');
    if(res.data.success) {
      setOrders(res.data.data);
    } else {
      toast.error("Error Occurred!")
    }
  }

  const statusHandler = async(e, orderId) => {
    const res = await axios.post('/api/order/status', {orderId, status: e.target.value});
    if(res.data.success) {
      await getAllOrders();
    }
  }

  return (
    <div className='w-full p-1'>
      <div className='w-full flex items-center gap-1 pl-4'>
        <div onClick={ handleBackToMenu } className='p-2 active:bg-orange-300 rounded-full border sm:hidden '>
          <FaArrowLeft className='text-slate-500'/>
        </div>
          <h1 className='text-2xl text-slat items-center justify-centere-500'>All Orders</h1>
      </div>
      <div className='w-full flex flex-col gap-2'>
        {
          orders.map((o, i)=>{
            return(
              <div key={i} className='eors'>
                <div className='img'><BsBoxSeamFill /></div>
                <div>
                  <p className='o-p'>{o.products.map((p, i)=> {
                    if(i === o.products.length-1) {
                      return p.product_name + " x " + p.quantity
                    } else {
                      return p.product_name + " x " + p.quantity + " , "
                    }
                  })}</p>
                  <p className='oname'>{o.address.firstname + " " + o.address.lastname}</p> 
                  <div className='oadd'>
                    <p>{o.address.state+ ","}</p>
                    <p>{o.address.city+", "+ o.address.state+", "+ o.address.country+", "+ o.address.zipcode}</p>
                  </div>
                  <p>{o.address.phone}</p>
                </div>
                <p>Items : {o.products.length}</p>
                <p>${o.amount}</p>
                <select onChange={(e)=> statusHandler(e, o._id)} value={o.status}>
                  <option value="Order Processing">Order Processing</option>
                  <option value="Order Failed">Order Failed</option>
                  <option value="Out for Shipping">Out for Shipping</option>
                  <option value="Delivered">Delivered</option>
                </select>  
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Orders