import React,{useState,useEffect} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Header from "./Navebar/Header";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
const ListProduct=()=>{
    const [products,setProducts]=useState(null);
    const {auth} = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
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
    const handleClickProductAdd = ()=>{
        navigate('/addProduct');
    }
    const handleClickProductDelete = async (id)=>{
        const res=await axios.delete(`products/${id}`,{
            headers: {
                Authorization: 'Bearer ' + auth.accessToken,
                'Content-Type': 'application/json'
            },
            withCredentials: true}
        )
        window.location.reload();
    }
    const handleClickProductEdit = async(id) =>{
        navigate(`/editProduct?${id}`)
    }
    return ( 
        <div>
            <Header/>
             <h1> Available Products. </h1>
                <ul className="list-group">
                {products && products.map( (product) => {
                    return (
                       <li className="list-group-item d-flex justify-content-between align-items-center" key={product._id}>
                            {product.name}
                            <div> 
                                <Button onClick = {(e)=>{handleClickProductEdit(product._id)}} variant="outlined">Edit <EditIcon/></Button>
                                <Button onClick = {(e)=>{handleClickProductDelete(product._id)}}variant="outlined" color="error" sx ={{ml: "5px"}}>Delete <DeleteIcon/></Button> 
                             </div>
                        </li>
                    )
                    })}
                </ul>
                <Button onClick={handleClickProductAdd} variant="outlined" sx = {{mt: "8px"}}>Add A Product. <AddIcon/></Button>
        </div> 
        );
}
export default ListProduct;
