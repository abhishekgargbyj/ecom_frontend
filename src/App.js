import  React from 'react';
import {Route,Routes} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import OrdersScreen from './screens/Orders';
import MyProfile from './screens/MyProfile';
import Navbar from './screens/Navbar';
import ProductsScreen from './screens/Products';
import Order from './screens/Order'
import AdminOrders from './screens/AdminOrders';
import Home from './screens/Home'
import ListProduct from './screens/ListProduct';
import UserLogin from './screens/UserLogin';
import Layout from './screens/Layout';
import RequireAuth from './screens/RequiredAuth';

export default function App() {
  return (
    <>

    <Navbar/>

    <Routes>
    <Route path = "/" element = {<Layout />}>
    /* public route */

    <Route path="/login/user" element= { <UserLogin/>} />
    <Route path="/*" element = { <UserLogin/> } />
    /* protected route */
    <Route element = {<RequireAuth/>}>
    <Route path="/listProducts" element = {<ListProduct/>}/>
    <Route path="/products" element = {<ProductsScreen/>} />
    <Route path="/" element={<ProductsScreen />} />
    </Route>


    <Route path="/home" element = {<Home/>}/>
    <Route path="/myprofile" element={<MyProfile/>} />
    <Route path="/myorders" element={<OrdersScreen/>} />
    <Route path="/search" element={<ProductsScreen/>} />
    <Route path="/admin-orders" element={<AdminOrders/>} />
    <Route path="/buy" element={<Order/>} />
    </Route>
    </Routes> 
    </>
    
  );
}
