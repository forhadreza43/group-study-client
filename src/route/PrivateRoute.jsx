import React from "react";
import useAuth from "../hook/useAuth";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/Loading";
const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (!user || !user.email) return <Navigate to="/login" state={pathname} />;
  return children;
};

export default PrivateRoute;
