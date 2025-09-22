import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function TemperatureChart({ forecast }) {
  const temperaturesArray = forecast?.map((item) => ({
    time: item.dt_txt.split(" ")[1].slice(0, 5),
    temp: Math.round(item.main.temp),
  }));

  if (forecast === null) {
    return null; // niente da mostrare finché non cerchi la città
  }
  if (forecast.length === 0) {
    return <p className="text-gray-500">Caricamento grafico...</p>;
  }

  return (
    <>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={temperaturesArray}
          margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="5 5" />
          <XAxis dataKey="time" stroke="#4b5563" />
          <YAxis stroke="#4b5563" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#f3f4f6",
              borderRadius: 8,
              border: "none",
              padding: "8px",
            }}
            labelStyle={{ fontWeight: "bold" }}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#f97316"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
