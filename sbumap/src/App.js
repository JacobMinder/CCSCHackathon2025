import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
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
                <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/map" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Map
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/student-request"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Student Request
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/map/landen hall"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Landen Hall
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/map/taylor"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Taylor
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <div className="page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/map/:buildingId" element={<BuildingScreen />} />
            <Route path="/student-request" element={<StudentRequest />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
