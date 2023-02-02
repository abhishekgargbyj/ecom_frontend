import React,{useState,useEffect} from "react";
import ShopIcon from '@mui/icons-material/Shop';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Order from "./Order";

import { Button } from "@mui/material";
import Header from "./Navebar/Header";
const ProductsScreen=()=>{
    const [products,setProducts]=useState(null);
    const  axiosPrivate = useAxiosPrivate();
    const URL="http://localhost:3000/products";

    const {auth} = useAuth();

   

    useEffect(()=>{
        const allProducts = async () => {
            const res=await axiosPrivate.get('products',{
            headers: {
                Authorization: 'Bearer ' + auth.accessToken,
                'Content-Type': 'application/json'
            },
            withCredentials: true}
        )
            console.log(res.data)
            setProducts(res.data);
        }
        allProducts();
        },[]); 
    return ( 
        <div>
                <Header/>
                <h1> Featured Products </h1>
                <div className="d-flex flex-row flex-wrap">
                {products && products.map( (product) => {
                    return (
                        <div className="card" style= {{width: "22rem", margin: "25px"}} key={product._id}>
                            <img src={product.image} class="card-img-top" alt={product.name} />
                            <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text"> {product.description} </p>
                           <Button variant="contained">Buy <ShopIcon/></Button>
                           <Button variant="contained" sx ={{ml: "5px"}}>Add to Cart<ShoppingCartIcon/></Button> 
                        </div>
                        </div>
                    )
                    })}
                </div>
        </div> 
        );
}
export default ProductsScreen;
