import './App.css';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { generate, sign } from './component/key-utility';
import SignInSide from './component/SignInSide';
import SignUpSide from './component/SignUpSide';
import Campaigns from './component/Campaigns';
import VoteStation from './component/VoteStation';


// const [generateKeys, setGenerateKeys] = useState("");
// const [signedMessage, setSignedMessage] = useState("");

// useEffect(() => {
//   (async() => { 
//     const newKeyPair = await generate(); 
//     setGenerateKeys(newKeyPair);
//     const newSignedMessage = await sign(newKeyPair);
//     setSignedMessage(newSignedMessage);
//   })()
// }, []);

export default function App(){
  return (
    // <Router> 
      <div className="App">
        <Route path="/login" component={SignInSide} />
        <Route path="/register" component={SignUpSide} />
        <Route path="/voteStation" component={VoteStation} />
        <Route path="/home" component={Campaigns} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </div>
    // </Router>
  );
}

