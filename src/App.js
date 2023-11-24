import { Route, Routes, useLocation, useNavigate } from "react-router";
import PromotionalMessage from "./commons/promotional-message";
import AdminRoutes from "./navigation/AdminRoutes";
import ClientRoutes from "./navigation/ClientRoutes";
import OperatorRoutes from "./navigation/OperatorRoutes";
import Login from "./components/Login";
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
        <Route path="/" element={<Login />} />
        <Route path="/client/*" element={<ClientRoutes />} />
        {user.isOperator && (
             <Route path="/operator/*" element={<OperatorRoutes />} />
        )}

        {user.isAdmin && (
               <Route path="/admin/*" element={<AdminRoutes />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
