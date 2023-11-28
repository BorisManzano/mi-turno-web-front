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
      <Route path="/create/operador" element={<CreateOperator />} />
      <Route path="/edit/branch/:id" element={<CreateBranches />} />
      <Route path="/edit/operador/:dni" element={<CreateOperator />} />
    </Routes>
  );
};

export default AdminRoutes;
