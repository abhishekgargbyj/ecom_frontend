import  React from 'react';
import {Route,Routes} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import OrdersScreen from './screens/Orders';
import MyProfile from './screens/MyProfile';
import ProductsScreen from './screens/Products';
import Order from './screens/Order'
import AdminOrders from './screens/AdminOrders';
import Home from './screens/Home'
import ListProduct from './screens/ListProduct';
import UserLogin from './screens/UserLogin';
import RequireAuth from './screens/RequiredAuth';
import Completion from './screens/Completion';
import Customer from './screens/Customer';
// const path = require('path')
// require('dotenv').config('');
import PersistLogin from './screens/PersistLogin';
import RegisterUser from './screens/RegisterUser';
import AddProduct from './screens/AddProduct';
import EditProduct from './screens/EditPrduct';

export default function App() {
  
  return (
   <Routes>
    
    {/* public route */}
    

    { /* protected route users and admin*/ }
    <Route element = {<PersistLogin/>}>
      <Route element = {<RequireAuth allowedRoles = {[1]} /> }>
      <Route path="/products" element = {<ProductsScreen/>} />
      <Route path="/*" element={<ProductsScreen />} />
      <Route path="/" element = {<ProductsScreen />} />
      <Route path="/myprofile" element={<MyProfile/>} />
      <Route path="/customer_support" element={<Customer/>} />
      <Route path="/myorders" element={<OrdersScreen/>} />
      <Route path="/completion" element={<Completion/>} />
      <Route path="/buy" element={<Order/>} />
     </Route>
   
    { /* protected routes only admin */ }
    <Route element = {<RequireAuth allowedRoles = {[2]} /> }>
      <Route path="/listProducts" element = {<ListProduct/>}/>
      <Route path="/addProduct" element = {<AddProduct/>} />
      <Route path="/search" element={<ProductsScreen/>} />
      <Route path="/editProduct" element = {<EditProduct/>}/>
      <Route path="/admin_orders" element={<AdminOrders/>} />
       <Route path="/*" element={<ProductsScreen />} />
      <Route path="/" element = {<ProductsScreen />} />
    </Route>
    </Route>  
    <Route path="/register" element = {<RegisterUser/>} />
    <Route path="/login/user" element= { <UserLogin/>} />
    <Route path = "/" element = {<UserLogin />} />
    <Route path="/*" element = { <UserLogin/> } />

  </Routes> 

  );
}
