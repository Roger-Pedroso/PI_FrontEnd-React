import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { ListBox } from 'primereact/listbox';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import api from '../../utils/Api';

export default function SendQuiz() {
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
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
  const isSuperiorSelected = (selectedSuperior === '' || (numChaves === '' || numChaves === null));
  const navigate = useNavigate();

  useEffect(() => {
    const quizId = location.pathname.substring(17, location.pathname.length);
    // eslint-disable-next-line no-use-before-define
    findQuizById(quizId);
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

  const findQuizById = async (id) => {
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

  const submit = () => {
    // eslint-disable-next-line no-undef
    navigate(`/client/AnsweringQuiz/${quiz.id}`);
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
        <Dialog header="Confirmação" visible={areYouSure} style={{ width: '50vw' }} onHide={() => setAreYouSure(false)}>
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
      </div>
    </div>
  );
}
