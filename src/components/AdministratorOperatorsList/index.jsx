import React from "react";
import Navbar from "../../commons/Navbar/Navbar";
import FakeData from "../../utils/fake-data";
import { TableList } from "../../commons/TableList";

export const AdministratorOperatorsList = () => {
  const operators = FakeData.getOperators();
  return (
    <>
      <TableList datatype="Operadores" data={operators} />
    </>
  );
};
