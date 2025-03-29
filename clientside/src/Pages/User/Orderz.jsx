import React, { useEffect, useState } from 'react'
import { usePass } from '../../Context/lakeContext';
import axios from 'axios';
import { BsBoxSeamFill } from "react-icons/bs";
import './Orderz.css'
import { FaArrowLeft } from 'react-icons/fa';

const Orderz = ({ handleBackToMenu }) => {
  const [data, setData] = useState([]);
  const {pass} = usePass();

  const getOrders= async() => {
    const {data} = await axios.post('/api/order/user_orders',{});
    setData(data.data);
    console.log(data.data);

  }

  useEffect(()=>{
    if(pass.token) {
      getOrders();
    }
  }, [pass.token])

  return (
    <div className='flex flex-col gap-2 overflow-x-auto scrollbar p-2'>
      <div className='w-full flex items-center gap-1 pl-4'>
        <div onClick={ handleBackToMenu } className='p-2 active:bg-orange-300 rounded-full border sm:hidden '>
          <FaArrowLeft className='text-slate-500'/>
        </div>
        <h2 className='text-slate-500 font-semibold'>My Orders</h2>
      </div>
      <div className='w-full flex flex-col gap-2'>
        {
          data.map((o, i)=>{
            return(
              <table className='max-md:w-[1000px] md:w-full' key={i}>
                <thead>
                  <tr>
                    <td>#</td>
                    <td>Orders</td>
                    <td>Products</td>
                    <td>Amount</td>
                    <td>Quantity</td>
                    <td>Payment</td>
                    <td>Status</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>{i + 1}</b></td>
                    <td ><div className='img flex justify-center'><BsBoxSeamFill /></div></td>
                    <td>{o.products.map((p, i)=> {
                      if(i === o.products.length-1) {
                        return p.product_name + " x " + p.quantity
                      } else {
                        return p.product_name + " x " + p.quantity + " , "
                      }
                    })}</td>
                    <td className='max-sm:text-sm'>${o.amount}</td>
                    <td className='max-sm:text-sm'>{o.products.length}</td>
                    <td className='max-sm:text-sm'><p><span className={o.payment.success? "text-green-500":"text-red-500"}>&#x25cf;</span>{o.payment.success? "Success":"failed"}</p></td>
                    <td className='max-sm:text-sm w-20'><p><span className={o.payment.success? "text-green-500":"text-red-500"}>&#x25cf;</span> <b>{o.status}</b></p></td>
                    <td className='max-sm:text-sm'><button onClick={getOrders}>Track</button></td>
                  </tr>
                </tbody>
              </table>
            )
          })
        }
      </div>
    </div>
  )
}

export default Orderz