import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
const url="http://localhost:3008/orders/myorders";


const OrdersScreen=()=>{
    const state=useState();
    const [name,setName]=useState();
    const [orders,setOrders]=useState(null);
    const emailId="abc@gmail.com";
    useEffect(()=>{
        // alert('hi')
        async function getData(){
            const res=await axios.get(url+'?emailId='+emailId)
            .then(res=>{
                console.log(res.data)
                setOrders(res.data)
            })
        }
        getData();
    },[]);
    return (
       <>
            {/* <Container maxWidth="lg">
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Name</TableCell>
            <TableCell align="right">Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders && orders.order.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell align="right">{row.cart.name}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
              <TableCell align="right">{row.orderStatus}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container> */}

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
              <td >{row.orderStatus}</td>
              <td >{row.protein}</td>
            </tr>
          ))}
  </tbody>
</table>
</div>
        </>
    )
}
export default OrdersScreen;
