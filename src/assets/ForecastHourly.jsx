import { useEffect, useState } from "react";

export default function ForecastHourly({ lat, lon, setForecast, forecast }) {
  const [error, setError] = useState(null);


  useEffect(() => {
    if (lat && lon) {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=6baaebff9e1c19d7eb9b3330189dbdb0&units=metric&lang=it`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .then((data) => {
          setForecast(data.list);
        })
        .catch((error) => {
          console.error(error);
          setError("Errore nel caricamento");
        });
    }
  }, [lat, lon]);

  const getBgColor = (weatherMain) => {
    const colors = {
      Clear: "bg-yellow-200",
      Clouds: "bg-gray-300",
      Rain: "bg-blue-300",
      Drizzle: "bg-blue-200",
      Thunderstorm: "bg-purple-300",
      Snow: "bg-white",
      Mist: "bg-gray-200",
      Fog: "bg-gray-200",
      Haze: "bg-gray-200",
    };
    return colors[weatherMain] || "bg-blue-100";
  };

  const getWeatherIcon = (weatherMain) => {
    const icons = {
      Clear: "☀️",
      Clouds: "☁️",
      Rain: "🌧️",
      Drizzle: "🌦️",
      Thunderstorm: "⛈️",
      Snow: "❄️",
      Mist: "🌫️",
      Fog: "🌫️",
      Haze: "🌫️",
    };
    return icons[weatherMain] || "🌤️";
  };
  return (
    <div>
      {error ? (
        <p className="text-red-500 font-semibold">{error}</p>
      ) : !forecast || forecast.length === 0 ? (
        <p className="text-gray-500">Caricamento...</p>
      ) : (
        <div className="flex overflow-x-auto gap-4 py-2 px-2 scrollbar-thin scrollbar-thumb-gray-400 mt-5 scrollbar-track-gray-200">
          {forecast.map((item) => (
            <div
              key={item.dt}
              className={`min-w-[100px] p-4 rounded-xl shadow-lg text-center flex-shrink-0 flex flex-col items-center justify-center transition-transform transform hover:scale-105 ${getBgColor(
                item.weather[0].main
              )}`}
            >
              <div className="text-7xl mb-2">
                {getWeatherIcon(item.weather[0].main)}
              </div>
              <div className="text-sm text-gray-600 mb-1">
                🕰️ {item.dt_txt.split(" ")[1].slice(0, 5)}
              </div>
              <div className="text-xl font-bold mb-1">
                🌡️ {Math.round(item.main.temp)}°C
              </div>
              <div className="text-sm mb-1">
                💧 {Math.round(item.main.humidity)}% Humidity
              </div>
              <div className="text-sm mb-1">
                {Math.round(item.wind.speed)} Km/h Wind speed
              </div>
              <div className="text-xs text-gray-700 capitalize">
                {item.weather[0].description}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
