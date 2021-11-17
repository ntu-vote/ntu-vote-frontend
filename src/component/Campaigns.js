import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router";
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PrimaryCampaignCard from './PrimaryCampaignCard';
import SecondaryCampaignCard from './SecondaryCampaignCard';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Footer from './Footer';
import { getCampaignList } from '../utility/getCampaignList'; 

const theme = createTheme();

export default function Campaigns() {
  const [campaignList, setCampaignList] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const showResult = useCallback((campaign) =>{
    if (campaign.status === "ended"){
      return(
          `最高得票數：${campaign.result} 票`
      )}
    }, []
  )
  const showDuration = useCallback((campaign) =>{
    if (campaign.status === "ended"){
      return(
        "投票已結束"
      );
    }
    else{
      return(
        `投票期限：${campaign.startTime.slice(0, -7)} 到 ${campaign.endTime.slice(0, -7)}`
      );
    }},[campaignList]
  );

  useEffect(() => {
    setLoading(true);
    (async() => { 
      const campaigns = await getCampaignList();
      console.log(campaigns);
      if (campaigns === "fail"){
        history.push("/login")
      }
      else{
        setCampaignList(campaigns);
      }
      setLoading(false);
    })()
  }, []);

  if (loading){
    return(
      <Typography variant="h6" color="inherit" noWrap>
        請稍等片刻 ○ ○ ○
      </Typography>
    );
  }
  if (campaignList.length === 0){
    return(
      <Typography variant="h6" color="inherit" noWrap>
        現在沒有任何投票活動喔！
      </Typography>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative" style={{ background: '#000000' }}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            NTU VOTE
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* primary */}
        <PrimaryCampaignCard
          campaign={campaignList[0]}
          showDuration={showDuration}
          showResult={showResult}
        />
        {/* header */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              NTU VOTE <br/>台大專屬投票平台
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              擇你所愛，愛你所選！
            </Typography>
            {/* <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={5}
              justifyContent="center"
            >
              <Button variant="contained" href='./register' 
                style={{ background: '#000000' }}
              >
                  好想趕快投票，點我去註冊！
              </Button>
              <Button variant="outlined" href='./login' 
                style={{ color: '#000000', border: "2px black solid" }}
              >
                早就註冊好了，點我去登入！
              </Button>
            </Stack> */}
          </Container>
        </Box>
        {/* secondary */}
        <Container sx={{ py: 8 }}>
          <Grid container spacing={4}>
            {campaignList.slice(1, 2).map((campaign) => (
              <SecondaryCampaignCard
                key={campaign.cpn_id}
                campaign={campaign}
                showDuration={showDuration}
                showResult={showResult}
              />
            ))}
          </Grid>
        </Container>
        <Container sx={{ py: 8 }}>
          {/* End hero unit */}
          <Grid container spacing={4}>
          {campaignList.slice(3).map((campaign) => {
              const redirectUri = "/voteStation?cpnId="+ campaign.cpnId;
              return(
                <Grid item key={campaign.title} xs={12} sm={6} md={4}>
                  <CardActionArea component="a" href={redirectUri}>
                    <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    style={{backgroundColor: "#F8F8F8"}}
                    >
                      <CardMedia
                          component="img"
                          sx={{
                          pt: '0%',
                          }}
                          image="https://source.unsplash.com/random"
                          alt="tertiary-campaign-img"
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography component="h2" variant="h3">
                          {campaign.cpn_id} {campaign.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          {campaign.status}  {campaign.startTime}-{campaign.endTime}
                        </Typography>
                        <Typography variant="h5" paragraph>
                          {campaign.description}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                          {/* 規則：{campaign.cpnr_id} {campaign.rule.rule} — {campaign.rule.description} */}
                          {showDuration(campaign)}
                        </Typography>
                        <Typography variant="subtitle1" color="#D70040" paragraph>
                          {showResult(campaign)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </CardActionArea>
                </Grid>
              )
          })}
          </Grid>
        </Container>
      </main>
      <Footer/>
    </ThemeProvider>
  );
}



