import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Building.css';

const Building = ({ route, style }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div
      className="clickable-area"
      style={style}
      onClick={handleClick}
    ></div>
  );
};

export default Building;