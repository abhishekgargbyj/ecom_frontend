import { CardContent, Card, Typography, Grid, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import Header from "./Navebar/Header";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImageUrl] = useState('');
    const {auth} = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(auth.accessToken)
        const res=await axios.post('products',{name,price,description,image},{
            headers: {
                Authorization: 'Bearer ' + auth.accessToken,
                'Content-Type': 'application/json'
            },
            withCredentials: true}
        )
        navigate('/listProducts')
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
                        placeholder = "Enter Product Name." 
                        variant = "outlined" 
                        fullWidth 
                        required
                        onChange = { (e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item sx={12} sm={6}>
                        <TextField 
                        label = "Price" 
                        placeholder = "Enter Product Price" 
                        variant = "outlined" 
                        fullWidth 
                        required 
                        onChange = { (e) => setPrice(e.target.value)}/>
                    </Grid>
                    <Grid item sx={12} sm={12}>
                        <TextField 
                        label = "Description" 
                        multiline rows = {4} 
                        placeholder = "Enter Product Description"
                        variant = "outlined" 
                        fullWidth 
                        required 
                        onChange = { (e) => setDescription(e.target.value)}/>
                    </Grid>
                    <Grid item sx={12} sm={12}>
                        <TextField 
                        label = "Image url" 
                        placeholder = "Please Enter an url link to the image. " 
                        variant = "outlined" 
                        fullWidth 
                        required
                        onChange = { (e) => setImageUrl(e.target.value)}/>
                    </Grid>
                    <Grid item sx = {12} sm = {12}> 
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                <AddIcon />
                                Submit
                            </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        </Box>
    </div> );
}
 
export default AddProduct;