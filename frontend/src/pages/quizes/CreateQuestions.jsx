import React from 'react';
import { InputText } from 'primereact/inputtext';

export default function CreateQuestions() {
  return (
    <div>
      <div className="flex justify-content-center">
        <h1>Criar Questões</h1>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'center', margin: '60px', marginLeft: '10px',
      }}
      >
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-question" />
          </span>
          <InputText name="Nome da Questão" id="nome_questao" placeholder="Nome da Questão" />
        </div>
      </div>
    </div>
  );
}
