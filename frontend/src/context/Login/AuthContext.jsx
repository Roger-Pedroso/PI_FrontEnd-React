import React, {
  createContext, useMemo, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/Api';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(sessionStorage.getItem('auth-key'));
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      await api.post('/login/adm', { ...credentials }).then((response) => {
        const req = response.data;
        if (req.userId !== null) {
          setUserId(req.userId);
          sessionStorage.setItem('auth-key', true);
          setAuthenticated(true);
          navigate('/admin');
        } else {
          setUserId(null);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setUserId(null);
    sessionStorage.removeItem('auth-key');
    setAuthenticated(false);
  };

  const memo = useMemo(() => ({
    authenticated,
    login,
    logout,
    userId,
  }), [authenticated, login, logout, userId]);

  return (
    <AuthContext.Provider value={memo}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
