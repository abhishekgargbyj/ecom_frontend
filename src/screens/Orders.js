import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

import Header from "./Navebar/Header";
import useAuth from "../hooks/useAuth";

const OrdersScreen = () => {
  const state = useState();
  const [name, setName] = useState();
  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState(null);
  const { auth } = useAuth();
  const emailId = auth.email;
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
  return (
    <>
      <Header />

      <div className="container">
        <table class="table table-striped table-hover" border='1' style={{ backgroundColor: '#faf0fc' }}>
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

                  <td >{usr.first_name}</td>

                ))}

                <td >{row.cart.name}</td>
                <td >{row.cart.price}</td>
                <td >{row.orderStatus}</td>
                <td > <img src={row.cart.image} width="100" /> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
export default OrdersScreen;
