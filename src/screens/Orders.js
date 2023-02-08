import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

import doPayment from "../actions/doPayment";
import Header from "./Navebar/Header";
import useAuth from "../hooks/useAuth";

const OrdersScreen = () => {
  const state = useState();
  const [name, setName] = useState();
  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState(null);
  const { auth } = useAuth();
  const emailId = localStorage.getItem('userid');
  useEffect(() => {
    async function getOrderData() {
      const res = await axios.get('orders/myorders?emailId=' + emailId, {
        headers: {
          Authorization: 'Bearer ' + auth.accessToken,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
        .then(res => {
          console.log(res.data)
          setOrders(res.data)
        })
    }

    async function getUserData() {
      const res = await axios.get('user/myuser?emailId=' + emailId, {
        headers: {
          Authorization: 'Bearer ' + auth.accessToken,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
        .then(res => {
          console.log(res.data)

          setUsers(res.data)

        })
    }

    getOrderData();
    getUserData();

  }, []);

  const updateOrder=async (id,status,phn,cust_name,userId,price,prodName)=>{
    
    if(status==='Done'){
      alert('Payment Already Done');
      return;
    }
    const result = await sendPaymentLink(phn,cust_name, userId, price, prodName, id);
  }

async function sendPaymentLink(phone, customerName, emailID, price, product, id) {
  try {
      let result = {};
      if (!phone || !customerName) {
          return {
              message: 'Mobile Number / Customer Name is required',
          };
      }
      let razorPayCallbackUrl = `http://localhost:3001/completionpending?${id}`;
      const payload = {
          customerName: customerName,
          course: 'coursea',
          salesEmail: "sales@gmail.com",
          provider: 'RAZORPAY',
          phone: phone,
          amount: price,
          callbackUrl: razorPayCallbackUrl,
          customerEmail: emailID,
      }
      const data = {
          phoneNumber: payload.phone
      };
      result = await doPayment(payload);
      window.location.href = result.data.paymentUrl;
      return result;
  }
  catch (err) {
      return {
          message: `Unable to send Payment Link, please try again later`,
      };
  }
}
let cust_name='';
  return (
    <>
      <Header />

      <div className="container">
        <table className="table table-striped table-hover" border='1' style={{ backgroundColor: '#faf0fc' }}>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th scope="col">Pic</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.order.map((row) => (
              <tr scope="row" key={row._id}>
                {users && users.user.map((usr) => (

                  <td >{cust_name=usr.first_name}</td>
                  
                ))}

                <td >{row.cart.name}</td>
                <td >{row.cart.price}</td>
                <td >{row.orderStatus}</td>
                <td > <img src={row.cart.image} width="100" /> </td>

                <td>  <button type="button"  class="btn btn-outline-danger" onClick={()=>{updateOrder(row.referenceId,row.orderStatus,row.phone,cust_name,row.userId,row.cart.price,row.cart.name)}} >Pay</button></td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
     
  )

}

export default OrdersScreen;
