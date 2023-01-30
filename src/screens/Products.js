import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import Address from "./Address";
const url="http://localhost:3008/products";

const ProductsScreen=()=>{
    const state=useState();
    const [name,setName]=useState();
    const [products,setProducts]=useState(null);
    useEffect(()=>{
        // alert('hi')
        async function getData(){
            const res=await axios.get(url)
            .then(res=>{
                console.log(res.data)
                setProducts(res.data)
            })
        }
        getData();
    },[]);
    return (
       <>

       {/* <div>
       {products && <List products={products.product}/>}
       </div> */}
       
        <div className="contain" style={{display:'flex',height:'100px'}}>
                <div className="list" style={{height:'200px',marginTop:'100px'}}>
                    <p>Product</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                       

                            {products && products.product.map(prd => (<tr key={prd._id}>
                            <td>{prd.name}</td>

                            <td>{prd.price}</td>
                            <td>{prd.isAvailability}</td>
                            </tr>))}

                        </tbody>
                    </table>
                   
                </div>

                <Link to="/buy" state={{product_id:"p1"}}>Buy</Link>
            </div>
            
        </>
    )
}
export default ProductsScreen;
