import { Navigate, Outlet } from "react-router-dom";

import { useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState({ loggedIn: false });

  const login = () => {
    setUser({ loggedIn: true });
  };

  const logout = () => {
    setUser({ loggedIn: false });
  };

  return { user, login, logout };
};
const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" /> ;
};

export default ProtectedRoutes;