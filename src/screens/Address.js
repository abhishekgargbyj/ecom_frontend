import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import userAddress from '../actions/userAddress';
import Button from '@mui/material/Button';

const Address=()=>{
    const[address,setAddress]=useState();
    const[city,setCity]=useState();
    const[state,setState]=useState();
    const[postalCode,setPostalCode]=useState();

    const handleSubmit=(event)=>{
        event.preventDefault();
        const data=new FormData(event.currentTarget);
        const obj=
        {
            total:"10",
            orderStatus:'pe',
             addressInfo:
            {
                address:data.get('address'),
                city:data.get('city'),
                state:data.get('state'),
                postalCode:data.get('postalCode')
            }
            
        }
        console.log(obj);
        userAddress(obj);
    };

    return (
        
        <>
        <div style={{width:'100%',display:'flex'}}>
       
            <div>

                <form onSubmit={handleSubmit}>
                <label htmlFor="address">Address</label><br/>
                    <TextField type="text" id="address" name="address" onChange={(e)=>{setAddress(e.target.value)}} />
                    <br/><br/><label htmlFor="city">City</label><br/>
                    <TextField type="text" id="city" name="city" onChange={(e)=>{setCity(e.target.value)}} />
                    <br/><br/><label htmlFor="state">State</label><br/>
                    <TextField type="text" id="state" name="state" onChange={(e)=>{setState(e.target.value)}} />
                    <br/><br/><label htmlFor="postalCode">PostalCode</label><br/>
                    <TextField type="text" id="postalCode" name="postalCode" onChange={(e)=>{setPostalCode(e.target.value)}} /><br/><br/>
                   
                    
                    <Button variant="outlined" type="submit">Submit</Button>
                </form>
            </div>
            </div>
        </>
    )
}
export default Address;