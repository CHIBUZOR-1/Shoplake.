import React, { useCallback } from 'react'
import { FaStar } from "react-icons/fa6";
import { FaStarHalfStroke } from "react-icons/fa6";
import './ProductDisplay.css'
import { useState } from 'react';
import { usePass } from '../../Context/lakeContext';
import { toast } from 'react-toastify';
const ProductDisplay = ({product}) => {
    const {addToCart} = usePass();
    const [zoomy, setZoomy] = useState({
        x: 0,
        y: 0
    });

    const [zoomImg, setZoomImg] = useState(false);

    const handleZoom = useCallback((e) => {
        setZoomImg(true)
        const { left, top, width, height } = e.target.getBoundingClientRect()
        console.log("cords",left, top, width, height)

        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height

        setZoomy({
            x,
            y
        })
    },[zoomy])

    const handleZoomOut = () => {
        setZoomImg(false)
    }


  return (
        <div className='flex max-md:flex max-md:flex-col'>
            <div className='display-left'>
                <div className='grid grid-cols-1 max-md:grid-cols-4'>
                    <img src={`/images/${product.image}`} className='h-28 w-32 max-md:w-full' alt="" />
                    <img src={`/images/${product.image}`} className='h-28 w-32 max-md:w-full' alt="" />
                    <img src={`/images/${product.image}`} className='h-28 w-32 max-md:w-full' alt="" />
                    <img src={`/images/${product.image}`} className='h-28 w-32 max-md:w-full' alt="" />
                </div>
                <div className='relative w-[100%]'>
                  <img className='main-img' src={`/images/${product.image}`} alt="" onMouseMove={handleZoom} onMouseLeave={handleZoomOut}/>
                  {
                    zoomImg && (
                      <div className='display-img1'>
                        <div className='img22' style={{backgroundImage: `url(${`/images/${product.image}`})`, backgroundRepeat: 'no-repeat', backgroundPosition:`${zoomy.x * 100}% ${zoomy.y * 100}%`}}></div>
                      </div>  
                    )
                  }
                  
                </div>
                
            </div>
            <div className='display-right'>
                <h1>{product.product_name}</h1>
                <p style={{fontWeight: '400'}}>{product.brand_name}</p>
                <div className='flex gap-1 items-center'>
                    <FaStar className='star'/>
                    <FaStar className='star'/>
                    <FaStar className='star'/>
                    <FaStar className='star'/>
                    <FaStarHalfStroke className='star'/>
                    <b className='flex items-center'> (122)</b>
                </div>
                <div className='prices'>
                    <div className='oldprice'>${product.old_price?.toLocaleString()}</div>
                    <div className='newprice'>${product.new_price?.toLocaleString()}</div>
                </div>
                <div>
                    <button onClick={()=> {addToCart(product._id); toast.success('Added to cart')} }>ADD TO CART</button>
                </div>
            </div>
        </div>
  )
}

export default ProductDisplay