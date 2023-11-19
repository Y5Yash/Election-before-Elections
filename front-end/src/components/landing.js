import React, { useState } from "react";
import _ from 'lodash';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Modal } from "./design-components/modal";

const BACKEND_URL = 'https://election-before-election.onrender.com';

export default function LandingPage({fetchProof}) {

  const [QRLink, setQRLink] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const { address: metaMaskAddress } = useAccount()
  const { connect: metaMaskConnect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect: metaMaskDisConnect } = useDisconnect()

  const handleMetaMaskClick = () => {
    if (metaMaskAddress) {
      metaMaskDisConnect();
    } else {
      metaMaskConnect();
    }
  };

  const handleConnectProvider = () => {
    async function connectProvider() {
      setModalOpen(true);
      const response = await fetch(`${BACKEND_URL}/request-proofs`);
      if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json();
        console.log(json);
        setQRLink(json.reclaimUrl);
      } else {
        // alert("HTTP-Error: " + response.status);
      }
    }
    if (!QRLink) {
      connectProvider();
    }
  };

  return (
    <div className="landing-page">
      {isModalOpen && <Modal QRLink={QRLink} />}
      <div className="section-top">
        <h2>OneVote</h2>
        <h5>Be a delegate, show your strength</h5>
      </div>
      <div className="section-bottom">
        <img src='./public-gathering.jpeg' alt='home' />
        <div className="connect-wrapper">
          <div style={{ display: 'flex', gap:'8px' }}>
            <div className="connect connect-metamask" onClick={handleMetaMaskClick}><img height={32} width={32} src= './MetaMask_Fox.png' alt='Metamask' />{metaMaskAddress ? 'Disconnect' :'Connect'}</div>
            <div className="connect connect-nation-id" onClick={handleConnectProvider}><img height={32} width={32} src= './Aadhaar_Logo.png' alt='Metamask' />Connect</div>
          </div>
          <div className="connect fetch-proof" onClick={fetchProof}>Fetch Proof</div>
        </div>
      </div>
    </div>
  );
}