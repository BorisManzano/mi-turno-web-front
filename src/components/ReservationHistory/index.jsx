import React from "react";
import FakeData from "../../utils/fake-data";
import { TableList } from "../../commons/TableList";
import Navbar from "../../commons/Navbar/Navbar";

export const ReservationHistory = () => {
  //====test
  //const userid = 2;
  //====
  //const userReservations = FakeData.getUserReservations(user.id);
  const reservations = FakeData.getReservations2();
  return (
    <>
      <TableList data={reservations} datatype="Reservas" />
    </>
  );
};
