// import React from 'react';
import React, { useEffect, useState } from 'react';
import './App.css';
import LandingPage from './components/landing';
import NominationForm from './components/Nominate';
import CandidateList from './components/candidate-list';
import Register from './components/Reg.js';
import Vote from './components/vote.js';
import { ethers } from 'ethers';
// import Register from './components/register.component';

const backendProofUrl = "https://election-before-election.onrender.com/get-proofs"
const callbackId = "8aeacd2d-b5e5-47df-8251-a2799212c935"; // hardcoded for now

function App() {
  const [appState, setAppState] = useState("landing");
  const [proofObj, setProofObj] = useState();
  const [claimData, setClaimData] = useState();
  const [candidateHash, setCandidateHash] = useState();
  const [identity, setIdentity] = useState();

  const fetchProof = async () => {
    try {
      console.log(`Requesting ${backendProofUrl}?id=${callbackId}`);
      const response = await fetch(`${backendProofUrl}?callbackId=${callbackId}`);
      if (response.status === 200) {
        const proofData = await response.json();
        setProofObj(proofData[0]);
        console.log(proofData[0]);
        console.log(proofObj);
        console.log(!!proofObj)
        setClaimData({identifier: proofData[0].identifier,
            owner: ethers.computeAddress(`0x${proofData[0].ownerPublicKey}`),
            epoch: proofData[0].epoch,
            timestampS: Number(proofData[0].timestampS)});
        setAppState("nominate");
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='app-parent'>
      <div className="App">
        {(appState==="landing") && 
        <>
          <LandingPage />
          <button onClick={fetchProof}>Fetch Proof</button> 
        </>}

        {(appState==="nominate") && 
        <>
          <NominationForm setAppState={setAppState}/>
        </>}

        {(appState==="register") &&
        <>
          <Register proofObj={proofObj} claimData={claimData} setAppState={setAppState} identity={identity} setIdentity={setIdentity}/>
        </>}

        {(appState==="candidate-list") && 
        <>
          <CandidateList setAppState={setAppState} setCandidateHash={setCandidateHash}/>
        </>
        }

        {(appState==="vote") && 
        <>
         <Vote setAppState={setAppState} candidateHash={candidateHash} identity={identity}/> 
        </>
        }
      </div>
    </div>
  );
}

export default App;
