import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout';
import Breadcrums from '../Components/Breadcrums'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DescriptionBox from '../Components/Description/DescriptionBox';

const Productpage = () => {
  const [pData, setPdata] = useState({});

  const { id } = useParams();
  console.log(id);

  useEffect(()=> {
    getDetails()
  }, [])

  const getDetails = async() => {
    const res = await axios.post('/api/product/product_details', { id });
    if(res.data.success) {
      setPdata(res.data.data);
    }
  }

  return (
    <Layout title={'Product'}>
      <Breadcrums product={pData}/>
      <ProductDisplay product={pData}/>
      <DescriptionBox product={pData}/>
    </Layout>
    
  )
}

export default Productpage