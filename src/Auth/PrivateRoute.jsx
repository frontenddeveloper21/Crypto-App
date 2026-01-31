import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import store from "../Components/Store/store";

const PrivateRoute = () => {

  const state = store.getState()

  let token = state?.login?.loginData?.token

  if(!token) return <Navigate to="/sign-in" replace />
  
  return(
    <Outlet />
  )
  
};

export default PrivateRoute;
