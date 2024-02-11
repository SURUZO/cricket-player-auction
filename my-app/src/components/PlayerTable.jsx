import React from 'react';
import Table from 'react-bootstrap/Table';
import ProfileButton from './ProfileButton';

const PlayerTable = ({ filteredPlayers, onViewProfileClick }) => {
  return (
    <div className="container mt-4">
      <Table striped bordered hover responsive>
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Academy</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers && filteredPlayers.length > 0 ? (
            filteredPlayers.map((player) => (
              <tr key={player.id}>
                <td>{player.id}</td>
                <td>{player.name}</td>
                <td>{player.academy_name}</td>
                <td>{player.role}</td>
                <td>
                  <ProfileButton playerId={player.id} onViewProfileClick={onViewProfileClick} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No players to display</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default PlayerTable;
