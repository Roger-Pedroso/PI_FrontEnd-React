import React, {
  createContext, useMemo, useState,
} from 'react';
import api from '../../utils/Api';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userID, setUserID] = useState('');

  const authUser = (credentials) => {
    try {
      setUserID(api.post('login/adm', credentials));
    } catch (error) {
      console.log(error);
    }
  };

  const memo = useMemo(() => ({
    userID,
    authUser,
  }), [authUser]);

  return (
    <AuthContext.Provider value={memo}>
      {children}
    </AuthContext.Provider>
  );
}
