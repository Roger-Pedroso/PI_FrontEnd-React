import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/Api';

export default function ListaAdministrador() {
  const [admin, setAdmin] = useState([]);

  const findAdmin = async () => {
    const data = await api.get('/user');

    setAdmin(data.data);
  };
  const navigate = useNavigate();
  const createAdmin = () => {
    navigate('/admin/cadastrar');
  };

  useEffect(() => {
    findAdmin();
  }, [admin]);

  return (
    <div className="card" style={{ margin: '20px' }}>
      <div className="flex justify-content-between align-items-center">

        <h1>Listagem de Administradores</h1>
        <Button
          label="Cadastrar"
          onClick={createAdmin}
          style={{ height: '2rem' }}
        />

      </div>
      <div className="flex justify-content-between align-items-center">
        <DataTable
          value={admin}
          paginator
          rows={9}
          tableStyle={{ minWidth: '50rem' }}
        >
          <Column field="cracha" header="Número do Cracha" />
          <Column field="nome" header="Nome" />
          <Column field="ramal" header="Ramal" />
          <Column field="email" header="Email" />
        </DataTable>
      </div>
    </div>
  );
}
