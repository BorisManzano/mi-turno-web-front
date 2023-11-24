import { Route, Routes, useLocation, useNavigate } from "react-router";
import PromotionalMessage from "./commons/promotional-message";
import Login from "./components/Login/index";
import Register from "./components/Register/index";
import ReservationPanel from "./components/ReservationPanel/ReservationPanel";
import ReservationConfirmed from "./components/reservationconfirmed/index";
import UserReservationHistory from "./components/UserReservationHistory/index";
import ClientProfileEdit from "./components/ClientProfileEdition/ClientProfileEdit";
import { AdministratorSucursalesList } from "./components/AdministratorSucursalesList";
import { AdministratorOperatorsList } from "./components/AdministratorOperatorsList";
import RecoverPassword from "./components/RecoverPassword";
import CreateOperator from "./components/CreateOperator";
import { CancelReservation } from "./components/CancelReservation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { login } from "./state/user";

function App() {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/me", { withCredentials: true })
      .then((res) => {
        if (res.data) {
          const data = res.data;
          dispatch(login(res.data));
        }
      })
      .catch((err) => {
        if (pathname !== "/client/register") {
          navigate("/");
        }
      });
  }, []);

  useEffect(() => {
    if (pathname.includes("/admin") && user && !user.isAdmin) {
      navigate("/");
    }
    if (user.email && pathname === "/client/login") {
      navigate("/client/newReservation");
    }
    if (user.email && pathname === "/client/register") {
      navigate("/client/newReservation");
    }
    if (user.email && pathname === "/") {
      navigate("/client/newReservation");
    }
  }, [pathname, user]);

  return (
    <div className="App">
      <PromotionalMessage />
      <Routes>
        <Route path="/client/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/client/register" element={<Register />} />
        <Route path="/client/newReservation" element={<ReservationPanel />} />
        <Route
          path="/client/reservationConfirmed"
          element={<ReservationConfirmed />}
        />
        <Route
          path="/client/reservations"
          element={<UserReservationHistory />}
        />
        <Route path="/client/myAccount" element={<ClientProfileEdit />} />
        <Route
          path="/client/cancelReservation/:reservationId"
          element={<CancelReservation />}
        />
        {/* <Route //ruta pendiente
          path="/client/editReservation/:reservationId"
          element={< />}
        /> */}
        {user.isAdmin && (
          <>
            <Route
              path="/admin/allBranches"
              element={<AdministratorSucursalesList />}
            />
            <Route
              path="/admin/operators"
              element={<AdministratorOperatorsList />}
            />
            <Route
              path="/admin/create-operator"
              element={<CreateOperator />}
            ></Route>
          </>
        )}
        <Route path="/client/recoverPassword" element={<RecoverPassword />} />
      </Routes>
    </div>
  );
}

export default App;
