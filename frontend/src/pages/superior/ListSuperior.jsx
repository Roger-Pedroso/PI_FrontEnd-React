/* eslint-disable no-restricted-globals */
import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { FilterMatchMode } from 'primereact/api';
import api from '../../utils/Api';

export default function ListSuperior() {
  const navigate = useNavigate();
  const createSuperior = () => {
    navigate('/app/superior/new');
  };
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [superiores, setSuperiores] = useState([]);
  const [selectedSuperior, setSelectedSuperior] = useState([]);
  const [editMessage, setEditMessage] = useState(false);
  const [editedSuperior, setEditedSuperior] = useState({
    nome: '',
    cracha: '',
    cargo: '',
    email: '',
  });
  const toast = useRef(null);
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

  const checkInput = (object) => {
    if (object.nome === '' || object.cargo === '' || object.cracha === '' || object.email === '') {
      return false;
    }
    return true;
  };
  const findSuperior = async () => {
    const data = await api.get('/superior');
    setSuperiores(data.data);
  };

  useEffect(() => {
    if (superiores.length === 0) {
      findSuperior();
    }
  }, [superiores]);

  const showDeleteDialog = (e) => {
    setSelectedSuperior(e);
    setDeleteMessage(true);
  };

  const showEditDialog = (e) => {
    setEditedSuperior(e);
    setEditMessage(true);
  };

  const deleteTemplate = (e) => (
    <Button icon="pi pi-times" style={{ backgroundColor: 'white' }} onClick={() => showDeleteDialog(e)} />
  );

  const editTemplate = (e) => (
    <Button icon="pi pi-pencil" style={{ backgroundColor: 'white' }} onClick={() => showEditDialog(e)} />
  );

  const deleteSuperior = async () => {
    try {
      await api.delete(`superior/${selectedSuperior.id}`, { ...editedSuperior });
      window.location.reload();
    } catch (err) {
      showError('ocorreu um erro ao realizar uma tentativa de deletar.');
      console.log(err);
    }
  };

  const onChange = (e) => {
    setEditedSuperior({ ...editedSuperior, [e.target.name]: e.target.value });
  };

  const editSuperior = async () => {
    if (checkInput(editedSuperior) === true) {
      try {
        await api.put(`superior/${editedSuperior.id}`, { ...editedSuperior });
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
  return (
    <div>
      <div className="card" style={{ margin: '20px' }}>
        <div style={innerWidth > 600 ? { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } : { fontSize: '0.7em' }}>

          <h1>Superiores Imediatos</h1>
          <Button
            label="Cadastrar"
            onClick={createSuperior}
            style={{ height: '2rem' }}
          />

        </div>
        <DataTable
          value={superiores}
          paginator
          rows={9}
          filters={filters}
          globalFilterFields={['nome', 'cracha', 'cargo', 'email', 'sector.nome']}
          header={header}
        >
          <Column field="nome" header="Nome" />
          <Column field="cracha" header="Crachá" sortable />
          <Column field="cargo" header="Cargo" />
          <Column field="email" header="Email" />
          <Column field="sector.nome" header="Área" />
          <Column body={editTemplate} />
          <Column body={deleteTemplate} />
        </DataTable>
      </div>
      <div>
        <Dialog header="Confirmação" visible={deleteMessage} style={innerWidth > 600 ? { width: '50vw' } : {}} onHide={() => setDeleteMessage(false)}>
          <p className="m-0">
            Tem certeza que deseja deletar o cadastro de
            {' '}
            {selectedSuperior.nome}
            ?
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Button label="Sim" onClick={() => deleteSuperior()} />
            <Button label="Não" onClick={() => setDeleteMessage(false)} />
          </div>
        </Dialog>
      </div>
      <div>
        <Dialog header={`Editar ${editedSuperior.nome}`} visible={editMessage} style={innerWidth > 600 ? { width: '50vw' } : {}} onHide={() => setEditMessage(false)}>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '10px', width: '100%',
            }}
            >
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user" />
                </span>
                <InputText name="nome" onChange={(e) => { onChange(e); }} id="name" value={editedSuperior.nome} />
              </div>

              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-tag" />
                </span>
                <InputText
                  type="number"
                  value={editedSuperior.cracha}
                  name="cracha"
                  onChange={(e) => { onChange(e); }}
                />
              </div>

              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-briefcase" />
                </span>
                <InputText name="cargo" onChange={(e) => { onChange(e); }} value={editedSuperior.cargo} />
              </div>

              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-inbox" />
                </span>
                <InputText
                  type="email"
                  value={editedSuperior.email}
                  useGrouping={false}
                  name="email"
                  onChange={(e) => { onChange(e); }}
                />
              </div>
            </div>
          </div>
          <div style={{
            display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px',
          }}
          >
            <Button label="Cancelar" onClick={() => setEditMessage(false)} />
            <Button label="Editar" onClick={() => editSuperior()} />
          </div>
        </Dialog>
      </div>
      <div>
        <Toast ref={toast} />
      </div>
    </div>
  );
}
