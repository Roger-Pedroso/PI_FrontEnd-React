import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import api from '../../utils/Api';

export default function ListaAdministrador() {
  const [admin, setAdmin] = useState([]);
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
  const findAdmin = async () => {
    const data = await api.get('/user');

    setAdmin(data.data);
  };
  const navigate = useNavigate();
  const createAdmin = () => {
    navigate('/admin/cadastrar');
  };

  useEffect(() => {
    if (admin.length === 0) {
      findAdmin();
    }
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
      <div>
        <DataTable
          value={admin}
          paginator
          rows={9}
          tableStyle={{ minWidth: '50rem' }}
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
      </div>
    </div>
  );
}
