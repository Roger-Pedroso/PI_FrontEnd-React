import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import api from '../../utils/Api';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userID, setUserID] = useState('');
  const [isLogged, setIsLogged] = useState('logado');

  const authUser = (credentials) => {
    try {
      setUserID(api.post('/login/adm', credentials));
      setIsLogged(true);
    } catch (error) {
      console.log(error);
      setIsLogged(false);
    }
  };
  const memo = useMemo(() => ({
    userID,
    isLogged,
    setIsLogged,
    authUser,
  }), [isLogged, authUser]);

  // useEffect(() => {
  //   const storedVariable = (sessionStorage.getItem('isLoggedKey'));
  //   sessionStorage.setItem('isLoggedKey', storedVariable);
  //   console.log('login');
  //   console.log(sessionStorage);
  // }, [isLogged]);

  useEffect(() => {
    const storedVariable = (sessionStorage.getItem('isLoggedKey'));
    console.log(storedVariable);
    if (storedVariable) {
      setIsLogged(storedVariable);
    }
    console.log(sessionStorage);
  }, []);

  return (
    <AuthContext.Provider value={memo}>
      {children}
    </AuthContext.Provider>
  );
}
