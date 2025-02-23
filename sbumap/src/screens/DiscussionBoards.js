import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data.json';
import './DiscussionBoards.css'; // Import the CSS file

const DiscussionBoards = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const navigate = useNavigate();

  const handleBuildingChange = (e) => {
    setSelectedBuilding(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBuilding) {
      navigate(`/${selectedBuilding.toLowerCase()}`);
    }
  };

  return (
    <div className="container">
      <h1>Select Discussion Board</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Building:</label>
          <select
            name="building"
            value={selectedBuilding}
            onChange={handleBuildingChange}
            required
          >
            <option value="" disabled>Select a building</option>
            {data.map((building) => (
              <option key={building.buildingName} value={building.buildingName}>
                {building.buildingName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Go to Discussion Board</button>
      </form>
    </div>
  );
};

export default DiscussionBoards;