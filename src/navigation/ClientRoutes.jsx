import React from "react";
import { Route, Routes } from "react-router";
import { CancelReservation } from "../components/CancelReservation";
import ClientProfileEdit from "../components/ClientProfileEdition/ClientProfileEdit";
import Login from "../components/Login";
import Register from "../components/Register";
import ReservationPanel from "../components/ReservationPanel/ReservationPanel";
import UserReservationHistory from "../components/UserReservationHistory";
import ReservationConfirmed from "../components/reservationconfirmed";

const ClientRoutes = () => {
  console.log("entre a e comonente de rutas CLIENT");
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/newReservation" element={<ReservationPanel />} />
      <Route path="/reservationConfirmed" element={<ReservationConfirmed />} />
      <Route
        path="/reservationConfirmed/:reservationId"
        element={<ReservationConfirmed />}
      />
      <Route path="/reservations" element={<UserReservationHistory />} />
      <Route
        path="/editReservation/:reservationId"
        element={<ReservationPanel />}
      />
      <Route
        path="/cancelReservation/:reservationId"
        element={<CancelReservation />}
      />
      <Route path="/myAccount" element={<ClientProfileEdit />} />
    </Routes>
  );
};

export default ClientRoutes;
