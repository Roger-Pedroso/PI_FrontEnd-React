/* eslint-disable linebreak-style */
import React, {
  useEffect, useState, useRef,
} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { PickList } from 'primereact/picklist';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import Spans from '../../components/Spans';
import api from '../../utils/Api';

export default function CreateQuiz() {
  const [targetQuestions, setTargetQuestions] = useState([]);
  const [sourceQuestions, setSourceQuestions] = useState([]);
  const [isTitleEmpty, setIsTitleEmpty] = useState(true);
  const toast = useRef();
  const { navigate } = useNavigate();

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
  useEffect(() => {
    findQuestion();
  }, []);

  function onChange(e) {
    setSourceQuestions(e.source);
    setTargetQuestions(e.target);
  }
  function handleTitleChange(e) {
    setIsTitleEmpty(e.target.value === '');
  }

  const submit = async () => {
    await api.post('/questionario', { ...quiz });
  };
  const handleSubmit = () => {
    if (isTitleEmpty) {
      showError();
    } else if (targetQuestions.length === 0) {
      showWarn();
    } else {
      submit();
      showSuccess();
      navigate('/quizes/ListQuestions');
    }
  };
  return (
    <div>
      <div className="flex justify-content-center">
        <h1>Criar Modelo de Questionário</h1>
      </div>

      <div style={{
        justifyContent: 'center', marginLeft: '60px', marginRight: '60px',
      }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="p-inputgroup">
            <Spans icon="pi pi-question" />
            <InputText name="nome" placeholder="Nome do Questionário (OBRIGATÓRIO)" onChange={(e) => { onChangeQuiz(e); handleTitleChange(e); }} required />
          </div>
          <div className="p-inputgroup">
            <Spans icon="pi pi-align-justify" />
            <InputText name="descricao" placeholder="Descrição (OPCIONAL)" onChange={(e) => onChangeQuiz(e)} />
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
          <Button label="Listar" />
          <Button label="Salvar" onClick={() => handleSubmit()} />
          <Toast ref={toast} />
        </div>
      </div>
    </div>
  );
}
