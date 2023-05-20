import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import api from '../../utils/Api';

export default function QuestionsList() {
  const navigate = useNavigate();
  const createQuestion = () => {
    navigate('/app/questions/new');
  };
  const [questions, setQuestions] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const onGlobalFilterChange = (e) => {
    const { value } = e.target;
    const afilters = { ...filters };

    afilters.global.value = value;

    setFilters(afilters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => (
    <div className="flex justify-content-end">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar" />
      </span>
    </div>
  );
  const header = renderHeader();

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
    <Button icon="pi pi-pencil" style={{ backgroundColor: 'white' }} onClick={() => navigate(`/app/questions/new/${e.id}`)} />
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
        <DataTable
          value={questions}
          scrollable
          paginator
          rows={9}
          scrollHeight="550px"
          tableStyle={{ maxHeight: '100px' }}
          filters={filters}
          globalFilterFields={['nome_campo', 'descricao', 'tipo', 'alternativas']}
          header={header}
        >
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
