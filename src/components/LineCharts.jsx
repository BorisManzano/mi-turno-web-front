import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const LineCharts = ({ data }) => {
  const dat = data.map((item) => ({
    date: item.dayOfWeek,
    Reservas: Math.round(item.reservations),
    Asistencias: Math.round(item.attended),
    Cancelaciones: Math.round(item.cancelled),
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={dat} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Reservas" stroke="#A442F1" />
        <Line type="monotone" dataKey="Asistencias" stroke="#CC6AFF" />
        <Line type="monotone" dataKey="Cancelaciones" stroke="red" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineCharts;
