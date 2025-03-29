import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MdEdit } from "react-icons/md";
import moment from 'moment'
import { Modal } from 'antd'
import EditUser from "../../Components/EditUserRoles/EditUser";
import './AllUsers.css'
import { FaArrowLeft } from 'react-icons/fa';
import ReactLoading from 'react-loading';


const AllUsers = ({ handleBackToMenu }) => {
  const [allUsers, setAllUsers] = useState([])
  const [Visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const [more, setMore] = useState(true);
  const [ml, setMl] = useState(false);
  const [newAdmin, setNewAdmin] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUsers()
  }, [])

  // for update form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateRole = await axios.put(`/api/user/update_role/${user._id}`, { newAdmin });
    if(updateRole.data.success) {
      toast.success(updateRole.data.message)
      console.log(user, newAdmin)
      setUser(null)
      setNewAdmin("")
      setVisible(false)
      getUsers()
    } else if(!updateRole.data.success) {
      toast.error(updateRole.data.message)
    } else {
      toast.error("Something Happened")
    }

  }

  const getUsers = async () => {
    setloading(true)
    try {
      const {data} = await axios.get('/api/user/all_users');
      if(data.success) {
        setAllUsers(data.data);
        setloading(false);
        toast.success(data.message);
        if(data.data.length < 9) {
          setMore(false);
        }
      }
    } catch (error) {
      toast.error('Error');
      console.error('Error fetching all Users:', error);
    } finally {
      setloading(false);
    }
  }
  const handleShowMore = async() => {
    setMl(true)
    const startIndex = allUsers.length;
    try {
      const { data } = await axios.get(`/api/user/all_users?startIndex=${startIndex}`);
      if(data.success) {
        setAllUsers(prev =>[...prev, ...data.data]);
        if(data.data.length < 9) {
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
              <h1 className='text-2xl text-slat items-center justify-centere-500'>All Users</h1>
      </div>
      {
        loading && (
          <div className=' w-full flex justify-center pt-11'>
            <ReactLoading type='bars' color='orange'/>
          </div>
        )
      }
      {
        allUsers.length > 0 && !loading && (
          <div className='items-center w-full p-2'>
            <table className='md:w-[100%] max-md:w-[750px]'>
              <thead className="table-format title">
                <tr className='table-format'>
                  <th>Sr</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created Date</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((item, index) => {
                return (
                  <tr key={index} className='table-format'>
                      <td className='max-sm:text-sm'>{index + 1}</td>
                      <td className='max-sm:text-sm'>{item.name}</td>
                      <td className='max-sm:text-sm'>{item.email}</td>
                      <td className='max-sm:text-sm'>{item.admin}</td>
                      <td><p className='flex max-sm:text-sm'>{moment(item.createdAt).format('ll')}</p></td>
                      <td><button className='p-2 flex text-center items-center justify-center w-full' onClick={() => {setVisible(true); setNewAdmin(item.admin); setUser(item)}}><MdEdit /></button></td>
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
            <button onClick={handleShowMore} className='dark:text-slate-100 gap-2 font-medium text-blue-600 flex items-center dark:hover:text-blue-500 p-1'>Show more {ml && <ReactLoading type='spin' height={10} width={10} color='blue'/>}</button>
          </div>
                      
        )
      }
      
      <Modal title='Update User Role' onCancel={()=> setVisible(false)} open={Visible} footer={null}>
        <EditUser handleUpdate={handleSubmit} value={newAdmin} setValue={setNewAdmin} />
      </Modal>
    </div>
  )
}

export default AllUsers