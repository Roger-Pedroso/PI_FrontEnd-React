import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import api from '../../utils/Api';

export default function QuestionsList() {
  const navigate = useNavigate();
  const createQuestion = () => {
    navigate('/quizes/CreateQuestions');
  };
  const [questions, setQuestions] = useState([]);

  const findQuestion = async () => {
    const data = await api.get('/question');
    setQuestions(data.data);
  };

  useEffect(() => {
    if (questions.length === 0) {
      findQuestion();
    }
  }, [questions]);

  const editTemplate = (e) => (
    <Button icon="pi pi-pencil" style={{ backgroundColor: 'white' }} onClick={() => navigate(`/quizes/CreateQuestions/${e.id}`)} />
  );

  return (
    <div>
      <div className="card" style={{ margin: '20px' }}>
        <div className="flex justify-content-between align-items-center">

          <h1>Listagem de Questões</h1>
          <Button
            label="Cadastrar"
            onClick={createQuestion}
            style={{ height: '2rem' }}
          />

        </div>
        <DataTable value={questions} scrollable scrollHeight="550px" tableStyle={{ maxHeight: '100px' }}>
          <Column field="nome_campo" header="Nome" />
          <Column field="descricao" header="Descrição" />
          <Column field="tipo" header="Tipo" />
          <Column field="alternativas" header="Alternativas" />
          <Column body={editTemplate} />
        </DataTable>
      </div>
    </div>
  );
}
