import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SecondaryCampaignCard from './SecondaryCampaignCard';
import Footer from './Footer';
import Header from './Header';
import { getCampaignList } from '../utility/getCampaignList';
import { useIsWidthUp } from './width';
const theme = createTheme();

export default function Campaigns() {
  const [campaignList, setCampaignList] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const isMdUp = useIsWidthUp("md");
  const showResult = (campaign) =>{
    if (campaign.status === "ended"){
      return(
          `投票結果：${campaign.result}獲得最高票 `
      )
    }
  }
  const showDuration = (campaign) =>{
    if (campaign.status === "ended"){
      return(
        "投票已結束"
      );
    }
    else{
      return(
        `投票期限：${campaign.startTime.slice(0, -7)} 到 ${campaign.endTime.slice(0, -7)}`
      );
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("uid");
    history.push("/login");
  };

  const campaignStatus = c => c.status;

  useEffect(() => {
    setLoading(true);
    (async() => { 
      let campaigns = await getCampaignList();
      if (campaigns === "fail"){
        history.push("/login")
      }
      else{
        campaigns.sort((a, b)=>{
          const statusA = campaignStatus(a);
          const statusB = campaignStatus(b);
          if (statusA === "active" && statusB === "ended"){
            return -1;
          }
          else if(statusA === "ended" && statusB === "active"){
            return 1;
          }
          else{
            return 0;
          }
        })
        setCampaignList(campaigns);
      }
      setLoading(false);
    })()
  }, [history]);

  if (loading){
    return(
      ""
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
          <Grid container justifyContent="flex-start">
            <Typography variant="h6" color="inherit" noWrap>
              NTU VOTE
            </Typography>
          </Grid>
          <Grid container justifyContent="flex-end">           
            <Button variant="outlined" onClick={handleLogout}
              style={{ color: '#ffffff', border: "2px white solid" }}
            >
              登出
            </Button> 
          </Grid>         
        </Toolbar>
      </AppBar>
      <main>
        <Header/>
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
              variant={ isMdUp ? "h2": "h4"}
              align="center"
              color="text.primary"
              gutterBottom
            >
              NTU VOTE <br/>台大專屬投票平台
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              擇你所愛，愛你所選！
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }}>
          <Grid container spacing={4}>
            {campaignList.slice(0).map((campaign) => (
              <SecondaryCampaignCard
                isMdUp={isMdUp}
                key={campaign.cpn_id}
                campaign={campaign}
                showDuration={showDuration}
                showResult={showResult}
              />
            ))}
          </Grid>
        </Container>
      </main>
      <Footer/>
    </ThemeProvider>
  );
}

/* primary */
/* <PrimaryCampaignCard
  campaign={campaignList[0]}
  showDuration={showDuration}
  showResult={showResult}
/> */
/* header */

/* <Container sx={{ py: 8 }}>
  <Grid container spacing={4}>
  {campaignList.slice(1).map((campaign) => {
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
                <Typography component="h2" variant="h3" gutterBottom>
                  {campaign.title}
                </Typography>
                <Typography variant="h5" paragraph sx={{ marginLeft: "40px", marginRight: "40px" }}>
                  {campaign.description}
                </Typography>
                <Typography variant="subtitle1" paragraph>
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
</Container> */


