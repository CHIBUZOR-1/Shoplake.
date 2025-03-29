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
    <Layout title={"SHOPLAKE- Password reset"}>
        <div className='logins'>
            <div className='login-container'>
                <h2>RESET PASSWORD</h2>
                <form className='Sign-form' onSubmit={handleSubmit}>
                    <div className='ms'>
                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <br />
                        <input name='email' value={data.email} type='email' placeholder='input Email'id='email' onChange={handleChange} />
                    </div>
                    <br />
                    <div>
                        <label htmlFor='answer'>
                            <strong>Your Favourite Word</strong>
                        </label>
                        <br />
                        <input name='answer' value={data.answer} type='text' placeholder='input favorite word' id='answer' onChange={handleChange} required/>
                    </div>
                    <br />
                    <div className='ms'>
                        <label htmlFor='newPassword'>
                            <strong>New Password</strong>
                        </label>
                        <br />
                        <input name='newPassword' value={data.newPassword}type='password' placeholder='input Password'id='newPassword' onChange={handleChange} />
                    </div>
                    <br />
                    <div className='ms'>
                        <label htmlFor='confirmNewPassword'>
                            <strong>Confirm New Password</strong>
                        </label>
                        <br />
                        <input name='confirmNewPassword' value={data.confirmNewPassword}type='password' placeholder='input Password'id='confirmNewPassword' onChange={handleChange} />
                    </div>
                    <br />
                    <div>
                        <button type='submit'>RESET</button>
                    </div>
                </form>
                
            </div>

       </div>
    </Layout>
    
  )
}

export default Forgotpassword