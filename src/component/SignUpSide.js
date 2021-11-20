import * as React from 'react';
import { useHistory } from "react-router";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from './Copyright';
import { register } from '../utility/register';

const theme = createTheme();

export default function SignUpSide() {
  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    //test student id format
    const validStudentId = /^[a-z]{1}[0-9]{8}$/;
    const isvalidStudentId = validStudentId.test(data.get('studentId'));
    if(!isvalidStudentId){
        alert("學號格式不符");
        return;  
    }

    //test username format
    const validUsername = /^[A-Za-z0-9]+$/;
    const isValidUsername = validUsername.test(data.get('username'));
    if(!isValidUsername){
        alert("用戶名稱格式不符");
        return;  
    }

    //register
    const result = await register(data.get('username'), data.get('password'),
    data.get('displayName'), data.get('realName'),
    data.get('studentId'));
    if(result === "success"){
        alert("註冊成功");
        history.push("/login");
    }
  };

  return (
    <header className="App-header">
        <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: `url(${process.env.REACT_APP_PUBLIC_URL}/background_clear.jpg)`,
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
                <Avatar sx={{ m: 1 }}>
                {/* <LockOutlinedIcon /> */}
                    <img src={process.env.REACT_APP_PUBLIC_URL + '/favicon-32x32.png'} 
                        alt="sign-up-avatar-img"
                    /> 
                </Avatar>
                <Typography component="h1" variant="h5">
                    註冊
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="帳號名稱 （以後登入使用，請記得您的帳號名稱）（英數組合）"
                    name="username"
                    autoComplete="username"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="displayName"
                    label="暱稱"
                    name="displayName"
                    autoComplete="displayName"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="realName"
                    label="真實姓名"
                    name="realName"
                    autoComplete="realName"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="studentId"
                    label="學號（開頭小寫 e.g. b01001001）"
                    name="studentId"
                    autoComplete="studentId"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="密碼"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2}}
                >
                    註冊
                </Button>
                <Grid container>
                    <Grid item xs>
                    </Grid>
                    <Grid item>
                    <Link href="/login" variant="body2">
                        {"已經註冊過帳號了嗎? 登入"}
                    </Link>
                    </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
                </Box>
            </Box>
            </Grid>
        </Grid>
        </ThemeProvider>
    </header>
  );
}