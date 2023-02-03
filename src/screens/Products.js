import React,{useState,useEffect} from "react";
import ShopIcon from '@mui/icons-material/Shop';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Header from "./Navebar/Header";
import { Button } from "@mui/material";

const ProductsScreen=()=>{
    const [products,setProducts]=useState(null);
    const  axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();


    const {auth} = useAuth();

    useEffect(()=>{
        const allProducts = async () => {
            const res=await axios.get('products',{
            headers: {
                Authorization: 'Bearer ' + auth.accessToken,
                'Content-Type': 'application/json'
            },
            withCredentials: true}
        )
            setProducts(res.data);
        }
        allProducts();
        },[]); 

        const handleClickBuy=async (id)=>{
            navigate(`/buy?${id}`);
        }
    return ( 
        <div>
                <Header/>
                <h1> Featured Products </h1>
                <div className="d-flex flex-row flex-wrap">
                {products && products.map( (product) => {
                    return (
                        <div className="shadow card" style= {{width: "22rem", margin: "25px"}} key={product._id}>
                            <img src={product.image} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text"> {product.description} </p>
                           <Button variant="contained" onClick={(e)=>{handleClickBuy(product._id)}}>Buy <ShopIcon/></Button>
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