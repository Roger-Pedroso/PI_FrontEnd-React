import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/Api';

export default function ListSuperior() {
  const navigate = useNavigate();
  const createSuperior = () => {
    navigate('/superior/add');
  };

  const [superiores, setSuperiores] = useState([]);

  const findSuperior = async () => {
    const data = await api.get('/superior');
    setSuperiores(data.data);
  };

  useEffect(() => {
    if (superiores.length === 0) {
      findSuperior();
    }
  }, [superiores]);

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
        </DataTable>
      </div>
    </div>
  );
}
