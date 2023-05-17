import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/Api';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(sessionStorage.getItem('auth-key') || false);
  const [userId, setUserId] = useState(sessionStorage.getItem('user-id') || null);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const id = sessionStorage.getItem('user-id' || false);
    const aux = api.get(`/user/${id}`);
    setUser(aux);
  }, [user]);

  const login = async (credentials) => {
    try {
      await api.post('/login/adm', { ...credentials }).then((response) => {
        const req = response.data;
        if (req.userId !== null) {
          setUserId(req.userId);
          sessionStorage.setItem('auth-key', true);
          sessionStorage.setItem('user-id', req.userId);
          setAuthenticated(true);
          window.location.reload();
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
    sessionStorage.removeItem('user-id');
    setAuthenticated(false);
  };

  const memo = useMemo(() => ({
    authenticated,
    login,
    user,
    logout,
    userId,
  }), [authenticated, login, logout, userId, user]);

  return (
    <AuthContext.Provider value={memo}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
