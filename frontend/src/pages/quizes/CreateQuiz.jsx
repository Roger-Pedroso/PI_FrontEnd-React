/* eslint-disable linebreak-style */
import React from 'react';
import { InputText } from 'primereact/inputtext';
import Spans from '../../components/Spans';

export default function CreateQuiz() {
  return (
    <div>
      <div className="flex justify-content-center" style={{ margin: '15px' }}>
        <h1>Criar Modelo de Questionário</h1>
      </div>

      <div style={{
        justifyContent: 'center', marginTop: '40px', marginBottom: '10px', marginLeft: '60px', marginRight: '60px',
      }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="p-inputgroup">
            <Spans icon="pi pi-question" />
            <InputText name="nome" placeholder="Nome da Questionário (OBRIGATÓRIO)" required />
          </div>
          <div className="p-inputgroup" style={{ height: '100px' }}>
            <Spans icon="pi pi-align-justify" />
            <InputText name="descricao" placeholder="Descrição (OPCIONAL)" />
          </div>
        </div>
      </div>
    </div>
  );
}
