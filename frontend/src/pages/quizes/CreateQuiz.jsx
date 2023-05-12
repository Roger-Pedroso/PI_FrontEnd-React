/* eslint-disable linebreak-style */
import React, {
  useEffect, useState, useRef,
} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { PickList } from 'primereact/picklist';
import { Toast } from 'primereact/toast';
import { useLocation, useNavigate } from 'react-router-dom';
import Spans from '../../components/Spans';
import api from '../../utils/Api';

export default function CreateQuiz() {
  const [targetQuestions, setTargetQuestions] = useState([]);
  const [sourceQuestions, setSourceQuestions] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [list, setList] = useState(false);
  const [isTitleEmpty, setIsTitleEmpty] = useState(true);
  const [idEditedQuiz, setIdEditedQuiz] = useState('');
  const toast = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const showWarn = () => {
    toast.current.show({
      severity: 'warn', summary: 'Aviso!', detail: 'Por favor, selecione pelo menos uma questão!', life: 3000,
    });
  };
  const showError = () => {
    toast.current.show({
      severity: 'error', summary: 'Erro!', detail: 'Preencha o título!', life: 3000,
    });
  };

  const showSuccess = () => {
    toast.current.show({
      severity: 'success', summary: 'Successo!', detail: 'Questionário salvo com sucesso!', life: 3000,
    });
  };

  const [quiz, setQuiz] = useState({
    nome: '',
    descricao: '',
  });
  const onChangeQuiz = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };
  const findQuestion = async () => {
    const data = await api.get('/question');
    setSourceQuestions(data.data);
  };
  const findQuizById = async (id) => {
    const qst = await api.get(`/quiz/${id}`);
    const quizParsed = qst.data;
    setIdEditedQuiz(quizParsed.id);
    setQuiz({ nome: quizParsed.nome, descricao: quizParsed.descricao });
    setTargetQuestions(quizParsed.questions);
    const data = await api.get('/question');
    const data2 = data.data;
    // eslint-disable-next-line max-len
    setSourceQuestions(data2.filter((item1) => !quizParsed.questions.some((item2) => item1.id === item2.id)));
  };
  useEffect(() => {
    if (location.pathname !== '/quizes/CreateQuiz') {
      const quizId = location.pathname.substring(19, location.pathname.length);
      findQuizById(quizId);
    } else {
      findQuestion();
    }
  }, []);

  function onChange(e) {
    setSourceQuestions(e.source);
    setTargetQuestions(e.target);
  }
  function handleTitleChange(e) {
    setIsTitleEmpty(e.target.value === '');
  }

  const submit = async () => {
    if (location.pathname === '/quizes/CreateQuiz') {
      await api.post('/quiz', { ...quiz, questions: targetQuestions.map((qst) => qst.id) });
    } else {
      console.log(targetQuestions);
      await api.put(`/quiz/${idEditedQuiz}`, { ...quiz, questions: targetQuestions.map((qst) => qst.id) });
    }
  };
  const handleSubmit = () => {
    if (location.pathname === '/quizes/CreateQuiz') {
      if (isTitleEmpty) {
        showError();
      } else if (targetQuestions.length === 0) {
        showWarn();
      } else {
        submit();
        showSuccess();
        navigate('/quizes/QuizesList');
      }
    } else if (targetQuestions.length === 0) {
      showWarn();
    } else {
      submit();
      showSuccess();
      navigate('/quizes/QuizesList');
    }
  };
  return (
    <div>
      <div className="flex justify-content-center">
        <h1>{location.pathname === '/quizes/CreateQuiz' ? 'Criar Modelo de Questionário' : 'Editar Modelo de Questionário'}</h1>
      </div>

      <div style={{
        justifyContent: 'center', marginLeft: '60px', marginRight: '60px',
      }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="p-inputgroup">
            <Spans icon="pi pi-question" />
            <InputText name="nome" placeholder="Nome do Questionário (OBRIGATÓRIO)" onChange={(e) => { onChangeQuiz(e); handleTitleChange(e); }} value={quiz.nome} />
          </div>
          <div className="p-inputgroup">
            <Spans icon="pi pi-align-justify" />
            <InputText name="descricao" placeholder="Descrição (OPCIONAL)" onChange={(e) => onChangeQuiz(e)} value={quiz.descricao} />
          </div>
          <div className="flex justify-content-center">
            <h2 style={{ color: 'rgba(89,31,107,255)' }}>Questões</h2>
          </div>
        </div>
        <div className="card justify-content-center">
          <PickList
            source={sourceQuestions}
            target={targetQuestions}
        // eslint-disable-next-line react/no-unstable-nested-components
            itemTemplate={(questions) => (
              <span>
                <b>Nome da Questão:</b>
                {' '}
                {questions.nome_campo}
                <br />
                <b>Tipo:</b>
                {' '}
                {questions.tipo}
                {' '}
                <br />
                <b>Alternativas: </b>
                {' '}
                {questions.alternativas}
              </span>
            )}
            filter
            filterBy="nome_campo"
            sourceHeader="Questões Disponíveis"
            targetHeader="Questões Selecionadas"
            onChange={(e) => onChange(e)}
            sourceStyle={{ height: '10rem' }}
            targetStyle={{ height: '10rem' }}
            sourceFilterPlaceholder="Buscar pelo nome"
            targetFilterPlaceholder="Buscar pelo nome"
            showSourceControls={false}
            showTargetControls={false}
            className="picklistquest"
          />
        </div>
        <div className="flex justify-content-center gap-3">
          <Button label="Listar" onClick={() => navigate('/quizes/QuizesList')} />
          <Button label="Salvar e Listar" onClick={() => { setList(true); handleSubmit(); }} />
          <Toast ref={toast} />
        </div>
      </div>
    </div>
  );
}
