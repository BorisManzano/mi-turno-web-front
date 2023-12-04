import React, { useEffect, useState } from "react";
import { TableList } from "../../commons/TableList";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@mui/material";
import s from "./index.scss";
import { useNavigate } from "react-router";

export const OperatorReservationsList = () => {
  const user = useSelector((state) => state.user);
  const [reservationsList, setReservationsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/users/operator/reservationsList/${user.DNI}`
      )
      .then((res) => {
        setReservationsList(
          res.data.map((obj) => {
            //usernamew/reserva n/sucursal/date
            const { createdBy, reservationId, branch, date, schedule } = obj;
            const username = createdBy.fullname;
            const branchname = branch.name;
            return { username, reservationId, date, branchname, schedule };
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
  if (loading) return <>Loading...</>;
  else if (reservationsList.length == 0)
    return (
      <div className={s.mid}>
        <h1>No hay Reservas por confirmar</h1>
      </div>
    );
  else return <TableList datatype="OperatorReservas" data={reservationsList} />;
};
