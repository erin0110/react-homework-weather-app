import { useCallback, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./App.css";
import WeatherBox from "./components/WeatherBox/WeatherBox";
import WeatherButton from "./components/WeatherButton/WeatherButton";

/**
 * 1. 앱이 실행 되자마자 현재 위치 기반의 날씨가 보인다.
 * 2. 날씨 정보에는 날씨 상태 정보가 들어간다. (도시, 섭씨, 화씨)
 * 3. 5개의 버튼이 있다. (현재위치 / 도시 4개)
 * 4. 도시 버튼을 클릭할 때마다 도시별 날씨가 나온다.
 * 5. 현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다.
 * 6. 데이터를 들고오는동안 로딩스피너가 돈다.
 */

const cities = ["Paris", "New York City", "Nha Trang", "Seoul"];

function App() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);

  const getWeatherByCurrentLocation = useCallback(async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6a4568d07103a774cc1301828382d566&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }, []);

  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  }, [getWeatherByCurrentLocation]);

  const getweatherByCity = useCallback(async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6a4568d07103a774cc1301828382d566&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }, [city]);

  useEffect(() => {
    if (city === null) getCurrentLocation();
    else getweatherByCity();
  }, [city, getCurrentLocation, getweatherByCity]);

  const handleCityChange = (city) => {
    city === "current" ? setCity(null) : setCity(city);
  };

  return (
    <main>
      <section className="weather-info">
        {loading ? (
          <ClipLoader
            color="#fff"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <>
            <WeatherBox weather={weather} />
            <WeatherButton
              cities={cities}
              handleCityChange={handleCityChange}
              selectedCity={city}
            />
          </>
        )}
      </section>
    </main>
  );
}

export default App;
