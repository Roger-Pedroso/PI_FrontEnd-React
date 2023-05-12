import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import api from '../../utils/Api';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState();

  const isLogged = false;

  const [value, setIsLogged] = useState(() => {
    const storedValue = localStorage.getItem(isLogged);
    return storedValue;
  });

  useEffect(() => {
    localStorage.setItem(isLogged, value);
  }, [value]);

  const authUser = (credentials) => {
    try {
      setUser(api.post('/user', credentials));
      setIsLogged(true);
    } catch (error) {
      console.log(error);
      setIsLogged(false);
    }
  };
  const memo = useMemo(() => ({
    user,
    setUser,
    isLogged,
    setIsLogged,
    authUser,
  }), [user, isLogged, authUser]);
  return (
    <AuthContext.Provider value={memo}>
      {children}
    </AuthContext.Provider>
  );
}
