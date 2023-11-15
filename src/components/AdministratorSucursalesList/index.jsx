import React from "react";
import Navbar from "../../commons/Navbar/Navbar";
import FakeData from "../../utils/fake-data";
import { TableList } from "../../commons/TableList";

export const AdministratorSucursalesList = () => {
  const sucursales = FakeData.getSucursales();
  return (
    <>
      <TableList datatype="Sucursales" data={sucursales} />
    </>
  );
};
