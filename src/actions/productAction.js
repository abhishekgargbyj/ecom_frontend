import axios from "axios"

const URL="http://localhost:3000/products";


const getAllProduct = async () => {
    const res=await axios.get(URL)
    return res.data;
    
}


export { getAllProduct }