import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrums = ({product}) => {
  return (
    <div className='flex px-2'>
      <p className='max-md:text-sm'><Link className='max-md:text-xs' to='/'>HOME</Link> &gt; {product.category} &gt; {product.sub_category} &gt; {product.brand_name}</p>
    </div>
  )
}

export default Breadcrums