import axios from "axios"

const URL="http://localhost:3000/products";
const URL1="http://localhost:3008/products/myP";


const getAllProduct = async () => {
    const res=await axios.get(URL)
    return res.data;
    
}

const getProduct = async (prodId) => {

    const res=await axios.get(URL1+"?pid="+prodId)
    .then((res)=>{
        console.log(res.data);
    })
    .catch(err=>{console.log(err)});
    return res;
    
}

export { getAllProduct, getProduct}
// export { getAllProduct}