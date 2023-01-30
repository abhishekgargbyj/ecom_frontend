import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import userAddress from '../actions/userAddress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useLocation } from "react-router-dom";


const url = "http://localhost:3008/products/myP";
// const prodId='';
const ProductsScreen = (props) => {
    const state = useState();
    const [name, setName] = useState();
    // const [prodId,setprodId]=useState(null);
    const [products, setProducts] = useState(null);
    const location = useLocation();
    const prodId = props.prodId;
    useEffect(() => {
        // alert('hi')
        // setprodId('p1');
        async function getData() {
            const res = await axios.get(url + '?pid=' + prodId)
                .then(res => {
                    console.log(res.data)
                    setProducts(res.data)
                    // setprodId(res.data.product[0].id);
                })
        }
        getData();


    }, []);

    return (
        <>

            {/* <Container maxWidth="lg" style={{marginTop:'50px'}}>
            <TableContainer component={Paper} >
      <Table sx={{ minWidth: 500 }} aria-label="simple table" >
        <TableHead>
          <TableRow>

            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Availability</TableCell>
            <TableCell align="right">ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products && products.product.map((prd) => (
            <TableRow
              key={prd._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell align="right">{prd.name}</TableCell>
              <TableCell align="right">{prd.price}</TableCell>
              <TableCell align="right">{prd.isAvailability}</TableCell>
              <TableCell align="right">{prd.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container> */}
            

    <table class="table table-success table-hover">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Availability</th>
      <th scope="col">ID</th>
    </tr>
  </thead>
  <tbody>
    {products && products.product.map((prd) => (
            <tr scope="row" key={prd._id}>
              <td >{prd.name}</td>
              <td >{prd.price}</td>
              <td >{prd.isAvailability}</td>
              <td >{prd.id}</td>
            </tr>
          ))}
  </tbody>
</table>

        </>
    )
}


const Address = (props) => {
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [postalCode, setPostalCode] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const obj =
        {
            total: "10",
            cart: {
                id: props.id
            },
            orderStatus: 'pe',
            addressInfo:
            {
                address: data.get('address'),
                city: data.get('city'),
                state: data.get('state'),
                postalCode: data.get('postalCode')
            }

        }
        console.log(obj);
        userAddress(obj);
    };

    return (

        <>
            <div style={{ width: '100%', display: 'flex' }}>

                {/* <div>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="address">Address</label><br />
                        <TextField type="text" id="address" name="address" onChange={(e) => { setAddress(e.target.value) }} />
                        <br /><br /><label htmlFor="city">City</label><br />
                        <TextField type="text" id="city" name="city" onChange={(e) => { setCity(e.target.value) }} />
                        <br /><br /><label htmlFor="state">State</label><br />
                        <TextField type="text" id="state" name="state" onChange={(e) => { setState(e.target.value) }} />
                        <br /><br /><label htmlFor="postalCode">PostalCode</label><br />
                        <TextField type="text" id="postalCode" name="postalCode" onChange={(e) => { setPostalCode(e.target.value) }} /><br /><br />


                        <Button variant="outlined" type="submit">Submit</Button>

                        
                    </form>
                </div> */}
                <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
                                <input type="text" className="form-control" id="address" name="address" onChange={(e) => { setAddress(e.target.value) }} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">City</label>
                                <input type="text" className="form-control" id="city" name="city" onChange={(e) => { setCity(e.target.value) }} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">State</label>
                                <input type="text" className="form-control" id="state" name="state" onChange={(e) => { setState(e.target.value) }} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">PostalCode</label>
                                <input type="text" className="form-control" id="postalCode" name="postalCode" onChange={(e) => { setPostalCode(e.target.value) }} />
                            </div>
                            <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
            </div>
        </>
    )
}

const Order = (props) => {
    const fld = 'product id is here';
    // const location = useLocation();

    // const {product_id}=location.state();
    const prodId = 'p1'
    console.log(prodId)
    return (
        <>
            <div className="container">
                <div className="row">
                <div className="col-md-6">
                <ProductsScreen prodId={prodId} />
                </div>
                <div className="col-md-6">
                <Address id={prodId} />
                </div>
                </div>
            </div>


        </>
    )
}
export default Order;