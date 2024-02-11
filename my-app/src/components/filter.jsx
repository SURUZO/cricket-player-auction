import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Form } from 'react-bootstrap';
import Select from 'react-select';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';

const options = [
  { value: 'battingaverage', label: 'Batting Average' },
  { value: 'strikerate', label: 'Strike Rate' },
  { value: 'centuries', label: 'Centuries' },
  { value: 'halfcenturies', label: 'Half Centuries' },
  { value: 'consistency', label: 'Consistency' },
  { value: 'abilitytoplayspinpace', label: 'Ability to Play Spin/Pace' },
  { value: 'matchwinninginnings', label: 'Match-winning Innings' },
  { value: 'bowlingaverage', label: 'Bowling Average' },
  { value: 'economyrate', label: 'Economy Rate' },
  { value: 'varietyOfdeliveries', label: 'Variety of Deliveries' },
  { value: 'wickettakingability', label: 'Wicket-taking Ability' },
  { value: 'catches', label: 'Catches' },
  { value: 'runOuts', label: 'Run Outs' },
  { value: 'stumpings', label: 'Stumpings' },
];

const CricketFilter = ({ onFilterApplied }) => {
  const [playerType, setPlayerType] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navigate = useNavigate();

  const handlePlayerTypeChange = (type) => {
    setPlayerType(type);
    setSelectedSubCategories([]);
  };

  const handleSubCategoryChange = (selectedOptions) => {
    setSelectedSubCategories(selectedOptions);
  };

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleProfileClose = () => {
    setShowProfileModal(false);
  };

  const handleApplyFilter = async () => {
    const filterData = {
      playerType,
      selectedSubCategories: selectedSubCategories.map((subCategory) => ({
        subCategory: subCategory.value,
        value: isNaN(subCategory.value) ? subCategory.value : parseFloat(subCategory.value),
      })),
    };
  
    console.log('Filter Data:', filterData);
  
    try {
      const queryParams = selectedSubCategories.map((subCategory) => {
        const inputValue = document.getElementById(`formAnswer${subCategory.value}`).value;
        return isNaN(inputValue) ? inputValue : parseFloat(inputValue);
      });
  
      const response = await fetch('http://localhost:5000/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...filterData,
          queryParams,
        }),
      });
  
  
  
      const result = await response.json();
      console.log('Filtered Players:', result.players);
      onFilterApplied(result.players);
    } catch (error) {
      console.error('Error applying filter:', error);
    }
  };
  
  
  
  
  return (
    <div className="container mt-4">
      <Card className="text-center">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div>
            <Button
              variant={`outline-${playerType === 'Batsmen' ? 'info' : 'dark'}`}
              className="mr-3"
              onClick={() => handlePlayerTypeChange('Batsmen')}
            >
              Batsmen
            </Button>
            <Button
              variant={`outline-${playerType === 'Bowlers' ? 'info' : 'dark'}`}
              onClick={() => handlePlayerTypeChange('Bowlers')}
            >
              Bowlers
            </Button>
          </div>

          {/* Apply Filter button on the right */}
          <Button variant="outline-success" onClick={handleApplyFilter}>
            Apply Filter
          </Button>
        </Card.Header>

        <Card.Body>
          <Select
            isMulti
            options={options}
            onChange={handleSubCategoryChange}
            value={selectedSubCategories}
            placeholder={`Select Sub-Categories for ${playerType}`}
          />

          {selectedSubCategories && selectedSubCategories.length > 0 && (
            <Form className="mt-3">
              {selectedSubCategories.map((subCategory) => (
                <Form.Group controlId={`formAnswer${subCategory.value}`} key={subCategory.value}>
                  <Form.Label>Answer for {subCategory.label}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={`Enter answer for ${subCategory.label}`}
                  />
                </Form.Group>
              ))}
            </Form>
          )}
        </Card.Body>
      </Card>

      <Button variant="outline-light" className="position-absolute top-0 end-0 mt-3 me-3" onClick={handleProfileClick}>
        Profile
      </Button>

      {/* ProfileModal component */}
      <ProfileModal show={showProfileModal} handleClose={handleProfileClose} username="John Doe" onLogout={() => {}} />
    </div>
  );
};


export default CricketFilter;