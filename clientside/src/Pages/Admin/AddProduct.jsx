import React, { useState } from 'react'
import './Add.css';
import { assets } from '../../Components/Assets/Assets'
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';
const AddProduct = ({ handleBackToMenu }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    product_name: "",
    brand_name: "",
    description: "",
    old_price: "",
    new_price: "",
    category: "",
    sub_category: "",
    quantity: ""
  });

  const handleChange = ({target}) => {
    const {name, value} = target;
    setData((preve) => ({
        ...preve,
        [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('product_name', data.product_name);
    formData.append('brand_name', data.brand_name);
    formData.append('description', data.description);
    formData.append('old_price', data.old_price);
    formData.append('new_price', data.new_price);
    formData.append('image', image);
    formData.append('category', data.category);
    formData.append('sub_category', data.sub_category);
    formData.append('quantity', data.quantity);
    const formFill = await axios.post('/api/product/add_product', formData);
    if(formFill.data.success) {
        toast.success(formFill.data.message);
        setData({
          product_name: "",
          brand_name: "Samsung",
          description: "",
          old_price: "",
          new_price: "",
          image: "",
          category: "Appliances",
          sub_category: "Smartphones",
          quantity: ""
        })
        setImage(false)
      } else {
        toast.error(formFill.data.message)
      }

  }
  return (
    <div className='add-product' >
      <div className='w-full flex items-center gap-1 pl-4'>
            <div onClick={ handleBackToMenu } className='p-2 cursor-pointer active:bg-orange-300 rounded-full border sm:hidden '>
              <FaArrowLeft className='text-slate-500'/>
            </div>
      </div>
      <form className='flex flex-col gap-2 items-center p-4' encType="multipart/form-data"  onSubmit={handleSubmit}>
        <div className='prod_items'>
          <input name='product_name' value={data.product_name} type="text"  placeholder='Product name' onChange={handleChange} required/>
        </div>
        <div className='prod-price'>
          <div className='prod_items'>
            <input type="number" value={data.old_price} name='old_price'  placeholder='Old price' onChange={handleChange} required/>
          </div>
          <div className='prod_items'>
            <input type="number" value={data.new_price}  name='new_price' placeholder='New price' onChange={handleChange} required/>
          </div>
          <div className='prod_items'>
            <input type="number" value={data.quantity}  name='quantity' placeholder='Quantity' onChange={handleChange} required/>
          </div>
        </div>
        <div className='prod-price max-sm:flex-col'>
          <div className='prod_items'>
            <select value={data.brand_name} name='brand_name' className='prod_selector' onChange={handleChange} >
              <option value="">Select Brand..</option>
              <option value="Samsung">Samsung</option>
              <option value="Apple">Apple</option>
              <option value="XIAOMI Redmi">XIAOMI Redmi</option>
              <option value="Nokia">Nokia</option>
              <option value="Vivo">Vivo</option>
              <option value="Huawei">Huawei</option>
              <option value="Infinix">Infinix</option>
              <option value="Tecno">Tecno</option>
              <option value="Lenovo">Lenovo</option>
              <option value="Asus">Asus</option>
              <option value="HP">HP</option>
              <option value="Dell">Dell</option>
              <option value="itel">itel</option>
              <option value="Hisense">Hisense</option>
              <option value="LG">LG</option>
              <option value="Sony">Sony</option>
              <option value="Sumec Firman">Sumec Firman</option>
              <option value="Maxi">Maxi</option>
              <option value="Haier">Haier</option>
            </select>
          </div>
          <div className='prod_items'>
            <select value={data.category} name='category'  onChange={handleChange} className='prod_selector'>
              <option value="">Categories</option>
              <option value="Appliances">Appliances</option>
              <option value="Electronics">Electronics</option>
              <option value="Phones And Tablets">Phones And Tablets</option>
              <option value="Computing">Computing</option>
            </select>
          </div>
          <div className='prod_items'>
            <select value={data.sub_category}  name='sub_category' className='prod_selector' onChange={handleChange}>
              <option value="">Sub-categories</option>
              <option value="Smartphones">Smartphones</option>
              <option value="Tablets">Tablets</option>
              <option value="Mobile Accessories">Accessories</option>
              <option value="Laptops">Laptops</option>
              <option value="Televisions">Televisions</option>
              <option value="Generators">Generators</option>
              <option value="Refrigerators">Refrigerators</option>
              <option value="Laundry">Laundry</option>
              <option value="Earbuds">Earbuds</option>
              <option value="Headphones">Headphones</option>
              <option value="Air Conditioners">Air Conditioners</option>
            </select>
          </div>
        </div>
        
        <div className='prod_items'>
          <textarea placeholder='Product description...' onChange={handleChange} value={data.description} name="description"  rows="10" cols="16" required></textarea>
        </div>
        <div className='flex items-center flex-col justify-center'>
          <p>Upload Image</p>
          <label htmlFor="image">
            <img className='prod-thumbnail' src={image? URL.createObjectURL(image):assets.image_icon} alt="" />
          </label>
          <input name='image' onChange={(e) => setImage(e.target.files[0])} type="file"  id="image" hidden required/>
        </div>
        <br />
        <button className='p-2 w-[80%] bg-blue-500 rounded-md font-semibold text-slate-50' type='submit'>Add</button>
      </form>
    </div>
  )
}

export default AddProduct