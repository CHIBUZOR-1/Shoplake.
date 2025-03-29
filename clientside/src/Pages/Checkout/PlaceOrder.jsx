import Layout from '../../Components/Layout'
import React, { useEffect, useRef, useState } from 'react'
import { usePass } from '../../Context/lakeContext'
import './PlaceOrder.css'
import DropIn from 'braintree-web-drop-in-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const PlaceOrder = () => {
    const navigate = useNavigate();
    const dropRef = useRef();
    const {getTotalCartAmount, CartItems, list, pass} = usePass();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [datas, setDatas] = useState({
        firstname: "",
        lastname: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const getToken = async() => {
        try {
            const {data} = await axios.get('/api/order/braintree/token');
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error);
        }
    }

    


    useEffect(()=> {
        getToken()
        // eslint-disable-next-line
    }, [pass?.token]);

    const handleChange = ({target}) => {
        const {name, value} = target;
        setDatas((preve)=> ({
            ...preve,
            [name]: value
        }));
    }

    const handlePayment = async(event) => {
        try {
            event.preventDefault();
            const {nonce} = await instance.requestPaymentMethod();
            let cart = [];
            list.map((item) => {
                if(CartItems[item._id]>0) {
                    let itemInfo = item;
                    itemInfo["quantity"] = CartItems[item._id];
                    cart.push(itemInfo);
                    
                }
                console.log(cart)
                return null;
            })
            console.log(cart);
            let orderData = {
                nonce,
                cart,
                address: datas,
                amount: getTotalCartAmount() + 500
            }
            const {data} = await axios.post('/api/order/braintree/payment', orderData);
            navigate('/dashboard/user/orders')
            toast.success('Payment Successfull');
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Layout title={'Order-Page'}>
        <div className='content'>
            <form className='po' onSubmit={handlePayment}>
                <div className='po-left'>
                    <p className='heading'>Delivery Information</p>
                    <div className='multi'>
                        <input name='firstname' value={datas.firstname} onChange={handleChange} required type="text" placeholder='First Name' />
                        <input name='lastname' value={datas.lastname} onChange={handleChange} required type="text" placeholder='Last Name' />
                    </div>
                    <input name='email' value={datas.email} onChange={handleChange} required type="email" placeholder='Email Address' />
                    <input name='street' value={datas.street} onChange={handleChange} required type="text" placeholder='Street' />
                    <div className='multi'>
                        <input name='city' value={datas.city} onChange={handleChange} required type="text" placeholder='City' />
                        <input name='state' value={datas.state} onChange={handleChange} required type="text" placeholder='State' />
                    </div>
                    <div className='multi'>
                        <input name='zipcode' value={datas.zipcode} onChange={handleChange} required type="text" placeholder='Zip Code' />
                        <input name='country' value={datas.country} onChange={handleChange} required type="text" placeholder='Country' />
                    </div>
                    <input name='phone' value={datas.phone} onChange={handleChange} required type="text" placeholder='Phone'/>
                </div>
                <div className='po-right'>
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
                        <div>
                            {
                                !clientToken || !pass ? ('') : (
                                    <>
                                     <DropIn ref={dropRef} options={{authorization: clientToken}} onInstance={(instance) => setInstance(instance)}/>
                                     <button type='submit' disabled={!pass.token}>MAKE PAYMENT</button> 
                                    </>
                                )
                            }
                           
                        </div>
                          
                    </div>
                </div>
            </form>
        </div>
        
    </Layout>
  )
}

export default PlaceOrder