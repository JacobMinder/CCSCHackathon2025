import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import buildingData from '../data.json';
import './BuildingScreen.css';

const BuildingScreen = () => {
  const { buildingId } = useParams();
  const building = buildingData.find(b => b.buildingName.toLowerCase() === buildingId);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const today = new Date();
  const currentDayName = days[today.getDay()];
  const [selectedDayName, setSelectedDayName] = useState(currentDayName);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem(`${buildingId}-messages`)) || [];
    setMessages(storedMessages);
  }, [buildingId]);

  const handleDayChange = (event) => {
    setSelectedDayName(event.target.value);
  };

  const handlePostMessage = () => {
    const wordCount = newMessage.trim().split(/\s+/).length;
    if (wordCount <= 50 && newMessage.trim() !== '') {
      const updatedMessages = [
        { text: newMessage, author: author || "Anonymous", timestamp: new Date().toLocaleString() },
        ...messages
      ];
      setMessages(updatedMessages);
      localStorage.setItem(`${buildingId}-messages`, JSON.stringify(updatedMessages));
      setNewMessage('');
      setAuthor('');
    } else if (wordCount > 50) {
      alert("Your message must be 50 words or fewer.");
    }
  };

  if (!building) {
    return <div>Building not found</div>;
  }

  return (
    <div className='view-building-container' style={{overflowY: 'auto'}}>
      <div className="side-panel">
        <select value={selectedDayName} onChange={handleDayChange}>
          {days.map((day, index) => (
            <option key={index} value={day}>{day}</option>
          ))}
        </select>

        <div className="door-dropdown">
          {building.groupDays.filter(groupDay => {
            const day = selectedDayName.toLowerCase();
            return groupDay.days.toLowerCase() === day ||
                  (groupDay.days.toLowerCase() === 'weekdays' && !['saturday', 'sunday'].includes(day)) ||
                  (groupDay.days.toLowerCase() === 'weekend' && ['saturday', 'sunday'].includes(day));
          })
          .map((groupDay, index) => (
            <div key={index}>
              {groupDay.doors.map((door, doorIndex) => (
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

        <div className="message-board">
          <h2>Discussion Board</h2>
          <input
            type="text"
            className="author-input"
            style={{ width: '100%', boxSizing: 'border-box', marginBottom: '8px' }}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name (optional)"
          />
          <textarea
            className="message-textarea"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Join the discussion..."
            style={{ width: '100%', boxSizing: 'border-box', height: '60px' }}
          ></textarea>
          <button className="post-button" onClick={handlePostMessage}>Post</button>
          <div style={{textAlign: 'right', fontSize: '12px', color: '#555'}}>
            Word count: {newMessage.trim().split(/\s+/).length}/50
          </div>

          <div className="messages" style={{marginTop: '10px'}}>
            {messages.map((msg, idx) => (
              <div key={idx} className="discussion-message">
                <div className="message-header">
                  <strong>{msg.author}</strong> <span className="timestamp">{msg.timestamp}</span>
                </div>
                <div className="message-body">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Dropdown = ({ door }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <h3 onClick={() => setIsOpen(!isOpen)} className="dropdown-title">{door.doorName}</h3>
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
