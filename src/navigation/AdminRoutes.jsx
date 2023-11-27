import React from "react";
import { Route, Routes } from "react-router";
import { AdministratorOperatorsList } from "../components/AdministratorOperatorsList";
import AdministratorProfile from "../components/AdministratorProfile";
import { AdministratorSucursalesList } from "../components/AdministratorSucursalesList";
import CreateBranches from "../components/CreateBranches";
import CreateOperator from "../components/CreateOperator";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdministratorSucursalesList />} />
      <Route path="/profile" element={<AdministratorProfile />} />
      <Route path="/allBranches" element={<AdministratorSucursalesList />} />
      <Route path="/operators" element={<AdministratorOperatorsList />} />
      <Route path="/create/branch" element={<CreateBranches />} />
      <Route path="/create/operator" element={<CreateOperator />} />
      {/* esta vista no se renderiza nada, pero creo que por que el componente no esta termiando */}
      <Route path="/admin/edit/sucursal/:id" element={<CreateBranches />} />
      <Route path="/admin/edit/operator/:dni" element={<CreateOperator />} />
    </Routes>
  );
};

export default AdminRoutes;
