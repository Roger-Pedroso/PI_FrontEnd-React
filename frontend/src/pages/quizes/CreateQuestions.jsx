/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';
import Spans from '../../components/Spans';
import api from '../../utils/Api';

export default function CreateQuestions() {
  const [alt, setAlt] = useState(false);
  const [mult, setMult] = useState(false);
  const [type, setType] = useState(null);
  const [obrigatorio, setObrigatorio] = useState(false);
  const [alternativas, setAlternativas] = useState([{ id: 1, value: '' }]);
  const [isTitleEmpty, setIsTitleEmpty] = useState(true);

  const isTypeUndefined = type === null;
  const vazio = alternativas.length <= 1;

  const [question, setQuestion] = useState({
    nome_campo: '',
    descricao: '',
  });
  const onChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };
  const addAlternativa = () => {
    const novaAlternativa = { id: Date.now(), value: '' };
    setAlternativas([...alternativas, novaAlternativa]);
  };
  const handleAlternativaChange = (event, id) => {
    const novasAlternativas = [...alternativas];
    const index = alternativas.findIndex((alter) => alter.id === id);
    novasAlternativas[index].value = event.target.value;
    setAlternativas(novasAlternativas);
  };
  const handleDeleteAlternativa = (index) => {
    const novasAlternativas = [...alternativas];
    novasAlternativas.splice(index, 1);
    setAlternativas(novasAlternativas);
  };
  function handleTitleChange(e) {
    setIsTitleEmpty(e.target.value === '');
  }

  const submit = async () => {
    if (type !== 'alternativa' && type !== 'multipla_escolha') {
      // eslint-disable-next-line object-shorthand
      const newQuestion = { ...question, tipo: type, obrigatorio };
      await api.post('/question', { ...newQuestion });
    } else {
      const newQuestion = {
        ...question,
        tipo: type,
        obrigatorio,
        alternativas: JSON.stringify(alternativas.map((alternativa) => alternativa.value)),
      };
      await api.post('/question', { ...newQuestion });
    }
  };
  const handleSubmit = () => {
    if (isTitleEmpty || isTypeUndefined) {
      // eslint-disable-next-line no-alert
      alert('Por favor, preencha todos os campos obrigatórios!');
    } else if (type === 'alternativa' || type === 'multipla_escolha') {
      if (alternativas.length <= 1) {
        alert(
          'Não pode questões de alternativas/multipla escolha com apenas uma opção!',
        );
        setType(null);
      } else {
        submit();
      }
    } else {
      submit();
    }
  };

  return (
    <div>
      <div
        className="flex justify-content-center"
        style={{ margin: '15px' }}
      >
        <h1>Criar Questões</h1>
      </div>

      <div
        style={{
          justifyContent: 'center',
          marginTop: '150px',
          marginBottom: '10px',
          marginLeft: '60px',
          marginRight: '60px',
        }}
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
                handleTitleChange(e);
              }}
              required
            />
          </div>
          <div className="p-inputgroup" style={{ height: '100px' }}>
            <Spans icon="pi pi-align-justify" />
            <InputText
              name="descricao"
              placeholder="Descrição (OPCIONAL)"
              onChange={(e) => onChange(e)}
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
                style={{ width: '50vw' }}
                onHide={() => setAlt(false)}
              >
                {alternativas.map((alternativa, index) => (
                  <div
                    className=" flex justify-content-center"
                    key={alternativa.id}
                  >
                    <Spans icon="pi pi-pencil" />
                    <InputText
                      placeholder="Opcão"
                      style={{ width: '500px' }}
                      value={alternativa.value}
                      onChange={(event) => handleAlternativaChange(
                        event,
                        alternativa.id,
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
                style={{ width: '50vw' }}
                onHide={() => setMult(false)}
              >
                {alternativas.map((alternativa, index) => (
                  <div
                    className=" flex justify-content-center"
                    key={alternativa.id}
                  >
                    <Spans icon="pi pi-pencil" />
                    <InputText
                      placeholder="Opcão"
                      style={{ width: '500px' }}
                      value={alternativa.value}
                      onChange={(event) => handleAlternativaChange(
                        event,
                        alternativa.id,
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
        <Button label="Listar" />
        <Button label="Salvar" onClick={() => handleSubmit()} />
      </div>
    </div>
  );
}
