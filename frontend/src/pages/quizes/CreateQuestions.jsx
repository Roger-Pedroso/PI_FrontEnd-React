/* eslint-disable no-restricted-globals */
/* eslint-disable no-return-assign */
import React, {
  useEffect, useRef, useState,
} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Spans from '../../components/Spans';
import api from '../../utils/Api';

export default function CreateQuestions() {
  const [alt, setAlt] = useState(false);
  const [mult, setMult] = useState(false);
  const [type, setType] = useState(null);
  const [obrigatorio, setObrigatorio] = useState(false);
  const [alternativas, setAlternativas] = useState([{ idd: 1, value: '' }]);
  const [areYouSure, setAreYouSure] = useState(false);
  const { id } = useParams();
  const [question, setQuestion] = useState({
    nome_campo: '',
    descricao: '',
  });
  const isTitleEmpty = question.nome_campo === '';
  const toast = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const isTypeDouble = (type === 'alternativa' || type === 'multipla_escolha');
  const [idEditedQuestion, setIdEditedQuestion] = useState('');

  const findQuestionById = async () => {
    const qst = await api.get(`/question/${id}`);
    const questionParsed = qst.data;
    setIdEditedQuestion(questionParsed.id);
    setQuestion({ nome_campo: questionParsed.nome_campo, descricao: questionParsed.descricao });
    setType(questionParsed.tipo);
    setObrigatorio(questionParsed.obrigatorio);
    setAlternativas([]);
    const AlternativasParsed = JSON.parse(questionParsed.alternativas);
    const alte = AlternativasParsed.map((alter, index) => ({
      value: alter,
      id: index + 1,
    }));
    setAlternativas(alte);
  };

  useEffect(() => {
    findQuestionById();
  }, []);

  const isTypeUndefined = type === null;
  const vazio = alternativas.length <= 1;

  const onChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };
  const addAlternativa = () => {
    const novaAlternativa = { idd: Date.now(), value: '' };
    setAlternativas([...alternativas, novaAlternativa]);
  };
  const handleAlternativaChange = (event, idd) => {
    const novasAlternativas = [...alternativas];
    const index = alternativas.findIndex((alter) => alter.idd === idd);
    novasAlternativas[index].value = event.target.value;
    setAlternativas(novasAlternativas);
  };
  const handleDeleteAlternativa = (index) => {
    const novasAlternativas = [...alternativas];
    novasAlternativas.splice(index, 1);
    setAlternativas(novasAlternativas);
  };

  const showSuccess = () => {
    toast.current.show({
      severity: 'success', summary: 'Successo!', detail: 'Questão salva com sucesso! Atualizando...', life: 3000,
    });
  };

  const showWarn = () => {
    toast.current.show({
      severity: 'warn', summary: 'Aviso!', detail: 'Questão com apenas uma alternativa são invalidas!', life: 3000,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: 'warn', summary: 'Aviso!', detail: 'Preencha todos os campos obrigatórios!', life: 3000,
    });
  };

  const showError2 = () => {
    toast.current.show({
      severity: 'error', summary: 'Erro!', detail: 'Ocorreu um erro ao criar a questão. Tente novamente.', life: 3000,
    });
  };

  const submit = async () => {
    try {
      if (location.pathname === '/app/questions/new') {
        if (type !== 'alternativa' && type !== 'multipla_escolha') {
          const newQuestion = { ...question, tipo: type, obrigatorio };
          await api.post('/question', { ...newQuestion });
          showSuccess();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          const newQuestion = {
            ...question,
            tipo: type,
            obrigatorio,
            alternativas: JSON.stringify(alternativas.map((alternativa) => alternativa.value)),
          };
          await api.post('/question', { ...newQuestion });
          showSuccess();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } else if (location.pathname !== '/app/questions/new') {
        if (type !== 'alternativa' && type !== 'multipla_escolha') {
          const newQuestion = {
            ...question, tipo: type, obrigatorio, alternativas: '',
          };
          await api.put(`/question/${idEditedQuestion}`, { ...newQuestion });
          showSuccess();
          setTimeout(() => {
            navigate('/app/questions');
          }, 2000);
        } else {
          const newQuestion = {
            ...question,
            tipo: type,
            obrigatorio,
            alternativas: JSON.stringify(alternativas.map((alternativa) => alternativa.value)),
          };
          await api.put(`/question/${idEditedQuestion}`, { ...newQuestion });
          showSuccess();
          setTimeout(() => {
            navigate('/app/questions');
          }, 2000);
        }
      }
    } catch (err) {
      showError2();
    }
  };

  const handleSubmit = () => {
    if (isTitleEmpty || isTypeUndefined) {
      showError();
    } else if (type === 'alternativa' || type === 'multipla_escolha') {
      if (alternativas.length <= 1) {
        showWarn();
      } else {
        submit();
      }
    } else {
      submit();
    }
  };

  const handleEdit = () => {
    if (location.pathname === '/app/questions/new') {
      handleSubmit();
    } else {
      setAreYouSure(true);
    }
  };

  function editarAlternativas() {
    if (type === 'alternativa') {
      setAlt(true);
    } else if (type === 'multipla_escolha') {
      setMult(true);
    }
  }

  return (
    <div>
      <div
        className="flex justify-content-center"
        style={{ margin: '15px' }}
      >
        <h1>{location.pathname === '/app/questions/new' ? 'Criar Questões' : 'Editar Questão'}</h1>
      </div>

      <div
        style={innerWidth > 600 ? {
          justifyContent: 'center',
          marginTop: '150px',
          marginBottom: '10px',
          marginLeft: '60px',
          marginRight: '60px',
        } : { margin: '20px' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div className="p-inputgroup">
            <Spans icon="pi pi-question" />
            <InputText
              name="nome_campo"
              placeholder="Nome da Questão (OBRIGATÓRIO)"
              onChange={(e) => {
                onChange(e);
              }}
              value={question.nome_campo}
            />
          </div>
          <div className="p-inputgroup" style={{ height: '100px' }}>
            <Spans icon="pi pi-align-justify" />
            <InputText
              name="descricao"
              placeholder="Descrição (OPCIONAL)"
              onChange={(e) => onChange(e)}
              value={question.descricao}
            />
          </div>

          <div className="flex justify-content-center">
            <div className="flex flex-wrap gap-3">
              <div className="flex align-items-center">
                <RadioButton
                  onChange={() => {
                    setType('0_a_10');
                    setAlternativas([]);
                  }}
                  checked={type === '0_a_10'}
                />
                <p style={{ marginLeft: '5px' }}>0 a 10</p>
              </div>
              <div className="flex align-items-center">
                <RadioButton
                  onChange={() => {
                    setType('alternativa');
                    setAlt(true);
                    setAlternativas([]);
                  }}
                  checked={type === 'alternativa'}
                />
                <p style={{ marginLeft: '5px' }}>Alternativa</p>
              </div>
              <Dialog
                id="alt"
                header="Alternativas"
                headerStyle={{ textAlign: 'center' }}
                justifyContent="center"
                visible={alt}
                maximizable
                style={innerWidth > 600 ? { width: '50vw' } : { maxWidth: '98vw' }}
                onHide={() => setAlt(false)}
              >
                {alternativas.map((alternativa, index) => (
                  <div
                    className=" flex justify-content-center"
                    key={alternativa.idd}
                  >
                    <Spans icon="pi pi-pencil" />
                    <InputText
                      placeholder="Opcão"
                      style={{ width: '500px' }}
                      value={alternativa.value}
                      onChange={(event) => handleAlternativaChange(
                        event,
                        alternativa.idd,
                      )}
                    />
                    <Button
                      icon="pi pi-delete-left"
                      type="button"
                      rounded
                      outlined
                      aria-label="Filter"
                      style={{ marginLeft: '10px' }}
                      onClick={() => handleDeleteAlternativa(index)}
                      disabled={vazio}
                    />
                  </div>
                ))}
                <div
                  className="flex justify-content-center gap-3"
                  style={{ margin: '10px' }}
                >
                  <Button
                    label="Cancelar"
                    onClick={() => {
                      setAlt(false);
                      setAlternativas([]);
                      setType(null);
                    }}
                  />
                  <Button
                    icon="pi pi-plus"
                    type="button"
                    rounded
                    outlined
                    aria-label="Filter"
                    style={{ marginLeft: '10px' }}
                    onClick={addAlternativa}
                    label="Adicionar Opção"
                  />
                  <Button
                    label="Salvar"
                    disabled={vazio}
                    onClick={() => setAlt(false)}
                  />
                </div>
              </Dialog>
              <div className="flex align-items-center">
                <RadioButton
                  onChange={() => {
                    setType('multipla_escolha');
                    setMult(true);
                    setAlternativas([]);
                  }}
                  checked={type === 'multipla_escolha'}
                />
                <p style={{ marginLeft: '5px' }}>
                  Múltipla Escolha
                </p>
              </div>
              <Dialog
                id="mult"
                header="Múltipla Escolha"
                headerStyle={{
                  position: 'relative',
                  textAlign: 'center',
                }}
                justifyContent="center"
                visible={mult}
                maximizable
                style={innerWidth > 600 ? { width: '50vw' } : { maxWidth: '98vw' }}
                onHide={() => setMult(false)}
              >
                {alternativas.map((alternativa, index) => (
                  <div
                    className=" flex justify-content-center"
                    key={alternativa.idd}
                  >
                    <Spans icon="pi pi-pencil" />
                    <InputText
                      placeholder="Opcão"
                      style={{ width: '500px' }}
                      value={alternativa.value}
                      onChange={(event) => handleAlternativaChange(
                        event,
                        alternativa.idd,
                      )}
                    />
                    <Button
                      icon="pi pi-delete-left"
                      type="button"
                      rounded
                      outlined
                      aria-label="Filter"
                      style={{ marginLeft: '10px' }}
                      onClick={() => handleDeleteAlternativa(index)}
                      disabled={vazio}
                    />
                  </div>
                ))}
                <div
                  className="flex justify-content-center gap-3"
                  style={{ margin: '10px' }}
                >
                  <Button
                    label="Cancelar"
                    onClick={() => {
                      setMult(false);
                      setAlternativas([]);
                      setType(null);
                    }}
                  />
                  <Button
                    icon="pi pi-plus"
                    type="button"
                    rounded
                    outlined
                    aria-label="Filter"
                    style={{ marginLeft: '10px' }}
                    onClick={addAlternativa}
                    label="Adicionar Opção"
                  />
                  <Button
                    label="Salvar"
                    disabled={vazio}
                    onClick={() => setMult(false)}
                  />
                </div>
              </Dialog>
              <div className="flex align-items-center">
                <RadioButton
                  onChange={() => {
                    setType('aberta');
                    setAlternativas([]);
                  }}
                  checked={type === 'aberta'}
                />
                <p style={{ marginLeft: '5px' }}>Aberta</p>
              </div>
              <div className="flex align-items-center">
                <Button label="Editar Alternativas" onClick={() => editarAlternativas()} disabled={!isTypeDouble} />
              </div>
            </div>
          </div>
          <div
            className="flex align-items-center"
            style={{ margin: '10px' }}
          >
            <div className="p-inputgroup gap-3 flex justify-content-center">
              <h3 style={{ color: 'rgba(89,31,107,255)' }}>
                Essa questão é obrigatória?
              </h3>
              <div className="flex flex-wrap gap-3">
                <div className="flex align-items-center gap-1">
                  <RadioButton
                    onChange={() => {
                      setObrigatorio(true);
                    }}
                    checked={obrigatorio === true}
                  />
                  <p>Sim</p>
                  <RadioButton
                    onChange={() => {
                      setObrigatorio(false);
                    }}
                    checked={obrigatorio === false}
                    style={{ marginLeft: '10px' }}
                  />
                  <p>Não</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-wrap justify-content-center gap-3"
        style={{
          justifySelf: 'end',
          alignItems: 'end',
          justifyContent: 'end',
        }}
      >
        <Button label="Listar" onClick={() => navigate('/app/questions')} />
        <Button label="Salvar" onClick={() => handleEdit()} />
        <Toast ref={toast} />
        <Dialog header="Confirmação" visible={areYouSure} style={{ width: '50vw' }} onHide={() => setAreYouSure(false)}>
          <p className="m-0">
            Tem certeza que deseja editar essa questão?
            Todos os questionários relacionados a essa questão também serão alterados!
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
