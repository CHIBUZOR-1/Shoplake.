import React from 'react'
import './ProductItem.css'
const ProductItem = (props) => {
  return (
    <div onClick={()=>window.scrollTo(0,0)} className='w-full flex flex-col items-center'>
      <div className='h-full'>
        <img className='h-[80%] object-scale-down' src={props.image} alt=''/>
      </div>
      <div>
        <p className='line-clamp-1 max-sm:text-xs'>{props.name}</p>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <div className='font-semibold max-sm:text-sm  text-red-500'> 
          ${props.new_price}
        </div>
        <div className='  max-sm:text-sm text-slate-400 line-through font-semibold'>
          ${props.old_price}
        </div>    
      </div>    
    </div>
  )
}

export default ProductItem