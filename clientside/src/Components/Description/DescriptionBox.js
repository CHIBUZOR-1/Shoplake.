import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = ({product}) => {
  return (
    <div className='desc'>
      <div className='desc-nav'>
        <div className='dnbox'>Description</div>
        <div className='dnbox'>Reviews</div>
      </div>
      <div className='descy'>
        <p>Product Details</p>
        <p className='pd'>{product.description}</p>
      </div>
    </div>
  )
}

export default DescriptionBox