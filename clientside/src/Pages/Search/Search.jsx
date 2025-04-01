import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import './Search.css'
import { Checkbox, Radio } from 'antd';
import ProductItem from '../../Components/prodItem/ProductItem'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import brands from '../../helpers/ProductBrands'
import prices from '../../helpers/ProductPrices';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { IoIosArrowDown } from 'react-icons/io';

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [dataz, setDataz] = useState({
        kw: '',
        sort: 'desc',
        checked: [],
        radio: ''
    });
    const [load, setLoad] = useState(false);
    const [goods, setGoods] = useState([]);
    const [more, setMore] = useState(true);
    

    useEffect(()=>{
       const urlParams = new URLSearchParams(location.search);
        const searchFromUrl = urlParams.get('src');
        const sortFromUrl = urlParams.get('sort')
        const checkedFromUrl =  urlParams.get('brand')?.split('--'); // Split brands by --
        const priceFromUrl = urlParams.get('price');
        if(searchFromUrl || sortFromUrl || checkedFromUrl || priceFromUrl) {
            setDataz({
                ...dataz,
                kw: searchFromUrl || '',
                sort: sortFromUrl || 'desc',
                checked: checkedFromUrl || [],
                radio: priceFromUrl
            });
        } 
        const getAllProducts = async()=> {
            setLoad(true)
            const searchQuery = urlParams.toString();
            const { data } = await axios.get(`/api/product/product_list?${searchQuery}`);
            if(data.success) {
                setGoods(data.products)
                setLoad(false);
                if(data?.products.length < 9) {
                    setMore(false)
                }
            }
            if(!data.success) {
              setLoad(false);
              return;
            }
          }
          getAllProducts();
    },[location.search]);
    
    const useFilter = () => {
        const urlParams = new URLSearchParams(location.search);
        const searchFromUrl = urlParams.get('src');
        urlParams.set('src', searchFromUrl || '');
        urlParams.set('sort', dataz.sort);
        dataz.checked.length > 0 && urlParams.set('brand', dataz.checked.join('--')); // Join brands with --
        if (dataz.radio.length) {
            urlParams.set('price', dataz.radio); // Set price as a range
        }
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };
    const useBrandFilter = () => {
        const urlParams = new URLSearchParams(location.search);
        const searchFromUrl = urlParams.get('src');
        urlParams.set('src', searchFromUrl);
        urlParams.set('sort', dataz.sort);
        dataz.checked.length > 0 && urlParams.set('brand', dataz.checked.join('--')); // Join brands with --
        const searchQuery = urlParams.toString();
        setOpen(false);
        navigate(`/search?${searchQuery}`);
    };
    const usePriceFilter = () => {
        const urlParams = new URLSearchParams(location.search);
        const searchFromUrl = urlParams.get('src');
        urlParams.set('src', searchFromUrl);
        urlParams.set('sort', dataz.sort);
        dataz?.radio?.length > 0 && urlParams.set('price', dataz.radio); // Set price as a range
        const searchQuery = urlParams.toString();
        setOpen1(false);
        navigate(`/search?${searchQuery}`);
    };
    const handleCheckboxChange = (isChecked, brand) => {
        if (isChecked) {
            setDataz({ ...dataz, checked: [...dataz.checked, brand] });
        } else {
            setDataz({ ...dataz, checked: dataz.checked.filter(item => item !== brand) });
        }
    };
    const resetFilters = () => {
        setDataz({
            kword: '',
            sort: 'desc',
            checked: [],
            radio: ''
        });
        navigate('/search');
    };
    const resetBrandFilters = () => {
        const urlParams = new URLSearchParams(location.search);
        urlParams.get('src');
        urlParams.get('price');
        // Remove the brand filter
        urlParams.delete('brand'); // This removes the 'brand' parameter
        const searchQuery = urlParams.toString();
        setDataz((prevState) => ({
            ...prevState,
            checked: [], // Reset brand filter
        }));
        setOpen(false);
        navigate(`/search?${searchQuery}`);
    };
    const resetPriceFilters = () => {
        const urlParams = new URLSearchParams(location.search);
        urlParams.get('src');
        urlParams.get('brand');
        // Remove the brand filter
        urlParams.delete('price'); // This removes the 'brand' parameter
        const searchQuery = urlParams.toString();
        setDataz((prevState) => ({
            ...prevState,
            radio: '', // Reset brand filter
        }));
        setOpen1(false);
        navigate(`/search?${searchQuery}`);
    };
    const handleShowMore = async() => {
        const nGoods = goods.length;
        const startIndex = nGoods;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const { data } = await axios.get(`/api/product/product_list?${searchQuery}`);
          if(data.success) {
            setGoods(prev =>[...prev, ...data.products]);
            if(data?.products.length < 9) {
              setMore(false)
            }
          }
          if(!data.success) {
            return;
          }
      }

      const handleOpen = () => {
        setOpen1(false);
        setOpen(prev => !prev);
      }
      const handleOpen1 = () => {
        setOpen(false);
        setOpen1(prev => !prev);
      }
    
    
    const handleRadioChange = (e) => {
        setDataz({ ...dataz, radio: e.target.value || '' });
    };
    const handleSortChange = (e) => {
        setDataz({ ...dataz, sort: e.target.value || 'desc' });
    };
    

    
  return (
    <Layout title={'Search Results'}>
        <div className='SC'>
            <div className='flex'>
                <div className='w-[180px] max-md:hidden'>
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
                        <h3 className='sort'>Brands</h3>
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
                    <div className='flex max-md:justify-between'>
                      <p className='max-md:text-sm'>Search Results : {goods.length === 0? "No Products Found": `${goods.length} products found`}</p>  
                    </div>
                    <div className='flex md:hidden items-center mr-auto w-full gap-3 p-1'>
                        <p className='font-semibold'>Filter By:</p>
                        <div  className='flex items-center justify-center'>
                            <button onClick={handleOpen} className='p-2 border rounded-md flex items-center gap-1 '>Brands <span><IoIosArrowDown  className='text-slate-500 font-semibold'/></span></button>
                            {
                                open && (
                                    <div className='flex absolute flex-col gap-1 z-10 top-[155px] border max-sm:top-[175px] p-1 shadow-md ease-in transition-all duration-500 bg-white rounded-md w-44 '>
                                      <div className=' flex h-48 overflow-y-auto scrollbar1  flex-col gap-2 '>
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
                                        <div className='flex flex-col gap-1 py-1 px-1'>
                                            <button className='bdang' onClick={useBrandFilter}>Apply</button>
                                            <button onClick={resetBrandFilters} className='bdang'>Clear all</button>
                                        </div> 
                                    </div>
                                    
                                )
                                
                            }
                        </div>
                        <div  className='flex items-center justify-center'>
                            <button onClick={handleOpen1} className='p-2 border rounded-md flex items-center gap-1 '>Prices <span><IoIosArrowDown  className='text-slate-500 font-semibold'/></span></button>
                            {
                                open1 && (
                                    <div className='flex absolute flex-col gap-1 z-10 top-[155px] border max-sm:top-[175px] p-1 shadow-md ease-in transition-all duration-500 bg-white rounded-md w-44 '>
                                        <div className=' flex  gap-2 '>
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
                                            <button className='bdang' onClick={usePriceFilter}>Apply</button>
                                            <button onClick={resetPriceFilters} className='bdang'>Clear all</button>
                                        </div> 
                                    </div>
                                )
                                
                            }
                        </div>
                        
                        
                    </div>
                    
                    {
                        load && (
                            <div className=' w-full h-screen flex justify-center pt-11'>
                                <ReactLoading type='bars' color='orange'/>
                            </div>
                        )
                    }
                    {
                        goods.length > 0 && !load && (
                            <div className='p-2 gap-1 grid max-md:grid-cols-2 md:grid-cols-3'>
                                {
                                    goods?.map((p, i)=> {
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
                    
                    {
                        more && (
                            <button onClick={handleShowMore} className=' text-blue-600 hover:underline p-1'>Show more</button>
                        )
                    }
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Search