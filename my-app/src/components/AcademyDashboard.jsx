import React, { useState, useEffect } from 'react';
import PlayerProfile from './PlayerProfile';
import ContractGeneration from './ContractGeneration';
import PlayerTable from './PlayerTable';
import BidTable from './BidTable';
import { useAuth } from './AuthContext';
import Title from './Title';
import '../styles/AcademyDashboard.css';

const AcademyDashboard = () => {
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);
  const [playerStats, setPlayerStats] = useState([]);

  const fetchPlayerStats = async () => {
    try {
      const response = await fetch(`http://localhost:5000/getPlayerStats?academyId=${user.id}`);
      const result = await response.json();

      if (result.success) {
        setPlayerStats(result.playerStats);
      } else {
        console.error('Failed to fetch player stats');
      }
    } catch (error) {
      console.error('Error fetching player stats:', error.message);
    }
  };

  useEffect(() => {
    if (selectedOption === 'playerStats') {
      fetchPlayerStats();
    }
  }, [selectedOption, user.id]);

  const renderSelectedOption = () => {
    switch (selectedOption) {
      case 'playerStats':
        return (
          <>
            <Title text="Player Stats" />
            <PlayerTable filteredPlayers={playerStats} />
          </>
        );
      case 'bidTable':
        return (
          <>
            <Title text="Bid Table" />
            <BidTable />
          </>
        );
      case 'contractGeneration':
        return (
          <>
            <Title text="Contract Generation" />
            <ContractGeneration />
          </>
        );
      default:
        return (
          <>
            <Title text="About Our Academy" />
            <div className="about-content">
              <h2>About Our Academy</h2>
              <p>
                At our academy, we believe in nurturing talent, fostering innovation, and achieving excellence in sports management. Our dedicated team strives to create an environment where players thrive, bids succeed, and contracts empower success.
              </p>
              <h3>Motto:</h3>
              <ul>
                <li>Success is not final, failure is not fatal: It is the courage to continue that counts.</li>
                <li>The only way to do great work is to love what you do.</li>
                <li>Believe you can and you're halfway there.</li>
                <li>Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.</li>
              </ul>
              <h3>Credits:</h3>
              <p>
                <strong>Sooraj ,Sreeram B Pillai, Stevin Biju, Thanha CM</strong>
              </p>
            </div>
          </>
        );
    }
  };

  return (
    <div className="academy-dashboard-container">
      <div className="options-container">
        <div
          className={`option ${selectedOption === 'playerStats' && 'selected'}`}
          onClick={() => setSelectedOption('playerStats')}
        >
          Player Stats
        </div>
        <div
          className={`option ${selectedOption === 'bidTable' && 'selected'}`}
          onClick={() => setSelectedOption('bidTable')}
        >
          Bid Table
        </div>
        <div
          className={`option ${selectedOption === 'contractGeneration' && 'selected'}`}
          onClick={() => setSelectedOption('contractGeneration')}
        >
          Contract Generation
        </div>
        <div
          className="option about-section"
          onClick={() => setSelectedOption(null)}
        >
          About
        </div>
      </div>
      <div className="content-container">
        {renderSelectedOption()}
      </div>
    </div>
  );
};

export default AcademyDashboard;
