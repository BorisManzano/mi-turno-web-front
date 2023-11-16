import React from "react";
import FakeData from "../../utils/fake-data";
import { TableList } from "../../commons/TableList";

export const UserReservationHistory = () => {
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
export default UserReservationHistory;
