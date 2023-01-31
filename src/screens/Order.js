import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import userAddress from '../actions/userAddress';

const url = "http://localhost:3008/products/myP";

const ProductsScreen = (props) => {
    const state = useState();
    const [name, setName] = useState();
    const [products, setProducts] = useState(null);
    const location = useLocation();
    const prodId = props.prodId;
    useEffect(() => {
        async function getData() {
            const res = await axios.get(url + '?pid=' + prodId)
                .then(res => {
                    console.log(res.data)
                    setProducts(res.data)
                })
        }
        getData();
        


    }, []);

    return (
        <>

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
            orderStatus: 'pending',
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
        localStorage.setItem("city",city);
        localStorage.removeItem("city",city);
    };

    return (

        <>
            <div style={{ width: '100%', display: 'flex' }}>

             
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