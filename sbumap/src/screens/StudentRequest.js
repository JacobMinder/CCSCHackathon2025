import React, { useState } from 'react';
import data from '../data.json';
import lockedImage from '../images/locked.png'; // Add your locked image path
import unlockedImage from '../images/unlocked.png'; // Add your unlocked image path
import './StudentRequest.css'; // Import the CSS file

const StudentRequest = () => {
  const [formData, setFormData] = useState({
    building: '',
    day: '',
    door: '',
    userType: '',
    unlocked: false,
    note: ''
  });

  const [message, setMessage] = useState('');

  const availableBuildings = data.map(building => building.buildingName);
  const selectedBuilding = data.find(building => building.buildingName === formData.building);
  const availableDays = selectedBuilding ? selectedBuilding.groupDays.map(group => group.days) : [];
  const availableDoors = selectedBuilding && formData.day ? selectedBuilding.groupDays.find(group => group.days === formData.day).doors : [];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'building' && { day: '', door: '', userType: '' }) // Reset day, door, and userType if building changes
    }));
  };

  const handleImageClick = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      unlocked: !prevFormData.unlocked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming you have a function to update your JSON data
    updateJsonData(formData);
    // Reset form
    setFormData({
      building: '',
      day: '',
      door: '',
      userType: '',
      unlocked: false,
      note: ''
    });
    // Display message
    setMessage('Note received and updated');
    // Hide message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

  const updateJsonData = (newData) => {
    const currentTime = new Date().toLocaleString();
    const updatedData = data.map(building => {
      if (building.buildingName === newData.building) {
        return {
          ...building,
          groupDays: building.groupDays.map(group => {
            if (group.days === newData.day) {
              return {
                ...group,
                doors: group.doors.map(door => {
                  if (door.doorName === newData.door) {
                    return {
                      ...door,
                      studentMessage: {
                        note: newData.note,
                        time: currentTime,
                        userType: newData.userType
                      }
                    };
                  }
                  return door;
                })
              };
            }
            return group;
          })
        };
      }
      return building;
    });
  
    // Send the updated data to the backend
    fetch('http://localhost:3001/update-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    })
    .then(response => response.text())
    .then(message => {
      console.log(message);
    })
    .catch(error => {
      console.error('Error updating data:', error);
    });
  };
  
  const isFormValid = formData.building && formData.day && formData.door && formData.userType && formData.unlocked !== null;

  return (
    <div>
      <h1>Student Request Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Building:</label>
          <select
            name="building"
            value={formData.building}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a building</option>
            {availableBuildings.map((building) => (
              <option key={building} value={building}>
                {building}
              </option>
            ))}
          </select>
        </div>
        <hr />
        <div>
          <label>Day:</label>
          <select
            name="day"
            value={formData.day}
            onChange={handleChange}
            required
            disabled={!formData.building}
          >
            <option value="" disabled>Select a day</option>
            {availableDays.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <hr />
        <div>
          <label>Door:</label>
          <select
            name="door"
            value={formData.door}
            onChange={handleChange}
            required
            disabled={!formData.day}
          >
            <option value="" disabled>Select a door</option>
            <option value="All doors">All doors</option>
            {availableDoors.map((door) => (
              <option key={door.doorName} value={door.doorName}>
                {door.doorName}
              </option>
            ))}
          </select>
        </div>
        <hr />
        <div>
          <label>User Type:</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
            disabled={!formData.door}
          >
            <option value="" disabled>Select user type</option>
            <option value="student">Student</option>
            <option value="general">General</option>
          </select>
        </div>
        <hr />
        <div>
          <label>
            <img
              src={formData.unlocked ? unlockedImage : lockedImage}
              alt={formData.unlocked ? 'Unlocked' : 'Locked'}
              onClick={handleImageClick}
              style={{ cursor: 'pointer', width: '50px', height: '50px' }}
            />
            <input
              type="text"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Add a note"
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <hr />
        <button type="submit" disabled={!isFormValid}>Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default StudentRequest;