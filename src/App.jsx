import { useState } from "react";
import SearchBar from "./assets/components/SearchBar";
import "./App.css";
import WeatherCard from "./assets/components/WeatherCard";
import ForecastHourly from "./assets/ForecastHourly";
import TemperatureChart from "./assets/components/TemperatureChart";

function App() {
  const [weather, setWeather] = useState();
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState(null);

  function riceviCitta(citta) {
    console.log("La città ricevuta dal figlio è:", citta);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${citta}&appid=6baaebff9e1c19d7eb9b3330189dbdb0&units=metric&lang=it`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWeather(data);
        setError(null);
      })
      .catch((error) => {
        console.error(error), setError("Città non trovata");
        setWeather(null);
      });
  }

  return (
    <>
      <div className="max-w-5xl mx-auto p-4 bg-gray-50 min-h-screen overflow-x-hidden">
        <SearchBar riceviCitta={riceviCitta} />
        {weather && (
          <div className="mt-6">
            <WeatherCard datiMeteo={weather} />
            <ForecastHourly
              lat={weather.coord.lat}
              lon={weather.coord.lon}
              forecast={forecast}
              setForecast={setForecast}
            />
            <div className="mt-6">
              <TemperatureChart forecast={forecast} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
