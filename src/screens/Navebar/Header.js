import { AppBar, Toolbar,Tabs,Tab,Button, useMediaQuery, useTheme, Typography, Drawer} from "@mui/material";
import React from "react";
import DrawerComp from "./DrawerComp";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout"

const Header = () => {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const {auth} = useAuth();
    const PAGES = ["Search", "Your Account", "Cart", "Customer Support", "Products"];
    const PATHS = ['/search','/profile', '/userCart', '/listProducts', "/products"]
    if(auth?.roles?.length >= 2){
        PAGES.push("Product Management");
        PATHS.push('/listProducts');
    }
    const logout = useLogout();
     const signOut = async () => {
        await logout();
        navigate('/login/user')
    } 
    const onClickHandle = async(path) =>{
        navigate(path);
    }
    return ( 
        <React.Fragment>
           <AppBar sx={{background: "#9400d3", mb: "20px"}} position="sticky">
                <Toolbar>
                        {
                            isMatch ? (
                                <>
                                    <Typography>
                                        Byjus..
                                    </Typography>
                                    <DrawerComp />
                                </>
                            ): (
                                <>
                                    <Tabs value={0} textColor="inherit">
                                        {
                                            PAGES.map((page,index) =>(
                                                <Tab key={index} label = {page} onClick = {e => onClickHandle(PATHS[index])} />
                                            ))
                                        }
                                    </Tabs>
                                     <Button variant = "contained" style ={{marginLeft: "auto "}} onClick={signOut}> Logout </Button>
                                </>
                            )
                        }
                </Toolbar>
               
            </AppBar> 
        </React.Fragment>
     );
}
 
export default Header;