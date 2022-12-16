import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
    const data = localStorage.getItem('token')
   
  return data!=null? <Outlet />: <Navigate to='/register'/>
};

export default PrivateComponent;