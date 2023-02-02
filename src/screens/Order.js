import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "./Navebar/Header";
import userAddress from '../actions/userAddress';
import doPayment from "../actions/doPayment";
import useAuth from "../hooks/useAuth";

const ProductsScreen = (props) => {

    const state = useState();
    const [name, setName] = useState();
    const [products, setProducts] = useState(null);
    const [products1, setProducts1] = useState(null);
    const location = useLocation();
    const prodId = props.prodId;
    useEffect(() => {
        async function getData() {
            const res = await axios.get( 'products/myP?pid=' + prodId)
                .then(res => {
                    // console.log(res.data)
                    setProducts(res.data)
                })
            return res;
        }
        getData();
    }, []);

    return (
        <>
        <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
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
                    </div>
                    <div className="col-md-6">
                        <Address pid={products && products.product[0]._id}
                            pname={products && products.product[0].name}
                            pprice={products && products.product[0].price}
                            pqty={products && products.product[0].quantity} />
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
    const {auth} = useAuth();
    const handleSubmit = async (event) => {
        let orderData = {};
        event.preventDefault();

        const result = await sendPaymentLink(9999988888, 'rvi', 'abc@gmail.com', props.pprice, props.pname, orderData._id);

        const data = new FormData(document.getElementById("form-id"));

        const obj =
        {
            total: "10",
            cart: {
                id: props.pid,
                name: props.pname,
                price: props.pprice,
                quantity: props.pqty
            },
            userID:auth.email,
            orderStatus: 'pending',
            paymentStatus: 'pending',
            addressInfo:
            {
                address: data.get('address'),
                city: data.get('city'),
                state: data.get('state'),
                postalCode: data.get('postalCode')
            },
            referenceId: result.data.referenceId

        }
        orderData = await userAddress(obj);
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
                // amount: process.env.PACKAGE_AMOUNT,
                amount: price,
                callbackUrl: razorPayCallbackUrl,
                customerEmail: emailID,
                notes: {
                    orderId: orderId
                }
                // expireBy: expireBy,
                // source: gConst.pageSource
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


    return (

        <>
            <div style={{ width: '100%', display: 'flex' }}>


                <form onSubmit={handleSubmit} id="form-id">
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
                        <button type="submit" className="btn btn-primary"  >Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

const Order = (props) => {
    const path=useLocation();
    const prodId=path.search.slice(1);
    console.log(prodId);
    return (
        <>
            {/* <div className="container"> */}
            {/* <div className="row"> */}
            {/* <div className="col-md-6"> */}
            <ProductsScreen prodId={prodId} />
            {/* </div> */}
            <div className="col-md-6">
                {/* <Address id={prodId} /> */}
                {/* </div> */}
            </div>
            {/* </div> */}


        </>
    )
}
export default Order;
export { Address, ProductsScreen }