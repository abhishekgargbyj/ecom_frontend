import React, { useState } from "react";
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import useLogout from "../../hooks/useLogout"
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const DrawerComp = () => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const PAGES = ["Search", "Your Account", "Customer Support"];
    const PATHS = ['/search','/profile', '/listProducts']

    const {auth} = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();

    const signOut = async () => {
        await logout();
        navigate('/login/user')
    } 
    if(auth?.roles?.length >= 2){
        PAGES.push("Product Management");
        PATHS.push('/listProducts');
        PAGES.push("All Orders");
        PATHS.push('/admin_orders');
    }
    if(auth?.roles?.length == 1){
        PAGES.push("Cart");
        PATHS.push('/myorders');
    }
    const onClickHandle = async(path) =>{
        navigate(path);
    }
    return ( 
        <React.Fragment>
            <Drawer 
            open = {openDrawer}
            onClose = {()=> setOpenDrawer(false)}
            anchor="left"
            >
                <List>
                    {PAGES.map((page, index) => (
                    <ListItemButton key={index} onClick = {e => onClickHandle(PATHS[index])}>
                        <ListItemIcon>
                            <ListItemText>{page}</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                 ))}
                 <ListItemButton onClick = {signOut}>
                        <ListItemIcon>
                            <ListItemText>logout</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
        </List>
            </Drawer>
            <IconButton sx = {{color: 'white', marginLeft: 'auto'}} onClick = {()=>setOpenDrawer(!openDrawer)}>
                    <MenuIcon/>
            </IconButton>
        </React.Fragment>
     );
}
 
export default DrawerComp;