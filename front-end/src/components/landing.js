import React from "react";
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

export default function LandingPage() {

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

  return (
    <div className="landing-page">
      <div className="section-top">
        <h2>OneVote</h2>
        <h5>Be a delegate, show your strength</h5>
      </div>
      <div className="section-bottom">
        <img src='./public-gathering.jpeg' alt='home' />
        <div className="connect-wrapper">
          <div className="connect connect-metamask" onClick={handleMetaMaskClick}><img height={32} width={32} src= './MetaMask_Fox.png' alt='Metamask' />{metaMaskAddress ? 'Disconnect' :'Connect'}</div>
          <div className="connect connect-nation-id"><img height={32} width={32} src= './Aadhaar_Logo.png' alt='Metamask' />Connect <br/>(Nation ID)</div>
        </div>
      </div>
    </div>
  );
}