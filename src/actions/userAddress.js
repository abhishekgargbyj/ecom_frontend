import axios from "axios";
const userAddress=async (obj)=>{
    const total=10;
    const url="http://localhost:3000/orders";
    const res=await axios.post(url+'?total='+total,obj)
    .then((res)=>{
        console.log(res);
    })
    .catch(err=>{console.log(err)});
    return res;
}
export default userAddress