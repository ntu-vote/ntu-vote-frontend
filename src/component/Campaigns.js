import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
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
// const primaryCampaign = {
//     title: '最熱門的投票在這!最夯梗圖大票選',
//     description:
//     "選出你最尬意的梗圖吧!",
//     image: 'https://source.unsplash.com/random',
//     imageLabel: 'Image Text',
//     ruleName: '簡單多數決',
//     ruleDescription: '過總票數一半者及獲勝',
//     result: 'xxx 幾票 v.s. xxx 幾票',
//     linkText: '進入投票所'
//   };

// const secondaryCampaigns = [
//     {
//         title: '1台大校長選舉',
//         date: '2022.01.01 - 2022.01.31',
//         description: '誰來當家',
//         image: 'https://source.unsplash.com/random',
//         imageLabel: 'Image Text',
//         ruleName: '簡單多數決',
//         ruleDescription: '過總票數一半者及獲勝',
//         result: 'xxx 幾票 v.s. xxx 幾票'
//     },
//     {
//         title: '2台大校長選舉',
//         date: '2022.01.01 - 2022.01.31',
//         description: '誰來當家',
//         image: 'https://source.unsplash.com/random',
//         imageLabel: 'Image Text',
//         ruleName: '簡單多數決',
//         ruleDescription: '過總票數一半者及獲勝',
//         result: 'xxx 幾票 v.s. xxx 幾票'
//     }
// ]

// const tertiaryCampaigns = [
//     {
//         title: '3台大校長選舉',
//         date: '2022.01.01 - 2022.01.31',
//         description: '誰來當家',
//         image: 'https://source.unsplash.com/random',
//         imageLabel: 'Image Text',
//         ruleName: '簡單多數決',
//         ruleDescription: '過總票數一半者及獲勝',
//         result: 'xxx 幾票 v.s. xxx 幾票'
//     },
//     {
//       title: '4Post title',
//       date: 'Nov 11',
//       description:
//         'This is a wider card with supporting text below as a natural lead-in to additional content.',
//       image: 'https://source.unsplash.com/random',
//       imageLabel: 'Image Text',
//       ruleName: '簡單多數決',
//       ruleDescription: '過總票數一半者及獲勝',
//       result: 'xxx 幾票 v.s. xxx 幾票'
//     },
//     {
//         title: '5台大校長選舉',
//         date: '2022.01.01 - 2022.01.31',
//         description: '誰來當家',
//         image: 'https://source.unsplash.com/random',
//         imageLabel: 'Image Text',
//         ruleName: '簡單多數決',
//         ruleDescription: '過總票數一半者及獲勝',
//         result: 'xxx 幾票 v.s. xxx 幾票'
//     },
//     {
//       title: '6Post title',
//       date: 'Nov 11',
//       description:
//         'This is a wider card with supporting text below as a natural lead-in to additional content.',
//       image: 'https://source.unsplash.com/random',
//       imageLabel: 'Image Text',
//       ruleName: '簡單多數決',
//       ruleDescription: '過總票數一半者及獲勝',
//       result: 'xxx 幾票 v.s. xxx 幾票'
//     },
//     {
//         title: '7台大校長選舉',
//         date: '2022.01.01 - 2022.01.31',
//         description: '誰來當家',
//         image: 'https://source.unsplash.com/random',
//         imageLabel: 'Image Text',
//         ruleName: '簡單多數決',
//         ruleDescription: '過總票數一半者及獲勝',
//         result: 'xxx 幾票 v.s. xxx 幾票'
//     },
//     {
//       title: '8Post title',
//       date: 'Nov 11',
//       description:
//         'This is a wider card with supporting text below as a natural lead-in to additional content.',
//       image: 'https://source.unsplash.com/random',
//       imageLabel: 'Image Text',
//       ruleName: '簡單多數決',
//       ruleDescription: '過總票數一半者及獲勝',
//       result: 'xxx 幾票 v.s. xxx 幾票'
//     },
//     {
//         title: '9台大校長選舉',
//         date: '2022.01.01 - 2022.01.31',
//         description: '誰來當家',
//         image: 'https://source.unsplash.com/random',
//         imageLabel: 'Image Text',
//         ruleName: '簡單多數決',
//         ruleDescription: '過總票數一半者及獲勝',
//         result: 'xxx 幾票 v.s. xxx 幾票'
//     },
//     {
//       title: '10Post title',
//       date: 'Nov 11',
//       description:
//         'This is a wider card with supporting text below as a natural lead-in to additional content.',
//       image: 'https://source.unsplash.com/random',
//       imageLabel: 'Image Text',
//       ruleName: '簡單多數決',
//       ruleDescription: '過總票數一半者及獲勝',
//       result: 'xxx 幾票 v.s. xxx 幾票'
//     },
//     {
//         title: '11台大校長選舉',
//         date: '2022.01.01 - 2022.01.31',
//         description: '誰來當家',
//         image: 'https://source.unsplash.com/random',
//         imageLabel: 'Image Text',
//         ruleName: '簡單多數決',
//         ruleDescription: '過總票數一半者及獲勝',
//         result: 'xxx 幾票 v.s. xxx 幾票'
//     },
//     {
//       title: '12Post title',
//       date: 'Nov 11',
//       description:
//         'This is a wider card with supporting text below as a natural lead-in to additional content.',
//       image: 'https://source.unsplash.com/random',
//       imageLabel: 'Image Text',
//       ruleName: '簡單多數決',
//       ruleDescription: '過總票數一半者及獲勝',
//       result: 'xxx 幾票 v.s. xxx 幾票'
//     },
//     {
//         title: '13台大校長選舉',
//         date: '2022.01.01 - 2022.01.31',
//         description: '誰來當家',
//         image: 'https://source.unsplash.com/random',
//         imageLabel: 'Image Text',
//         ruleName: '簡單多數決',
//         ruleDescription: '過總票數一半者及獲勝',
//         result: 'xxx 幾票 v.s. xxx 幾票'
//     },
//     {
//       title: '14Post title',
//       date: 'Nov 11',
//       description:
//         'This is a wider card with supporting text below as a natural lead-in to additional content.',
//       image: 'https://source.unsplash.com/random',
//       imageLabel: 'Image Text',
//       ruleName: '簡單多數決',
//       ruleDescription: '過總票數一半者及獲勝',
//       result: 'xxx 幾票 v.s. xxx 幾票'
//     }
//   ];


export default function Campaigns() {
  const [campaignList, setCampaignList] = useState([]);
  useEffect(() => {
    (async() => { 
      const campaigns = await getCampaignList();
      setCampaignList(campaigns);
    })()
  }, []);

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
        <PrimaryCampaignCard campaign={campaignList[0]} />
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
              NTU VOTE <br/>台大投票平台
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              擇你所愛，愛你所選！
            </Typography>
            <Stack
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
            </Stack>
          </Container>
        </Box>
        {/* secondary */}
        <Container sx={{ py: 8 }}>
          <Grid container spacing={4}>
            {campaignList.slice(1, 2).map((campaign) => (
              <SecondaryCampaignCard key={campaign.cpn_id} campaign={campaign} />
            ))}
          </Grid>
        </Container>
        {/* tertiary */}
        {/* <Container sx={{ py: 8 }}>
          <Grid container spacing={4}>
            {tertiaryCampaigns.map((campaign) => (
                <TertiaryCampaignCard key={campaign.title} campaign={campaign} />
            ))}
          </Grid>
        </Container> */}
        <Container sx={{ py: 8 }}>
          {/* End hero unit */}
          <Grid container spacing={4}>
          {campaignList.slice(3).map((campaign) => {
              const redirectUri = "/voteStation?campaign="+ campaign.cpn_id;
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
                          // 16:9
                          pt: '0%',
                          }}
                          image="https://source.unsplash.com/random"
                          alt="random"
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
                        ({campaign.status} === "ended") &&(
                          <Typography variant="h5" color="#D70040" paragraph>
                          {campaign.result}
                          </Typography>
                        )
                        <Typography variant="subtitle1" paragraph>
                          制度：{campaign.cpnr_id} {campaign.rule.rule} — {campaign.rule.description}
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



