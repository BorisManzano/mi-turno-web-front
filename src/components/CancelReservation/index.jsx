import React, { useState } from "react";
import s from "./style.module.scss";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import Navbar from "../../commons/Navbar/Navbar.jsx";

export const CancelReservation = () => {
  const [checkedOption, setCheckedOptions] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const handleOnChange = (i) => {
    const newObj = {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    };
    newObj[i] = !checkedOption[i];
    setCheckedOptions(newObj);
  };
  const options = [
    "Ya no quiero ir",
    "Me equivoqué de horario",
    "Encontré un lugar mejor",
    "Me cancelaron",
    "Otro",
  ];
  return (
    <>
      <div className={s.container}>
        <div className={s.divleft}>
          <div className={s.horiz}>
            <Button
              variant="outlined"
              style={{
                color: "#A442F1",
                border: "none",
                outline: "none",
                paddingLeft: "0",
                textTransform: "none",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10.587 16.4209C10.9115 16.0964 10.9115 15.5703 10.587 15.2459L6.17454 10.8334H16.6662C17.1264 10.8334 17.4995 10.4603 17.4995 10C17.4995 9.53979 17.1264 9.1667 16.6662 9.1667H6.17454L10.587 4.7542C10.9115 4.42973 10.9115 3.90367 10.587 3.5792C10.2626 3.25473 9.73651 3.25473 9.41204 3.5792L3.69832 9.29293C3.30779 9.68345 3.30779 10.3166 3.69832 10.7071L9.41204 16.4209C9.73651 16.7453 10.2626 16.7453 10.587 16.4209Z"
                  fill="#A442F1"
                />
              </svg>
              <p style={{ color: "#A442F1" }}>Atrás</p>
            </Button>
          </div>

          <h1>Cancelar Reserva</h1>
          <br />
          <br />
          <p>Hola Usuario,</p>

          <h3>¿Por qué desea cancelar su reserva?</h3>

          {options.map((option, i) => {
            return (
              <div key={i}>
                <div className={s.line}></div>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        handleOnChange(i);
                      }}
                      checked={checkedOption[i] || false}
                      sx={{ "&.Mui-checked": { color: "#A442F1" } }}
                    />
                  }
                  label={
                    <span
                      style={{
                        fontWeight: checkedOption[i] ? "bold" : "normal",
                        color: checkedOption[i] ? "black" : "#5f5f5f",
                      }}
                    >
                      {option}
                    </span>
                  }
                />
                {checkedOption[i] && (
                  <div className={s.card}>
                    <p>Su reserva actual será cancelada</p>
                    <p>La cancelación no puede ser revertida</p>

                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: red[500],
                        color: "white",
                        textTransform: "none",
                        marginTop: "5px",
                      }}
                    >
                      Confirmar cancelación
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={s.divright}>
          <br />
          <p className={s.Info}>Información de la reserva</p>
          <h2>Nombre Usuario</h2>
          <div style={{ marginTop: "10px" }}>
            <div className={s.horiz}>
              <p>Día: </p>
              <p className={s.Info}>9/9/9999</p>
            </div>
            <div className={s.horiz}>
              <p>Horario: </p>
              <p className={s.Info}>13:00 hs</p>
            </div>
            <div className={s.horiz}>
              <p>Sucursal: </p>
              <p className={s.Info}>Villa Crespo</p>
            </div>
          </div>
          <div className={s.line}></div>
        </div>
      </div>
    </>
  );
};
