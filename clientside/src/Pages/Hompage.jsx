import React from 'react'
import Layout from '../Components/Layout'
import Bannerflex from '../Components/Banners/Bannerflex';
import CategoryList from '../Components/Categories/CategoryList';
import Card1 from '../Components/ProductCard1/Card1';



const Hompage = () => {
  return (
    <Layout title={'SHOPLAKE'}>
      <Bannerflex/>
      <CategoryList/>
      <Card1 gt_category={'Smartphones'} heading={'Exclusive Phone Deals'}/>
      <Card1 gt_category={'Laptops'} heading={'Exclusive Laptop Deals'}/> 
    </Layout>

  )
}

export default Hompage