import axios from "axios";
const updateOrder=async (id)=>{
    const total=10;
    const url="http://localhost:3008/orders/pay";
    const res=await axios.patch(url+'?refid='+id)
    .then((res)=>{
        console.log(res);
    })
    .catch(err=>{console.log(err)});
    return res;
}
export default updateOrder