import React, { useEffect, useState } from "react";
import FakeData from "../../utils/fake-data";
import { TableList } from "../../commons/TableList";

export const UserReservationHistory = () => {
  // const user = useSelector((state) => state.user);
  // const [reservations, setReservations] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get("/api/users/appointmentList", { DNI: user.DNI })
  //     .then((res) => {
  //       setReservations(res.data);
  //     })
  //     .then(() => {
  //       setLoading(false);
  //     });
  // }, []);
  // if (loading) return (<>Loading...</>);
  // else
  const reservations = FakeData.getReservations2();
  return (
    <>
      <TableList data={reservations} datatype="Reservas" />
    </>
  );
};
export default UserReservationHistory;
