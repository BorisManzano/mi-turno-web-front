import React from "react";
import { Route, Routes } from "react-router";
import Login from "../components/Login";
import Register from "../components/Register";
import ReservationPanel from "../components/ReservationPanel/ReservationPanel";
import ReservationConfirmed from "../components/reservationconfirmed";
import UserReservationHistory from "../components/UserReservationHistory";
import { CancelReservation } from "../components/CancelReservation";
import ClientProfileEdit from "../components/ClientProfileEdition/ClientProfileEdit";
import RecoverPassword from "../components/RecoverPassword";

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/newReservation" element={<ReservationPanel />} />
      <Route path="/reservationConfirmed" element={<ReservationConfirmed />} />
      <Route path="/reservations" element={<UserReservationHistory />} />
      <Route
        path="/cancelReservation/:reservationId"
        element={<CancelReservation />}
      />
      <Route path="/myAccount" element={<ClientProfileEdit />} />
      <Route path="/recoverPassword" element={<RecoverPassword />} />
    </Routes>
  );
};

export default ClientRoutes;
