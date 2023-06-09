/* eslint-disable no-restricted-globals */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { ListBox } from 'primereact/listbox';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import api from '../../utils/Api';

export default function SendQuiz() {
  const [quiz, setQuiz] = useState({
    id: '',
    nome: '',
    descricao: '',
    questoes: [],
  });
  const [setores, setSetores] = useState([]);
  const [superiores, setSuperiores] = useState([]);
  const [superioresBySetor, setSuperioresBySetor] = useState([]);
  const [selectedSetor, setSelectedSetor] = useState('');
  const [selectedSuperior, setSelectedSuperior] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const [numChaves, setNumChaves] = useState('');
  const [areYouSure, setAreYouSure] = useState(false);
  const toast = useRef();
  const { id } = useParams();
  const isSuperiorSelected = (selectedSuperior === '' || (numChaves === '' || numChaves === null));
  const navigate = useNavigate();

  const showError = () => {
    toast.current.show({
      severity: 'warn', summary: 'Aviso!', detail: 'Aconteceu um erro ao cadastrar as chaves. Tente novamente.', life: 3000,
    });
  };

  const showSuccess = () => {
    toast.current.show({
      severity: 'success', summary: 'Successo!', detail: 'Chaves cadastradas e questionário em execução! Redirecionando...', life: 3000,
    });
  };

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    findQuizById();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    findSuperiorBySetor();
  }, [selectedSetor]);

  const findSector = async () => {
    const sector = await api.get('/sector');
    setSetores(sector.data);
  };

  const findSuperior = async () => {
    const superioor = await api.get('/superior');
    setSuperiores(superioor.data);
  };
  useEffect(() => {
    if (setores.length === 0) {
      findSector();
    }
  }, [setores]);

  const findQuizById = async () => {
    const qst = await api.get(`/quiz/${id}`);
    const quizParsed = qst.data;
    setQuiz({
      // eslint-disable-next-line max-len
      id: quizParsed.id, nome: quizParsed.nome, descricao: quizParsed.descricao, questoes: quizParsed.questions,
    });
    let number = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < quizParsed.questions.length; i++) {
      number += 1;
    }
    setNumQuestions(`${number} questões.`);
    findSector();
    findSuperior();
  };

  const findSuperiorBySetor = async () => {
    // eslint-disable-next-line max-len
    setSuperioresBySetor(superiores.filter((superior) => superior.sector.id === selectedSetor.id));
  };

  const submit = async () => {
    try {
      const newKey = { idQuiz: quiz.id, idSuperior: selectedSuperior.id };
      console.log(numChaves);
      await api.post('/key', { ...newKey, numberOfKeys: numChaves });
      await api.put(`/status-quiz/${id}`, { status: true });
      showSuccess();
      setTimeout(() => {
        navigate(`/app/quizes/keys/${quiz.id}`);
      }, 2000);
    } catch (err) {
      showError();
      setAreYouSure(false);
    }
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

      <div className="flex justify-content-center" style={{ marginTop: '30px', gap: '30px', marginBottom: '20px' }}>
        <ListBox filter filterPlaceholder="Selecione o Setor" value={selectedSetor} onChange={(e) => { setSelectedSetor(e.value); setSelectedSuperior(''); }} options={setores} optionLabel="nome" className="md:w-30rem" listStyle={{ height: '280px' }} />
        <ListBox filter filterPlaceholder="Selecione o Superior" value={selectedSuperior} onChange={(e) => setSelectedSuperior(e.value)} options={superioresBySetor} optionLabel="nome" className="w-full md:w-30rem" listStyle={{ Height: '280px' }} />
      </div>
      <div className="flex justify-content-center" style={{ margin: '15px', gap: '15px' }}>
        <InputNumber placeholder="Número de Chaves" onChange={(e) => setNumChaves(e.value)} />
        <Button label="Gerar chaves e enviar" disabled={isSuperiorSelected} onClick={() => setAreYouSure(true)} />
      </div>
      <div>
        <Dialog header="Confirmação" visible={areYouSure} style={innerWidth > 600 ? { width: '50vw' } : { width: '95vw' }} onHide={() => setAreYouSure(false)}>
          <p className="m-0">
            Tem certeza que deseja gerar
            {' '}
            {numChaves}
            {' '}
            chaves e enviar o questionário para avaliação do superior
            {' '}
            {selectedSuperior.nome}
            ?
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Button label="Sim" onClick={() => submit()} />
            <Button label="Não" onClick={() => setAreYouSure(false)} />
          </div>
        </Dialog>
        <Toast ref={toast} />
      </div>
    </div>
  );
}
