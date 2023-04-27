/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/Api';

export default function ListArea() {
  const navigate = useNavigate();
  const [areas, setAreas] = useState([]);

  const findAreas = async () => {
    const data = await api.get('/sector');

    setAreas(data.data);
  };

  useEffect(() => {
    if (areas.length === 0) {
      findAreas();
    }
  }, [areas]);

  const createArea = () => {
    navigate('/area/cadastrar');
  };

  return (
    <div className="card" style={{ margin: '20px' }}>
      <div className="flex justify-content-between align-items-center">

        <h1>Listagem de Áreas</h1>
        <Button
          label="Cadastrar"
          onClick={createArea}
          style={{ height: '2rem' }}
        />

      </div>
      <DataTable value={areas} tableStyle={{ minWidth: '50rem' }}>
        <Column field="nome" header="Nome" />
        <Column field="status" header="Status" sortable />
        <Column field="tipo" header="Tipo" />
      </DataTable>
    </div>
  );
}
