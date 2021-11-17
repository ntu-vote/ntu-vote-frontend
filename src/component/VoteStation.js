import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router";
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CandidateCard from './CandidateCard';
import Footer from './Footer';
import { getCandidateList } from '../utility/getCandidateList'
const theme = createTheme();

export default function VoteStation(props) {
  const currentUrl = window.location;
  const cpnId = new URLSearchParams(currentUrl.search).get('cpnId');
  const [campaign, setCampaign] = useState(null);
  const [candidateList, setCandidateList] = useState([]);
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
    }},[campaign]
  );

  useEffect(() => {
    (async() => { 
      setLoading(true);
      const result = await getCandidateList(cpnId);
      console.log(result);
      if (result === "fail"){
        history.push("/home");
      }
      else{
        let {candidates, ...campaignInfo} = result.campaign;
        setCampaign(campaignInfo);
        setCandidateList(candidates);
      }
      setLoading(false);
    })()
  }, [cpnId]);

  if (loading){
    return(
      <Typography variant="h6" color="inherit" noWrap>
        請稍等片刻 ○ ○ ○
      </Typography>
    );
  }

  if (candidateList.length === 0){
    return(
      <Typography variant="h6" color="inherit" noWrap>
        目前尚未公布詳細資訊，請過幾天再來看看吧！
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
          <Button variant="outlined" href='./home' 
            style={{ color: '#ffffff', border: "2px white solid", marginLeft: "20px" }}
          >
            回到活動列表
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* header */}
        <Box
          sx={{
            bgcolor: 'background.black',
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
              投票場次： {campaign.cpnId} {campaign.title}
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              {campaign.description}
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary">
              規則：{campaign.cpnr_id} {campaign.rule.rule} — {campaign.rule.description}<br/>
              {showDuration(campaign)}
            </Typography>
            <Typography variant="subtitle1" align="center" color="#D70040" paragraph>
              {showResult(campaign)}
            </Typography>
          </Container>
        </Box>
        {/* secondary */}
        <Container sx={{ py: 8 }}>
            <Grid container spacing={4}>
                {candidateList.map((candidate) => (
                    <CandidateCard key={candidate.cid} candidate={candidate} live={campaign.rule.live}/>
                ))}
            </Grid>
        </Container>
      </main>
      <Footer/>
    </ThemeProvider>
  );
}



