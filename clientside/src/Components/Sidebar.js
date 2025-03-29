import React from 'react'
import { IoAddCircleOutline } from "react-icons/io5";
import { GoChecklist } from "react-icons/go";
import { FaUsers } from "react-icons/fa6";
import { RiTodoLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='Sidebar'>
        <div className='sidebar-options'>
            <div className='sideoption'>
              <Link to={'admin/create-product'}>
                <div className='sideimg1'>
                  <IoAddCircleOutline />
                </div>
                <p>Add Products</p>
              </Link>
            </div>
            <div className='sideoption'>
                <div className='sideimg1'>
                <GoChecklist />
                </div>
                <p>All Products</p>
            </div>
            <div className='sideoption'>
                <div className='sideimg1'>
                <FaUsers />
                </div>
                <p>All Users</p>
            </div>
            <div className='sideoption'>
                <div className='sideimg1'>
                <RiTodoLine />
                </div>
                <p>Orders</p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar