import React from 'react'

const EditProductsPrice = ({handleUpdate, value1, value2, value3, value4, setValue, setValue1, setValue2, setValue3}) => {
  return (
    <div className='form-intro'>
        <form className='user_form' onSubmit={handleUpdate}>
            <div className='form_items'>
                <p>Old price</p>
                <input type="number" value={value1} name='nowOld'  placeholder='enter old price' onChange={(e)=> setValue(e.target.value)} required/>
            </div>
            <div className='form_items'>
                <p>New price</p>
                <input type="number" value={value2}  name='nowNew' placeholder='enter new price' onChange={(e)=> setValue1(e.target.value)} required/>
            </div>
            <div className='form_items'>
                <p>Quantity</p>
                <input type="number" value={value3}  name='newQuantity' placeholder='enter product quantity' onChange={(e)=> setValue2(e.target.value)} required/>
            </div>
            <div className='form_items'>
                <p>Select Subcategory</p>
                <select value={value4}  name='newSub_category' className='prod_selector' onChange={(e)=> setValue3(e.target.value)}>
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
            <button type='submit'>UPDATE</button>
        </form>
    </div>
  )
}

export default EditProductsPrice