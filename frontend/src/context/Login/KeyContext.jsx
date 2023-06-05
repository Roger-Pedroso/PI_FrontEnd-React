import React, { createContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/Api';

const KeyContext = createContext();

function KeyProvider({ children }) {
  const navigate = useNavigate();
  const [key, setKey] = useState(0);
  const [keyId, setKeyId] = useState(sessionStorage.getItem('keyId'));

  const saveKeyId = (id) => {
    sessionStorage.setItem('keyId', id);
  };

  const getKeyId = async () => {
    try {
      await api.get(`/key/${key}`).then((response) => {
        const { data } = response;
        setKeyId(data.id);
        console.log(data.id);
        saveKeyId(data.id);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const sendToQuiz = (id) => {
    sessionStorage.setItem('auth-key', true);
    navigate(`/app/quizes/answer/${id}`);
  };

  const getQuiz = async () => {
    try {
      await api.get(`/key/${key}`).then((response) => {
        const { data } = response;
        getKeyId();
        saveKeyId();
        sendToQuiz(data.quiz.id);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const killKey = async () => {
    try {
      await api.put(`/api/${keyId}`).then(() => {
        console.log('chave desativada.');
        sessionStorage.removeItem('keyId');
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
