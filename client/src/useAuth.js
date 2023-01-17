import { useState } from 'react';
export const useAuth = () => {
    const [user, setUser] = useState(0);
  
    const login = () => {
        console.log("yes");
      setUser(1);
    };
  
    const logout = () => {
      setUser(0);
    };
  
    return { user, login, logout };
  };