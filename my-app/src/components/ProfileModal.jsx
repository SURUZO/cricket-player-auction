// ProfileModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ProfileModal = ({ show, handleClose, username, onLogout }) => {
  const handleLogout = () => {
    // Perform logout actions
    console.log('Logging out...');
    onLogout(); // Trigger the logout function passed as a prop
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{username}'s Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Add content here, e.g., user photo, additional details */}
        <p>Welcome, {username}!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;

