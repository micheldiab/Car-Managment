import { Navigate, Outlet } from "react-router-dom";

import { useState } from 'react';

let x=0;

export const useAuth = () => {
  const [user, setUser] = useState(0);

  const login = () => {
    x=1;
    setUser(1);
  };

  const logout = () => {
    x=0;
    setUser(0);
  };

  return { user, login, logout };
};
const ProtectedRoutes = () => {
    const { user } = useAuth();
    return x ? <Outlet /> : <Navigate to="/" /> ;
};

export default ProtectedRoutes;