import React, { useState } from 'react'
import { usePass } from '../../Context/lakeContext';
import Avatarz from '../../Components/Avatarz';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCamera } from 'react-icons/fa';
import axios from 'axios';

const AdminProfile = ({ handleBackToMenu }) => {
    const { pass } = usePass();
    const [isModal, setIsModal] = useState(false);
    const [load, setLoad]= useState(false);
    const [load1, setLoad1] = useState(false);
    const navigate = useNavigate();
    const [newInfo, setNewInfo] = useState({
        first: pass?.user?.name,
        last: pass?.user?.lastname,
        eml: pass?.user?.email,
        uname: pass?.user?.phoneNumber
    
    });

    const showModal = () => {
        setIsModal(true);
      };
      const handleCancel = () => {
        setIsModal(false);
      };
      const handleChange1 = (e)=> {
        setNewInfo({ ...newInfo, [e.target.name]: e.target.value });
    
    }

    const handleUpdate1 = async()=> {
        setLoad(true)
        const {data} = await axios.put(`/api/users/update-profile`, newInfo)
        if(data.success) {
          setLoad(false)
        }
    }
    console.log(pass)
  return (
    <div className='w-full h-screen flex-col flex gap-2 bg-slate-50 dark:bg-facebookDark-300 p-1'>
        <div className='w-full flex items-center gap-1 pl-4'>
            <div onClick={ handleBackToMenu } className='p-2 active:bg-orange-300 rounded-full border sm:hidden '>
                <FaArrowLeft className='text-slate-500'/>
            </div>
            <h1 className='text-2xl text-slat items-center justify-centere-500'>My Profile</h1>
        </div>
      <div className='flex items-center justify-center'>
        <div className='border-[3px] relative border-facebookDark-700 w-fit rounded-full'>
          <Avatarz height={225}  width={225} />
          <div onClick={showModal} className={`absolute hover hover:text-slate-50 hover:bg-facebookDark-300 cursor-pointer rounded-full w-8 h-8 bottom-1 p-2 bg-slate-200 flex items-center justify-center right-6 shadow`}><FaCamera /></div>
        </div>
      </div>
      <div className=' w-full flex flex-col gap-2'>
      <div className='w-full flex items-center justify-center gap-2'>
          <p className='font-semibold text-slate-600 '>Firstname</p>
          <input type="text" name='first' value={newInfo?.first} onChange={handleChange1} className='w-full rounded-md font-semibold bg-slate-200 p-1 border border-slate-400' />
        </div>
        <div className='w-full flex items-center justify-center gap-2'>
          <p className='font-semibold text-slate-600 '>Lastname</p>
          <input type="text" name='last' value={newInfo?.last} onChange={handleChange1} className='w-full rounded-md font-semibold bg-slate-200 p-1 border border-slate-400' />
        </div>
        <div className='w-full flex items-center justify-center gap-2'>
          <p className='font-semibold text-slate-600 '>Email</p>
          <input type="email" name='eml' value={newInfo?.eml} onChange={handleChange1} className='w-full rounded-md font-semibold bg-slate-200 p-1 border border-slate-400' />
        </div>
        <div className='w-full flex items-center justify-center gap-2'>
          <p className='font-semibold text-slate-600 '>Username</p>
          <input type="text" name='uname' value={newInfo?.uname} onChange={handleChange1} className='w-full rounded-md font-semibold bg-slate-200 p-1 border border-slate-400' />
        </div>
        <div className='w-full flex items-center justify-center'>
          <button onClick={handleUpdate1} className={`w-[80%] ${load && 'animate-pulse'} dark:border active:bg-orange-500 bg-green-600 p-2 rounded-md text-slate-100 bg-facebookDark-400`}>{load? 'updating...':'Update'}</button>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile