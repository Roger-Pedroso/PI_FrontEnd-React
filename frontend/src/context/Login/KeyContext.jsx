import React, { createContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/Api';

const KeyContext = createContext();

function KeyProvider({ children }) {
  const navigate = useNavigate();
  const [key, setKey] = useState('');

  const saveKeyId = (id) => {
    sessionStorage.setItem('keyId', id);
    sessionStorage.setItem('key', key);
  };

  const sendToQuiz = (id) => {
    sessionStorage.setItem('auth-key', true);
    navigate(`/app/quizes/answer/${id}`);
    window.location.reload();
  };

  const getQuiz = async () => {
    try {
      const response = await api.get(`/key/${key}`);
      const { status, data } = response;
      if (status === 404) {
        return false;
      }
      if (data.status === false) {
        return 'utilizada';
      }
      saveKeyId(data.id);
      sendToQuiz(data.id);
      return true;
    } catch (err) {
      return false;
    }
  };

  const killKey = async () => {
    try {
      await api.put(`/key/${sessionStorage.getItem('keyId')}`).then(() => {
        sessionStorage.removeItem('keyId');
        sessionStorage.removeItem('auth-key');
        sessionStorage.removeItem('key');
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 3000);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const memo = useMemo(() => ({
    key,
    setKey,
    getQuiz,
    sendToQuiz,
    killKey,
    saveKeyId,
  }), [key, setKey, getQuiz]);

  return (
    <KeyContext.Provider value={memo}>
      {children}
    </KeyContext.Provider>
  );
}

export { KeyContext, KeyProvider };
