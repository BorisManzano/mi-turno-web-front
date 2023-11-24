import React from "react";
import { Route, Routes } from "react-router";
import AdministratorProfile from "../components/AdministratorProfile";
import { AdministratorSucursalesList } from "../components/AdministratorSucursalesList";
import { AdministratorOperatorsList } from "../components/AdministratorOperatorsList";
import CreateOperator from "../components/CreateOperator";
import CreateBranches from "../components/CreateBranches";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/profile" element={<AdministratorProfile />} />
      <Route path="/allBranches" element={<AdministratorSucursalesList />} />
      <Route path="/operators" element={<AdministratorOperatorsList />} />
      <Route path="/create/branch" element={<CreateBranches />} />
      <Route path="/create/operator" element={<CreateOperator />} />
    </Routes>
  );
};

export default AdminRoutes;
