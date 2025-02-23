import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data.json';
import lockedImage from '../images/locked.png'; // Add your locked image path
import unlockedImage from '../images/unlocked.png'; // Add your unlocked image path
import './StudentRequest.css'; // Import the CSS file

const StudentRequest = () => {
  const [formData, setFormData] = useState({
    building: '',
    day: '',
    time: '', // Add time to formData
    door: '',
    userType: '',
    unlocked: false,
    note: '',
    name: '' // Add name to formData
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  const availableBuildings = data.map(building => building.buildingName);
  const selectedBuilding = data.find(building => building.buildingName === formData.building);
  const availableDoors = selectedBuilding && formData.day ? selectedBuilding.groupDays.find(group => group.days === formData.day)?.doors || [] : [];

  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Weekdays", "Weekend"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'building' && { day: '', door: '', userType: '', time: '' }) // Reset day, door, userType, and time if building changes
    }));
  };

  const handlePostMessage = () => {
    const newMessage = formData.note;
    const wordCount = newMessage.trim().split(/\s+/).length;
    if (wordCount <= 50 && newMessage.trim() !== '') {
      const updatedMessages = [
        { 
          text: `Under ${formData.userType} permissions, the ${formData.door} for ${formData.building} was ${formData.unlocked ? "unlocked" : "locked"} on ${formData.day} at ${formData.time}.
Note: ${formData.note}`,
          author: formData.name || "Anonymous", 
          timestamp: new Date().toLocaleString(), 
          color: formData.unlocked ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)' // Transparent green or red
        },
        ...messages
      ];
      setMessages(updatedMessages);
      const existingMessages = JSON.parse(localStorage.getItem(`${formData.building.toLowerCase()}-messages`)) || [];
      const newMessages = [...updatedMessages, ...existingMessages];
      localStorage.setItem(`${formData.building.toLowerCase()}-messages`, JSON.stringify(newMessages));
      setFormData((prevFormData) => ({
        ...prevFormData,
        note: ''
      }));
    } else if (wordCount > 50) {
      alert("Your message must be 50 words or fewer.");
    }
  };

  const handleImageClick = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      unlocked: !prevFormData.unlocked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update local storage with the new data
    updateLocalStorage(formData);
    // Reset form
    setFormData({
      building: '',
      day: '',
      time: '', // Reset time
      door: '',
      userType: '',
      unlocked: false,
      note: '',
      name: '' // Reset name
    });
    // Display message
    setMessage('Note received and updated');
    // Hide message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
    // Navigate to the building's discussion board
    navigate(`/${formData.building.toLowerCase()}`);
  };

  const updateLocalStorage = (newData) => {
    const currentTime = new Date().toLocaleString();
    const storedMessages = JSON.parse(localStorage.getItem(`${newData.building}-messages`)) || [];
    const updatedMessages = [
      {
        text: newData.note,
        author: newData.userType,
        timestamp: currentTime,
        unlocked: newData.unlocked,
        name: newData.name, // Add name to the message
        time: newData.time // Add time to the message
      },
      ...storedMessages
    ];
    localStorage.setItem(`${newData.building}-messages`, JSON.stringify(updatedMessages));
  };

  const isFormValid = formData.building && formData.day && formData.time && formData.door && formData.userType && formData.unlocked !== null;

  const setCurrentDay = () => {
    const now = new Date();
    const currentDay = weekdays[now.getDay()];
    setFormData((prevFormData) => ({
      ...prevFormData,
      day: currentDay
    }));
  };

  const setCurrentTime = () => {
    const now = new Date();
    const currentTime = now.toTimeString().split(' ')[0].slice(0, 5); // Format time as HH:MM
    setFormData((prevFormData) => ({
      ...prevFormData,
      time: currentTime
    }));
  };

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
        <div className="buttons-container">
          <button type="button" className="purple-button" onClick={setCurrentDay}>Get Current Day</button>
          <button type="button" className="purple-button" onClick={setCurrentTime}>Get Current Time</button>
        </div>
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
            {weekdays.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            disabled={!formData.day}
          />
        </div>
        <div>
          <label>Door:</label>
          <select
            name="door"
            value={formData.door}
            onChange={handleChange}
            required
            disabled={!formData.time}
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
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </div>
        <div>
          <label>
            <img
              src={formData.unlocked ? unlockedImage : lockedImage}
              alt={formData.unlocked ? 'Unlocked' : 'Locked'}
              onClick={handleImageClick}
              style={{ width: '50px', height: '50px' }}
            />
            <input
              type="text"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Add a note"
            />
          </label>
        </div>
        <button onClick={handlePostMessage} type="submit" disabled={!isFormValid}>Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default StudentRequest;