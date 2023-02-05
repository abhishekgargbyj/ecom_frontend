import axios from "axios"

const URL="http://localhost:3000/products";

const getAllProduct = async () => {
    const res=await axios.get(URL,{
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
    })
    return res.data;
    
}

export { getAllProduct, getProduct}