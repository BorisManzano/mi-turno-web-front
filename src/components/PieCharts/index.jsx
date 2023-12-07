import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import s from "../../components/Reports/style.module.scss";

const colors = ["#A442F1", "#CC6AFF"];

function PieCharts({ data }) {
  const dat = [
    { name: "reservas", value: data[0].value },
    { name: "asistencias", value: data[1].value },
  ];

  return (
    <div style={{ width: "100%", height: 300, paddingTop: "50px" }}>
      <ResponsiveContainer>
        <p className={s.text} style={{ width: "381px" }}>
          Reservas vs Asistencias
        </p>
        {/* <select
          style={{ marginTop: "14px" }}
          name="branch"
          id="Branch"
          className={s.inputArea}
          defaultValue=""
        >
          <option disabled value="">
            seleccione un período
          </option>
          <option>Mensual</option>
          <option>Semanal</option>
          <option>Diario</option>
          <option>Inicio de los tiempos</option>
        </select> */}
        <PieChart>
          <Pie data={dat} dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieCharts;
