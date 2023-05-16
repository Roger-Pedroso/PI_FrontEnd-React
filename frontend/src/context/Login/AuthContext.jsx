import React, {
  createContext, useMemo, useState,
} from 'react';
import api from '../../utils/Api';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const authUser = (credentials) => {
    try {
      const parsedUser = api.post('login/adm', credentials);
      if (parsedUser.userId !== null) {
        setUser(parsedUser);
        sessionStorage.setItem('isLoggedKey', true);
      } else {
        sessionStorage.setItem('isLoggedKey', false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const memo = useMemo(() => ({
    user,
    authUser,
  }), [authUser, user]);

  return (
    <AuthContext.Provider value={memo}>
      {children}
    </AuthContext.Provider>
  );
}
