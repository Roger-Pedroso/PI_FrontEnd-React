/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Rating } from 'primereact/rating';
import api from '../../utils/Api';

export default function AnsweringQuiz() {
  const [quiz, setQuiz] = useState({
    nome: '',
    descricao: '',
  });
  const [questions, setQuestions] = useState([]);
  const [buttonVisible1, setButtonVisible1] = useState(true);
  const [endQuiz, setEndQuiz] = useState(false);
  const [renderedQuestions, setRenderedQuestions] = useState([]);
  const [value, setValue] = useState(null);
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

  function zeroa10(item) {
    return (
      <div>
        <h2>{item.nome_campo}</h2>
        <p><i>descrição</i></p>
        <Rating
          value={value}
          onChange={(e) => setValue(e.value)}
          stars={10}
          cancel={false}
        />
        <p>
          Nota:
          {' '}
          {value}
        </p>
      </div>
    );
  }

  function alternativa() {
    return (
      <div className="card">
        <h1>teste altternativa</h1>
      </div>
    );
  }

  function me() {
    return (
      <div className="card">
        <h1>teste multipla escolha</h1>
      </div>
    );
  }

  function aberta() {
    return (
      <div className="card">
        <h1>teste aberta</h1>
      </div>
    );
  }
  const verifyQuestions = (item) => {
    let questionComponent = null;
    if (item.tipo === '0_a_10') {
      questionComponent = zeroa10(item);
    } else if (item.tipo === 'alternativa') {
      questionComponent = alternativa();
    } else if (item.tipo === 'multipla_escolha') {
      questionComponent = me();
    } else if (item.tipo === 'aberta') {
      questionComponent = aberta();
    }
    setRenderedQuestions((prevQuestions) => [...prevQuestions, questionComponent]);
  };

  questions.sort((a, b) => {
    const tipoOrder = {
      '0_a_10': 0,
      alternativa: 1,
      multipla_escolha: 2,
      aberta: 3,
    };

    return tipoOrder[a.tipo] - tipoOrder[b.tipo];
  });

  return (
    <div>
      <div className="flex justify-content-center" style={{ margin: '10px' }}>
        <h1>{quiz.nome}</h1>
      </div>
      <div className="flex justify-content-center items-center" style={{ marginTop: '20px' }}>
        <div
          className="card"
          style={{
            width: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}
        >
          <Button label="Iniciar Questionário" visible={buttonVisible1} onClick={() => { setButtonVisible1(false); questions.forEach((item) => verifyQuestions(item)); }} style={{ height: '15%', marginTop: '175px' }} />
          {renderedQuestions}
        </div>
      </div>
      <div className="flex justify-content-center gap-5" style={{ margin: '15px' }}>
        <Button label="Finalizar Questionário" onClick={() => setEndQuiz(true)} />
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
