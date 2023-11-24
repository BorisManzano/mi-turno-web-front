import React, { useEffect, useState } from "react";
import { TableList } from "../../commons/TableList";
import axios from "axios";
import { Button } from "@mui/material";
import s from "./index.scss";
import { useNavigate } from "react-router";

export const AdministratorSucursalesList = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/users/admin/sucursalesList`, {
        // mediante la ruta de sucursales tambien se trae la info de operadores
        withCredentials: true,
      })
      .then((res) => {
        setAllData(
          res.data.map((obj) => {
            const { name, email, capacity, openingTime, closingTime, id } = obj;
            const horario = openingTime + " to " + closingTime;
            return { name, email, capacity, horario, id };
          })
        );
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, []);
  // const operators = allData;

  if (loading) return <>Loading...</>;
  else if (allData.length == 0)
    return (
      <div className={s.mid}>
        <h1>No hay operadores</h1>
        <Button
          onClick={(e) => {
            navigate(`/`);
          }}
          variant="contained"
          style={{
            backgroundColor: "#F5F5F5",
            color: "#A442F1",
            textTransform: "none",
            padding: "0 !important",
          }}
        >
          Crear Sucursal
        </Button>
      </div>
    );
  return (
    <>
      <TableList datatype="Sucursales" data={allData} />
    </>
  );
};
