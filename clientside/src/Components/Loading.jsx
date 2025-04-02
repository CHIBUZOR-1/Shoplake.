import React from 'react'
import { assets } from './Assets/Assets'

const Loading = () => {
  return (
    <div className='h-screen flex flex-col gap-2 dark:bg-facebookDark-200 items-center justify-center'>
        <img src={assets.logo} className='h-[400px] w-[400px] rounded-md border' alt="" />
        <h2 className='text-xl font-semibold text-green-700 underline italic'>SHOPLAKE.com</h2>
    </div>
  )
}

export default Loading