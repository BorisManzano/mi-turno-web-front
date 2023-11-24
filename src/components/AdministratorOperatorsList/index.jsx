import React, { useEffect, useState } from "react";
import { TableList } from "../../commons/TableList";
import axios from "axios";
import s from "./index.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

export const AdministratorOperatorsList = () => {
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
            const { name, operator } = obj;
            const userName = operator.nameAndLast_name;
            const dni = operator.DNI;
            const operatorEmail = operator.email;
            return { userName, operatorEmail, name, dni };
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
          Crear operador
        </Button>
      </div>
    );
  return (
    <>
      <TableList datatype="Operadores" data={allData} />
    </>
  );
};
