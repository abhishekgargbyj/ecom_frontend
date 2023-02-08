import axios from "../api/axios";

const customerdetails=async (objCust)=>{
    const res=await axios.post('customerdetails/',objCust)
    .then((res)=>{
        console.log(res);
    })
    .catch(err=>{console.log(err)});
    return res;
}
export default customerdetails