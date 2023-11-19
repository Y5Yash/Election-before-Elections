import { useEffect, useState } from "react";
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ethers } from "ethers";
import contractABI from '../assets/EBEABI.json';
import { Identity } from "@semaphore-protocol/identity";

const backendProofUrl = "https://election-before-election.onrender.com/get-proofs"
const callbackId = "8aeacd2d-b5e5-47df-8251-a2799212c935"; // hardcoded for now

const Register = ({proofObj, claimData, setAppState, identity, setIdentity}) => {
    const [isPrepared, setIsPrepared] = useState(false);

    useEffect(() => {
        if (!identity) {
            const newIdentity = new Identity();
            setIdentity(newIdentity);
            console.log("Generated new identity: ", newIdentity);
        }
    }, [identity]); 

    const EBEAddress = '0x08aEbFB2fA9E9a4E141915Dd885eD23761F41a81';

    const { config } = usePrepareContractWrite({
        enabled:!!identity,
        address: EBEAddress,
        abi: contractABI,
        functionName: 'authenticate',
        args: [proofObj.epoch, proofObj.provider, proofObj.parameters, proofObj.context, claimData, proofObj.signatures, identity?.commitment, true],
        chainId: 59140,
        onSuccess(data) {
            console.log(identity);
            console.log('Successful - register prepare: ', data);
            setIsPrepared(true);
        },
        onError(error) {
            console.log('Error in verify Proof: ', error);
            // window.alert('Error: Try by manually switching network to Optimism Goerli testnet.\nRPC: https://goerli.optimism.io\nChain Id: 420\ncheck console.log if this doesn\'t work either.')
        }
    });

    const contractWrite = useContractWrite(config);

    return (
        <div>
            {!contractWrite.isSuccess && <button onClick={()=>{contractWrite.write?.()}}>Register</button>}
            {contractWrite.isSuccess && <button onClick={()=>{setAppState("candidate-list")}}>Go to candidate list</button>}
        </div>
    )
}

export default Register;