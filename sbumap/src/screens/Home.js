import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';
import buildingData from '../data.json'; // Import the JSON data

const dayGroups = ['All', 'Weekdays', 'Weekend'];
const buildingTypes = ['All', 'Academic', 'Dormitory', 'Administrative', 'Recreational', 'Other'];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedDayGroup, setSelectedDayGroup] = useState('All');
  const [selectedBuildingType, setSelectedBuildingType] = useState('All');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDayGroupChange = (event) => {
    setSelectedDayGroup(event.target.value);
  };

  const handleBuildingTypeChange = (event) => {
    setSelectedBuildingType(event.target.value);
  };

  const handleBuildingClick = (building) => {
    setSelectedBuilding(building);
  };

  const handleCloseModal = () => {
    setSelectedBuilding(null);
  };

  const filteredBuildings = buildingData.filter((building) =>
    building.buildingName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedBuildingType === 'All' || building.buildingType === selectedBuildingType)
  );

  return (
    <div className="sbu-container">
      <header className="sbu-header">
        <h1>Southwest Baptist University Buildings</h1>
        <p>Explore the campus with SBU's signature purple and gold theme.</p>
      </header>

      <div className="filter-container">
        <div className="filter-group">
          <label htmlFor="day-group-select">Days</label>
          <select id="day-group-select" value={selectedDayGroup} onChange={handleDayGroupChange} className="day-group-select">
            {dayGroups.map((group, index) => (
              <option key={index} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="building-type-select">Building Types</label>
          <select id="building-type-select" value={selectedBuildingType} onChange={handleBuildingTypeChange} className="building-type-select">
            {buildingTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search buildings..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />

      <div className="building-list">
        {filteredBuildings.map((building, index) => (
          <div key={index} className="building-card sbu-card" onClick={() => handleBuildingClick(building)}>
            <h2 className="building-name">{building.buildingName}</h2>
            <p className="building-type">{building.buildingType}</p>
          </div>
        ))}
      </div>

      {selectedBuilding && (
        <div className="modal">
          <div className="modal-content sbu-modal">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <h2>{selectedBuilding.buildingName}</h2>
            <NavLink to={`/map/${selectedBuilding.buildingName.toLowerCase()}`} className="building-link">
              <h2 className="building-name">{selectedBuilding.buildingName} Discussion Board</h2>
            </NavLink>
            <p>Type: {selectedBuilding.buildingType}</p>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    {selectedBuilding.groupDays
                      .filter((group) => selectedDayGroup === 'All' || group.days === selectedDayGroup)
                      .map((group, index) => (
                        <th key={index}>{group.days}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedBuilding.groupDays[0].doors.map((_, doorIndex) => (
                    <tr key={doorIndex} className='pop-up-container'>
                      {selectedBuilding.groupDays
                        .filter((group) => selectedDayGroup === 'All' || group.days === selectedDayGroup)
                        .map((group, groupIndex) => (
                          <td key={groupIndex} className='table-cell'>
                            <h4>{group.doors[doorIndex].doorName}</h4>
                            <p>General Open Time: {group.doors[doorIndex].openGeneralTime}</p>
                            <p>General Close Time: {group.doors[doorIndex].closedGeneralTime}</p>
                            <p>Student Open Time: {group.doors[doorIndex].openStudentTime}</p>
                            <p>Student Close Time: {group.doors[doorIndex].closedStudentTime}</p>
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;