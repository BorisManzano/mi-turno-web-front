import React from "react";
import { Route, Routes } from "react-router";
import { OperatorReservationsList } from "../components/OperatorReservationsList";
import OperatorProfile from "../components/OperatorProfile";

const OperatorRoutes = () => {
  return (
    <Routes>
      <Route path="/reservations" element={<OperatorReservationsList />} />
      <Route path="/profile" element={<OperatorProfile />} />
    </Routes>
  );
};

export default OperatorRoutes;
