import axios from "../api/axios";

const userPaymentPending=async (objPaymentPending)=>{
    const res=await axios.post('customerdetails/',objPaymentPending)
    .then((res)=>{
        console.log(res);
    })
    .catch(err=>{console.log(err)});
    return res;
}
export default userPaymentPending