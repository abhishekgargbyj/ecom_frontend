import { AppBar, Toolbar,Tabs,Tab,Button, useMediaQuery, useTheme, Typography, Drawer} from "@mui/material";
import React from "react";
import DrawerComp from "./DrawerComp";
import useAuth from "../../hooks/useAuth";
import { useNavigate,useLocation } from "react-router-dom";
import useLogout from "../../hooks/useLogout"

const Header = () => {
    
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const {auth} = useAuth();
    const path   = useLocation().pathname;
    const PAGES = ["Search", "Your Account", "Customer Support", "Products"];
    const PATHS = ['/search','/myprofile',  '/customer_support', "/products"]
    if(auth?.roles?.length >= 2){
        PAGES.push("Product Management");
        PATHS.push('/listProducts');
        PAGES.push("All Orders");
        PATHS.push('/admin_orders');
    }
    if(auth?.roles?.length == 1){
        PAGES.push("Orders");
        PATHS.push('/myorders');
    }
    const logout = useLogout();
     const signOut = async () => {
        await logout();
        navigate('/login/user')
    } 
    const onClickHandle = async(path) =>{
        navigate(path);
    }
    let val = PATHS.findIndex((x)=>(x===path));
    val = val<0?PATHS.findIndex((x)=>(x==="/listProducts")):val;
    return ( 
        <React.Fragment>
           <AppBar sx={{background: "#9400d3", mb: "20px"}} position="sticky">
                <Toolbar>
                        {
                            isMatch ? (
                                <>
                                    <Typography>
                                    <img src={require('./logo.png')} style = {{height: "50px"}}/>
                                    </Typography>
                                    <DrawerComp />
                                </>
                            ): (
                                <>
                                    <Tabs value={val} textColor="inherit">
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