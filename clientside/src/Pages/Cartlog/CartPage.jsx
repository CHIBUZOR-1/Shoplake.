import React  from 'react'
import Layout from '../../Components/Layout'
import { usePass } from '../../Context/lakeContext'
import { AiTwotoneDelete } from "react-icons/ai";
import './CartPage.css'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const CartPage = () => {
  const {CartItems, list, removeFromCart, getTotalCartAmount, getTotalCartItems } = usePass();
  const q = getTotalCartItems();
 
  return (
    <Layout title={"Cart-Page SHOPLAKE"}>
        <div className='flex m-auto p-4'>
          <div className="cart-title">
            <div className={`${ q > 0 && 'hidden'} flex w-full items-center justify-center p-1`}>
              <p className='text-3xl font-semibold text-slate-400'>No Items In Cart</p>
            </div>
            <div className={`${q === 0 && 'hidden'} w-full max-md:overflow-x-auto scrollbar`}>
              <table className={`cart-table`}>
                <thead>
                  <tr className='tr'>
                    <td>Products</td>
                    <td>Title</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>Total</td>
                    <td>Remove</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    list.map((p)=> {
                      if(CartItems[p._id] > 0) {
                        return (
                          <tr key={p._id} className='tr'>
                            <td><img src={`/images/${p.image}`} alt="" /></td>
                            <td><p className='max-sm:text-sm text-center text-ellipsis line-clamp-3'>{p.product_name}</p></td>
                            <td>${p?.new_price.toLocaleString()}</td>
                            <td>{CartItems[p._id]}</td>
                            <td>${(p?.new_price * CartItems[p._id]).toLocaleString()}</td>
                            <td ><div className='flex justify-center p-1'><button className='flex items-center justify-center' onClick={()=>{removeFromCart(p._id); toast.success('Removed from Cart')}}><AiTwotoneDelete /></button></div></td>
                          </tr>
                        )
                      }
                      return null;
                    })
                  }
                </tbody>
              </table>
            </div>
            
            <div className='ft'>
              <div className='summary'>
                <h3>Summary</h3>
                <div>
                  <div className='summaries'>
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount().toLocaleString()}</p>
                  </div>
                  <hr/>
                  <div className='summaries'>
                    <p>Delivery Fee</p>
                    <p>${getTotalCartAmount()===0?0:500}</p>
                  </div>
                  <hr/>
                  <div className='summaries'>
                    <p>Total</p>
                    <p>${getTotalCartAmount()===0?0:(getTotalCartAmount() + 500).toLocaleString()}</p>
                  </div>
                  <hr/>
                </div>
                <Link to="/order"><button className={`${q === 0 && "bg-orange-200 text-slate-500 active:bg-orange-200"} w-[40%] font-semibold text-slate-50  bg-orange-500 p-2 rounded-md active:bg-cyan-300`} disabled={q === 0}>CHECKOUT</button></Link>
              </div>
              <div className='promo-section'>
                <div>
                  <p>Enter Promo code here:</p>
                  <div className='promo-input'>
                    <input type="text" placeholder='promo code'/>
                    <button className='promo-btn'>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Layout>
    
  )
}

export default CartPage