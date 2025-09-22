
// Componente WeatherCard migliorato
export default function WeatherCard({ datiMeteo }) {
  if (!datiMeteo) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 text-white max-w-sm mx-auto border border-slate-700/50">
        <div className="text-center text-slate-400">
          <div className="text-6xl mb-4">🌤️</div>
          <p className="text-lg">Cerca una città per vedere il meteo</p>
        </div>
      </div>
    );
  }

  // Funzione per ottenere l'icona basata sul meteo
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

  // Funzione per ottenere il gradiente basato sul meteo
  const getWeatherGradient = (weatherMain, temp) => {
    if (temp > 25) return "from-orange-400 via-red-400 to-pink-500";
    if (temp > 15) return "from-yellow-400 via-orange-400 to-red-400";
    if (temp > 5) return "from-blue-400 via-cyan-400 to-teal-400";
    return "from-blue-600 via-indigo-600 to-purple-600";
  };

  const temp = Math.round(datiMeteo.main.temp);
  const weatherMain = datiMeteo.weather[0].main;

  return (
    <div
      className={`bg-gradient-to-br ${getWeatherGradient(
        weatherMain,
        temp
      )} rounded-3xl shadow-2xl p-8 text-white max-w-sm mx-auto transform hover:scale-105 transition-all duration-500 hover:shadow-3xl border border-white/20`}
    >
      {/* Header con città e icona meteo */}
      <div className="text-center mb-6">
        <div className="text-6xl mb-3 animate-bounce">
          {getWeatherIcon(weatherMain)}
        </div>
        <h1 className="text-2xl font-bold mb-1">{datiMeteo.name}</h1>
        <h3 className="text-white/80 text-sm font-medium tracking-wider">
          {datiMeteo.sys.country}
        </h3>
      </div>

      {/* Temperatura principale */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <span className="text-6xl font-light tracking-tighter">{temp}°</span>
          <span className="text-2xl text-white/80 ml-1 absolute -top-2">C</span>
        </div>
        <p className="text-white/90 text-lg font-medium capitalize mt-2">
          {datiMeteo.weather[0].description}
        </p>
      </div>

      {/* Informazioni dettagliate */}
      <div className="space-y-4">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💧</span>
              <span className="font-medium">Umidità</span>
            </div>
            <span className="text-xl font-bold">
              {datiMeteo.main.humidity}%
            </span>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌡️</span>
              <span className="font-medium">Percepita</span>
            </div>
            <span className="text-xl font-bold">
              {Math.round(datiMeteo.main.feels_like)}°C
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
