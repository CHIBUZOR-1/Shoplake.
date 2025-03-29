import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Cartcard.css'
import { Link } from 'react-router-dom';
import ProductItem from '../prodItem/ProductItem';

const CategoryCard = ({gt_category}) => {
    const [data, setData] = useState([]);

    useEffect(()=> {
        getBySubCategory()
        // eslint-disable-next-line
    }, [])

    const getBySubCategory = async() => {
        const resp = await axios.post('/api/product/card_category', { gt_category });

        if(resp.data.success) {
            setData(resp.data.data);
        }
    }
  return (
    <div className='card_t'>
            <div className='incard2'>
                {
                    data?.map((prod, i)=> {
                        return(
                            <Link key={i} to={`/product/${prod._id}`} style={{ textDecoration: 'none', color: 'inherit'}} >
                              <ProductItem  id={prod._id} name={prod.product_name} image={`/images/${prod.image}`} new_price={prod.new_price.toLocaleString()} old_price={prod.old_price.toLocaleString()} />
                            </Link>
                        )
                    })
                }
            </div>
    </div>
  )
}

export default CategoryCard