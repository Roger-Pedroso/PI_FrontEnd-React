import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import './ListaAdministrador.css';

export default function ListaAdministrador() {
  const products = [];

  return (
    <>
      <div id="titulo">
        <h1>Cadastro de Administradores</h1>
      </div>
      <div className="block font-bold text-center p-4 border-round mb-3">
        <div className="card_table ">
          <DataTable
            value={products}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: '50rem' }}
          >
            <Column field="Cracha" header="Número do Cracha" />
            <Column field="Nome" header="Nome" />
            <Column field="Telefone" header="Telefone" />
            <Column field="Email" header="Email" />
          </DataTable>

          <div id="button">
            <Button label="Excluir" />
            <Button label="Editar" type="submit" />
          </div>
        </div>
      </div>
    </>
  );
}
