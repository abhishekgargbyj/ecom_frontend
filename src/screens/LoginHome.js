import React from "react";
import {Link} from 'react-router-dom';
import './LoginHome.css'
const LoginHome=()=>{
    return (
        <>
        <div style={{padding:'10px'}}>
        <navbar className="nav-bar">
        <Link className="nav_link" to="/a" >Byjus-Shop.com</Link>
        <Link className="nav_link" to="/search" > Search </Link>
        <Link className="nav_link" to="/myprofile" >Your Account</Link>
        <Link className="nav_link" to="/myorders" >Cart</Link>
        <Link className="nav_link" to="/contact">Customer Support</Link>
        </navbar>
        </div>
        </>
    )
    
}
export default LoginHome;