import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import './App.css';
import Home from './screens/Home';
import Map from './screens/Map';
import BuildingScreen from './screens/BuildingScreen';
import StudentRequest from './screens/StudentRequest';
import DiscussionBoards from './screens/DiscussionBoards';

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
                  to="/DiscussionBoards"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Discussion Boards
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <div className="page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/:buildingId" element={<BuildingScreen />} />
            <Route path="/student-request" element={<StudentRequest />} />
            <Route path="/DiscussionBoards" element={<DiscussionBoards />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
