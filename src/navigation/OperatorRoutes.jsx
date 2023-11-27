import React from "react";
import { Route, Routes } from "react-router";
import OperatorProfile from "../components/OperatorProfile";
import { OperatorReservationsList } from "../components/OperatorReservationsList";

const OperatorRoutes = () => {
  return (
    <Routes>
      <Route path="/reservationsList" element={<OperatorReservationsList />} />
      <Route path="/profile" element={<OperatorProfile />} />
    </Routes>
  );
};

export default OperatorRoutes;
