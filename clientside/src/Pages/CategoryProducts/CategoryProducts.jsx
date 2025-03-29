import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import { Link, useParams } from 'react-router-dom'
import { Checkbox, Radio } from 'antd';
import prices from '../../helpers/ProductPrices';
import './CategoryProducts.css'
import axios from 'axios';
import brands from '../../helpers/ProductBrands';
import ProductItem from '../../Components/prodItem/ProductItem';

const CategoryProducts = () => {
    const params = useParams();

    const que = params.category;
    const [data, setData] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);

    const handleFilter = async(value, brand)=> {
        let all = [...checked]
        if(value) {
            all.push(brand)
        } else{
            all = all.filter(b => b !== brand)
        }
        setChecked(all);
    }

    useEffect(()=> {
        if(checked.length || radio.length) {
            filterProducts()
        };
    }, [checked, radio, que])

    useEffect(()=> {
        if(!checked.length || !radio.length) {
            categoryProducts()
            console.log("dat", data);
        };
    }, [checked.length, radio.length, que])


    const filterProducts = async() => {
        const resp = await axios.post('/api/product/filter_categories', {que, checked, radio});
        if(resp.data.success) {
            setData(resp.data.data);
            console.log(resp.data.data);
        }
    }

    const categoryProducts = async() => {
        const {data} = await axios.post('/api/product/category_products', {que});
        setData(data.data);
        console.log(data);
    }
  return (
    <Layout>
        <div className='dc'>
            <div className='suby'>
                <div className='ftr'>
                    <div>
                        <h3 className='sort'>SORT BY</h3>
                        <form className='sf'>
                            <div className='sort1'>
                                <input type="radio" name='sort' />
                                <label htmlFor="">Price - Low to High</label>
                            </div>
                            <div>
                                <input type="radio" name='sort' />
                                <label htmlFor="">Price - High to Low </label>
                            </div>
                        </form>
                    </div>
                    <div>
                        <h3 className='sort'>Categories</h3>
                        <div className='sf'>
                            {
                                brands.map((b)=> {
                                    return (
                                    <Checkbox key={b.id} onChange={(e)=> handleFilter(e.target.checked, b.label)}>
                                      {b.label}
                                    </Checkbox>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <h3 className='sort'>Sort Prices</h3>
                        <div className='sf'>
                            <Radio.Group onChange={(e)=> setRadio(e.target.value)}>
                                {
                                    prices.map((t)=> {
                                        return (
                                            <div key={t.id}>
                                                <Radio value={t.array}>{t.name}</Radio>
                                            </div>
                                        )
                                    })
                                }
                            </Radio.Group>
                        </div>
                        <div className='fbtn'>
                            <button className='bdang' onClick={()=> window.location.reload()}>RESET FILTERS</button>
                        </div>
                    </div>
                </div>
                <div>
                    <p className='sr'> Results : {data.length === 0? "No Products Found": `(${data.length} products found)`}</p>
                    <div className='sep3'>
                    {
                            data?.map((p, i)=> {
                                return(
                                    
                                        <Link className='results' key={i} to={`/product/${p._id}`} style={{ textDecoration: 'none', color: 'inherit'}} >
                                            <ProductItem  id={p._id} name={p.product_name} image={`/images/${p.image}`} new_price={p.new_price.toLocaleString()} old_price={p.old_price.toLocaleString()} />
                                        </Link>
                                    
                                )
                            })
                    }
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CategoryProducts