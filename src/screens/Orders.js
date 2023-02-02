import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "../api/axios";
import Header from "./Navebar/Header";
import useAuth from "../hooks/useAuth";


const OrdersScreen = () => {
  const state = useState();
  const [name, setName] = useState();
  const [orders, setOrders] = useState(null);
  const [users, setUsers] = useState(null);
  const {auth} = useAuth();
  const emailId = auth.email;
  useEffect(() => {
    async function getData() {
      const res = await axios.get('orders/myorders?emailId=' + emailId)
        .then(res => {
          console.log(res.data)
          setOrders(res.data)
        })

        
    }

    async function getUserData() {
      const res = await axios.get('user/myuser?emailId=' + emailId)
        .then(res => {
          console.log(res.data)

          setUsers(res.data)

        })}

    getData();
    getUserData();

  }, []);
  return (
    <>
<Header/>

      <div className="container">
        <table class="table table-success table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Total</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.order.map((row) => (
              <tr scope="row" key={row._id}>
              {users && users.user.map((usr) => (
              
                <td >{usr.first_name}</td>
              
            ))}
                
                <td >{row.cart.name}</td>
                <td >{row.total}</td>
                <td >{row.total}</td>
                <td >{row.orderStatus}</td>
              </tr>
            ))}

            {/* {users && users.user.map((usr) => (
              <tr scope="row" key={usr._id}>
                <td >{usr.first_name}</td>
                <td >{usr.last_name}</td>
                <td >{usr.email}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </>
  )
}
export default OrdersScreen;
