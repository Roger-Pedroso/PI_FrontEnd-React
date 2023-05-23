import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import api from '../../utils/Api';
import Questions0a10 from './QuestionsCards/Questions0a10';
import QuestionsAlternativas from './QuestionsCards/QuestionsAlternativas';
import QuestionsME from './QuestionsCards/QuestionsME';
import QuestionsOpen from './QuestionsCards/QuestionsOpen';

export default function AnsweringQuiz() {
  const [quiz, setQuiz] = useState({
    nome: '',
    descricao: '',
  });
  const [questions, setQuestions] = useState([]);
  const [componentQuestions, setComponentQuestions] = useState([]);
  const [index, setIndex] = useState();
  const [buttonVisible, setButtonVisible] = useState(false);
  const [buttonVisible1, setButtonVisible1] = useState(true);
  const [endQuiz, setEndQuiz] = useState(false);
  const question0 = index !== 0;
  const lastquestion = index !== questions.length - 1;
  const location = useLocation();
  const findQuizById = async (id) => {
    const qst = await api.get(`/quiz/${id}`);
    const quizParsed = qst.data;
    setQuiz({ nome: quizParsed.nome, descricao: quizParsed.descricao });
    setQuestions(quizParsed.questions);
  };

  useEffect(() => {
    const quizId = location.pathname.substring(22, location.pathname.length);
    findQuizById(quizId);
  }, []);

  useEffect(() => {
    if (questions.length < 1) {
      const quizId = location.pathname.substring(22, location.pathname.length);
      findQuizById(quizId);
    }
  }, [questions]);

  questions.sort((a, b) => {
    const tipoOrder = {
      '0_a_10': 0,
      alternativa: 1,
      multipla_escolha: 2,
      aberta: 3,
    };

    return tipoOrder[a.tipo] - tipoOrder[b.tipo];
  });

  function indexUp() {
    if (index !== questions.length) {
      setIndex(index + 1);
    }
  }

  function indexDown() {
    if (index === 1 || index > 1) {
      setIndex(index - 1);
    }
  }
  console.log(componentQuestions);
  const verifyQuestions = (item) => {
    let questionComponent = null;
    if (item.tipo === '0_a_10') {
      questionComponent = <Questions0a10 item={item} />;
    } else if (item.tipo === 'alternativa') {
      questionComponent = <QuestionsAlternativas item={item} />;
    } else if (item.tipo === 'multipla_escolha') {
      questionComponent = <QuestionsME item={item} />;
    } else if (item.tipo === 'aberta') {
      questionComponent = <QuestionsOpen item={item} />;
    }
    setComponentQuestions((prevQuestions) => [...prevQuestions, questionComponent]);
  };

  useEffect(() => {
  }, [index]);

  return (
    <div>
      <div className="flex justify-content-center" style={{ margin: '10px' }}>
        <h1>{quiz.nome}</h1>
      </div>
      <div className="flex justify-content-center items-center" style={{ height: '70vh', marginTop: '20px' }}>
        <div className="card flex justify-content-center" style={{ width: '90%', height: '100%' }}>
          <Button label="Iniciar Questionário" visible={buttonVisible1} onClick={() => { setIndex(0); setButtonVisible1(false); setButtonVisible(true); questions.forEach((item) => verifyQuestions(item)); }} style={{ height: '15%', marginTop: '175px' }} />
          {componentQuestions[index]}
        </div>
      </div>
      <div className="flex justify-content-center gap-5" style={{ margin: '15px' }}>
        <Button label="Questão Anterior" onClick={() => indexDown()} visible={buttonVisible && question0} />
        <Button label="Próxima Questão" onClick={() => indexUp()} visible={buttonVisible && lastquestion} />
        <Button label="Finalizar Questionário" visible={!lastquestion} onClick={() => setEndQuiz(true)} />
        <Dialog header="Confirmação" visible={endQuiz} style={{ width: '50vw' }} onHide={() => setEndQuiz(false)}>
          <p className="m-0">
            Tem certeza que deseja finalizar o questionário?
          </p>
          <br />
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Button label="Sim" />
            <Button label="Não" onClick={() => setEndQuiz(false)} />
          </div>
        </Dialog>
      </div>
    </div>
  );
}
