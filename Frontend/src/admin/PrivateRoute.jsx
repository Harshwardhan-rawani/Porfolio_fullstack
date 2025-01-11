import React from "react";
import { Navigate} from "react-router-dom";
import AdminLayout from "./AdminLayout";

const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <AdminLayout />: <Navigate to="/admin" />;
};

export default PrivateRoute;
