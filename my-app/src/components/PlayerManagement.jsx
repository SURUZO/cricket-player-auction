// PlayerManagement.js
import React, { useState } from 'react';
import { Modal, Form, Button, Table } from 'react-bootstrap';

const PlayerManagement = () => {
  const [players, setPlayers] = useState([
    // Sample players, replace with your data
    { id: 1, name: 'Player 1', team: 'Team A', battingAverage: 45.67, bowlingAverage: 0 },
    { id: 2, name: 'Player 2', team: 'Team B', battingAverage: 30.45, bowlingAverage: 1.5 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    team: '',
    battingAverage: 0,
    bowlingAverage: 0,
    // Add more fields as needed
  });

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: '',
      team: '',
      battingAverage: 0,
      bowlingAverage: 0,
      // Reset other fields as needed
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSavePlayer = () => {
    // Add logic to save the player data (create or update) to the state
    // For now, just close the modal
    handleCloseModal();
  };

  return (
    <div>
      <h2>Player Management</h2>
      <Button variant="primary" onClick={handleShowModal}>
        Add New Player
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Team</th>
            <th>Batting Average</th>
            <th>Bowling Average</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.id}</td>
              <td>{player.name}</td>
              <td>{player.team}</td>
              <td>{player.battingAverage}</td>
              <td>{player.bowlingAverage}</td>
              {/* Add more table cells as needed */}
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Use the same form fields as in PlayerProfile.jsx */}
          <Form>
            {/* Basic Information */}
            <h4 className="mb-3">Basic Information</h4>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter player's name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formTeam">
              <Form.Label>Team</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter player's team"
                name="team"
                value={formData.team}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Add more basic information fields as needed */}

            {/* Performance Stats */}
            <h4 className="mb-3">Performance Stats</h4>
            <Form.Group controlId="formBattingAverage">
              <Form.Label>Batting Average</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter batting average"
                name="battingAverage"
                value={formData.battingAverage}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formBowlingAverage">
              <Form.Label>Bowling Average</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter bowling average"
                name="bowlingAverage"
                value={formData.bowlingAverage}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Add more performance stats fields as needed */}

            {/* Graphical Representation */}
            <h4 className="mb-3">Graphical Representation</h4>
            {/* Add charts or graphs input fields here */}

            {/* Skills and Attributes */}
            <h4 className="mb-3">Skills and Attributes</h4>
            <Form.Group controlId="formBattingStyle">
              <Form.Label>Batting Style</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter batting style"
                name="battingStyle"
                value={formData.battingStyle}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formBowlingStyle">
              <Form.Label>Bowling Style</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter bowling style"
                name="bowlingStyle"
                value={formData.bowlingStyle}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Add more skills and attributes fields as needed */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSavePlayer}>
            Save Player
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PlayerManagement;
