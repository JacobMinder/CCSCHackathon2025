import React, { useState, useEffect } from 'react';
import './Map.css';
import campus from './thumbnail_image.png';
import Building from './Building';
import buildingData from '../data.json'; // Import the JSON data

const buildingTypes = ['Academic', 'Dormitory', 'Administrative', 'Recreational', 'Other'];

const Map = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(buildingTypes);
  const [selectedBuildings, setSelectedBuildings] = useState(buildingData.map(building => building.buildingName));
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showBuildingList, setShowBuildingList] = useState(true); // Set to true to show the list by default

  useEffect(() => {
    // Update selectedBuildings based on selectedTypes
    const updatedSelectedBuildings = buildingData
      .filter(building => selectedTypes.includes(building.buildingType))
      .map(building => building.buildingName);
    setSelectedBuildings(updatedSelectedBuildings);
  }, [selectedTypes]);

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

  const handleZoom = (event) => {
    // Prevent zooming when clicking on the menu
    if (event.target.closest('.menu')) {
      return;
    }
    setIsZoomed(!isZoomed);
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prevSelectedTypes) =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter((t) => t !== type)
        : [...prevSelectedTypes, type]
    );
  };

  const handleBuildingChange = (buildingName) => {
    setSelectedBuildings((prevSelectedBuildings) =>
      prevSelectedBuildings.includes(buildingName)
        ? prevSelectedBuildings.filter((b) => b !== buildingName)
        : [...prevSelectedBuildings, buildingName]
    );
  };

  return (
    <div className="container">
      <div className="menu"> {/* Removed the zoomed class toggle */}
        <h3 className="filter-title">Filter Tool</h3>
        <div className={`filter-box ${showTypeFilter ? 'show' : ''}`}>
          <h4 onClick={() => setShowTypeFilter(!showTypeFilter)}>
            Building Types
            <span className={`arrow ${showTypeFilter ? 'open' : ''}`}>^</span>
          </h4>
          {showTypeFilter && (
            <div>
              {buildingTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  style={{
                    backgroundColor: selectedTypes.includes(type) ? getBackgroundColor(type) : 'transparent',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '10px',
                    margin: '5px 0',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className={`building-list ${showBuildingList ? 'show' : ''}`}>
          {showBuildingList && (
            <ul>
              {buildingData.map((building, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleBuildingChange(building.buildingName)}
                    style={{
                      backgroundColor: selectedBuildings.includes(building.buildingName) ? getBackgroundColor(building.buildingType) : 'transparent',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      padding: '10px',
                      margin: '5px 0',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left'
                    }}
                  >
                    {building.buildingName}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={`image-container ${isZoomed ? 'zoomed' : ''}`}>
        <img
          src={campus}
          alt="Map"
          className="zoomable-image"
          onClick={handleZoom}
        />
        {buildingData
          .filter((building) => selectedBuildings.includes(building.buildingName))
          .map((building, index) => (
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