import React from 'react'
import Layout from '../../Components/Layout'
import { IoAddCircleOutline } from "react-icons/io5";
import { GoChecklist } from "react-icons/go";
import { FaUsers } from "react-icons/fa6";
import { RiDashboardFill, RiTodoLine } from "react-icons/ri";
import { Link, Outlet, useLocation } from 'react-router-dom';


const AdminDashboard = () => {
  const location = useLocation();

  console.log(location.pathname);
  return (
    <Layout>
      <div className='flex min-h-screen'>
        <div className={`${location.pathname !== '/dashboard/admin' && 'hidden sm:block'} w-[180px] max-sm:w-full border border-t-0 border-slate-300 min-h-full`}>
         <aside className='sidebar-options p-2'>
            <Link to={'panel'} style={{ textDecoration: 'none ', color: 'inherit'}} className='cursor-pointer  px-3 h-[40px] text-[20px] border'>
                    <p  className='hover:text-red-500 flex justify-between'><span className=' rounded items-center text-slate-700 mt-1 p-1 text-[19px]'><RiDashboardFill /></span> Dashboard</p>
            </Link>
            <Link to={'profile'} style={{ textDecoration: 'none ', color: 'inherit'}} className='cursor-pointer  px-3 h-[40px] text-[20px] border'>
                    <p  className='hover:text-red-500 flex justify-between'>Profile</p>
            </Link>
           <Link to={'create-product'} style={{ textDecoration: 'none ', color: 'inherit'}} className='sideoption'>
                <div className='sideimg1'>
                  <IoAddCircleOutline />
                </div>
                <p className='hover:text-red-500 flex justify-between'>Add Products</p>
           </Link>
            <Link to={'all-products'} style={{ textDecoration: 'none ', color: 'inherit'}} className='sideoption'>
                <div className='sideimg1'> 
                <GoChecklist />
                </div>
                <p className='hover:text-red-500 flex justify-between'>All Products</p>
            </Link>
            <Link to={'all-users'} style={{ textDecoration: 'none ', color: 'inherit'}} className='sideoption'>
                <div className='sideimg1'>
                <FaUsers />
                </div>
                <p className='hover:text-red-500 flex justify-between'>All Users</p>
            </Link>
            <Link to={'all-orders'} style={{ textDecoration: 'none ', color: 'inherit'}} className='sideoption'>
                <div className='sideimg1'>
                <RiTodoLine />
                </div>
                <p className='hover:text-red-500 flex justify-between'>Orders</p>
            </Link>

         </aside>
         
        </div>
        <main className={`${location.pathname === '/dashboard/admin' ?  'hidden' : 'block'} w-full overflow-hidden`}>
          <Outlet  />
        </main> 
      </div>
       
    </Layout>
    
  )
}

export default AdminDashboard