import React from 'react'
import { AiOutlineFacebook } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className='flex flex-col text-slate-50 gap-2 bg-stone-800 p-4'>
      <div className='flex gap-1 max-md:flex-col max-md:gap-2'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-green-400 font-semibold'>SHOPLAKE.</h2>
          <p className='max-sm:text-sm'>Lorem Ipsum is simply a dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text since the 1500s. When an unknown printer took a gallery of type and scrambled it to make a type specimen book.</p>
          <div className='flex gap-1 items-center'>
            <AiOutlineFacebook className='text-blue-600' />
            <BsTwitterX />
            <FaLinkedin />
          </div>
        </div>
        <div className='flex gap-2 justify-between w-full'>
          <div className='flex flex-col'>
            <h2 className='text-orange-400 font-semibold'>COMPANY</h2>
            <ul>
              <li className='max-sm:text-sm'><Link style={{ textDecoration: 'none', color: 'inherit'}} to='/'>HOME</Link></li>
              <li className='max-sm:text-sm'><Link style={{ textDecoration: 'none', color: 'inherit'}} to='/About'>ABOUT US</Link></li>
              <li className='max-sm:text-sm'>DELIVERY</li>
              <li className='max-sm:text-sm'>PRIVACY POLICY</li>
            </ul>
          </div>
          <div className='fright'>
            <h2 className='text-orange-400 font-semibold'>GET IN TOUCH</h2>
            <ul>
              <li>(+234) 0709090090</li>
              <li>contact@shoplake.com</li>
            </ul>
          </div>
        </div>
        
      </div>
      <hr />
      <p className='text-center max-sm:text-xs'>Copyright 2024  &copy;  Shoplake.com - All Right Reserved</p>
    </div>
  )
}

export default Footer