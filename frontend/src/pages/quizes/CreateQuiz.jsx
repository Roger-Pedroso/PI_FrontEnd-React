/* eslint-disable no-restricted-globals */
/* eslint-disable linebreak-style */
import React, {
  useEffect, useState, useRef,
} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { PickList } from 'primereact/picklist';
import { Toast } from 'primereact/toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import Spans from '../../components/Spans';
import api from '../../utils/Api';

export default function CreateQuiz() {
  const [targetQuestions, setTargetQuestions] = useState([]);
  const [sourceQuestions, setSourceQuestions] = useState([]);
  const [idEditedQuiz, setIdEditedQuiz] = useState('');
  const [areYouSure, setAreYouSure] = useState(false);
  const { id } = useParams();
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

  const showError2 = () => {
    toast.current.show({
      severity: 'error', summary: 'Erro!', detail: 'Ocorreu um erro ao criar o questionário. Tente novamente.', life: 3000,
    });
  };

  const showSuccess = () => {
    toast.current.show({
      severity: 'success', summary: 'Successo!', detail: 'Questionário salvo com sucesso! Redirecionando à listagem...', life: 3000,
    });
  };

  const [quiz, setQuiz] = useState({
    nome: '',
    descricao: '',
  });
  const isTitleEmpty = quiz.nome === '';
  const onChangeQuiz = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };
  const findQuestion = async () => {
    const data = await api.get('/question');
    setSourceQuestions(data.data);
  };
  const findQuizById = async () => {
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
    if (location.pathname !== '/app/quizes/new') {
      findQuizById();
    } else {
      findQuestion();
    }
  }, []);

  function onChange(e) {
    setSourceQuestions(e.source);
    setTargetQuestions(e.target);
  }

  const submit = async () => {
    try {
      if (location.pathname === '/app/quizes/new') {
        await api.post('/quiz', { ...quiz, questions: targetQuestions.map((qst) => qst.id) });
        showSuccess();
        setTimeout(() => {
          navigate('/app/quizes');
        }, 2000);
      } else {
        await api.put(`/quiz/${idEditedQuiz}`, { ...quiz, questions: targetQuestions.map((qst) => qst.id) });
        showSuccess();
        setTimeout(() => {
          navigate('/app/quizes');
        }, 2000);
      }
    } catch (err) {
      showError2();
    }
  };

  const handleSubmit = () => {
    if (isTitleEmpty) {
      showError();
    } else if (targetQuestions.length === 0) {
      showWarn();
    } else {
      submit();
    }
  };

  const handleEdit = () => {
    if (location.pathname === '/app/quizes/new') {
      handleSubmit();
    } else {
      setAreYouSure(true);
    }
  };
  return (
    <div>
      <div className="flex justify-content-center" style={innerWidth < 600 ? { fontSize: '0.8em' } : {}}>
        <h1>{location.pathname === '/app/quizes/new' ? 'Criar Modelo de Questionário' : 'Editar Modelo de Questionário'}</h1>
      </div>

      <div style={innerWidth > 600 ? {
        justifyContent: 'center', marginLeft: '60px', marginRight: '60px',
      } : { margin: '20px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="p-inputgroup">
            <Spans icon="pi pi-question" />
            <InputText name="nome" placeholder="Nome do Questionário (OBRIGATÓRIO)" onChange={(e) => { onChangeQuiz(e); }} value={quiz.nome} />
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
          <Button label="Listar" onClick={() => navigate('/app/quizes')} />
          <Button label="Salvar e Listar" onClick={() => handleEdit()} />
          <Toast ref={toast} />
        </div>
        <Dialog header="Confirmação" visible={areYouSure} style={{ width: '50vw' }} onHide={() => setAreYouSure(false)}>
          <p className="m-0">
            Tem certeza que deseja editar esse questionário?
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Button label="Sim" onClick={() => handleSubmit()} />
            <Button label="Não" onClick={() => setAreYouSure(false)} />
          </div>
        </Dialog>
      </div>
    </div>
  );
}
