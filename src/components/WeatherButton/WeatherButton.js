import React from "react";
import "./WeatherButton.css";

const WeatherButton = ({ cities, selectedCity, handleCityChange }) => {
  console.log("selectedCity", selectedCity);
  return (
    <div className="weathrer-buttons">
      <button
        onClick={() => handleCityChange("current")}
        className={selectedCity === null ? "active" : ""}
      >
        Current Location
      </button>
      {cities.map((item, index) => (
        <button
          key={index}
          onClick={() => handleCityChange(item)}
          className={selectedCity === item ? "active" : ""}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default WeatherButton;
