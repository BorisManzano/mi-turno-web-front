import React from "react";
import s from "../Reports/style.module.scss";

function BarCharts() {
  return (
    <div className={s.dir}>
      <p className={s.text}>Reservas con antelacion</p>
      <div className={s.progressContainer}>
        <div
          className={`${s.progressBar} ${s.success}`}
          style={{ width: "25%" }}
        >
          25%
        </div>
      </div>
      <p className={s.text}>Reservas con antelacion</p>
      <div className={s.progressContainer}>
        <div className={`${s.progressBar} ${s.info}`} style={{ width: "75%" }}>
          75%
        </div>
      </div>
    </div>
  );
}

export default BarCharts;
