// ContractGeneration.js
import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const ContractGeneration = () => {
  const [players, setPlayers] = useState([
    // Sample players, replace with your data
    { id: 1, playerName: 'Player 1', team: 'Team A', contractDuration: 1, salary: 100000 },
    { id: 2, playerName: 'Player 2', team: 'Team B', contractDuration: 2, salary: 150000 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleShowModal = (player) => {
    setSelectedPlayer(player);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPlayer(null);
  };

  const handleGenerateContract = () => {
    // Add logic to generate the contract (create or update) for the selected player
    // For now, just close the modal
    handleCloseModal();
  };

  return (
    <div>
      <h2>Contract Generation</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Player Name</th>
            <th>Team</th>
            <th>Contract Duration (years)</th>
            <th>Salary</th>
            <th>Actions</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.id}</td>
              <td>{player.playerName}</td>
              <td>{player.team}</td>
              <td>{player.contractDuration}</td>
              <td>{player.salary}</td>
              <td>
                <Button variant="primary" onClick={() => handleShowModal(player)}>
                  Generate Contract
                </Button>
              </td>
              {/* Add more table cells as needed */}
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Contract</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedPlayer && `Generate contract for ${selectedPlayer.playerName}`}</p>
          <Form>
            <Form.Group controlId="formContractDuration">
              <Form.Label>Contract Duration (years)</Form.Label>
              <Form.Control type="number" placeholder="Enter contract duration" />
            </Form.Group>
            <Form.Group controlId="formSalary">
              <Form.Label>Salary</Form.Label>
              <Form.Control type="number" placeholder="Enter salary" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleGenerateContract}>
            Generate Contract
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContractGeneration;
