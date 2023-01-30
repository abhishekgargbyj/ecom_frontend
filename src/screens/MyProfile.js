import React,{useState,useEffect} from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
const url="http://localhost:3008/user/myuser";

const MyProfile=()=>{
    const emailId="abc@gmail.com";
    const state=useState();
    const [users,setUsers]=useState(null);
    useEffect(()=>{
        // alert('hi')
        async function getData(){
            const res=await axios.get(url+'?emailId='+emailId)
            .then(res=>{
                console.log(res.data)
                
                setUsers(res.data)
                
            })

        }
        getData();

    },[]);
    return (
       <>

       <h2 >My Profile</h2>
            {/* <Container maxWidth="lg" style={{marginTop:'50px'}}>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>

            <TableCell align="center">FName</TableCell>
            <TableCell align="center">LName</TableCell>
            <TableCell align="center">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.user.map((usr) => (
            <TableRow
              key={usr._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell align="center">{usr.first_name}</TableCell>
              <TableCell align="center">{usr.last_name}</TableCell>
              <TableCell align="center">{usr.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container> */}


    <div className="container">
    <table class="table table-success table-hover">
  <thead>
    <tr>
      <th scope="col">FName</th>
      <th scope="col">LName</th>
      <th scope="col">Email</th>
    </tr>
  </thead>
  <tbody>
    {users && users.user.map((usr) => (
            <tr scope="row" key={usr._id}>
              <td >{usr.first_name}</td>
              <td >{usr.last_name}</td>
              <td >{usr.email}</td>
            </tr>
          ))}
  </tbody>
</table>
</div>
        </>
    )
}
export default MyProfile;
// module.exports={fun}