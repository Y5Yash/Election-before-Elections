import React from 'react';
import './App.css';
import LandingPage from './components/landing';
import NominationForm from './components/Nominate';
import CandidateList from './components/candidate-list';
function App() {
  return (
    <div className='app-parent'>
      <div className="App">
        <LandingPage />
      </div>
    </div>
  );
}

export default App;
