import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "axios";

const url = "http://localhost:3008/orders";

const AdminOrders = () => {
  const state = useState();
  const [name, setName] = useState();
  const [orders, setOrders] = useState(null);
  const emailId = "abc@gmail.com";
  useEffect(() => {
    async function getData() {
      const res = await axios.get(url)
        .then(res => {
          console.log(res.data)
          setOrders(res.data)
        })
    }
    getData();
  }, []);
  return (
    <>

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
                <td >{row._id}</td>
                <td >{row.cart.name}</td>
                <td >{row.total}</td>
                <td >{row.total}</td>
                <td >{row.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
export default AdminOrders;
