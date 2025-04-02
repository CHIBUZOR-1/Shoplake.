import { Routes, Route, useNavigate } from 'react-router-dom';
import Hompage from './Pages/Hompage';
import About from './Pages/About';
import Loginpage from './Pages/Loginpage';
import Registerpage from './Pages/Registerpage';
import PageNotFound from './Pages/PageNotFound';
import CartPage from '../src/Pages/Cartlog/CartPage';
import Forgotpassword from './Pages/Forgotpassword';
import Dashboard from './Pages/User/Dashboard';
import UserRoute from './Components/Routes/UserRoute';
import AdminRoute from './Components/Routes/AdminRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AddProduct from './Pages/Admin/AddProduct';
import AllUsers from './Pages/Admin/AllUsers';
import AllProducts from './Pages/Admin/AllProducts';
import Orders from './Pages/Admin/Orders';
import Profile from './Pages/User/Profile';
import Orderz from './Pages/User/Orderz';
import Productpage from './Pages/Productpage';
import PlaceOrder from './Pages/Checkout/PlaceOrder';
import Search from './Pages/Search/Search';
import CategoryProducts from './Pages/CategoryProducts/CategoryProducts';
import ScrollToTop from './Components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import Panel from './Pages/Admin/Panel';
import AdminProfile from './Pages/Admin/AdminProfile';
import Loading from './Components/Loading';
import { useEffect, useState } from 'react';

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => { 
    // Simulate a loading process (e.g., fetching data) 
    setTimeout(() => { 
      setIsLoading(false); 
    }, 3000); // Adjust the loading time as needed 
  }, []); 
  if (isLoading) { 
    return <Loading />; 
  }
  return (
    <>
      <ToastContainer />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Hompage/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Login" element={<Loginpage/>}/>
        <Route path="/dashboard" element={<UserRoute/>}>
          <Route path="user" element={<Dashboard />}>
            <Route path='profile' element={<Profile handleBackToMenu={() => navigate('/dashboard/user')}/>} />
            <Route path='orders' element={<Orderz handleBackToMenu={() => navigate('/dashboard/user')}/>} />
          </Route>
        </Route>
        <Route path="/dashboard" element={<AdminRoute/>}>
          <Route path="admin" element={<AdminDashboard />}>
            <Route path='profile' element={<AdminProfile handleBackToMenu={() => navigate('/dashboard/admin')} />}/>
            <Route path='panel' element={<Panel handleBackToMenu={() => navigate('/dashboard/admin')} />}/>
            <Route path='create-product' element={<AddProduct handleBackToMenu={() => navigate('/dashboard/admin')}/>}/>
            <Route path='all-products' element={<AllProducts handleBackToMenu={() => navigate('/dashboard/admin')}/>}/>
            <Route path='all-users' element={<AllUsers handleBackToMenu={() => navigate('/dashboard/admin')}/>} />
            <Route path='all-orders' element={<Orders handleBackToMenu={() => navigate('/dashboard/admin')}/>} />
          </Route>
        </Route>
        <Route path="/Register" element={<Registerpage/>}/>
        <Route path='/product_category' element={<CategoryProducts/>} />
        <Route path="/cart" element={<CartPage/>}/>
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/search' element={<Search/>} />
        <Route path="/product" element={<Productpage/>}>
            <Route path=':id' element={<Productpage/>} />
        </Route>
        <Route path="/reset-password" element={<Forgotpassword/>}/>
        <Route path="/*" element={<PageNotFound/>}/>

      </Routes>
    </>
  );
}

export default App;
