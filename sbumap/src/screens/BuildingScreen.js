import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import buildingData from '../data.json';
import './BuildingScreen.css';

const BuildingScreen = () => {
  const { buildingId } = useParams();
  const building = buildingData.find(b => b.buildingName.toLowerCase() === buildingId);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const getDayName = (date) => {
    return days[date.getDay()];
  };

  const today = new Date();
  const currentDayName = getDayName(today);
  const [selectedDayName, setSelectedDayName] = useState(currentDayName);

  if (!building) {
    return <div>Building not found</div>;
  }

  const handleDayChange = (event) => {
    setSelectedDayName(event.target.value);
  };

  return (
    <div className='view-building-container'>
      <div className="side-panel">
        <select id="day-select" value={selectedDayName} onChange={handleDayChange}>
          {days.map((day, index) => (
            <option key={index} value={day}>{day}</option>
          ))}
        </select>
        <div className="door-dropdown">
          {building.groupDays && building.groupDays
            .filter(groupDay => {
              const day = selectedDayName.toLowerCase();
              return groupDay.days.toLowerCase() === day ||
                    (groupDay.days.toLowerCase() === 'weekdays' && !['saturday', 'sunday'].includes(day)) ||
                    (groupDay.days.toLowerCase() === 'weekend' && ['saturday', 'sunday'].includes(day));
            })
            .map((groupDay, index) => (
              <div key={index}>
                {groupDay.doors && groupDay.doors.map((door, doorIndex) => (
                  <Dropdown key={doorIndex} door={door} />
                ))}
              </div>
          ))}
        </div>      
      </div>
      <div className="building-details">
        <h1>{building.buildingName}</h1>
        <p>{building.description}</p>
        <img src={require(`${building.image}`)} alt={`${building.buildingName} image`} />
      </div>
    </div>
  );
};

const Dropdown = ({ door }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <h3 onClick={toggleDropdown} className="dropdown-title">{door.doorName}</h3>
      {isOpen && (
        <div className="dropdown-content">
          <p>Open General Time: {door.openGeneralTime}</p>
          <p>Closed General Time: {door.closedGeneralTime}</p>
          <p>Open Student Time: {door.openStudentTime}</p>
          <p>Closed Student Time: {door.closedStudentTime}</p>
        </div>
      )}
    </div>
  );
};

export default BuildingScreen;