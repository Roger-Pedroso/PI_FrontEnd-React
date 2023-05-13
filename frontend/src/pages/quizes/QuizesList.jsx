import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import api from '../../utils/Api';

export default function QuizesList() {
  const navigate = useNavigate();
  const createQuiz = () => {
    navigate('/quizes/CreateQuiz');
  };
  const [quizes, setQuizes] = useState([]);

  const findQuizes = async () => {
    const data = await api.get('/quiz');
    setQuizes(data.data);
  };

  useEffect(() => {
    if (quizes.length === 0) {
      findQuizes();
    }
  }, [quizes]);

  const editTemplate = (e) => (
    <Button icon="pi pi-pencil" style={{ backgroundColor: 'white' }} onClick={() => navigate(`/quizes/CreateQuiz/${e.id}`)} />
  );
  const sendTemplate = (e) => (
    <Button icon="pi pi-send" style={{ backgroundColor: 'white' }} onClick={() => navigate(`/quizes/SendQuiz/${e.id}`)} />
  );
  return (
    <div>
      <div className="card" style={{ margin: '20px' }}>
        <div className="flex justify-content-between align-items-center">

          <h1>Listagem de Modelos de Questionário</h1>
          <Button
            label="Cadastrar"
            onClick={createQuiz}
            style={{ height: '2rem' }}
          />

        </div>
<<<<<<< Updated upstream
        <DataTable value={quizes} scrollable scrollHeight="550px" tableStyle={{ maxHeight: '100px' }}>
=======
        <DataTable
          value={quizes}
          scrollable
          paginator
          rows={4}
          tableStyle={{ minWidth: '50rem', maxHeight: '23rem' }}
          filters={filters}
          globalFilterFields={['nome', 'descricao']}
          header={header}
        >
>>>>>>> Stashed changes
          <Column field="nome" header="Nome" />
          <Column field="descricao" header="Descrição" />
          <Column body={editTemplate} />
          <Column body={sendTemplate} />
        </DataTable>
      </div>
    </div>
  );
}
