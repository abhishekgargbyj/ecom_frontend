import  React from 'react';
import {Route,Routes} from 'react-router-dom';
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import OrdersScreen from './screens/Orders';
import MyProfile from './screens/MyProfile';
import Navbar from './screens/Navbar';
import Address from './screens/Address';
import ProductsScreen from './screens/Products';
import Order from './screens/Order'
import AdminOrders from './screens/AdminOrders';
export default function App() {
  return (
    <>

    <Navbar/>

    <Routes>
    <Route path="/myprofile" element={<MyProfile/>} />
    <Route path="/myorders" element={<OrdersScreen/>} />
    <Route path="/search" element={<ProductsScreen/>} />
    <Route path="/admin-orders" element={<AdminOrders/>} />
    <Route path="/buy" element={<Order/>} />
    </Routes>
    {/* <OrdersScreen/>
    <MyProfile/> */}

    </>
    
  );
}
