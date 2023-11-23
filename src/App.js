import { Route, Routes } from "react-router";
import PromotionalMessage from "./commons/promotional-message";
import AdminRoutes from "./navigation/AdminRoutes";
import ClientRoutes from "./navigation/ClientRoutes";
import OperatorRoutes from "./navigation/OperatorRoutes";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <PromotionalMessage />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/client/*" element={<ClientRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/operator/*" element={<OperatorRoutes />} />
      </Routes>
    </div>
  );
}

export default App;
