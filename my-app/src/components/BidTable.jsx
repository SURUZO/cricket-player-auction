import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import Title from './Title';
const BidTable = () => {
  const { user } = useAuth();
  const [playerBids, setPlayerBids] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBidAmount, setNewBidAmount] = useState(0);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = (playerId) => {
    setSelectedPlayerId(playerId);
    setShowModal(true);
  };

  const handleBidChange = async () => {
    try {
      const response = await fetch('http://localhost:5000/playerbids/increase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.id}`, // Assuming you have a token-based authentication system
        },
        body: JSON.stringify({
          playerId: selectedPlayerId,
          bidAmount: parseFloat(newBidAmount), // Parse to float if bidAmount is a decimal
          recruiterId: user.id, // Include the recruiterId in the request body
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Bid increased successfully, you might want to update the local state here
        console.log(result.message);

        // Refetch player bids after a successful bid change
        const bidsResponse = await fetch('http://localhost:5000/playerbids');
        const bidsResult = await bidsResponse.json();

        if (bidsResult.success) {
          setPlayerBids(bidsResult.playerBids);
        }
      } else {
        // Handle error
        console.error(result.message);
      }
    } catch (error) {
      console.error('Bid change error:', error.message);
    } finally {
      handleClose(); // Close the modal regardless of success or failure
    }
  };

  useEffect(() => {
    // Fetch player bids from the server on component mount
    const fetchPlayerBids = async () => {
      try {
        const response = await fetch('http://localhost:5000/playerbids');
        const result = await response.json();
        if (result.success) {
          setPlayerBids(result.playerBids);
        }
      } catch (error) {
        console.error('Fetch player bids error:', error.message);
      }
    };

    fetchPlayerBids();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <Title text="Ongoing Bids" /> {/* Use the Title component with the desired text */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Player ID</th>
            <th>Player Name</th>
            <th>Recruiter Name</th>
            <th>Bid Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {playerBids.map((bid) => (
            <tr key={bid.bid_id}>
              <td>{bid.player_id}</td>
              <td>{bid.player_name}</td>
              <td>{bid.recruiter_name}</td>
              <td>${bid.bid_amount}</td>
              <td>
                <Button variant="primary" onClick={() => handleShow(bid.player_id)}>
                  Increase Bid
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Bid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="newBidAmount">
            <Form.Label>New Bid Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter new bid amount"
              value={newBidAmount}
              onChange={(e) => setNewBidAmount(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBidChange}>
            Update Bid
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BidTable;
