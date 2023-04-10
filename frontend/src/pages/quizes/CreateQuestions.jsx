/* eslint-disable linebreak-style */
import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Spans from '../../components/Spans';

function zeroadez() {
  return (
    <h1>opa</h1>
  );
}

export default function CreateQuestions() {
  return (
    <div>
      <div className="flex justify-content-center" style={{ margin: '15px' }}>
        <h1>Criar Questões</h1>
      </div>

      <div style={{
        justifyContent: 'center', marginTop: '60px', marginBottom: '10px', marginLeft: '60px', marginRight: '60px',
      }}
      >
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '10px',
        }}
        >
          <div className="p-inputgroup">
            <Spans icon="pi pi-question" />
            <InputText name="Nome da Questão" placeholder="Nome da Questão" />
          </div>

          <div className="p-inputgroup" style={{ height: '100px' }}>
            <Spans icon="pi pi-align-justify" />
            <InputText name="Descrição (OPCIONAL)" placeholder="Descrição (OPCIONAL)" />
          </div>

          <div className="flex justify-content-center gap-3">
            <Button id="botoes" label="0 a 10" type="button" onClick={zeroadez} />
            <Button id="botoes" label="Alternativa" type="button" onClick={zeroadez} />
            <Button id="botoes" label="Multipla Escolha" type="button" onClick={zeroadez} />
            <Button id="botoes" label="Aberta" type="button" onClick={zeroadez} />
          </div>

          <div className="flex flex-wrap justify-content-center gap-3">
            <Button label="Limpar" icon="pi pi-check" />
            <Button label="Listar" icon="pi pi-check" />
            <Button label="Salvar" icon="pi pi-check" />
          </div>
        </div>
      </div>
    </div>
  );
}
