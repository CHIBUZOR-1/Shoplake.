import React, { useRef, useState } from 'react'
import './Card1.css'
import axios from 'axios';
import { useEffect } from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';

const Card1 = ({gt_category, heading}) => {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(false);

    const scrollElement = useRef();

    useEffect(()=> {
        getBySubCategory()
        // eslint-disable-next-line
    }, [])

    const scrollRight = ()=> {
        scrollElement.current.scrollLeft += 400;
    }
    const scrollLeft = ()=> {
        scrollElement.current.scrollLeft -= 400;
    }
    const scrollRight1 = ()=> {
        scrollElement.current.scrollLeft += 200;
    }
    const scrollLeft1 = ()=> {
        scrollElement.current.scrollLeft -= 200;
    }

    const getBySubCategory = async() => {
        setLoad(true);
        const resp = await axios.post('/api/product/card_category', { gt_category });

        if(resp.data.success) {
            setData(resp.data.data);
            setLoad(false);
        }
    }
  return (
    <div className='card_top px-3 mb-2'>
        <p className='card_ps'>{heading}</p>
        <div className='relative'>
            <div className='flex items-center overflow-hidden gap-2' ref={scrollElement}>
                    <button className='absolute max-sm:hidden flex items-center justify-center bg-slate-50 rounded-full p-1 h-9 w-9 left-0'onClick={scrollLeft}>
                        <FaAngleLeft />
                    </button>
                    <button className='absolute max-sm:hidden flex items-center justify-center bg-slate-50 rounded-full p-1 h-9 w-9 right-0' onClick={scrollRight}>
                        <FaAngleRight />
                    </button> 
                    <button className='absolute sm:hidden flex items-center justify-center bg-slate-50 rounded-full p-1 h-9 w-9 left-0'onClick={scrollLeft}>
                        <FaAngleLeft />
                    </button>
                    <button className='absolute sm:hidden flex items-center justify-center bg-slate-50 rounded-full p-1 h-9 w-9 right-0' onClick={scrollRight}>
                        <FaAngleRight />
                    </button> 
                {
                    load && (
                        <div className=' w-full flex justify-center pt-11'>
                            <ReactLoading type='bars' color='orange'/>
                        </div>
                    )
                }
                
                {
                    data.length > 0 && !load && (
                        data.map((prod, i)=> {
                            return(
                                <Link key={i}  to={`/product/${prod._id}`} >
                                    <div className='w-52 max-sm:w-44 flex flex-col items-center'>
                                        <div className='h-full'>
                                            <img className='h-[80%] max-sm:h-[50%] object-scale-down' src={`/images/${prod.image}`} alt=''/>
                                        </div>
                                        <div>
                                            <p className='line-clamp-1 max-sm:text-sm'>{prod?.product_name}</p>
                                        </div>
                                        <div className='flex items-center justify-center gap-2'>
                                            <div className='font-semibold max-sm:text-sm  text-red-500'> 
                                            ${prod.new_price.toLocaleString()}
                                            </div>
                                            <div className='  max-sm:text-sm text-slate-400 line-through font-semibold'>
                                            ${prod.old_price.toLocaleString()}
                                            </div>    
                                        </div>  
                                    </div>
                                    
                                </Link>
                            )
                        })
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Card1