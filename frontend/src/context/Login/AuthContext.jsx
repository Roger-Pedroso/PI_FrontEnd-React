import React, {
  createContext, useMemo, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/Api';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(sessionStorage.getItem('auth-key') || false);
  const [userString, setUserString] = useState(sessionStorage.getItem('user-key'));
  const [user, setUser] = useState(JSON.parse(userString));
  const navigate = useNavigate();

  const findUserById = async (id) => {
    await api.get(`/user/${id}`).then((response) => {
      sessionStorage.setItem('user-key', JSON.stringify(response.data));
      console.log(setUser);
      console.log(setUserString);
    });
  };

  const login = async (credentials) => {
    try {
      await api.post('/login/adm', { ...credentials }).then((response) => {
        const req = response.data;
        if (req.userId !== null) {
          findUserById(req.userId);
          sessionStorage.setItem('auth-key', true);
          sessionStorage.setItem('user-id', req.userId);
          setAuthenticated(true);
          navigate('/admin');
          window.location.reload();
        } else {
          setAuthenticated(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('auth-key');
    sessionStorage.removeItem('user-id');
    setAuthenticated(false);
  };

  const memo = useMemo(() => ({
    authenticated,
    login,
    user,
    logout,
  }), [authenticated, login, logout, user]);

  return (
    <AuthContext.Provider value={memo}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
