import React from 'react'
import Layout from '../../Components/Layout'
import { RiTodoLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { Link, Outlet, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  return (
    <Layout title={'SHOPLAKE- User Dashboard'}>
       <div className='flex min-h-screen'>
        <div className={`${location.pathname !== '/dashboard/user' && 'hidden sm:block'} w-[180px] max-sm:w-full border border-t-0 border-slate-300 min-h-full`}>
         <aside className='sidebar-options p-2' >
           <Link to={'profile'} style={{ textDecoration: 'none ', color: 'inherit'}} className='cursor-pointer flex justify-between items-center  px-3 h-[40px] text-[20px] border'>
                <div className='sideimg1'>
                  <CgProfile />
                </div>
                <p className='hover:text-red-500 flex justify-between'>Profile</p>
           </Link>
            <Link to={'orders'} style={{ textDecoration: 'none ', color: 'inherit'}} className='cursor-pointer flex justify-between items-center  px-3 h-[40px] text-[20px] border'>
                <div className='sideimg1'>
                  <RiTodoLine />
                </div>
                <p className='hover:text-red-500 flex justify-between'>Orders</p>
            </Link>

         </aside>
         
        </div>
        <main className={`${location.pathname === '/dashboard/user' ?  'hidden' : 'block'} w-full overflow-hidden`}>
          <Outlet/>
        </main> 
      </div> 
    </Layout>
    
  )
}

export default Dashboard