import axios from "axios";
const doPayment=async (payload)=>{
        
        try {
            if (payload) {
              const response = await axios({
                method: 'post',
                url: `${process.env.REACT_APP_PAYMENT_LINK_API}`,
                data: payload,
                headers: {
                  'x-api-key': process.env.REACT_APP_PAYMENT_LINK_API_KEY
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
