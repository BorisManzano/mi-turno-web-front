import React, { useEffect, useState } from "react";
import s from "./style.module.scss";
import Button from "@mui/material/Button";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useLocation } from "react-router";

export const TableList = ({ datatype, data }) => {
  const isAdmin = true; // esta hardcodeado, pero esto estaria estar en Redux
  const isOperator = false; // esta hardcodeado, pero esto estaria estar en Redux
  const location = useLocation();
  const branches = location.pathname.includes("Branches");
  const defineData = () => {
    if (branches) {
      return "/branches/allBranches";
    } else return "/users/operators";
  };
  // console.log("###########", defineData());
  const [allData, setAllData] = useState();
  const dataType = datatype;
  // const objKeys = Object.keys(data[0]);
  let title = "";
  let column1 = "";
  let column2 = "";
  let column3 = "";
  let column4 = "";

  if (isAdmin && branches) {
    // vista administrador sucursales
    title = "Sucursales";
    column1 = "Nombre";
    column2 = "Mail";
    column3 = "Capacidad Máxima";
    column4 = "Horario de Inicio y cierre";
  } else if (isAdmin) {
    // vista administrador operadores
    title = "Operadores";
    column1 = "Nombre y Apellido";
    column2 = "Mail";
    column3 = "Sucursal";
    column4 = "Contraseña";
  } else if (isOperator) {
    // vista clientes de sus reservas
    column1 = "Nombre y Apellido";
    column2 = "Reserva";
    column3 = "Sucursal";
    column4 = "N° de la reserva";
  }
  //puede ser operadores, sucursales o historial de reservas.
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/${defineData()}`)
      .then((response) => {
        setAllData(response.data);
        console.log(response.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <Navbar role={"final-client"} />
      <div className={s.container} style={{ marginTop: "1.5%" }}>
        <h1>{title || ""}</h1>
        <div className={s.table}>
          {allData &&
            allData.map((data, i) => {
              return (
                <div className={s.row} key={i}>
                  <div className={s.rowItem}>
                    <p>{column1}</p>
                    <b>{data.name || data.nameAndLast_name}</b>
                  </div>
                  <div className={s.rowItem}>
                    <p>{column2}</p>
                    <b>{data.email}</b>
                  </div>
                  <div className={s.rowItem}>
                    <p>{column3}</p>
                    <b>{data.telephone || "Sucursal asociada"}</b>
                  </div>
                  <div className={s.rowItem}>
                    <p>{column4}</p>
                    <b>
                      {data.openingTime
                        ? `${data.openingTime} to ${data.closingTime}`
                        : "************"}
                    </b>
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
                      {dataType == "OperatorReservas"
                        ? "Confirmación"
                        : "Editar"}
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

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//<div className={s.row} key={i}>
//                <div className={s.rowItem}>
//                  <p>{column1}</p>
//                  <b>{objIns[objKeys[0]]}</b>
//                  {/* <b>{objIns[objKeys[0]]}</b> */}
//                </div>
//                <div className={s.rowItem}>
//                  <p>{column2}</p>
//                  <b>{objIns[objKeys[1]]}</b>
//                </div>
//                <div className={s.rowItem}>
//                  <p>{column3}</p>
//                  <b>{objIns[objKeys[2]]}</b>
//                </div>
//                <div className={s.rowItem}>
//                  <p>{column4}</p>
//                  <b>{objIns[objKeys[3]]}</b>
//                </div>
//                <div className={s.rowItem}>
//                  <Button
//                    variant="contained"
//                    style={{
//                      backgroundColor: "#F5F5F5",
//                      color: "#A442F1",
//                      textTransform: "none",
//                    }}
//                  >
//                    {dataType == "OperatorReservas" ? "Confirmación" : "Editar"}
//                  </Button>
//                </div>
//              </div>
