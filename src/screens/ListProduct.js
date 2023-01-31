import React,{useState,useEffect} from "react";
import { getAllProduct } from "../actions/productAction";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
const ListProduct=()=>{
    const [products,setProducts]=useState(null);
    useEffect(()=>{
        const allProducts = async () => {
            const data = await  getAllProduct();
            setProducts(data);
            console.log(data)
        }
        allProducts();
       
    },[]);
    return ( 
        <div>
             <h1> Available Products. </h1>
                <ul className="list-group">
                {products && products.map( (product) => {
                    return (
                       <li className="list-group-item d-flex justify-content-between align-items-center" key={product.id}>
                            {product.name}
                            <div> 
                                <button className="btn btn-primary"> Edit <EditIcon/> </button>
                                <button className="btn btn-danger" style={{"margin-left": "5px"}}> Delete <DeleteIcon/> </button>
                             </div>
                        </li>
                    )
                    })}
                </ul>
                <button className='btn btn-success' style ={{"margin-top": "5px"}}> Add A Product. <AddIcon/> </button>
        </div> 
        );
}
export default ListProduct;
