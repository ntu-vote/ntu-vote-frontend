import * as React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


export default function SecondaryCampaignCard(props) {
    const { campaign, showDuration, showResult, isMdUp } = props;
    const redirectUri = "/voteStation?cpnId="+ campaign.cpnId;
    return (
      <Grid item xs={12} md={12}>
        <CardActionArea component="a" href={redirectUri}>
          <Card sx={{ display: 'flex' }} style={{backgroundColor: "#F8F8F8"}}>
            <CardContent sx={{ flex: 1 }}>
              <Typography 
                component="h2" gutterBottom
                variant={isMdUp? "h3":"h5"} 
              >
                {campaign.title}
              </Typography>
              <Typography variant={isMdUp? "h5": "body1"}  sx={{ marginLeft: "40px", marginRight: "40px" }}>
                {campaign.description}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {/* 規則：{campaign.cpnr_id} {campaign.rule.rule} — {campaign.rule.description}<br/> */}
                {showDuration(campaign)}
              </Typography>
              <Typography variant="subtitle1" color="#D70040" paragraph>
                {showResult(campaign)}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image="https://source.unsplash.com/random"
              alt="secondary-campaign-img"
            />
          </Card>
        </CardActionArea>
      </Grid>
    );
  }