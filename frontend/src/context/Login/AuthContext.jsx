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
      setUser(response.data);
      setUserString(JSON.stringify(response.data));
      navigate('/app');
      window.location.reload();
      return true;
    });
  };

  const updateUser = async () => {
    await api.get(`/user/${user.id}`).then((response) => {
      sessionStorage.setItem('user-key', JSON.stringify(response.data));
      setUser(response.data);
      setUserString(JSON.stringify(response.data));
      window.location.reload();
    });
  };
  const login = async (credentials) => {
    try {
      await api.post('/login/adm', { ...credentials }).then((response) => {
        const req = response.data;
        if (req.userId !== null) {
          sessionStorage.setItem('auth-key', true);
          setAuthenticated(true);
          findUserById(req.userId);
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
    sessionStorage.removeItem('user-key');
    setAuthenticated(false);
  };

  const memo = useMemo(() => ({
    authenticated,
    login,
    user,
    updateUser,
    logout,
  }), [authenticated, login, logout, user, updateUser]);

  return (
    <AuthContext.Provider value={memo}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
