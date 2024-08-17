import React from "react";
import "./WeatherBox.css";

const WeatherBox = ({ weather }) => {
  console.log("weather", weather);
  return (
    <div className="current-weathrer">
      <h2>{weather?.name}</h2>
      <ul>
        <li>
          {weather?.main.temp}
          <i>°C</i>
        </li>
        <li>
          {weather?.main.temp * 1.8 + 32}
          <i>°F</i>
        </li>
      </ul>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  );
};

export default WeatherBox;
