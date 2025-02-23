import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import Home from './screens/Home';
import Map from './screens/Map';
import BuildingScreen from './screens/BuildingScreen';
import StudentRequest from './screens/StudentRequest';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/map">Map</Link>
              </li>
              <li>
                <Link to="/student-request">Student Request</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/map/:buildingId" element={<BuildingScreen />} />
          <Route path="/student-request" element={<StudentRequest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;