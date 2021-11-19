import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function Header(props) {
    return (
        <Paper
        sx={{
            position: 'relative',
            backgroundColor: 'grey.800',
            color: '#fff',
            mb: 4,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(https://source.unsplash.com/random)`,
        }}
        >
        {<img style={{ display: 'none' }} 
            src="url(https://source.unsplash.com/random)"
            alt="primary-campaign-img"/>}
        <Box
            sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)'
            }}
        />
        <Grid container>
            <Grid item md={6}>
            <Box
                sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 }
                }}
            >
            </Box>
            </Grid>
        </Grid>
        </Paper>
    );
}