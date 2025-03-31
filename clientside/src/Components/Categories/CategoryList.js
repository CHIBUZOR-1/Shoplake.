import React, { useEffect, useState } from 'react'
import './CategoryList.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(()=> {
    getCategories()
  }, [])

  const getCategories = async() => {
    const res = await axios.get('/api/product/product_categories');
    if(res.data.success) {
      setCategories(res.data.data);
    }
  }
  return (
    <div className='w-full p-2 mx-auto overflow-x-auto scrollbar'>
      <div className='flex gap-1 items-center justify-between'>
        {
          categories.map((cat, i) => {
            return(
              <Link to={`/product_category?que=${cat.sub_category}`} style={{ textDecoration: 'none', color: 'inherit'}} key={i} className='cursor-pointer items-center flex flex-col justify-center'>
                <div className='h-12 items-center justify-center w-12 p-4 bg-slate-100 rounded-full'>
                  <img src={`/images/${cat.image}`} alt='' className='cat_imgdome'/>
                </div>
                <p className='max-sm:text-xs sm:text-sm line-clamp-1 text-ellipsis'>{cat.sub_category}</p>
              </Link>
            )
          })
        }
      </div>
      
    </div>
  )
}

export default CategoryList