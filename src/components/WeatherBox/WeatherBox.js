import React from "react";
import "./WeatherBox.css";

const WeatherBox = ({ weather }) => {
  const tempC = weather && weather.main ? weather.main.temp.toFixed(2) : "";
  const tempF =
    weather && weather.main ? (weather.main.temp * 1.8 + 32).toFixed(2) : "";

  return (
    <div className="current-weathrer">
      <h3>{weather?.name || "날씨를 가져오는데 실패했습니다."}</h3>
      <h2>
        {tempC}°C / {tempF}°F
      </h2>
      <p>{weather && weather.weather[0]?.description}</p>
    </div>
  );
};

export default WeatherBox;
