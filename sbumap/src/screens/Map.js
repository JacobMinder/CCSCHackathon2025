import React, { useState } from 'react';
import './Map.css';
import campus from './thumbnail_image.png';
import Building from './Building';
import buildingData from '../data.json'; // Import the JSON data

const Map = () => {
  const [isZoomed, setIsZoomed] = useState(false);

  const getBackgroundColor = (buildingType) => {
    switch (buildingType) {
      case 'Academic':
        return 'rgba(0, 0, 255, 0.5)'; // Blue for Academic
      case 'Dormitory':
        return 'rgba(255, 255, 0, 0.5)'; // Yellow for Dormitory
      case 'Administrative':
        return 'rgba(255, 0, 0, 0.5)'; // Red for Administrative
      case 'Recreational':
        return 'rgba(255, 0, 255, 0.5)'; // Magenta for Recreational
      default:
        return 'rgba(0, 255, 255, 0.5)'; // Cyan for others
    }
  };

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="container">
      <div className={`image-container ${isZoomed ? 'zoomed' : ''}`}>
        <img
          src={campus}
          alt="Map"
          className="zoomable-image"
          onClick={handleZoom}
        />
        {buildingData.map((building, index) => (
          <Building
            key={index}
            route={`/map/${building.buildingName.toLowerCase()}`}
            style={{
              top: building.top, 
              left: building.left, 
              width: building.width,
              height: building.height,
              position: 'absolute', /* Position buildings absolutely within the image */
              backgroundColor: getBackgroundColor(building.buildingType),                 
            }}
            className="building"
          />
        ))}
      </div>
    </div>
  );
};

export default Map;