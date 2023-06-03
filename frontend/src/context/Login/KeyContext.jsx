import React, { createContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/Api';

const KeyContext = createContext();

function KeyProvider({ children }) {
  const navigate = useNavigate();
  const [key, setKey] = useState('');
  const [quiz, setQuiz] = useState({});
  const [keyId, setKeyId] = useState(JSON.stringify(sessionStorage.getItem('keyId')));

  const saveKeyId = () => {
    sessionStorage.setItem('keyId', { keyId });
  };

  const getKeyId = async () => {
    try {
      await api.get(`/key/${key}`).then((response) => {
        const { data } = response;
        setKeyId(data.id);
        saveKeyId();
      });
    } catch (err) {
      console.log(err);
    }
  };

  const sendToQuiz = () => {
    navigate(`/app/quizes/answer/${quiz.id}`);
  };

  const getQuiz = async () => {
    try {
      await api.get(`/key/${key}`).then((response) => {
        const { data } = response;
        setQuiz(data.quiz);
        getKeyId();
        saveKeyId();
        sendToQuiz();
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
    quiz,
    setQuiz,
    keyId,
    setKeyId,
    getQuiz,
    getKeyId,
    sendToQuiz,
    killKey,
    saveKeyId,
  }), [key, setKey, quiz, setQuiz, keyId, getQuiz]);

  return (
    <KeyContext.Provider value={memo}>
      {children}
    </KeyContext.Provider>
  );
}

export { KeyContext, KeyProvider };
