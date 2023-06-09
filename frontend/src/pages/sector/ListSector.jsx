/* eslint-disable no-restricted-globals */
/* eslint-disable linebreak-style */
import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { InputSwitch } from 'primereact/inputswitch';
import { FilterMatchMode } from 'primereact/api';
import Spans from '../../components/Spans';
import api from '../../utils/Api';

export default function ListSector() {
  const navigate = useNavigate();
  const [areas, setAreas] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [selectedArea, setSelectedArea] = useState([]);
  const [editMessage, setEditMessage] = useState(false);
  const [status, setStatus] = useState(null);
  const [editedArea, setEditedArea] = useState({
    nome: '',
    tipo: '',
    status: '',
  });
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
  const findAreas = async () => {
    const data = await api.get('/sector');

    setAreas(data.data);
  };

  const checkInput = (object) => {
    if (object.nome === '' || object.tipo === '') {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (areas.length === 0) {
      findAreas();
    }
  }, [areas]);

  const createArea = () => {
    navigate('/app/sector/new');
  };

  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({
      severity: 'success', summary: 'Concluído', detail: 'Editado com sucesso!', life: 3000,
    });
  };
  const showError = (msg) => {
    toast.current.show({
      severity: 'error', summary: 'Erro', detail: msg, life: 3000,
    });
  };

  const showWarn = () => {
    toast.current.show({
      severity: 'warn', summary: 'Aviso', detail: 'Um ou mais campos estão vazios', life: 3000,
    });
  };

  const statusSwitch = (e) => {
    if (e.status === 'Ativo') {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  const showDeleteDialog = (e) => {
    setSelectedArea(e);
    setDeleteMessage(true);
  };

  const showEditDialog = (e) => {
    setEditedArea(e);
    statusSwitch(e);
    setEditMessage(true);
  };

  const deleteTemplate = (e) => (
    <Button icon="pi pi-times" style={{ backgroundColor: 'white' }} onClick={() => showDeleteDialog(e)} />
  );

  const editTemplate = (e) => (
    <Button icon="pi pi-pencil" style={{ backgroundColor: 'white' }} onClick={() => showEditDialog(e)} />
  );

  const deleteArea = async () => {
    try {
      await api.delete(`sector/${selectedArea.id}`, { ...editedArea });
      window.location.reload();
    } catch (err) {
      showError('ocorreu um erro ao realizar uma tentativa de deletar.');
      console.log(err);
    }
  };

  const editArea = async () => {
    const areaParsed = ({ ...editedArea, status: status ? 'Ativo' : 'Inativo' });
    if (checkInput(areaParsed)) {
      try {
        await api.put(`sector/${areaParsed.id}`, { ...areaParsed });
        window.location.reload();
        showSuccess();
      } catch (err) {
        console.log(err);
        showError('Ocorreu um erro ao realizar uma tentativa de envio da edição.');
      }
    } else {
      showWarn();
    }
  };

  const onChange = (e) => {
    setEditedArea({ ...editedArea, [e.target.name]: e.target.value });
  };

  return (
    <div className="card" style={{ margin: '20px' }}>
      <div style={innerWidth > 600 ? { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } : { fontSize: '0.7em' }}>

        <h1>Setores</h1>
        <Button
          label="Cadastrar"
          onClick={createArea}
          style={{ height: '2rem' }}
        />

      </div>
      <div>
        <DataTable
          value={areas}
          paginator
          rows={5}
          filters={filters}
          globalFilterFields={['nome', 'status', 'tipo']}
          header={header}
        >
          <Column field="nome" header="Nome" />
          <Column field="status" header="Status" sortable />
          <Column field="tipo" header="Tipo" />
          <Column body={editTemplate} />
          <Column body={deleteTemplate} />
        </DataTable>
      </div>
      <div>
        <div>
          <Dialog header="Confirmação" visible={deleteMessage} style={innerWidth > 600 ? { width: '50vw' } : {}} onHide={() => setDeleteMessage(false)}>
            <p className="m-0">
              Tem certeza que deseja deletar o cadastro de
              {' '}
              {selectedArea.nome}
              ?
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <Button label="Sim" onClick={() => deleteArea()} />
              <Button label="Não" onClick={() => setDeleteMessage(false)} />
            </div>
          </Dialog>
        </div>
        <div>
          <div>
            <Dialog header={`Editar ${editedArea.nome}`} visible={editMessage} style={innerWidth > 600 ? { width: '50vw' } : {}} onHide={() => setEditMessage(false)}>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  display: 'flex', flexDirection: 'column', gap: '10px', width: '100%',
                }}
                >
                  <div className="p-inputgroup">
                    <Spans icon="pi pi-user" />
                    <InputText name="nome" onChange={(e) => { onChange(e); }} id="name" value={editedArea.nome} />
                  </div>

                  <div className="p-inputgroup">
                    <Spans icon="pi pi-user" />
                    <InputText name="tipo" onChange={(e) => { onChange(e); }} id="tipo" placeholder="Tipo" value={editedArea.tipo} />
                  </div>

                  <div className="flex gap-3 p-inputgroup flex align-items-center">
                    <InputSwitch checked={status} onChange={(e) => setStatus(e.value)} />
                    Status:
                    {' '}
                    {status ? 'Ativo' : 'Inativo'}
                  </div>
                </div>
              </div>
              <div style={{
                display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px',
              }}
              >
                <Button label="Sim" onClick={() => editArea()} />
                <Button label="Não" onClick={() => setEditMessage(false)} />
              </div>
            </Dialog>
          </div>
        </div>
      </div>
      <div>
        <Toast ref={toast} />
      </div>
    </div>
  );
}
