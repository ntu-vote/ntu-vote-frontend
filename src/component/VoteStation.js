import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PrimaryCampaignCard from './PrimaryCampaignCard';
import CandidateCard from './CandidateCard';
import Footer from './Footer';
import { getCandidateList } from '../utility/getCandidateList'
const theme = createTheme();

const primaryCampaign = {
  title: '最熱門的投票在這!最夯梗圖大票選',
  description:
  "選出你最尬意的梗圖吧!",
  image: 'https://source.unsplash.com/random',
  imageLabel: 'Image Text',
  ruleName: '簡單多數決',
  ruleDescription: '過總票數一半者及獲勝',
  result: 'xxx 幾票 v.s. xxx 幾票',
  linkText: '進入投票所'
};
// const candidates = [
//   {
//     id: 0,
//     name: '林睿庠',
//     ballotNum: '20',
//     policy: [
//       {
//       policyTitle: '增進學生與校方之間的溝通',
//       policyDescription: '將校方會議重要事項公告於學生會板、將各處室職員和其所負責之事務公佈於學生會板、多與新任校長討論民生議題的重要性'
//       },
//       {
//         policyTitle: '宣導學生自治的正確觀念 ',
//         policyDescription: '於新生訓練介紹學生自治、加強宣導學代會的職責與其重要性、建議學代會增加常會次數'
//       },
//       {
//         policyTitle: '加強學生會與各系學會之連繫',
//         policyDescription: '召開學生會正副會長與各系學會會長一起參與的討論會議'
//       }
//     ],
//     image: 'https://source.unsplash.com/random',
//     imageLabel: 'Image Text'
//   },
//   {
//     id: 1,
//     name: '李明翰',
//     ballotNum: '20',
//     policy: [
//       {
//       policyTitle: '大力招募人才參與學生自治',
//       policyDescription: '加強新生訓練時的宣傳、學生會幹部列席學代會做專業資訊提醒、加強學生會例活的課程內容'
//       },
//       {
//         policyTitle: '將台大人凝聚為一個大團隊',
//         policyDescription: '擴大新生訓練的社團博覽會規模、透過幹部研習營增進學生會與社團負責人的認識、促進各社團的合作'
//       },
//       {
//         policyTitle: '學生會主辦之活動將傾向讓各系一起同樂',
//         policyDescription: '下學期活動部主辦之晚會尚未決定要以什麼形式舉辦，但我們希望能提供一個全體大學部學生一起共襄盛舉的場合，增進各系學生的互動與認識。'
//       }
//     ],
//     image: 'https://source.unsplash.com/random',
//     imageLabel: 'Image Text'
//   }
// ]
export default function VoteStation() {
  const currentUrl = window.location;
  const cpnId = new URLSearchParams(currentUrl.search).get('cpnId');
  const [campaign, setCampaign] = useState({});
  const [candidateList, setCandidateList] = useState([]);

  useEffect(() => {
    (async() => { 
      const result = await getCandidateList(cpnId);
      setCampaign(result.campaign);
      setCandidateList(result.candidates);
    })()
  }, [cpnId]);

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
        <PrimaryCampaignCard campaign={primaryCampaign} />
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
              投票場次：<br/> {campaign.cpn_id} {campaign.title}
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary">
              {campaign.status}  {campaign.startTime}-{campaign.endTime}
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              {campaign.description}
            </Typography>
            ({campaign.status} === "ended") &&(
              <Typography variant="h5" align="center" color="#D70040" paragraph>
              {campaign.result}
              </Typography>
            )
            <Typography variant="subtitle1" paragraph>
              制度：{campaign.cpnr_id} {campaign.rule.rule} — {campaign.rule.description}
            </Typography>
          </Container>
        </Box>
        {/* secondary */}
        <Container sx={{ py: 8 }}>
            <Grid container spacing={4}>
                {candidateList.map((candidate) => (
                    <CandidateCard key={candidate.cid} candidate={candidate} />
                ))}
            </Grid>
        </Container>
      </main>
      <Footer/>
    </ThemeProvider>
  );
}



