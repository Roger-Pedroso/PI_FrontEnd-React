import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from 'primereact/card';
import api from '../../utils/Api';

export default function SendQuiz() {
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [quiz, setQuiz] = useState({
    nome: '',
    descricao: '',
    questoes: [],
  });
  const [numQuestions, setNumQuestions] = useState('');

  useEffect(() => {
    const quizId = location.pathname.substring(17, location.pathname.length);
    console.log(quizId);
    // eslint-disable-next-line no-use-before-define
    findQuizById(quizId);
  }, []);

  const findQuizById = async (id) => {
    const qst = await api.get(`/quiz/${id}`);
    const quizParsed = qst.data;
    // eslint-disable-next-line max-len
    setQuiz({ nome: quizParsed.nome, descricao: quizParsed.descricao, questoes: quizParsed.questions });
    let number = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < quizParsed.questions.length; i++) {
      number += 1;
    }
    setNumQuestions(`${number} questões.`);
  };

  return (
    <div>
      <div className="flex justify-content-center">
        <h1>Enviar Questionário</h1>
      </div>
      <div className="flex justify-content-center">
        <Card title={quiz.nome} footer={numQuestions}>
          <p className="m-0">
            {quiz.descricao}
          </p>
        </Card>
      </div>
    </div>
  );
}
