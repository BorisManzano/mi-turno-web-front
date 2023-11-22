import React from "react";
import s from "./style.module.scss";
import Button from "@mui/material/Button";
import Navbar from "../Navbar/Navbar";
import { red } from "@mui/material/colors";

import { useNavigate } from "react-router";

export const TableList = ({ datatype, data }) => {
  const navigate = useNavigate();
  const handleOnClickEdit = (rid, e) => {
    e.preventDefault();
    navigate(`/client/editReservation/${rid}`);
  };
  const handleOnClickCancel = (rid, e) => {
    e.preventDefault();
    navigate(`/client/cancelReservation/${rid}`);
  };
  const dataType = datatype;
  const objKeys = Object.keys(data[0]);

  let column1 = "";
  let column2 = "";
  let column3 = "";
  let column4 = "";

  if (dataType == "Sucursales") {
    column1 = "Nombre";
    column2 = "Correo";
    column3 = "Telefono";
    column4 = "Horario de Inicio y cierre";
  } else if (dataType == "Operadores") {
    column1 = "Nombre y Apellido";
    column2 = "Mail";
    column3 = "DNI";
    column4 = "Contraseña";
  } else if (dataType == "Reservas" || dataType == "OperatorReservas") {
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
                  {dataType == "OperatorReservas" ? (
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#F5F5F5",
                        color: "#A442F1",
                        textTransform: "none",
                        padding: "0 !important",
                      }}
                    >
                      Confirmar
                    </Button>
                  ) : (
                    <div className="horiz">
                      <Button
                        onClick={(event) =>
                          handleOnClickEdit(objIns[objKeys[3]], event)
                        }
                        variant="contained"
                        style={{
                          backgroundColor: "#F5F5F5",
                          color: "#A442F1",
                          textTransform: "none",
                          padding: "0 !important",
                        }}
                      >
                        Editar
                      </Button>
                      &nbsp; &nbsp;
                      <Button
                        onClick={(event) =>
                          handleOnClickCancel(objIns[objKeys[3]], event)
                        }
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
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
