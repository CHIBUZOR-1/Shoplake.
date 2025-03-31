import React, { useEffect, useState } from 'react'
import { assets } from '../Assets/Assets'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import './Bannerflex.css';
const Bannerflex = () => {
    const [currentImg, setCurrentImg] = useState(0);
    const flexImages = [
        assets.Banner_3,
        assets.Banner_5,
        assets.Asus_BANNER2,
        assets.Banner_7,
        assets.Banner_8,
        assets.Banner_9,
        assets.Artboard_1
    ]

    const nextFlex = () => {
      if(flexImages.length - 1 > currentImg) {
        setCurrentImg(prev=> prev + 1)
      }
    }

    const prevFlex = () => {
      if(currentImg !== 0) {
        setCurrentImg(prev=> prev - 1)
      }
    }

    useEffect(()=> {
      const interval = setInterval(()=> {
        if(flexImages.length - 1 > currentImg) {
          nextFlex()
        } else {
          setCurrentImg(0)
        }
      }, 4000)
      return ()=> clearInterval(interval)
      // eslint-disable-next-line
    }, [currentImg])
  return (
    <div className='flex max-md:px-2 px-3 '>
        <div className='flexy1 max-sm:h-[150px] h-[280px] rounded-lg shadow-md'>
            <div className='flex absolute h-full w-full z-10 items-center'>
                <div className='flex justify-between w-full'>
                    <button onClick={prevFlex} className='rounded-full flex justify-center p-1 items-center h-9 w-9 bg-slate-50'>
                      <FaAngleLeft />
                    </button>
                    <button onClick={nextFlex} className='rounded-full flex justify-center p-1 items-center h-9 w-9 bg-slate-50'>
                      <FaAngleRight />
                    </button>
                </div>
            </div>

            <div className='flexyo'>
              {
                flexImages.map((images, i) => {
                    return (
                    <div className='w-full min-w-full h-full transition-all' key={images + 1} style={{transform: `translateX(-${currentImg * 100}%)`}}>
                        <img src={images} alt=""  className='w-full h-full inset-0 object-fill'/>
                    </div>
                    )
                })
              }  
            </div>
            
        
        </div>
        
    </div>
  )
}

export default Bannerflex