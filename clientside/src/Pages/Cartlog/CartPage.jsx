import React  from 'react'
import Layout from '../../Components/Layout'
import { usePass } from '../../Context/lakeContext'
import { AiTwotoneDelete } from "react-icons/ai";
import './CartPage.css'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const CartPage = () => {
  const {CartItems, list, removeFromCart, getTotalCartAmount } = usePass();
 
  return (
    <Layout title={"Cart-Page SHOPLAKE"}>
        <div className='cart-items'>
          <div className="cart-title">
            <div className='w-full max-md:overflow-x-auto scrollbar'>
              <table className='cart-table'>
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
                            <td><button className='flex items-center justify-center' onClick={()=>{removeFromCart(p._id); toast.success('Removed from Cart')}}><AiTwotoneDelete /></button></td>
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
                <Link to="/order"><button>CHECKOUT</button></Link>
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