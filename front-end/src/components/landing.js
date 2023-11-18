import React from "react";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="section-top">
        <h2>OneVote</h2>
        <h5>Be a delegate, show your strength</h5>
      </div>
      <div className="section-bottom">
        <img src='./public-gathering.jpeg' alt='home' />
        <button>Login</button>
      </div>
    </div>
  );
}