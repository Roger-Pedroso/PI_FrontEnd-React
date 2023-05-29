import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import api from '../../utils/Api';
import Questions0a10 from './QuestionsCards/Questions0a10';
import QuestionsAlternativas from './QuestionsCards/QuestionsAlternativas';
import QuestionsME from './QuestionsCards/QuestionsME';
import QuestionsOpen from './QuestionsCards/QuestionsOpen';
import { AnswersContext } from '../../context/AnswersContext';

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
  const toast = useRef();
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

  const showError = () => {
    toast.current.show({
      severity: 'error', summary: 'Erro!', detail: 'Há questões obrigatórias não preenchidas!', life: 3000,
    });
  };

  const submit = async () => {
    await api.post('/resposta', answers.map((answer) => answer));
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
      showError();
    } else {
      submit();
    }
  };

  const constructRespostas = (item) => {
    const novaResposta = { id_question: item.id, resposta: '', obrigatorio: item.obrigatorio };
    setAnswers((prevRespostas) => [...prevRespostas, novaResposta]);
  };

  console.log(answers);

  return (
    <div>
      <div className="flex justify-content-center" style={{ margin: '10px', flexDirection: 'column', alignItems: 'center' }}>
        <h1>{quiz.nome}</h1>
        <h2 style={{ margin: '-5px' }}><i>Nome do Superior</i></h2>
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
            }}
            style={{
              marginTop: '225px', backgroundColor: 'white', color: 'rgba(89,31,107,255)', border: '2px solid black', boxShadow: '10px 10px 10px purple',
            }}
          />
          {componentQuestions.map((item) => item)}
        </div>
      </div>
      <div className="flex justify-content-center gap-5" style={{ margin: '15px' }}>
        <Button label="Finalizar Questionário" onClick={() => setEndQuiz(true)} visible={buttonVisible2} />
        <Dialog header="Confirmação" visible={endQuiz} style={{ width: '50vw' }} onHide={() => setEndQuiz(false)}>
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
