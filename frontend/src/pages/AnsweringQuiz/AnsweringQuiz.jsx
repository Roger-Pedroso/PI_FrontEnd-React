/* eslint-disable no-restricted-globals */
import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import api from '../../utils/Api';
import Questions0a10 from './QuestionsCards/Questions0a10';
import QuestionsAlternativas from './QuestionsCards/QuestionsAlternativas';
import QuestionsME from './QuestionsCards/QuestionsME';
import QuestionsOpen from './QuestionsCards/QuestionsOpen';
import { AnswersContext } from '../../context/AnswersContext';
import { KeyContext } from '../../context/Login/KeyContext';

export default function AnsweringQuiz() {
  const [quiz, setQuiz] = useState({
    nome: '',
    descricao: '',
  });
  const { answers, setAnswers } = useContext(AnswersContext);
  const [questions, setQuestions] = useState([]);
  const [componentQuestions, setComponentQuestions] = useState([]);
  const [buttonVisible1, setButtonVisible1] = useState(true);
  const [buttonVisible2, setButtonVisible2] = useState(false);
  const [endQuiz, setEndQuiz] = useState(false);
  const [endQuiz2, setEndQuiz2] = useState(false);
  const [superior, setSuperior] = useState(false);
  const { id } = useParams();
  const chave = sessionStorage.getItem('key');
  const { killKey } = useContext(KeyContext);
  const toast = useRef();

  const findQuizById = async () => {
    const qst = await api.get(`/quiz/${id}`);
    const quizParsed = qst.data;
    setQuiz({ nome: quizParsed.nome, descricao: quizParsed.descricao });
    setQuestions(quizParsed.questions);
  };

  const superiorr = async () => {
    console.log(chave);
    const chavesrc = await api.get(`/key/${chave}`);
    const chaveTarget = chavesrc.data;
    const superiorsrc = await api.get(`/superior/${chaveTarget.superior.id}`);
    const superiorTarget = superiorsrc.data;
    setSuperior(superiorTarget);
    console.log(superior);
  };

  useEffect(() => {
    findQuizById();
  }, []);

  useEffect(() => {
    if (questions.length < 1) {
      findQuizById();
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

  const showWarn = () => {
    toast.current.show({
      severity: 'warn', summary: 'Aviso!', detail: 'Há questões obrigatórias não preenchidas!', life: 3000,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: 'error', summary: 'Error!', detail: 'Ocorreu um erro ao enviar as respostas. Tente novamente.', life: 3000,
    });
  };

  function thankYou() {
    return (
      <div style={{ color: 'white', marginTop: '225px' }}>
        <h2>Obrigado pelas suas respostas! Redirecionando...</h2>
      </div>
    );
  }
  const submit = async () => {
    try {
      answers.forEach(async (answer) => {
        let newAnswer;
        if (answer.tipo === '0_a_10') {
          if (answer.resposta !== null) {
            newAnswer = {
              idQuestion: answer.id_question, idQuiz: id, resposta: answer.resposta,
            };
            await api.post('/answer', { ...newAnswer });
          }
        }
        if (answer.tipo === 'alternativa') {
          if (answer.resposta.length > 0 || answer.resposta !== '') {
            newAnswer = {
              idQuestion: answer.id_question, idQuiz: id, resposta: answer.resposta,
            };
            await api.post('/answer', { ...newAnswer });
          }
        }
        if (answer.tipo === 'multipla_escolha') {
          if (answer.resposta.length > 0) {
            newAnswer = {
              idQuestion: answer.id_question,
              idQuiz: id,
              resposta: JSON.stringify(answer.resposta),
            };
            await api.post('/answer', { ...newAnswer });
          }
        }
        if (answer.tipo === 'aberta') {
          if (answer.resposta.length > 0 || answer.resposta !== '') {
            newAnswer = {
              idQuestion: answer.id_question, idQuiz: id, resposta: answer.resposta,
            };
            await api.post('/answer', { ...newAnswer });
          }
        }
      });
      setEndQuiz(false);
      setEndQuiz2(true);
    } catch (err) {
      showError();
    }
  };

  const verifyAnswers = () => {
    let isAnswerEmpty;
    answers.forEach((answer) => {
      if (answer.obrigatorio === true) {
        if (answer.resposta === '' || answer.resposta === null || answer.resposta.length === 0) {
          isAnswerEmpty = true;
        }
      }
    });

    if (isAnswerEmpty) {
      setEndQuiz(false);
      showWarn();
    } else {
      setButtonVisible2(false);
      submit();
      killKey();
    }
  };

  const constructRespostas = (item) => {
    const novaResposta = {
      id_question: item.id, resposta: null, obrigatorio: item.obrigatorio, tipo: item.tipo,
    };
    setAnswers((prevRespostas) => [...prevRespostas, novaResposta]);
  };

  return (
    <div>
      <div className="flex justify-content-center" style={{ margin: '10px', flexDirection: 'column', alignItems: 'center' }}>
        <h1>{quiz.nome}</h1>
        <h2 style={{ margin: '-5px' }}><i>{superior.nome}</i></h2>
      </div>
      <div className="flex justify-content-center items-center" style={{ marginTop: '20px' }}>
        <div
          className="card"
          style={{
            width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(89,31,107,255)', minHeight: '75vh',
          }}
        >
          <Button
            label="Iniciar Questionário"
            visible={buttonVisible1}
            onClick={() => {
              setButtonVisible1(false);
              setButtonVisible2(true);
              questions.map((item) => constructRespostas(item));
              questions.forEach((item) => verifyQuestions(item));
              superiorr();
            }}
            style={{
              marginTop: '225px', backgroundColor: 'white', color: 'rgba(89,31,107,255)', border: '2px solid black', boxShadow: '10px 10px 10px purple',
            }}
          />
          {endQuiz2 ? thankYou() : componentQuestions.map((item) => item)}
        </div>
      </div>
      <div className="flex justify-content-center gap-5" style={{ margin: '15px' }}>
        <Button label="Finalizar Questionário" onClick={() => setEndQuiz(true)} visible={buttonVisible2} style={{ marginBottom: '10px' }} />
        <Dialog header="Confirmação" visible={endQuiz} style={innerWidth > 600 ? { width: '50vw' } : { width: '95vw' }} onHide={() => setEndQuiz(false)}>
          <p className="m-0">
            Tem certeza que deseja finalizar o questionário?
          </p>
          <br />
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Button label="Sim" onClick={() => verifyAnswers()} />
            <Button label="Não" onClick={() => setEndQuiz(false)} />
          </div>
        </Dialog>
        <Toast ref={toast} />
      </div>
    </div>
  );
}
