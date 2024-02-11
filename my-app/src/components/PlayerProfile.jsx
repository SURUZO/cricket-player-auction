// PlayerProfile.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Title from './Title';
import { useAuth } from './AuthContext';

const PlayerProfile = () => {
  const { id: playerId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        if (!playerId) {
          console.error('Player ID is undefined');
          return;
        }

        const response = await fetch(`http://localhost:5000/player/${playerId}`);
        if (!response.ok) {
          console.error('Failed to fetch player data:', response.statusText);
          return;
        }

        const result = await response.json();
        setPlayerData(result.player);
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };

    if (playerId) {
      fetchPlayerData();
    }
  }, [playerId]);

  const handleInvitePlayer = async () => {
    try {
      if (!user || !playerData) {
        console.error('User or player data not available');
        return;
      }

      const response = await fetch('http://localhost:5000/bid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player_id: playerId,
          recruiter_id: user.id,
          bid_amount: 10000,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert('Player invited successfully!');
      } else if (result.error === 'Player already in bid table') {
        alert('Player is already in the bid table');
      } else {
        alert('Failed to invite player');
      }
    } catch (error) {
      console.error('Error inviting player:', error);
    }
  };

  if (!playerData) {
    return <p>Loading...</p>;
  }


  return (
    <div className="player-profile-container">
      <Title text={`Player Profile - ${playerData.name}`} />

      {/* Basic Information */}
      <div className="card mb-3 mt-4">
        <h4 className="card-header">Basic Information</h4>
        <div className="card-body">
          <p className="card-text">Player Type: {playerData.player_type}</p>
          <p className="card-text">Date of Birth: {playerData.date_of_birth}</p>
          <p className="card-text">Academy ID: {playerData.academy_id}</p>
          <p className="card-text">Height: {playerData.height}</p>
          <p className="card-text">Weight: {playerData.weight}</p>
          <p className="card-text">Fitness Level: {playerData.fitness_level}</p>
          {/* Add more basic information fields as needed */}
        </div>
      </div>

      {/* Performance Stats */}
      <div className="card mb-3">
        <h4 className="card-header">Performance Stats</h4>
        <div className="card-body">
          <p className="card-text">Strike Rate: {playerData.strike_rate}</p>
          <p className="card-text">Centuries: {playerData.centuries}</p>
          <p className="card-text">Half-Centuries: {playerData.half_centuries}</p>
          <p className="card-text">Consistency: {playerData.consistency}</p>
          <p className="card-text">Ability to Play Spin/Pace: {playerData.ability_to_play_spin_pace}</p>
          <p className="card-text">Match-Winning Innings: {playerData.match_winning_innings}</p>
          <p className="card-text">Economy Rate: {playerData.economy_rate}</p>
          <p className="card-text">Variety of Deliveries: {playerData.variety_of_deliveries}</p>
          <p className="card-text">Wicket-Taking Ability: {playerData.wicket_taking_ability}</p>
          <p className="card-text">Catches: {playerData.catches}</p>
          <p className="card-text">Run Outs: {playerData.run_outs}</p>
          <p className="card-text">Stumpings: {playerData.stumpings}</p>
          {/* Add more performance stats fields as needed */}
        </div>
      </div>

      {/* Career Highlights */}
      <div className="card mb-3">
        <h4 className="card-header">Career Highlights</h4>
        <div className="card-body">
          <ul>
            {Array.isArray(playerData.notable_innings) &&
              playerData.notable_innings.map((inning, index) => (
                <li key={index}>{inning}</li>
              ))}
          </ul>
          <p className="card-text">Best Bowling Figures: {playerData.best_bowling_figures}</p>
          <h5>Awards and Achievements</h5>
          <ul>
            {Array.isArray(playerData.awards) &&
              playerData.awards.map((award, index) => (
                <li key={index}>{award}</li>
              ))}
          </ul>
        </div>
      </div>

      {/* Graphical Representation */}
      <div className="card mb-3">
        <h4 className="card-header">Graphical Representation</h4>
        <div className="card-body">
          {/* Add charts or graphs here */}
        </div>
      </div>

      {/* Skills and Attributes */}
      <div className="card mb-3">
        <h4 className="card-header">Skills and Attributes</h4>
        <div className="card-body">
          <p className="card-text">Batting Style: {playerData.batting_style}</p>
          <p className="card-text">Bowling Style: {playerData.bowling_style}</p>
          <h5>Strengths</h5>
          <ul>
            {Array.isArray(playerData.strengths) &&
              playerData.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
          </ul>
          <h5>Weaknesses</h5>
          <ul>
            {Array.isArray(playerData.weaknesses) &&
              playerData.weaknesses.map((weakness, index) => (
                <li key={index}>{weakness}</li>
              ))}
          </ul>
        </div>
      </div>

      {/* Media Section */}
      <div className="card mb-3">
        <h4 className="card-header">Media Section</h4>
        <div className="card-body">
          <h5>Photos</h5>
          <div className="d-flex flex-wrap">
            {Array.isArray(playerData.photos) &&
              playerData.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Player ${index + 1}`}
                  style={{ width: '100px', height: 'auto', margin: '5px' }}
                />
              ))}
          </div>
          <h5>Videos</h5>
          <div className="d-flex flex-wrap">
            {Array.isArray(playerData.videos) &&
              playerData.videos.map((video, index) => (
                <video key={index} controls style={{ width: '200px', height: 'auto', margin: '5px' }}>
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="card mb-3">
        <h4 className="card-header">Contact Information</h4>
        <div className="card-body">
          <p className="card-text">Email: {playerData.email}</p>
          <p className="card-text">Phone Number: {playerData.phone_number}</p>
          <h5>Social Media Profiles</h5>
          <ul>
            {Object.entries(playerData.social_media_profiles).map(([platform, profile], index) => (
              <li key={index}>
                {platform}: {profile}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Invite Button */}
      <div className="text-right mb-3">
        <button className="btn btn-primary" onClick={handleInvitePlayer}>
          Invite Player
        </button>
      </div>

      {/* Go Back Button */}
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default PlayerProfile;




