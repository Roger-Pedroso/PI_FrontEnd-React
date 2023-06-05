import React, { createContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/Api';

const KeyContext = createContext();

function KeyProvider({ children }) {
  const navigate = useNavigate();
  const [key, setKey] = useState('');
  const [keyId, setKeyId] = useState(sessionStorage.getItem('keyId'));

  const saveKeyId = (id) => {
    sessionStorage.setItem('keyId', id);
  };

  async function getKeyId() {
    try {
      const response = await api.get(`/key/${key}`);
      const { status, data } = response;
      if (status === 404) {
        return false;
      }
      setKeyId(data.id);
      saveKeyId(data.id);
      return true;
    } catch (err) {
      return false;
    }
  }

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
      getKeyId();
      saveKeyId();
      sendToQuiz(data.quiz.id);
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
    keyId,
    setKeyId,
    getQuiz,
    getKeyId,
    sendToQuiz,
    killKey,
    saveKeyId,
  }), [key, setKey, keyId, getQuiz]);

  return (
    <KeyContext.Provider value={memo}>
      {children}
    </KeyContext.Provider>
  );
}

export { KeyContext, KeyProvider };
