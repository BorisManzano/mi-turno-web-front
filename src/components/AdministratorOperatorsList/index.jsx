import React, { useEffect, useState } from "react";
import FakeData from "../../utils/fake-data";
import { TableList } from "../../commons/TableList";
import axios from "axios";

export const AdministratorOperatorsList = () => {
  const [allData, setAllData] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/users/operators`, {
        withCredentials: true,
      })
      .then((response) => {
        setAllData(response.data);
        console.log(response.data);
      })
      .catch((err) => console.error(err));
  }, []);
  // const operators = allData;
  const operators = FakeData.getOperators();
  return (
    <>
      <TableList datatype="Operadores" data={operators} />
    </>
  );
};
