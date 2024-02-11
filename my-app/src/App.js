// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/AuthContext';
import CricketFilter from './components/filter';
import Title from './components/Title';
import PlayerTable from './components/PlayerTable';
import PlayerProfile from './components/PlayerProfile';
import AcademyDashboard from './components/AcademyDashboard';
import Login from './components/Login';
import BidTable from './components/BidTable'; // Import the BidTable component

function App() {
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  const handleFilterApplied = (filteredPlayers) => {
    setFilteredPlayers(filteredPlayers);
  };

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Login />
                </div>
              }
            />
            <Route
              path="/dashboard"
              element={
                <div>
                  <Title text="Your Cricket Filtering App" />
                  <div className="content-wrapper">
                    <div>
                      <CricketFilter onFilterApplied={handleFilterApplied} />
                    </div>
                    <div>
                      <PlayerTable filteredPlayers={filteredPlayers} />
                    </div>
                    <div>
                      <BidTable />
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/profile/:id" element={<PlayerProfile />} />
            <Route path="/academy-dashboard" element={<AcademyDashboard />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
