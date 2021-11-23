import * as React from 'react';
import { Fragment } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CandidateCard(props) {
    const { candidate, live, handleSelect, campaignStatus } = props;
    return (
      <Grid item xs={12} md={12}>
        <Card sx={{ display: 'flex' }} style={{backgroundColor: "#F8F8F8"}}>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block', md: 'block' } }}
            image="https://source.unsplash.com/random"
          />
          <CardContent sx={{ flex: 1 }}>
            
            <Typography variant="h3" gutterBottom>
              {candidate.name}
            </Typography>

            <Typography variant="h6" gutterBottom>
              {candidate.description}
            </Typography>

            {candidate.policies.map((policy, idx)=>(
              <Fragment>
                <Typography variant="h5" paragraph inline="true" align="left" paddingLeft="20px">
                  {idx+1} {policy.title}
                </Typography>
                <Typography paragraph inline="true" align="left">
                  {policy.description}
                </Typography>
              </Fragment>
            ))}

            {((live === 1) || (campaignStatus === "ended")) && (
              <Typography variant="subtitle1" paragraph color="#D70040">
                得票數：{candidate.ballots} 票
              </Typography>
            )}
            {(campaignStatus !== "ended") &&(
              <Button variant="outline" size="large" 
                style={{ color: '#000000', border: "2px black solid" }}
                onClick={ () => { handleSelect(candidate); } }
              >
                投票
              </Button>
            )}
          </CardContent>
        </Card>
      </Grid>
    );
  }