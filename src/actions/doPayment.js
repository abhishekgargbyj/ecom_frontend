import axios from "axios";

const doPayment=async (payload)=>{
    // console.log(process.env.REACT_APP_PAYMENT_LINK_API);
        // const res=await axios({
        //     method:'post',
        //     // url:`${process.env.PAYMENT_LINK_API}`,
        //     url:"https://dev-pay-nucleus.byjusorders.com/api/payments/generateTransaction",
        //     data:payload,
        //     headers:{
        //         // 'key':process.env.PAYMENT_LINK_API_KEY
        //         'x-api-key':"61555419b92cc5cb258e9741"
        //     }
        // })
        // .then((res)=>{
        //     console.log(res);
        // })
        // .catch(err=>{console.log(err)});
        
        try {
            if (payload) {
              const response = await axios({
                method: 'post',
                url: "https://dev-pay-nucleus.byjusorders.com/api/payments/generateTransaction",
                data: payload,
                headers: {
                  'x-api-key': "61555419b92cc5cb258e9741"
                }
              });
              if (!response) {
                throw new Error("Api call failed!");
              }
              console.log(response);
              return {
                ...response,
                success: true,
                
              };
            }
          } catch (err) {
            return {
              message: err,
            };
          }
    
    
}
export default doPayment
