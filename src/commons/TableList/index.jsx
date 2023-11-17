import React from "react";
import s from "./style.module.scss";
import Button from "@mui/material/Button";
import Navbar from "../Navbar/Navbar";

export const TableList = ({ datatype, data }) => {
  const dataType = datatype;
  const objKeys = Object.keys(data[0]);
  let key1 = "";
  let key2 = "";
  let key3 = "";
  let key4 = "";
  let column1 = "";
  let column2 = "";
  let column3 = "";
  let column4 = "";

  if (dataType == "Sucursales") {
    key1 = "";
    key2 = "";
    key3 = "";
    key4 = "";
    column1 = "Nombre";
    column2 = "Ciudad";
    column3 = "Capacidad Máxima";
    column4 = "Horario de Inicio y cierre";
  } else if (dataType == "Operadores") {
    key1 = "";
    key2 = "";
    key3 = "";
    key4 = "";
    column1 = "Nombre y Apellido";
    column2 = "Mail";
    column3 = "Sucursal";
    column4 = "Contraseña";
  } else if (dataType == "Reservas" || dataType == "OperatorReservas") {
    key1 = "";
    key2 = "";
    key3 = "";
    key4 = "";
    column1 = "Fecha de solicitud";
    column2 = "Reserva";
    column3 = "Sucursal";
    column4 = "N° de la reserva";
  }
  //puede ser operadores, sucursales o historial de reservas.
  return (
    <>
      <Navbar role={"final-client"} />
      <div className={s.container} style={{ marginTop: "1.5%" }}>
        <h1>{dataType == "OperatorReservas" ? "Reservas" : dataType}</h1>
        <div className={s.table}>
          {data.map((objIns, i) => {
            return (
              <div className={s.row} key={i}>
                <div className={s.rowItem}>
                  <p>{column1}</p>
                  <b>{objIns[objKeys[0]]}</b>
                </div>
                <div className={s.rowItem}>
                  <p>{column2}</p>
                  <b>{objIns[objKeys[1]]}</b>
                </div>
                <div className={s.rowItem}>
                  <p>{column3}</p>
                  <b>{objIns[objKeys[2]]}</b>
                </div>
                <div className={s.rowItem}>
                  <p>{column4}</p>
                  <b>{objIns[objKeys[3]]}</b>
                </div>
                <div className={s.rowItem}>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#F5F5F5",
                      color: "#A442F1",
                      textTransform: "none",
                    }}
                  >
                    {dataType == "OperatorReservas" ? "Confirmación" : "Editar"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
