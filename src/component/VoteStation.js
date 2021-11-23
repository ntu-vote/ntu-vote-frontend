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
import { castBallot } from '../utility/castBallot'
import ConfirmationDialog from './ConfirmationDialog';
import VeriDialog from './VeriDialog';

const theme = createTheme();

export default function VoteStation(props) {
  const currentUrl = window.location;
  const cpnId = new URLSearchParams(currentUrl.search).get('cpnId');
  const [campaign, setCampaign] = useState(null);
  const [candidateList, setCandidateList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogLoading, setIsDialogLoading] = useState(false);
  const [isVeriDialogOpen, setIsVeriDialogOpen] = useState(false);
  const [veriStr, setVeriStr] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState({name:"default"});

  const history = useHistory();

  const showResult = useCallback((campaign) =>{
    if (campaign.status === "ended"){
      return(
          `投票結果：${campaign.result} 獲得最高票`
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
    }},[]
  );

  const handleSelect = useCallback((candidate) =>{
    setIsDialogOpen(true);
    setSelectedCandidate(candidate);
    }, [setIsDialogOpen, setSelectedCandidate]
  );

  
  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
    setIsDialogLoading(false);
  }, [setIsDialogOpen, setIsDialogLoading]
  );

  const closeVeriDialog = useCallback(() => {
    setIsVeriDialogOpen(false);
  }, []
  );
  
  const handleCastBallot = useCallback((password) =>{
    (async() => {
      setIsDialogLoading(true);
      const veriStr = await castBallot(campaign.cpnId, selectedCandidate.cid, password);
      closeDialog();
      if(veriStr === "fail"){
        alert("投票失敗");
      }
      else if(veriStr === "expired"){
        history.push("/login");
      }
      else{
        alert("投票成功!");
        setVeriStr(veriStr);
        setIsVeriDialogOpen(true);
      }
    })()
    }, [selectedCandidate, closeDialog]
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("uid");
    history.push("/login");
  };
  
  const candidateId = c => c.cid;

  useEffect(() => {
    (async() => { 
      setLoading(true);
      const result = await getCandidateList(cpnId);
      if (result === "fail"){
        history.push("/login");
      }
      else{
        let {candidates, ...campaignInfo} = result.campaign;
        setCampaign(campaignInfo);
        candidates.sort((a, b)=>{
          const idA = candidateId(a);
          const idB = candidateId(b);
          if (idA < idB){
            return -1;
          }
          else if(idA > idB){
            return 1;
          }
          else{
            return 0;
          }
        })
        setCandidateList(candidates);
      }
      setLoading(false);
    })()
  }, [cpnId, history]);

  if (loading){
    return(
      ""
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
          <Grid container justifyContent="flex-start">
            <Typography variant="h6" color="inherit" noWrap>
              NTU VOTE
            </Typography>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Button variant="outlined" href='./home' 
              style={{ color: '#ffffff', border: "2px white solid", marginRight: "10px" }}
            >
              回到活動列表
            </Button>
            <Button variant="outlined"
              sx={{display:{ xs: "none", sm: "block", md: "block", lg: "block"}}}
              onClick={()=>{window.location.reload();}}
              style={{ color: '#ffffff', border: "2px white solid", marginRight: "10px" }}
            >
              重整頁面
            </Button>
            <Button variant="outlined" onClick={handleLogout}
              style={{ color: '#ffffff', border: "2px white solid" }}
            >
              登出
            </Button> 
          </Grid>         
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
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              投票活動編號： {campaign.cpnId}<br/>{campaign.title}
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
                    <CandidateCard
                      key={candidate.cid}
                      candidate={candidate}
                      live={campaign.rule.live}
                      handleSelect={handleSelect}
                      campaignStatus={campaign.status}
                    />
                ))}
            </Grid>
        </Container>
        <ConfirmationDialog
          open={isDialogOpen}
          name={selectedCandidate.name}
          onClose={closeDialog}
          loading={isDialogLoading}
          onConfirm={handleCastBallot}
        />
        <VeriDialog
          open={isVeriDialogOpen}
          content="上方為您的隨機驗證碼，由於此平台使用匿名投票，往後若您需驗票，請記下此組隨機驗證碼，平台不會為您留存。為了您的隱私，也請勿將此組密碼告訴他人"
          title={veriStr}
          onClose={closeVeriDialog}
          action="我已記下"
        />
      </main>
      <Footer/>
    </ThemeProvider>
  );
}



