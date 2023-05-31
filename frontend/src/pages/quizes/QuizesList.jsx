import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import api from '../../utils/Api';

export default function QuizesList() {
  const navigate = useNavigate();
  const createQuiz = () => {
    navigate('/app/quizes/new');
  };
  const [quizes, setQuizes] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [areYouSure, setAreYouSure] = useState(false);
  const [copyModel, setCopyModel] = useState();
  const toast = useRef();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const showSuccess = () => {
    toast.current.show({
      severity: 'success', summary: 'Successo!', detail: 'Modelo duplicado com sucesso! Atualizando a lista...', life: 3000,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: 'error', summary: 'Erro!', detail: 'Ocorreu um erro ao duplicar o modelo. Tente novamente.', life: 3000,
    });
  };

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
    <Button icon="pi pi-pencil" style={{ backgroundColor: 'white' }} onClick={() => navigate(`/app/quizes/new/${e.id}`)} />
  );
  const sendTemplate = (e) => (
    <Button icon="pi pi-send" style={{ backgroundColor: 'white' }} onClick={() => navigate(`/app/quizes/send/${e.id}`)} />
  );
  const copiarQuiz = async (e) => {
    try {
      const quizParsed = {
        nome: `${e.nome} - CÓPIA`,
        descricao: e.descricao,
      };
      await api.post('/quiz', { ...quizParsed, questions: e.questions.map((qst) => qst.id) });
      showSuccess();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      showError();
    }
  };

  const copyTemplate = (e) => (
    <Button icon="pi pi-copy" style={{ backgroundColor: 'white' }} onClick={() => { setCopyModel(e); setAreYouSure(true); }} />
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
        <DataTable
          value={quizes}
          scrollable
          paginator
          rows={9}
          scrollHeight="550px"
          tableStyle={{ maxHeight: '100px' }}
          filters={filters}
          globalFilterFields={['nome', 'descricao']}
          header={header}
        >
          <Column field="nome" header="Nome" />
          <Column field="descricao" header="Descrição" />
          <Column body={editTemplate} />
          <Column body={sendTemplate} />
          <Column body={copyTemplate} />
        </DataTable>
        <Dialog header="Confirmação" visible={areYouSure} style={{ width: '50vw' }} onHide={() => setAreYouSure(false)}>
          <p className="m-0">
            Tem certeza que deseja duplicar esse modelo?
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Button label="Sim" onClick={() => copiarQuiz(copyModel)} />
            <Button label="Não" onClick={() => setAreYouSure(false)} />
          </div>
        </Dialog>
        <Toast ref={toast} />
      </div>
    </div>
  );
}
