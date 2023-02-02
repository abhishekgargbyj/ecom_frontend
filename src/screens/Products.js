import React,{useState,useEffect} from "react";
import { getAllProduct } from "../actions/productAction";
import ShopIcon from '@mui/icons-material/Shop';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useRefreshToken from "../hooks/useRefreshToken";
import { useNavigate } from "react-router-dom";
import Order from "./Order";

const ProductsScreen=()=>{
    const [products,setProducts]=useState(null);
    const refresh = useRefreshToken();
    useEffect(()=>{
        const allProducts = async () => {
            const data = await  getAllProduct();
            setProducts(data);
        }
        allProducts();
       
    },[]);
   let navigate = useNavigate(); 
     const routeChange = () =>{ 
     let path = `/listProducts`; 
     navigate(path);
    } 
    return ( 
        <div>

                <h1> Featured Products </h1>
                <div className="d-flex flex-row flex-wrap">
                {products && products.map( (product) => {
                    return (
                        <div className="card" style= {{width: "18rem", margin: "25px"}} key={product._id}>
                            <img src={product.image} class="card-img-top" alt={product.name} />
                            <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text"> {product.description} </p>
                            <a href="#" className="btn btn-primary">Buy <ShopIcon/></a>
                            <a href="#" className="btn btn-primary" style= {{ margin: "5px"}}> Add to Cart<ShoppingCartIcon/> </a>
                        </div>
                        </div>
                    )
                    })}
                </div>
               <button onClick={routeChange}>ProductList</button>  
                {/* <button onClick={refresh} >
                    ProductList
                </button> */}

                <Order></Order>
        </div> 
        );
}
export default ProductsScreen;
