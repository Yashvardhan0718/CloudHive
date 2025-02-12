import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducer } from "../redux/store";

const PrivateRoute: React.FC = () => {
  const { user } = useSelector((state: RootReducer) => state.auth);
  const token = localStorage.getItem("token");
  return user || token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
