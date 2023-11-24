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
import { OperatorReservationsList } from "./components/OperatorReservationsList";
import CreateBranches from "./components/CreateBranches";

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
          const userData = {
            fullname: res.data.nameAndLast_name,
            email: res.data.email,
            dni: res.data.DNI,
            isAdmin: res.data.isAdmin,
            isOperator: res.data.isOperator,
          };
          console.log(userData);
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
    if (pathname.includes("/admin/") && user && !user.isAdmin) {
      navigate("/");
    }
    if (pathname.includes("/operator/") && user && !user.isOperator) {
      navigate("/");
    }
    if ((pathname.includes("/client/") && user.isAdmin) || user.isOperator) {
      navigate("/");
    }
    if (pathname === "/" && user.isAdmin) {
      navigate("/admin/allBranches");
    }
    if (pathname === "/" && user.isOperator) {
      navigate("/operator/reservationsList");
    }
    if (pathname === "/" && !user.isOperator && !user.isAdmin && user.email) {
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
        <Route
          path="/client/editReservation/:reservationId"
          element={<ReservationPanel />}
        />
        <Route path="/client/recoverPassword" element={<RecoverPassword />} />
        {user.isOperator && (
          <Route
            path="/operator/reservationsList"
            element={<OperatorReservationsList />}
          />
        )}

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
            <Route
              path="/admin/edit-operator/:dni"
              element={<CreateOperator />}
            ></Route>
            <Route
              path="/admin/edit-sucursal/:id"
              element={<CreateBranches />}
            ></Route>
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
