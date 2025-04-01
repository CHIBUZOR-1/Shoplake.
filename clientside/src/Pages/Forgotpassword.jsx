import React, { useState } from 'react'
import Layout from '../Components/Layout'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Forgotpassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
        email: "",
        answer: "",
        newPassword: "",
        confirmNewPassword: ""
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
  if(data.confirmNewPassword === data.newPassword) {
      const response =await fetch('/api/user/forgot-password', {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      const jsonResponse = await response.json();
      if(jsonResponse.success) {
          toast.success(jsonResponse.message);
          navigate('/Login');   
      }

      if(!jsonResponse.success) {
          toast.error(jsonResponse.message);
      }
  } else {
    toast.error("Pasword Mismatch!");
  }
}

  return (
    <Layout title={"SHOPLAKE- Password Reset"}>
        <div className='flex flex-col gap-2 items-center justify-center'>
            <div className='w-full flex items-center justify-center '>
                <h2 className='text-2xl font-semibold border p-1 px-1 text-green-600'>SHOPLAKE</h2>
            </div>
            <div className='border p-3 flex flex-col items-center max-md:w-[80%] justify-center rounded-md md:w-[50%]'>
                <h2 className='font-bold text-2xl'>RESET PASSWORD</h2>
                <form className='flex flex-col w-full justify-center gap-2' onSubmit={handleSubmit}>
                    <div className='ms'>
                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <br />
                        <input name='email' className='p-1 border border-slate-300 w-full outline-lime-300 rounded-md' value={data.email} type='email' id='email' onChange={handleChange} />
                    </div>
                    <br />
                    <div>
                        <label htmlFor='answer'>
                            <strong>Your Favourite Word</strong>
                        </label>
                        <br />
                        <input name='answer' className='p-1 border border-slate-300 w-full outline-lime-300 rounded-md' value={data.answer} type='text'  id='answer' onChange={handleChange} required/>
                    </div>
                    <br />
                    <div className='ms'>
                        <label htmlFor='newPassword'>
                            <strong>New Password</strong>
                        </label>
                        <br />
                        <input name='newPassword' className='p-1 border border-slate-300 w-full outline-lime-300 rounded-md' value={data.newPassword}type='password' id='newPassword' onChange={handleChange} />
                    </div>
                    <br />
                    <div className='ms'>
                        <label htmlFor='confirmNewPassword'>
                            <strong>Confirm New Password</strong>
                        </label>
                        <br />
                        <input name='confirmNewPassword' className='p-1 border border-slate-300 w-full outline-lime-300 rounded-md' value={data.confirmNewPassword}type='password' id='confirmNewPassword' onChange={handleChange} />
                    </div>
                    <br />
                    <div className='w-full flex items-center justify-center p-1'>
                        <button className='p-2 bg-orange-500 active:bg-orange-800 rounded-md w-[70%] text-white font-semibold' type='submit'>RESET</button>
                    </div>
                </form>
                
            </div>

       </div>
    </Layout>
    
  )
}

export default Forgotpassword