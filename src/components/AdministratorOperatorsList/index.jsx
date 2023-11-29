import React, { useEffect, useState } from "react";
import { TableList } from "../../commons/TableList";
import axios from "axios";
import s from "./index.scss";
import { Button, accordionActionsClasses } from "@mui/material";
import { useNavigate } from "react-router";

export const AdministratorOperatorsList = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prevIds, setPrevIds] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/users/admin/operatorsList`, {
        // mediante la ruta de sucursales tambien se trae la info de operadores
      })
      .then((res) => {
        setAllData(
          res.data.map((obj) => {
            const { name, operator } = obj;
            const userName = operator ? operator.fullname : "";
            const dni = operator ? operator.DNI : "";
            const operatorEmail = operator ? operator.email : "";
            const id = operator ? operator.id : null;
            
            return { userName, operatorEmail, name, dni, id };
          })
        );
          return res;
      })
      .then((res)=>{
        res.data.map((obj)=>{
          const {operator} = obj;
          if(operator.id)setPrevIds(prevIds => [...prevIds, operator.id]);
        })
      })
      .then(()=>{
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
      
  }, []);
  // const operators = allData;

  useEffect(() => {
    if(allData.length>0) {
         axios.get("http://localhost:3001/api/users/admin/allOperators")
        .then((res2)=>{
          console.log(prevIds)
          const newOperators = res2.data.filter(operator => !prevIds.includes(operator.id))
          .map(operator => ({
            userName: operator.fullname,
            operatorEmail: operator.email,
            name: "Sin asignar",
            dni: operator.DNI,
            id: operator.id
          }));
          
        setAllData(prevData => [...prevData, ...newOperators]);
         
        })
        .then(() => {
          setLoading(false);
        })
    }
  },[loading]);

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

