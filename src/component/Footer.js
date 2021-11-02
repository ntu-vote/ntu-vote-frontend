import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from './Copyright';
 
export default function Footer(){
    return(
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          聯絡信箱：ntu-vote@gmail.com
        </Typography>
        <Copyright />
      </Box>
    );
}