import axios from "axios"
const URL = "http://localhost:3000/"


const userRegister = async (obj) => {
    const url = URL+"user/register";
    const res = await axios.post(url,obj)
    .catch(err=>{console.log(err)});
    return res;
}

 
export  { userRegister }