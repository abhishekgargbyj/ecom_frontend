import axios from "axios"
import useAuth from "./useAuth";
const useRefreshToken = () => {
    const {setAuth} = useAuth();
    const url       = "http://localhost:3000/refresh";
    const refresh = async () => {
        const response = await axios.get(url, {
            withCredentials: true
        })
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {
                ...prev, 
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        })
        return response.data.accessToken;
    }
    return refresh;
}
 
export default useRefreshToken;