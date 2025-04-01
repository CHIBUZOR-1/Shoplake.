import React, { useState } from 'react'
import Layout from '../Components/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
const Registerpage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        lastname: "",
        phoneNumber: "",
        email: "",
        answer: "",
        password: "",
        confirmPassword: ""
    });
    
    const handleChange = ({target}) => {
        const {name, value} = target;
        setData((preve) => ({
            ...preve,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(data.confirmPassword === data.password) {
            const response =await axios.post('/api/user/register', data);
            if(response.data.success) {
                toast.success(response.data.message);
                navigate('/Login');   
            }

            if(!response.data.success) {
                toast.error(response.data.message);
            }
            
     } else {
        toast.error("Pasword Mismatch!");
     }
    }


  return (
    <Layout title={'SHOPLAKE Register'}>
      <div className='w-full flex-col gap-2 h-full flex p-2 items-center justify-center'>
             
            <div className='w-[70%] max-sm:w-[90%] border border-slate-200 rounded-md'>
                <h1 className='text-2xl font-semibold text-center'>Register</h1>
                <form className='flex flex-col gap-2 p-2 justify-center' onSubmit={handleSubmit}>
                    <div className='flex gap-1 w-full justify-center items-center'>
                        <input name='name' value={data.name} type='text' placeholder='firstname..' className='w-full border p-2 border-slate-200 rounded-md outline-green-500' onChange={handleChange} required/>
                        <input name='lastname' value={data.lastname} type='text' placeholder='Lastname..' className='w-full border p-2 border-slate-200 rounded-md outline-green-500' onChange={handleChange} required/>
                    </div>
                    <input className='w-full border p-2 border-slate-200 rounded-md outline-green-500' name='phoneNumber' value={data.phoneNumber} type='text' placeholder='Phone number' onChange={handleChange} required/>
                    <input className='w-full border p-2 border-slate-200 rounded-md outline-green-500' name='email' value={data.email} type='email' placeholder='Email..'  onChange={handleChange} required/>
                    <input className='w-full border p-2 border-slate-200 rounded-md outline-green-500' name='answer' value={data.answer} type='text' placeholder='Secret word..' id='answer' onChange={handleChange} required/>
                    <input className='w-full border p-2 border-slate-200 rounded-md outline-green-500' name='password' value={data.password} type='password' placeholder='Password..' id='password' onChange={handleChange} required/>
                    <input className='w-full border p-2 border-slate-200 rounded-md outline-green-500' name='confirmPassword' value={data.confirmPassword} type='password' placeholder='Confirm password' id='Confirm password' onChange={handleChange} required/>
                    <div className='w-full flex items-center justify-center'>
                        <button type='submit' className='bg-orange-500 active:bg-orange-800 font-semibold rounded-md text-white p-2 w-[70%]'>Register</button>
                    </div>
                    <div className='flex items-center justify-center'>
                        <p className='text-slate-400'>Already Have an account? <span className='text-blue-500 hover:underline'><Link to='/Login'>Login</Link></span></p>
                    </div>
                </form>
                
            </div>

       </div>
    </Layout>
  )
}

export default Registerpage;