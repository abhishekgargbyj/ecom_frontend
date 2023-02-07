import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom'
import axios from "../api/axios"
import useAuth from '../hooks/useAuth';
import { Alert, Snackbar} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const theme = createTheme();

export default function UserLogin() {
  const { setAuth } = useAuth();
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')
    const password = data.get('password')
    if (!email || !password) {
      setError(true)
      return;
    }
    const res = await axios.post('login', { email, password }, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }).then((response) => {
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, password, roles, accessToken })

      localStorage.setItem('userid', email)
      let path = `/products`;
      navigate(path);
    })
  }

  function handleCallbackResponse(response) {
    const userObject = jwtDecode(response.credential);

    const obj = {
      first_name: userObject.given_name,
      email: userObject.email
    }
    console.log(obj);
    const res = axios.post('login/loginThroughOAuth', obj, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }).then((response) => {
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const email = obj.email;
      console.log(roles, accessToken)
      setAuth({ email, roles, accessToken })
      localStorage.setItem('userid', email)
      let path = `/products`;
      navigate(path);
    })

  }
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "86828181707-99s341fsf9ubva3p1e3ut7k5qj8fknu0.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );

  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Snackbar open={error} autoHideDuration={2000}>
              <Alert severity="error">email and password required</Alert>
            </Snackbar>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item>
                <Link to="/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <div id="signInDiv"> Hello </div>
      </Container>
    </ThemeProvider>
  );
}
