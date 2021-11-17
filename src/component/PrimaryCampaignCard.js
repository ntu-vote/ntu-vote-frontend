import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CardActionArea from '@mui/material/CardActionArea';

export default function PrimaryCampaignCard(props) {
    const { campaign, showDuration, showResult } = props;
    const redirectUri = "/voteStation?cpnId="+ campaign.cpnId;

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
                    <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                        {campaign.title}
                    </Typography>
                    <Typography variant="h5" paragraph>
                        {campaign.description}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                        {/* 規則：{campaign.cpnr_id} {campaign.rule.rule} — {campaign.rule.description}<br/> */}
                        {showDuration(campaign)}
                    </Typography>
                    <Typography variant="subtitle1" color="#D70040" paragraph>
                        {showResult(campaign)}
                    </Typography>
                    <Button variant="contained" 
                        style={{ background: '#000000' }}
                    >
                        點我去投票
                    </Button>
                </Box>
                </Grid>
            </Grid>
            </Paper>
        </CardActionArea>
    );
}