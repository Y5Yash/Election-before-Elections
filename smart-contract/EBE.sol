// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface SemaphoreInterface {
    function createGroup(
        uint256 groupId,
        uint256 merkleTreeDepth,
        address admin
    ) external;

    function addMember(uint256 groupId, uint256 identityCommitment) external;

    function verifyProof(
        uint256 groupId,
        uint256 merkleTreeRoot,
        uint256 signal,
        uint256 nullifierHash,
        uint256 externalNullifier,
        uint256[8] calldata proof
    ) external;
}

interface ReclaimContractInterface {
    struct CompleteClaimData {
		bytes32 identifier;
		address owner;
		uint32 timestampS;
		uint256 epoch;
	}
	struct ClaimInfo {
		string provider;
		string parameters;
		string context;
	}
    function assertValidEpochAndSignedClaim(uint32 epochNum, ClaimInfo memory claimInfo, CompleteClaimData memory claimData, bytes[] memory signatures) external view;
}

contract EBE {
    bool public isActive;
    address public owner;
    address public semaphoreAddress;
    address public reclaimContractAddress;
    uint256 public groupId;
    uint256 public merkleTreeDepth;

    // mapping (bytes32 => bool) public registeredList;
    mapping (bytes32 => uint8) public registeredList;   // comment this line and uncomment above line on prod version
    mapping (uint256 => uint256) public candidateVotes;

    constructor(address _semaphoreAddress, uint256 _groupId, uint256 _merkleTreeDepth, address _reclaimContractAddress) {
        isActive = true;
        owner = msg.sender;
        groupId = _groupId;
        semaphoreAddress = _semaphoreAddress;
        merkleTreeDepth = _merkleTreeDepth;
        SemaphoreInterface(semaphoreAddress).createGroup(groupId, merkleTreeDepth, address(this));
        reclaimContractAddress = _reclaimContractAddress;
    }

    modifier _onlyOwner () {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier _isActive () {
        require(isActive, "The election is over");
        _;
    }

    function closeElection() external  _onlyOwner {
        isActive = false;
    }

    function authenticate(
        uint32 epochNum,
        string memory provider,
        string memory parameters,
        string memory context,
		ReclaimContractInterface.CompleteClaimData memory claimData,
		bytes[] memory signatures,
        uint256 _identityCommitment,
        bool becomeCandidate
        ) _isActive external {
        // Ensure correct provider
        bool isCorrectProvider = keccak256(abi.encodePacked(provider)) == keccak256(abi.encodePacked("uidai-aadhar"));
        require(isCorrectProvider, "The provider is not uidai-aadhar");
        
        // Compute claimInfo and call assertValid..() from Reclaim SC.
        ReclaimContractInterface.ClaimInfo memory claimInfo = ReclaimContractInterface.ClaimInfo(provider, parameters, context);
        ReclaimContractInterface(reclaimContractAddress).assertValidEpochAndSignedClaim(epochNum, claimInfo, claimData, signatures);

        // Check if the parameter is not registered yet by mapping the hash and store the hash.
        bytes32 paramHash = keccak256(abi.encodePacked(parameters));
        // require(registeredList[paramHash]==false, "Candidate already registered");
        // registeredList[paramHash] = true;
        registeredList[paramHash]+=1; // comment this line and uncomment the above 2 line on prod version.

        // Add the member
        SemaphoreInterface(semaphoreAddress).addMember(groupId, _identityCommitment);

        if (becomeCandidate) {
            candidateVotes[uint256(paramHash)] = 1;
        }
    }

    function vote(
        uint256 _merkleTreeRoot,
        uint256 _signal,
        uint256 _nullifierHash,
        uint256 _externalNullifier,
        uint256[8] calldata _proof
        ) _isActive external {

        require(_externalNullifier == 1, "The external nullifier is required to be 1.");

        SemaphoreInterface(semaphoreAddress).verifyProof(groupId, _merkleTreeRoot, _signal, _nullifierHash, _externalNullifier, _proof);

        require(candidateVotes[_signal]>0, "Incorrect signal, no such candidate has registered!");
        candidateVotes[_signal]++;
    }

    function fetchCount(uint256 candidateHash) external view returns (uint256) {
        return candidateVotes[candidateHash];
    }
}