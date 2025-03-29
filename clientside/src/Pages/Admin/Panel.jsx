import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import ReactLoading from 'react-loading';
import { HiArrowNarrowUp, HiUsers } from "react-icons/hi";
import { Bar, Line, Pie } from 'react-chartjs-2';
import { AiFillProduct } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  BarElement,
  LinearScale,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
import { toast } from 'react-toastify';
// Register components
ChartJS.register(LineElement, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Panel = ({ handleBackToMenu }) => {
  const [allUsers, setAllUsers] = useState([]);
   const [tu, setTu] = useState('');
   const [lmu, setLmu] = useState('');
   const [allProducts, setAllProducts] = useState([]);
   const [tp, setTp] = useState('');
   const [lmp, setLmp] = useState('');
   const [allOrders, setAllOrders] = useState([]);
   const [to, setTo] = useState('');
   const [lmo, setLmo] = useState('');
   const [pload, setPload] = useState(false);
   const [uload, setUload] = useState(false);
   const [oload, setOload] = useState(false);

   useEffect(()=> {
    getAllUsers();
    getAllProducts();
    getAllOrders();
   }, [])

   const getAllUsers = async () => {
    setUload(true)
    try {
      const {data} = await axios.get('/api/user/all_users');
      if(data.success) {
        setAllUsers(data.data);
        setTu(data.totalUsers);
        setLmu(data.lastMonthUsers)
        setUload(false);
      }
    } catch (error) {
      toast.error('Error');
      console.error('Error fetching all Users:', error);
    } finally {
      setUload(false);
    }
  }
  const getAllProducts= async()=> {
    setPload(true)
      try {
        const { data } = await axios.get(`/api/product/product_list`);
        if(data.success) {
          setAllProducts(data.products);
          setTp(data.totalProducts);
          setLmp(data.lastmonthProducts);
          setPload(false);
        }
      } catch (error) {
        console.error('Error fetching all blogs:', error);
      } finally {
          setPload(false);
      }
  }
  const getAllOrders = async() => {
    try {
      const {data} = await axios.get('/api/order/all_orders');
      if(data.success) {
        setAllOrders(data.data);
        setTo(data.totalOrders);
        setLmo(data.lastMonthOrders);
      }
    } catch (error) {
      console.error('Error fetching all blogs:', error);
    } finally {
      setOload(false)
    }
  }
  const statusCounts = allOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});
  const productSales = allOrders.reduce((acc, order) => {
    order.products.forEach((product) => {
      acc[product.product_name] = (acc[product.product_name] || 0) + product.old_price;
    });
    return acc;
  }, {});
  const paymentCounts = allOrders.reduce((acc, order) => {
    const status = order.payment.transaction.status; // Access the payment status
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const dataLine = {
      labels: allOrders.map((order) =>
        new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(new Date(order?.createdAt))
      ), // X-axis (Dates)
      datasets: [
        {
          label: 'Sales Amount (USD)',
          data: allOrders.map((order) => order?.amount), // Y-axis (Sales amounts)
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          tension: 0.3, // Smooth curves
        },
      ],
  };

  const dataPie = {
    labels: Object.keys(statusCounts), // Order statuses (e.g., 'Complete', 'Pending')
    datasets: [
      {
        label: 'Order Status Distribution',
        data: Object.values(statusCounts), // Counts of each status
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Customize colors
        hoverOffset: 4, // Offset on hover for effect
      },
    ],
  };
  const dataBar = {
    labels: Object.keys(productSales), // Product names (X-axis)
    datasets: [
      {
        label: 'Sales Amount (USD)',
        data: Object.values(productSales), // Total sales per product (Y-axis)
        backgroundColor: 'orange', // Bar fill color
        borderColor: 'darkorange', // Bar border color
        borderWidth: 1, // Border thickness
      },
    ],
  };
  const dataPie2 = {
    labels: Object.keys(paymentCounts), // Payment statuses (e.g., 'Success', 'Failed')
    datasets: [
      {
        label: 'Payment Status',
        data: Object.values(paymentCounts), // Count of each status
        backgroundColor: ['#28a745', '#dc3545', '#ffc107'], // Example colors
        hoverOffset: 4, // Offset on hover
      },
    ],
  };

  return (
    <div className='p-1 flex flex-col gap-2 w-full'>
        <div className='w-full flex items-center gap-1 pl-4'>
            <div onClick={ handleBackToMenu } className='p-2 active:bg-orange-300 rounded-full border sm:hidden '>
                <FaArrowLeft className='text-slate-500'/>
            </div>
            <h1 className='text-2xl text-slat items-center justify-centere-500'>Panel</h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2 justify-center'>
          <div className='w-full border dark:border-slate-400 rounded-md p-1 shadow-lg'>
            {
              uload  && (
                <div className='w-full h-28 flex pt-4 justify-center'>
                  <ReactLoading type='bars' height={20} width={50} color='green'/>
                </div>
                
              )
            }
            {
              allUsers.length === 0 && !uload && (
                <>
                  <div className='flex w-full items-center justify-between'>
                    <p className=' font-semibold'>TOTAL USERS</p>
                    <HiUsers className='text-blue-600' />
                  </div>
                  <div className='w-full flex items-center justify-start pr-1'>
                    <p className='font-semibold '>{tu}</p>
                  </div>
                  <div className='flex gap-2 w-full items-center justify-start'>
                    <div className='flex items-center justify-start'>
                      <HiArrowNarrowUp className='text-green-500 text-xs '/>
                      <p className='text-xs  font-semibold'>{lmu}</p>
                    </div>
                    
                    <p className='font-semibold text-slate-500'>Last updated</p>
                  </div>
                </>
              )
            }
            {
              allUsers.length > 0 && !uload && (
                <>
                  <div className='flex w-full items-center justify-between'>
                    <p className='text-slate-500 font-semibold'>TOTAL USERS</p>
                    <HiUsers className='text-blue-600' />
                  </div>
                  <div className='w-full flex items-center justify-start pr-1'>
                    <p className='font-semibold text-slate-500'>{tu}</p>
                  </div>
                  <div className='flex gap-2 w-full items-center justify-start'>
                    <div className='flex items-center justify-start'>
                      <HiArrowNarrowUp className='text-green-500 text-xs '/>
                      <p className='text-xs text-slate-500 font-semibold'>{lmu}</p>
                    </div>
                    
                    <p className='font-semibold text-slate-500'>Last updated</p>
                  </div>
                </>
              )
            }
            
          </div>
          <div className='w-full p-1 rounded-md border dark:border-slate-400 shadow-lg'>
            {
              pload  && (
                <div className='w-full h-28 flex pt-4 justify-center'>
                  <ReactLoading type='bars' height={20} width={50} color='green'/>
                </div>
              )
            }
            {
              allProducts.length === 0 && !pload && (
                <>
                  <div className='flex w-full items-center justify-between'>
                    <p className='text-slate-500 font-semibold'>TOTAL PRODUCTS</p>
                    <AiFillProduct className='text-green-600 ' />
                  </div>
                  <div className='w-full flex items-center justify-start pr-1'>
                    <p className='font-semibold text-slate-500'>{tp}</p>
                  </div>
                  <div className='flex gap-2 w-full items-center justify-start'>
                    <div className='flex items-center justify-start'>
                      <HiArrowNarrowUp className='text-green-500 text-xs '/>
                      <p className='text-xs text-slate-100 font-semibold'>{lmp}</p>
                    </div>
                    
                    <p className='font-semibold text-slate-100'>Last updated</p>
                  </div>
                </>
              )
                
            }
            {
              allProducts.length > 0 && !pload && (
                <>
                  <div className='flex w-full items-center justify-between'>
                    <p className='text-slate-500 font-semibold'>TOTAL PRODUCTS</p>
                    <AiFillProduct className='text-cyan-600 ' />
                  </div>
                  <div className='w-full flex items-center justify-start pr-1'>
                    <p className='font-semibold text-slate-500'>{tp}</p>
                  </div>
                  <div className='flex gap-2 w-full items-center justify-start'>
                    <div className='flex items-center justify-start'>
                      <HiArrowNarrowUp className='text-green-500 text-xs '/>
                      <p className='text-xs text-slate-500 font-semibold'>{lmp}</p>
                    </div>
                    
                    <p className='font-semibold text-slate-500'>Last updated</p>
                  </div>
                </>
              )
                
            }
          </div>
          <div className='w-full p-1 rounded-md border dark:border-slate-400 shadow-lg'>
            {
              oload  && (
                <div className='w-full h-28 flex pt-4 justify-center'>
                  <ReactLoading type='bars' height={20} width={50} color='green'/>
                </div>
              )
            }
            {
              allOrders.length === 0 && !oload && (
                <>
                  <div className='flex w-full items-center justify-between'>
                    <p className='text-slate-500 font-semibold'>TOTAL ORDERS</p>
                    <MdProductionQuantityLimits className='text-green-600 ' />
                  </div>
                  <div className='w-full flex items-center justify-start pr-1'>
                    <p className='font-semibold text-slate-500'>{to}</p>
                  </div>
                  <div className='flex gap-2 w-full items-center justify-start'>
                    <div className='flex items-center justify-start'>
                      <HiArrowNarrowUp className='text-green-500 text-xs '/>
                      <p className='text-xs text-slate-100 font-semibold'>{lmo}</p>
                    </div>
                    
                    <p className='font-semibold text-slate-100'>Last updated</p>
                  </div>
                </>
              )
                
            }
            {
              allOrders.length > 0 && !oload && (
                <>
                  <div className='flex w-full items-center justify-between'>
                    <p className='text-slate-500 font-semibold'>TOTAL ORDERS</p>
                    <MdProductionQuantityLimits className='text-cyan-600 ' />
                  </div>
                  <div className='w-full flex items-center justify-start pr-1'>
                    <p className='font-semibold text-slate-500'>{to}</p>
                  </div>
                  <div className='flex gap-2 w-full items-center justify-start'>
                    <div className='flex items-center justify-start'>
                      <HiArrowNarrowUp className='text-green-500 text-xs '/>
                      <p className='text-xs text-slate-500 font-semibold'>{lmo}</p>
                    </div>
                    
                    <p className='font-semibold text-slate-500'>Last updated</p>
                  </div>
                </>
              )
                
            }
          </div>
      </div>
      <div className='grid grid-cols-1 max-md:grid-cols-1 md:grid-cols-2 gap-2 justify-center'>
        <div className='shadow-md h-[300px]'>
          <Line data={dataLine}/>
        </div>
        <div className='shadow-md flex flex-col bg-slate-100 items-center h-[300px]'>
          <h3 className='text-slate-500 font-semibold'>Order Status Distribution</h3>
          <div className='p-2 flex justify-center  w-full h-64'>
            <Pie className='' data={dataPie} />
          </div>
          
        </div>
        
      </div>
      <div className='grid grid-cols-1 max-md:grid-cols-1 md:grid-cols-2 gap-2 justify-center'>
        <div className='shadow-md h-[300px]'>
          <h3>Top-Selling Products</h3>
          <Bar data={dataBar} />
        </div>
        
        <div className='shadow-md flex flex-col bg-slate-100 items-center h-[300px]'>
          <h3 className='text-slate-500 font-semibold'>Payment Status Overview</h3>
          <div className='p-2 flex justify-center  w-full h-64'>
            <Pie className='' data={dataPie2} />
          </div>
        </div>
      </div>
        
    </div>
  )
}

export default Panel