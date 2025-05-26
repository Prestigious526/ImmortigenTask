import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./App.css";

function PowerCard({ hostel, power, anomaly, trend }) {
  return (
    <div className={`card ${anomaly ? "anomaly" : "normal"}`}>
      <h2>Hostel {hostel}</h2>
      <p className="power">{power.toFixed(2)} kW</p>
      {anomaly && <p className="alert">Anomaly Detected</p>}
      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={trend.map((kw, i) => ({ index: i, kw }))}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="index" hide={true} />
          <YAxis domain={[0, 'auto']} tickFormatter={(v) => `${v}kW`} />
          <Tooltip formatter={(value) => `${value} kW`} />
          <Line type="monotone" dataKey="kw"/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function App() {
  const [data, setData]= useState([]);

  const fetchData = async () => {
    try {
      const res= await axios.get(" ");
      setData(res.data.hostels);
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return(
    <div className="container">
      <h1>Smart Campus Power Dashboard</h1>
      <div className="grid">
        {data.map((hostel)=> (
          <PowerCard key={hostel.hostel} {...hostel} />
        ))}
      </div>
    </div>
  );
}

export default App;
