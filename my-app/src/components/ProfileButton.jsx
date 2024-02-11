// ProfileButton.js
import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const ProfileButton = ({ playerId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${playerId}`);
  };

  return (
    <Button variant="primary" onClick={handleClick}>
      View Profile
    </Button>
  );
};

export default ProfileButton;
