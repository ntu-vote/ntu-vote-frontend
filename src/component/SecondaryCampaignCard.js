import * as React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


export default function SecondaryCampaignCard(props) {
    const { campaign } = props;
    const redirectUri = "/voteStation?campaign="+ campaign.cpn_id;
    return (
      <Grid item xs={12} md={12}>
        <CardActionArea component="a" href={redirectUri}>
          <Card sx={{ display: 'flex' }} style={{backgroundColor: "#F8F8F8"}}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h3">
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
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: 'block', sm: 'block' } }}
              image="url(https://source.unsplash.com/random)"
              alt="secondary-campaign-img"
            />
          </Card>
        </CardActionArea>
      </Grid>
    );
  }