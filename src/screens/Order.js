import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "./Navebar/Header";
import userAddress from '../actions/userAddress';
import doPayment from "../actions/doPayment";
import userPaymentPending from "../actions/userPaymentPending";
import useAuth from "../hooks/useAuth";

const ProductsScreen = (props) => {

    const state = useState();
    const [name, setName] = useState();
    const [products, setProducts] = useState(null);
    const [users, setUsers] = useState();
    const [products1, setProducts1] = useState(null);
    const emailId = localStorage.getItem('userid');
    const prodId = props.prodId;
    useEffect(() => {
        async function getData() {
            const res = await axios.get('products/myP?pid=' + prodId)
                .then(res => {
                    setProducts(res.data)
                })
            return res;
        }
        getData();

        async function getUserData1() {
            const res = await axios.get('user/myuser?emailId=' + emailId)
                .then(res => {
                    setUsers(res.data)
                })
        }
        getUserData1();
    }, []);

    return (
        <>
            <Header />

            <div className="container">
                <div className="row">
                    {products && products.product.map((product) => {
                        return (
                            <div className="shadow card" style={{ width: "22rem", margin: "25px" }} key={product._id}>
                                <img src={product.image} class="card-img-top" alt={product.name} />
                                <div className="card-body">
                                    <h5 className="card-title">Name - {product.name}</h5>
                                    <h5 className="card-title">Price - {product.price}</h5>
                                    <p className="card-text">Description - {product.description} </p>

                                </div>
                            </div>
                        )
                    })}

                    <div className="col-md-6">
                        <Address pid={products && products.product[0]._id}
                            pname={products && products.product[0].name}
                            pprice={products && products.product[0].price}
                            ppic={products && products.product[0].image}
                            uname={users && users.user[0].first_name} />
                    </div>

                </div>
            </div>
        </>
    )
}


const Address = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [address, setAddress] = useState();

    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [postalCode, setPostalCode] = useState();
    const [phone, setPhone] = useState();
    const emailId = localStorage.getItem('userid');

    const handleSubmit = async (event) => {
        let orderData = {};
        let paymentPending = {};
        event.preventDefault();
        const data = new FormData(document.getElementById("form-id"));
        const phn=data.get('phn')
        const result = await sendPaymentLink(phn, props.uname, emailId, props.pprice, props.pname, orderData._id);

        const obj =
        {
            cart: {
                id: props.pid,
                name: props.pname,
                price: props.pprice,
                image: props.ppic
            },
            userID: emailId,
            orderStatus: 'pending',
            paymentStatus: 'pending',
            phone:data.get('phn'),
            addressInfo:
            {
                address: data.get('address'),
                city: data.get('city'),
                state: data.get('state'),
                postalCode: data.get('postalCode')
            },
            referenceId: result.data.referenceId

        }
        const objPaymentPending =
        {
            userName: emailId,
            phone:data.get('phn'),
            address: data.get('address'),
            referenceId: result.data.referenceId

        }
        orderData = await userAddress(obj);
        paymentPending = await userPaymentPending(objPaymentPending);
    };

    async function sendPaymentLink(phone, customerName, emailID, price, product, orderId) {
        try {
            let result = {};
            if (!phone || !customerName) {
                return {
                    message: 'Mobile Number / Customer Name is required',
                };
            }
            let razorPayCallbackUrl = "http://localhost:3001/completion";
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
            // console.log(result.data.paymentUrl)
            window.location.href = result.data.paymentUrl;
            return result;
        }
        catch (err) {
            return {
                message: `Unable to send Payment Link, please try again later`,
            };
        }
    }

    return (

        <>
            <div style={{ width: '100%', display: 'flex' }}>

                <form onSubmit={handleSubmit} id="form-id">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Address*</label>
                        <input type="text" required className="form-control" id="address" name="address" onChange={(e) => { setAddress(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">City*</label>
                        <input type="text" required className="form-control" id="city" name="city" onChange={(e) => { setCity(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">State*</label>
                        <input type="text" required className="form-control" id="state" name="state" onChange={(e) => { setState(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">PostalCode*</label>
                        <input type="text" required className="form-control" id="postalCode" name="postalCode" onChange={(e) => { setPostalCode(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Phone Number*</label>
                        <input type="text" required className="form-control" id="phn" name="phn" onChange={(e) => { setPhone(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary"  >Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

const Order = (props) => {
    const path = useLocation();
    const prodId = path.search.slice(1);
    console.log(prodId);
    return (
        <>
            <ProductsScreen prodId={prodId} />
        </>
    )
}
export default Order;
export { Address, ProductsScreen }