import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import userEvent from '@testing-library/user-event';

import { Link as RouterLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { BASE_URL } from '../global';

import { FormLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    let nav = useNavigate();
    const [admin, setAdmin] = React.useState({role:"developer"})

    const handleRegister = (e) => {
        e.preventDefault()
        axios.post(`${BASE_URL}/developer/register`, admin)
            .then((res) => {
                if (res.data.success) {
                    alert("Register Successfull")
                    nav('/login')
                }
                else {
                    console.log(res)
                    alert("Something went wrong")
                }
            })
            .catch((err) => {
                alert(err.response.data.error)
                console.log(err)
            })
    }
    const handleChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value })
    }
    console.log(admin, 222)

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
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
                        <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                type='number'
                                margin="normal"
                                required
                                fullWidth
                                id="phone"
                                label="Phone"
                                name="phone"
                                autoComplete="phone "
                                autoFocus
                                onChange={handleChange}
                            />
                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                required
                                name="gender"
                                onChange={handleChange}
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                            <TextField
                                type='text'
                                margin="normal"
                                required
                                fullWidth
                                id="address"
                                label="Address"
                                name="address"
                                autoComplete="address"
                                autoFocus
                                onChange={handleChange}
                            />
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Role"
                                onChange={handleChange}
                                defaultValue="developer"
                                name="role"
                                fullWidth
                                required
                            >
                                
                                <MenuItem value='developer'>Developer</MenuItem>
                                <MenuItem value='tester'>Tester</MenuItem>
                            </Select>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleChange}

                            />
                            <TextField
                                margin="normal"

                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                required

                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                                <Grid item>
                                    <RouterLink to="/login" variant="body2">
                                        {"Already have an account? Sign In"}
                                    </RouterLink>
                                </Grid>
                            </Grid>
                            {/* <Copyright sx={{ mt: 5 }} /> */}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}