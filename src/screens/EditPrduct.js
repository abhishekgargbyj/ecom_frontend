import { CardContent, Card, Typography, Grid, TextField, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "./Navebar/Header";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { useLocation } from "react-router-dom";


const EditProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImageUrl] = useState('');


   

    const path = useLocation();
    console.log(path)
    const id   = path.search.slice(1);
    const {auth} = useAuth();
    const navigate = useNavigate();
    useEffect(() =>{
    
    const getProducts = async () => {
        const res= await axios.get(`products/${id}`,{
            headers: {
                Authorization: 'Bearer ' + auth.accessToken,
                'Content-Type': 'application/json'
            },
            withCredentials: true}
        )
    }
    getProducts();
    },[])
    const handleSubmit = async ()=>{
        const res=await axios.patch(`products/${id}`,{name,price,description,image},{
            headers: {
                Authorization: 'Bearer ' + auth.accessToken,
                'Content-Type': 'application/json'
            },
            withCredentials: true}
        )
        navigate('/products')
        
    }
    return ( 
            <div> 
        <Header/>
        <Typography gutterBottom variant = "h3" align = "center">
            Please Mention the Product Details!!!
        </Typography>
        <Box component="form" onSubmit = {handleSubmit}>
        <Card>
            <CardContent>
                <Grid container spacing = {1}>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                        label = "Name" 
                        variant = "outlined" 
                        fullWidth 
                        required
                        onChange = { (e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                        label = "Price" 
                        variant = "outlined" 
                        fullWidth 
                        required 
                        onChange = { (e) => setPrice(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField 
                        label = "Description" 
                        multiline rows = {4} 
                        variant = "outlined" 
                        fullWidth 
                        required 
                        onChange = { (e) => setDescription(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField 
                        label = "Image url" 
                        variant = "outlined" 
                        fullWidth 
                        required
                        onChange = { (e) => setImageUrl(e.target.value)}/>
                    </Grid>
                    <Grid item xs = {12} sm = {12}> 
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                <EditIcon />
                                Edit
                            </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        </Box>
    </div>
     );
}
 
export default EditProduct;