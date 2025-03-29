import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { useNavigate } from 'react-router-dom';

const Loader = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev)
    }, 1000)
    count === 0 && navigate('/Login')
    return () => clearInterval(interval)
  }, [count, navigate])
  return (
    <>
      <div className='load w-full'>
        <ReactLoading type='bars' color='red' height={100} width={50}/>
        <h1>Please Wait...</h1>
      </div>
      
    </>
    
  )
}

export default Loader
