import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Checkbox, Radio } from 'antd';
import prices from '../../helpers/ProductPrices';
import './CategoryProducts.css'
import axios from 'axios';
import brands from '../../helpers/ProductBrands';
import ProductItem from '../../Components/prodItem/ProductItem';
import ReactLoading from 'react-loading';
import { IoIosArrowDown } from 'react-icons/io';

const CategoryProducts = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [list, setList] = useState([]);
    const [load, setLoad] = useState(false);
    const [dataz, setDataz] = useState({
            ct: '',
            sort: 'desc',
            checked: [],
            radio: ''
    });
    console.log(location);
    useEffect(()=>{
           const urlParams = new URLSearchParams(location.search);
            const searchFromUrl = urlParams.get('que');
            const sortFromUrl = urlParams.get('sort')
            const checkedFromUrl =  urlParams.get('brand')?.split('--'); // Split brands by --
            const priceFromUrl = urlParams.get('price');
            if(searchFromUrl || sortFromUrl || checkedFromUrl || priceFromUrl) {
                setDataz({
                    ...dataz,
                    ct: searchFromUrl || '',
                    sort: sortFromUrl || 'desc',
                    checked: checkedFromUrl || [],
                    radio: priceFromUrl
                });
            } 
            const getCatProds = async()=> {
                setLoad(true)
                const searchQuery = urlParams.toString();
                const { data } = await axios.get(`/api/product/category_products?${searchQuery}`);
                if(data.success) {
                    setList(data.result)
                    setLoad(false);
                }
                if(!data.success) {
                    setLoad(false);
                    return;
                }
            }
            getCatProds();
    },[location.search]);

    const handleCheckboxChange = (isChecked, brand) => {
        if (isChecked) {
            setDataz({ ...dataz, checked: [...dataz.checked, brand] });
        } else {
            setDataz({ ...dataz, checked: dataz.checked.filter(item => item !== brand) });
        }
    };
    const handleRadioChange = (e) => {
        setDataz({ ...dataz, radio: e.target.value || '' });
    };
    const handleSortChange = (e) => {
        setDataz({ ...dataz, sort: e.target.value || 'desc' });
    };

    const useFilter = () => {
        const urlParams = new URLSearchParams(location.search);
        const searchFromUrl = urlParams.get('que');
        urlParams.set('que', searchFromUrl);
        urlParams.set('sort', dataz.sort);
        dataz.checked.length > 0 && urlParams.set('brand', dataz.checked.join('--')); // Join brands with --
        dataz?.radio?.length > 0 && urlParams.set('price', dataz.radio); // Set price as a range
        const searchQuery = urlParams.toString();
        navigate(`/product_category?${searchQuery}`);
    };
    const resetFilters = () => {
        const urlParams = new URLSearchParams(location.search);
        const searchFromUrl = urlParams.get('que');
        setDataz({
            sort: 'desc',
            checked: [],
            radio: ''
        });
        navigate(`/product_category?que=${searchFromUrl}`);
    };
  return (
    <Layout>
        <div className='dc'>
            <div className='flex'>
                <div className='w-[180px] max-md:hidden border-r p-2'>
                    <div>
                        <h3 className='sort'>SORT BY</h3>
                        <form className='sf'>
                            <div className='sort1'>
                                <input value={'asc'} onChange={handleSortChange} type="radio" name='sort' />
                                <label htmlFor="">Price - Low to High</label>
                            </div>
                            <div>
                                <input value={'desc'} onChange={handleSortChange} type="radio" name='sort' />
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
                                    <Checkbox key={b.id} checked={dataz.checked.includes(b.label)} onChange={(e)=> handleCheckboxChange(e.target.checked, b.label)}>
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
                            <Radio.Group onChange={handleRadioChange} value={dataz.radio}>
                                {
                                    prices.map((t)=> {
                                        return (
                                            <div key={t.id}>
                                                <Radio value={`${t.array[0]}-${t.array[1]}`}>{t.name}</Radio>
                                            </div>
                                        )
                                    })
                                }
                            </Radio.Group>
                        </div>
                        <div className='flex flex-col gap-1 py-1 px-1'>
                            <button className='bdang' onClick={useFilter}>APPLY FILTERS</button>
                            <button onClick={resetFilters} className='bdang'>RESET FILTERS</button>
                        </div>
                    </div>
                </div>
                <div className='max-md:w-full w-full'>
                    <p className='sr'> Results : {list.length === 0? "No Products Found": `(${list.length} products found)`}</p>
                    <div className='flex items-center mr-auto w-full gap-3 p-1'>
                        <p className='font-semibold'>Filter By:</p>
                        <button className='p-2 border rounded-md flex items-center'>Brands <span><IoIosArrowDown  className='text-slate-500 font-semibold'/></span></button>
                        <button className='p-2 border rounded-md flex items-center'>Prices <span><IoIosArrowDown  className='text-slate-500 font-semibold'/></span></button>
                    </div>
                    {
                        load && (
                            <div className=' w-full h-screen flex justify-center pt-11'>
                                <ReactLoading type='bars' color='orange'/>
                            </div>
                        )
                    }
                    {
                        list.length > 0 && !load && (
                            <div className='p-2 gap-1 grid max-md:grid-cols-2 md:grid-cols-3'>
                                {
                                        list?.map((p, i)=> {
                                            return(
                                                
                                                    <Link className='p-1 shadow-md hover:border transition-all duration-300 hover:border-green-300' key={i} to={`/product/${p._id}`} style={{ textDecoration: 'none', color: 'inherit'}} >
                                                        <ProductItem  id={p._id} name={p.product_name} image={`/images/${p.image}`} new_price={p.new_price.toLocaleString()} old_price={p.old_price.toLocaleString()} />
                                                    </Link>
                                                
                                            )
                                        })
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CategoryProducts