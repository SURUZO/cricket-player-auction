// BidManagement.js
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const BidManagement = () => {
  const { user } = useAuth(); // Get the user (including academyId) from the AuthContext
  const [bidData, setBidData] = useState([]);

  useEffect(() => {
    const fetchBidData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/bidManagement?academyId=${user.id}`);
        const result = await response.json();

        if (result.success) {
          setBidData(result.bidData);
        } else {
          console.error('Failed to fetch bid data');
        }
      } catch (error) {
        console.error('Error fetching bid data:', error.message);
      }
    };

    fetchBidData();
  }, [user.id]);

  return (
    <div>
      <h2>Bid Management</h2>
      <table>
        <thead>
          <tr>
            <th>Bid ID</th>
            <th>Player ID</th>
            <th>Recruiter ID</th>
            <th>Bid Amount</th>
            {/* Add other relevant columns */}
          </tr>
        </thead>
        <tbody>
          {bidData.map((bid) => (
            <tr key={bid.bid_id}>
              <td>{bid.bid_id}</td>
              <td>{bid.player_id}</td>
              <td>{bid.recruiter_id}</td>
              <td>{bid.bid_amount}</td>
              {/* Add other relevant data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BidManagement;
