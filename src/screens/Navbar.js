import React, { createContext } from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>

      <div className="container">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <Link className="nav_link" to="/a" >Byjus-Shop.com</Link>
                </li>
                <li class="nav-item">
                  <Link className="nav_link" to="/search"> Search </Link>
                </li>
                <li class="nav-item">
                  <Link className="nav_link" to="/myprofile" >Your Account</Link>
                </li>
                <li class="nav-item">
                  <Link className="nav_link" to="/myorders" >Cart</Link>
                </li>
                <li class="nav-item">
                  <Link className="nav_link" to="/admin-orders">Admin Orders</Link>
                </li>
                <li class="nav-item">
                  <Link className="nav_link" to="/contact">Customer Support</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  )

}
export default Navbar;