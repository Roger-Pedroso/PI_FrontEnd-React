/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../utils/Api';

export default function AnsweringQuiz() {
  const [quiz, setQuiz] = useState({
    nome: '',
    descricao: '',
    questoes: [],
  });
  const location = useLocation();

  const findQuizById = async (id) => {
    const qst = await api.get(`/quiz/${id}`);
    const quizParsed = qst.data;
    // eslint-disable-next-line max-len
    setQuiz({ nome: quizParsed.nome, descricao: quizParsed.descricao, questoes: quizParsed.questions });
    console.log(quiz.questoes);
  };

  useEffect(() => {
    const quizId = location.pathname.substring(22, location.pathname.length);
    findQuizById(quizId);
  }, []);

  return (
    <div>
      <div className="flex justify-content-center">
        <h1>{quiz.nome}</h1>
      </div>

      {quiz.questoes.map((questao, index) => {
        <div className="card">
          <h1>teste</h1>
        </div>;
      })}
    </div>
  );
}
