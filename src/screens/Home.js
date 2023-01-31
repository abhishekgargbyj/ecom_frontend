import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home() {
  return (
      <Grid container spacing={2} 
        columns={16} 
        sx = {{ mt: 40, ml: 40}}
        /* alignItems="center"
        justifyContent="center"
        style={{ height: '300px' }} */
        >
        <Grid item xs={5} >

          <Button  variant="contained">
            <Link to='login/user' style={{textDecoration: 'none'}}> Login as user. </Link>
          </Button>
        </Grid>
        <Grid item xs={5}>
        <Button variant="contained">
            <Link to='login/admin' style={{textDecoration: 'none'}}> Login as admin. </Link>
        </Button>
      </Grid>
    </Grid>
  );
}
