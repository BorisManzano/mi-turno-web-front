import React from "react";
import FakeData from "../../utils/fake-data";
import { TableList } from "../../commons/TableList";

export const OperatorReservationsList = () => {
  const userReservations = FakeData.getReservations2();
  return <TableList datatype="OperatorReservas" data={userReservations} />;
};
