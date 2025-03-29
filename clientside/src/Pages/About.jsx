import React from 'react'
import Layout from '../Components/Layout'
const About = () => {
  return (
    <Layout title={'About us SHOPLAKE'}>
      <div className=' flex p-3 justify-center'>
        <div className='w-full'>
          <h1 className='font-bold text-3xl text-center max-sm:text-2xl'>WELCOME TO SHOPLAKE</h1>
          <hr  className='mt-1'/>
          <p className='text-slate-500 pt-2 text-center'>
            Lorem Ipsum is simply a dummy text of the printing and typesetting industry.
            <br /> 
            Lorem ipsum has been the industry's standard dummy text since the 1500s. 
            <br />
            When an unknown printer took a gallery of type and scrambled it to make a type specimen book.
          </p>
        </div>
        
      </div>
    </Layout>
  )
}

export default About
