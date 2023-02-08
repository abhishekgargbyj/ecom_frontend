import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { Link, useLocation } from "react-router-dom";

import Header from "./Navebar/Header";
import useAuth from "../hooks/useAuth";

const CompletionPending = () => {
    const path = useLocation();
    const refId = path.search.slice(1,14);
    const {auth}=useAuth();

    const updateOrder=async ()=>{
        
        const res=await axios.patch('orders/pay?refid='+refId,{
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

    updateOrder();

    useEffect(()=>{
        alert('Payment Successful')
    },[])

    return (
        <>
            <Header />
            <div class="alert alert-primary" role="alert">
            <h2>Pending Payment is completed</h2> 
            </div>
            <Link to="/myorders" className="btn btn-success">Go Back</Link>
        </>
    )
}
export default CompletionPending;