import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FakeData from "../../utils/fake-data";
import s from "./style.module.scss";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const ReservationHistory = () => {
  //====test
  //const userid = 2;
  //====
  //const userReservations = FakeData.getUserReservations(user.id);
  const reservations = FakeData.getReservations();
  return (
    <>
      <h1 className={s.title}>Reservas</h1>
      <div className={s.tabla}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Nombre y Apellido</b>
                </TableCell>
                <TableCell align="left">
                  <b>Fecha y Hora</b>
                </TableCell>
                <TableCell align="left">
                  <b>Sucursal</b>
                </TableCell>
                <TableCell align="left">
                  <b>N° de la reserva</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((reservation, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{`${
                    FakeData.getUser(reservation.user_id)[0].name
                  } ${
                    FakeData.getUser(reservation.user_id)[0].last_name
                  }`}</TableCell>
                  <TableCell align="left">{reservation.date}</TableCell>
                  <TableCell align="left">
                    {FakeData.getBranch(reservation.sucursal_id)[0].name}
                  </TableCell>
                  <TableCell align="left">
                    {reservation.reservationNumber}
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="contained" style={{ fontSize: 11 }}>
                      Editar&nbsp;
                      <EditIcon style={{ fontSize: 13 }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
