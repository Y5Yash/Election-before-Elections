import React, { useState } from 'react';

const CandidateList = () => {
  const constituencyName = "Miyapur";
  const numberOfVoters = '135k'; // Replace with actual number of voters
  const profileImageUrl = "https://github.githubassets.com/images/modules/profile/achievements/pair-extraordinaire-default.png"; // Replace with actual profile image URL

  const candidates = [
    { id: 1, name: "Candidate 1", votes: 200, imageUrl: "./dummy-user.png" },
    { id: 2, name: "Candidate 2", votes: 180, imageUrl: "./dummy-user.png" },
    { id: 3, name: "Candidate 3", votes: 150, imageUrl: "./dummy-user.png" },
    { id: 4, name: "Candidate 4", votes: 120, imageUrl: "./dummy-user.png" },
    { id: 5, name: "Candidate 5", votes: 100, imageUrl: "./dummy-user.png" },
    { id: 6, name: "Candidate 6", votes: 80, imageUrl: "./dummy-user.png" },
  ];


  return (
    <div className='candidate-list-view'>
      {/* Top Section */}
      <div className='candidate-view-header'>
        <div className='candidate-view-header-left'>
          <h2>{constituencyName}</h2>
          <p>{`${numberOfVoters} voters`}</p>
        </div>
        <div className='candidate-view-header-right'>
          {/* Search Box */}
          <input type="text" placeholder="Search..." style={{ marginRight: '10px' }} />

          {/* User Profile Image */}
          <img
            src={profileImageUrl}
            alt="User Profile"
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          />
        </div>
      </div>

      {/* Candidate Cards Section */}
      <div className='candidate-view-body'>
        {candidates.map(candidate => (
          <div key={candidate.id} className='card'>
            {/* Candidate Image */}
            <img src={candidate.imageUrl} alt={candidate.name} style={{ width: '100%', height: '150px' }} />

            {/* Candidate Name and Votes Count */}
            <div style={{ backgroundColor: '#f0f0f0', padding: '8px' }}>
              <p>{candidate.name}</p>
              <p>{`Votes: ${candidate.votes}`}</p>
              <button>Vote</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateList;
