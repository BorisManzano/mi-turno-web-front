import React from "react";
import s from "../Reports/style.module.scss";

function BarCharts({ data }) {
  const reservations = data[0].value;
  const attended = data[1].value;
  const cancelled = data[2].value;

  const porR = Math.round(
    reservations > 0
      ? (reservations / (reservations + attended + cancelled)) * 100
      : 0
  );
  const porA = Math.round(
    attended > 0 ? (attended / (reservations + attended + cancelled)) * 100 : 0
  );
  const porC = Math.round(
    cancelled > 0
      ? (cancelled / (reservations + attended + cancelled)) * 100
      : 0
  );

  return (
    <div className={s.dir}>
      <p className={s.text}>Datos globales de las reservas</p>
      <p className={s.text1}>Reservas</p>
      <div className={s.progressContainer}>
        <div
          className={`${s.progressBar} ${s.reservation}`}
          style={{ width: `${porR}%` }}
        >
          {porR}%
        </div>
      </div>
      <p className={s.text1}>Asistencias</p>
      <div className={s.progressContainer}>
        <div
          className={`${s.progressBar} ${s.attended}`}
          style={{ width: `${porA}%` }}
        >
          {porA}%
        </div>
      </div>
      <p className={s.text1}>Canceladas</p>
      <div className={s.progressContainer}>
        <div
          className={`${s.progressBar} ${s.cancelled}`}
          style={{ width: `${porC}%` }}
        >
          {porC}%
        </div>
      </div>
    </div>
  );
}

export default BarCharts;
