import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './ListaAdministrador.css';
import api from '../../utils/Api';

export default function ListaAdministrador() {
  const [admin, setAdmin] = useState([]);

  const findAdmin = async () => {
    const data = await api.get('/user');

    setAdmin(data.data);
  };

  useEffect(() => {
    findAdmin();
  }, [admin]);

  return (
    <>
      <div id="titulo">
        <h1>Cadastro de Administradores</h1>
      </div>
<<<<<<< Updated upstream
      <div className="block font-bold text-center p-4 border-round mb-3">
        <div className="card_table ">
          <DataTable
            value={admin}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: '50rem' }}
          >
            <Column field="cracha" header="Número do Cracha" />
            <Column field="nome" header="Nome" />
            <Column field="ramal" header="Ramal" />
            <Column field="email" header="Email" />
          </DataTable>
        </div>
=======
      <div>
        <DataTable
          value={admin}
          paginator
          rows={4}
          tableStyle={{ minWidth: '50rem', maxHeight: '23rem' }}
          dataKey="id"
          filters={filters}
          globalFilterFields={['nome', 'cracha', 'ramal', 'email']}
          header={header}
        >
          <Column field="cracha" header="Número do Cracha" />
          <Column field="nome" header="Nome" />
          <Column field="ramal" header="Ramal" />
          <Column field="email" header="Email" />
        </DataTable>
>>>>>>> Stashed changes
      </div>
    </>
  );
}
