import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import './Map.css';
import campus from './thumbnail_image.png';
import Building from './Building';
import buildingData from '../data.json'; // Import the JSON data

const Map = () => {
  return (
    <div className="container">
      <Zoom>
        <img
          src={campus}
          alt="Map"
          className="zoomable-image"
        />
      </Zoom>
      {buildingData.map((building, index) => (
        <Building
          key={index}
          route={`/map/${building.buildingName.toLowerCase()}`}
          style={{
            top: building.top, // Use the top position from JSON
            left: building.left, // Use the left position from JSON
            width: building.width,
            height: building.height,
            backgroundColor: 'rgba(255, 0, 0, 0.3)',
          }}
        />
      ))}
    </div>
  );
};

export default Map;