import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import Header from "./Navebar/Header";

const AdminOrders = () => {
  const state = useState();
  const [name, setName] = useState();
  const [orders, setOrders] = useState(null);
  const {auth}=useAuth();
  useEffect(() => {
    async function getData() {
      const res = await axios.get('/orders',{
        headers: {
            Authorization: 'Bearer ' + auth.accessToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true})
        .then(res => {
          console.log(res.data)
          setOrders(res.data)
        })
    }
    getData();
  }, []);
  return (
    <>
    <Header/>
      <div className="container">
        <table class="table table-striped table-hover" border='1' style={{backgroundColor:'#faf0fc'}}>
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th scope="col">Pic</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.order.map((row) => (
              <tr scope="row" key={row._id}>
                <td >{row.userID}</td>
                <td >{row.cart.name}</td>
                <td >{row.cart.price}</td>
                <td >{row.orderStatus}</td>
                <td > <img src={row.cart.image} width="100"/> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
export default AdminOrders;
