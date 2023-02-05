import axios from "../api/axios";

const userAddress=async (obj)=>{
    const res=await axios.post('orders/',obj)
    .then((res)=>{
        console.log(res);
    })
    .catch(err=>{console.log(err)});
    return res;
}
export default userAddress