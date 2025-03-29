import { Button, Modal } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import EditProductsPrice from '../../Components/EditProducts/EditProductsPrice';
import prodList from '../../helpers/helper';
import './AllProducts.css'
import ReactLoading from 'react-loading';
import { FaArrowLeft } from 'react-icons/fa';


const AllProducts = ({ handleBackToMenu }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [Visible, setVisible] = useState(false);
  const [b, setP] = useState(null);
  const [nowOld, setNowOld] = useState("");
  const [nowNew, setNowNew] = useState("");
  const [loading, setloading] = useState(false);
  const [newQuantity, setNewQuantity] = useState("")
  const [newSub_category, setNewSubCategory] = useState()
  const [productz, setProduct] = useState(null);
  const [more, setMore] = useState(true);
  const [show, setShow] = useState(false);
  const [ml, setMl] = useState(false);

  const getProducts = async () => {
    setloading(true)
    try {
      const response = await prodList();
      console.log(response.products)
      if(response.success) {
        setAllProducts(response.products)
        setloading(false)
        toast.success(response.message);
        if(response.products.length < 9) {
          setMore(false);
        }
      }
    } catch (error) {
      toast.error('Error');
      console.error('Error fetching all Users:', error);
    } finally {
      setloading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateProduct = await axios.put(`/api/product/update_product/${productz._id}`, { nowOld, nowNew, newQuantity, newSub_category});
    if(updateProduct.data.success) {
      toast.success(updateProduct.data.message)
      setProduct(null)
      setNowOld("")
      setNowNew("")
      setNewQuantity("")
      setVisible(false)
      getProducts()
    } else {
      toast.error(updateProduct.data.message)
    }
  }
  const deleteProduct = async () => {
    const resp = await axios.delete(`/api/product/remove_product/${b?._id}`);
    if(resp.data.success) {
      setAllProducts(allProducts.filter(prod => prod?._id !== b?._id));
      toast.success(resp.data.message);
      console.log(b?._id, resp.data.product);
    } else if (!resp.data.success) {
      toast.error(resp.data.message);
    } else {
      toast.error(resp.data.message);
    }
  }

  const cancel = ()=> {
    setShow(false)
    setP(null)
  }

  const handleShowMore = async() => {
      setMl(true)
      const startIndex = allProducts.length;
      try {
        const { data } = await axios.get(`/api/product/product_list?startIndex=${startIndex}`);
        if(data.success) {
          setAllProducts(prev =>[...prev, ...data.products]);
          if(data.products.length < 9) {
            setMore(false);
          }
          setMl(false)
        }
      } catch (error) {
        console.error('Error fetching all blogs:', error);
      } finally {
          setMl(false);
      }
    }

  return (
    <div className='w-full  p-1 overflow-x-auto scrollbar'>
      <div className='w-full flex items-center gap-1 pl-4'>
        <div onClick={ handleBackToMenu } className='p-2 active:bg-orange-300 rounded-full border sm:hidden '>
          <FaArrowLeft className='text-slate-500'/>
        </div>
        <h1 className='text-2xl text-slat items-center justify-centere-500'>All Products</h1>
      </div>
      
      {
        loading && (
          <div className=' w-full flex justify-center pt-11'>
            <ReactLoading type='bars' color='orange'/>
          </div>
        )
      }
      {
        allProducts.length > 0 && !loading && (
          <div className='flex items-center w-full'>
            <table>
              <thead>
                <tr>
                  <th className='text-sm'>Image</th>
                  <th className='text-sm'>Name</th>
                  <th className='text-sm'>Brand</th>
                  <th className='text-sm'>Old Price</th>
                  <th className='text-sm'>New Price</th>
                  <th className='text-sm'>Category</th>
                  <th className='text-sm'>Sub_category</th>
                  <th className='text-sm'>Quantity</th>
                  <th className='text-sm'>Edit</th>
                  <th className='text-sm'>Delete</th>
                </tr>
                
              </thead>
              <tbody>
                {allProducts.map((p, i) => {
                  return (
                    <tr key={i + 1}>
                      <td><img src={`/images/${p.image}`} alt="" /></td>
                      <td className='max-sm:text-sm'>{p.product_name}</td>
                      <td className='max-sm:text-sm'>{p.brand_name}</td>
                      <td className='max-sm:text-sm'>${p.old_price.toLocaleString()}</td>
                      <td className='max-sm:text-sm'>${p.new_price.toLocaleString()}</td>
                      <td className='max-sm:text-sm'>{p.category}</td>
                      <td className='max-sm:text-sm'>{p.sub_category}</td>
                      <td className='max-sm:text-sm'>{p.quantity}</td>
                      <td><button onClick={()=> {setVisible(true); setNowOld(p.old_price); setNowNew(p.new_price); setNewQuantity(p.quantity); setNewSubCategory(p.sub_category); setProduct(p)}}>EDIT</button></td>
                      <td><button onClick={()=> { setShow(true); setP(p)}}>X</button></td>
                    </tr>
                  )
                })}
              </tbody>
                
            </table>   
          </div>
        )
      }
      {
        more && (
          <div className='w-full p-1 flex items-center justify-center'>
            <button onClick={handleShowMore} className=' gap-2 font-medium text-blue-600 flex items-center  p-1'>Show more {ml && <ReactLoading type='spin' height={10} width={10} color='blue'/>}</button>
          </div>
                            
        )
      }
      
      <Modal title='Update Product Price' open={Visible} footer={null} onCancel={()=> setVisible(false)}>
        <EditProductsPrice handleUpdate={handleSubmit} value1={nowOld} value2={nowNew} value3={newQuantity} value4={newSub_category} setValue={setNowOld} setValue1={setNowNew} setValue2={setNewQuantity} setValue3={setNewSubCategory}/>
      </Modal>
      <Modal open={show}  footer={null} onCancel={cancel} >
        <div className='w-full flex items-center justify-center p-3'>
          <h2 className='font-semibold text-slate-500 text-2xl'>Are you sure?</h2>
        </div>
        <div className='w-full flex items-center justify-center gap-3 p-2'>
          <Button onClick={deleteProduct} className='font-semibold bg-red-500 text-slate-100'>Yes</Button>
          <Button onClick={()=> setShow(false)} className='font-semibold  bg-green-500 text-slate-100'>No</Button>
        </div>
      </Modal>
    </div>
  )
}

export default AllProducts