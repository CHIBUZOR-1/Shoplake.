import React from 'react'
import { usePass } from '../../Context/lakeContext'
import './Profile.css'
import { FaArrowLeft } from 'react-icons/fa';

const Profile = ({ handleBackToMenu }) => {
    const {pass} = usePass();
  return (
    <div className='w-full p-2 flex flex-col gap-1'>
      <div className='w-full flex items-center gap-1 pl-4'>
        <div onClick={ handleBackToMenu } className='p-2 active:bg-orange-300 rounded-full border sm:hidden '>
          <FaArrowLeft className='text-slate-500'/>
        </div>
        <h2 className='acf'>ACCOUNT OVERVIEW</h2>
      </div>
      
      <hr />
        <div className='acr flex flex-col gap-2'>
            <p className='p-2 rounded-md border border-slate-200'>FIRST NAME: <span className='font-semibold text-slate-500'>{pass.user.name}</span></p>
            <p className='p-2 rounded-md border border-slate-200'>LAST NAME: <span className='font-semibold text-slate-500'>{pass.user.lastname}</span></p>
            <p className='p-2 rounded-md border border-slate-200'>EMAIL: <span className='font-semibold text-slate-500'>{pass.user.email}</span></p>
            <p className='p-2 rounded-md border border-slate-200'>Phone: <span className='font-semibold text-slate-500'>{pass.user.phoneNumber}</span></p>
        </div>
    </div>
  )
}
 
export default Profile