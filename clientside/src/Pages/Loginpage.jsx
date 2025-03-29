import React, { useState } from 'react'
import Layout from '../Components/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { usePass } from '../Context/lakeContext'
import axios from 'axios';

const Loginpage = () => {
    const navigate = useNavigate();
    const {pass, setPass} = usePass();
    
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    
    const handleChange = ({target}) => {
        const {name, value} = target;
        setData((preve) => ({
            ...preve,
            [name]: value
        }));
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        const response = await axios.post('/api/user/login', data);
        if(response.data.success) {
            toast.success(response.data.message);
            navigate('/');
            setPass({
                ...pass,
                user: response.data.user,
                token: response.data.token
            });
            localStorage.setItem("pass", JSON.stringify(response.data));
        }

        if(!response.data.success) {
            toast.error(response.data.message);
        }


    }
  return (
    <Layout title={'SHOPLAKE Login'}>
        <div className=' flex justify-center items-center'>
            <div className='border p-3 flex flex-col items-center max-md:w-[80%] justify-center rounded-md md:w-[50%]'>
                <h2 className='font-bold text-2xl'>LOGIN</h2>
                <form className='flex flex-col w-full justify-center gap-2' onSubmit={handleSubmit}>
                    <div className='ms'>
                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <br />
                        <input name='email' value={data.email} type='email' className='p-1 border border-slate-300 w-full outline-lime-300 rounded-md' id='email' onChange={handleChange} />
                    </div>
                    <div className='ms'>
                        <label htmlFor='password'>
                            <strong>Password</strong>
                        </label>
                        <br />
                        <input name='password' value={data.password} className='p-1 border border-slate-300 outline-lime-300 w-full rounded-md' type='password' id='password' onChange={handleChange} />
                    </div>
                    <div className='ml-auto'>
                        <Link className='text-blue-500 hover:underline' to={'/Reset Password'}><p>Forgot Password?</p></Link>
                    </div>
                    <div className='w-full flex items-center justify-center p-1'>
                        <button className='p-2 bg-orange-500 rounded-md w-[70%] text-white font-semibold' type='submit'>Login</button>
                    </div>
                    <div className='flex items-center justify-center'>
                        <p className='text-slate-400'>Don't have an account? <span className='text-blue-500'><Link to='/Register' style={{ textDecoration: 'none '}}>Register</Link></span></p>
                    </div>
                </form>
                
            </div>

       </div>
    </Layout>
    
  )
}

export default Loginpage