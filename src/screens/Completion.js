import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import updateOrder from "../actions/updateOrder";
import Header from "./Navebar/Header";
import useAuth from "../hooks/useAuth";

const Completion = () => {

    const {auth}=useAuth();
    let urlElements = window.location.href.split('/');
    // console.log(urlElements);
    // console.log(urlElements[3]);
    let urlElements1 = urlElements[3].split('&');
    // console.log(urlElements1[2]);
    let urlElements2 = urlElements1[2].split('=');
    // console.log(urlElements2[1]);
    // console.log(typeof(urlElements2[1]));
    let id=urlElements2[1];
    
    const updateOrder=async (id)=>{
        
        const res=await axios.patch('orders/pay?refid='+id,{
            headers: {
                Authorization: 'Bearer ' + auth.accessToken,
                'Content-Type': 'application/json'
            },
            withCredentials: true})
        .then((res)=>{
            console.log(res);
        })
        .catch(err=>{console.log(err)});
        return res;
    }

    updateOrder(id);
    useEffect(()=>{
        alert('Payment Successful')
    },[])

    return (
        <>
            <Header />
            <div class="alert alert-primary" role="alert">
            <h2>Payment is completed</h2> 
            </div>
            <Link to="/search" className="btn btn-success">Go Back</Link>
        </>
    )
}
export default Completion;