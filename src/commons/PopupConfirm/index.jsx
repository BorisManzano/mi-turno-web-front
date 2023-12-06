import React from "react";
import s from "./style.module.scss";
import Button from "@mui/material/Button";
import { red, purple } from "@mui/material/colors";

export const PopupConfirm = (props) => {
    const {onChange, message} = props;
  return (
    <div className={s.container}>
      <div className={s.card}>
        <h1>Alerta</h1>
        <p>{message}</p>
        <br/>
        <br/>
        <div className={s.containerbuttons}>
          <Button
            onClick={(e) => {
                e.preventDefault();
              onChange("accepted");
            }}
            variant="contained"
            style={{
              backgroundColor: "#A442F1",
              color: "white",
              textTransform: "none",
              padding: "0 !important",
            }}
          >
            Aceptar
          </Button>
          <Button
            onClick={(e) => {
                e.preventDefault();
              onChange("rejected");
            }}
            variant="contained"
            style={{
              backgroundColor: red[500],
              color: "white",
              textTransform: "none",
            }}
          >
            Cancelar
          </Button>
         
        </div>
      </div>
    </div>
  );
};
