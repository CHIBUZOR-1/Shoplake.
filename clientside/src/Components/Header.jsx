import React, {useEffect, useRef, useState} from 'react'
import { BiSearchAlt } from "react-icons/bi";
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";
import './Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { usePass } from '../Context/lakeContext';
import { toast } from 'react-toastify';
import { FiUserCheck } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";



const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {pass, setPass, getTotalCartItems } = usePass();
  const [open, setOpen] = useState(false);
  const [kw, setKw]= useState('');
  const dropdownRef = useRef(null); 

  useEffect(()=> {
    const urlParams = new URLSearchParams(location.search);
    const searchfromUrl = urlParams.get('kw');
    if(searchfromUrl) {
      setKw(searchfromUrl)
    }
  }, [location.search]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside); 
    return () => { 
      document.removeEventListener("mousedown", handleClickOutside); 
    }; 
  }, []); 
  const handleClickOutside = (event) => { 
    if ( dropdownRef.current && !dropdownRef.current.contains(event.target)) { 
      setOpen(false);
    } 
  };

  const handleOpen = () => {
    setOpen(prev => !prev);
  }
  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('src', kw);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)

  }
  const logout = () => {
    localStorage.removeItem("pass");
    setPass({
      ...pass,
      user: null,
      token: ""
    });
    toast.success("Logout Successfully");
    navigate('/');
  }
  return (
    <div className='bg-black flex px-2 py-3 gap-1 items-center justify-between h-[75px] w-full z-20 fixed'>
        <div className='logo'>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit'}}>
            <h2 className='font-bold text-2xl'>SHOPLAKE</h2>
          </Link>
        </div>
        <form className='flex p-1 max-sm:hidden items-center rounded-full h-11 bg-slate-50 gap-1' onSubmit={handleSearch}>
          <input type='text' value={kw} placeholder='search lake...' onChange={(e)=> setKw(e.target.value)} className='p-1 w-full rounded-2xl outline-none bg-slate-50'/>
          <button type='submit' className='flex w-9 h-9 flex-shrink-0 rounded-full items-center justify-center p-2 bg-orange-500'><BiSearchAlt className='text-white' /></button>
        </form>
        <div className='nav-menu'>
            <li className='font-semibold max-md:hidden'><Link  to='/'>HOME</Link></li>
            <Link to={'/About'} className='font-semibold max-md:hidden' ><li>ABOUT</li></Link>
        </div>
        {!pass.token ? 
        <div className='log'>
           <Link className='flex items-center justify-center p-2 bg-orange-500 active:bg-orange-900 rounded-md' to='/Login'><button className='text-slate-50 max-sm:text-sm font-semibold'>LOGIN</button></Link>
        </div> :
        <div ref={dropdownRef} onClick={handleOpen} className='flex max-sm:hidden relative items-center gap-3 rounded-md bg-orange-500 p-2'>
            <div  className='text-slate-50 cursor-pointer rounded-md font-semibold flex items-center justify-center gap-1'>
              <div><FiUserCheck /></div>{pass?.user?.name}<span className='lr'><IoIosArrowDown  className='text-slate-50 font-semibold'/></span>
            </div>
            {open ? 
              <ul className='absolute flex flex-col gap-1 z-30 top-11 p-1 rounded-md w-36 shadow-md ease-in transition-all duration-500 bg-slate-50'>
                {
                  pass?.user.role === "ADMIN" ?
                    <Link to={`/dashboard/admin/panel`}>
                      <li className='w-full active:bg-orange-500 cursor-pointer bg-orange-500 rounded-md text-slate-50 font-semibold p-2'>Dashboard</li>
                    </Link> : 
                    <Link to={`/dashboard/user/profile`}>
                      <li className='w-full active:bg-orange-500 cursor-pointer bg-orange-500 rounded-md text-slate-50 font-semibold p-2'>Dashboard</li>
                    </Link>
                }
                
                <div onClick={()=>logout()}><li className='text-slate-50 cursor-pointer bg-orange-500 font-semibold active:bg-orange-500 p-2 rounded-md w-full'>&#8594;LOGOUT</li></div>
              </ul> : null
            }
        </div>
        }
        
        
        <div className='relative flex justify-center items-center'>
          <PiShoppingCartSimpleDuotone className='text-slate-50 cursor-pointer max-md:text-3xl text-4xl' onClick={()=>navigate('/cart')} />
          <p className='text-slate-50 p-1 rounded-full max-md:h-4 max-md:w-4 max-md:text-xs w-5 -right-1 bottom-5 h-5 flex items-center justify-center absolute bg-red-500'>{getTotalCartItems()}</p>
        </div>
    </div>
  )
}

export default Header