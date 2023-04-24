import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import api from '../../utils/Api';

export default function ListSuperior() {
  const navigate = useNavigate();
  const createSuperior = () => {
    navigate('/superior/add');
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
      await api.delete(`superior/${selectedSuperior.id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    setEditedSuperior({ ...editedSuperior, [e.target.name]: e.target.value });
  };

  const editSuperior = async () => {
    try {
      await api.put(`superior/${selectedSuperior.id}`, { ...editedSuperior });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="card" style={{ margin: '20px' }}>
        <div className="flex justify-content-between align-items-center">

          <h1>Listagem de Superiores Imediatos</h1>
          <Button
            label="Cadastrar"
            onClick={createSuperior}
            style={{ height: '2rem' }}
          />

        </div>
        <DataTable value={superiores} tableStyle={{ minWidth: '50rem' }}>
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
        <Dialog header="Confirmação" visible={deleteMessage} style={{ width: '50vw' }} onHide={() => setDeleteMessage(false)}>
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
        <Dialog header={`Editar ${selectedSuperior.nome}`} visible={editMessage} style={{ width: '50vw' }} onHide={() => setEditMessage(false)}>

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
            <Button label="Sim" onClick={() => editSuperior()} />
            <Button label="Não" onClick={() => setEditMessage(false)} />
          </div>
        </Dialog>
      </div>
    </div>
  );
}
