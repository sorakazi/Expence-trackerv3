import RegisterPage from "pages/Auth/RegisterPage/RegisterPage";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { selectIsLoggedIn } from "../redux/auth/selectors";

const PublicRegisterRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/transactions/incomes" />;
  }
  return <RegisterPage />;
};

export default PublicRegisterRoute;
