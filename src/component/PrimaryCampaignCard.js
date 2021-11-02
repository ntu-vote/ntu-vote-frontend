import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CardActionArea from '@mui/material/CardActionArea';

export default function PrimaryCampaignCard(props) {
    const { campaign } = props;
    const redirectUri = "/voteStation?campaign="+ campaign.cpn_id;
    return (
        <CardActionArea component="a" href={redirectUri}>
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
            {/* Increase the priority of the hero background image */}
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
                backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />
            <Grid container>
                <Grid item md={6}>
                <Box
                    sx={{
                    position: 'relative',
                    p: { xs: 3, md: 6 },
                    pr: { md: 0 },
                    }}
                >
                    <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                        {campaign.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {campaign.status}  {campaign.startTime}-{campaign.endTime}
                    </Typography>
                    <Typography variant="h5" paragraph>
                        {campaign.description}
                    </Typography>
                    ({campaign.status} === "ended") &&(
                    <Typography variant="h5" color="#D70040" paragraph>
                        {campaign.result}
                    </Typography>
                    )
                    <Typography variant="subtitle1" paragraph>
                        制度：{campaign.cpnr_id} {campaign.rule.rule} — {campaign.rule.description}
                    </Typography>
                    <Typography variant="h6" color="inherit" paragraph>
                        點我去投票
                    </Typography>
                </Box>
                </Grid>
            </Grid>
            </Paper>
        </CardActionArea>
    );
}