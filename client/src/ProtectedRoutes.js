import { Navigate, Outlet } from "react-router-dom";

import { useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(0);

  const login = () => {
    setUser(1);
  };

  const logout = () => {
    setUser(0);
  };

  return { user, login, logout };
};
const ProtectedRoutes = () => {
    const { user } = useAuth();
    console.log(user);
    return user ? <Outlet /> : <Navigate to="/" /> ;
};

export default ProtectedRoutes;