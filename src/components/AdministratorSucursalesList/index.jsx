import React, { useEffect, useState } from "react";
import FakeData from "../../utils/fake-data";
import { TableList } from "../../commons/TableList";
import axios from "axios";

export const AdministratorSucursalesList = () => {
  const [allData, setAllData] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/branches/allBranches`, {
        withCredentials: true,
      })
      .then((response) => {
        setAllData(response.data);
        console.log(response.data);
      })
      .catch((err) => console.error(err));
  }, []);
  // const sucursales = allData;
  const sucursales = FakeData.getSucursales();
  return (
    <>
      <TableList datatype="Sucursales" data={sucursales} />
    </>
  );
};
