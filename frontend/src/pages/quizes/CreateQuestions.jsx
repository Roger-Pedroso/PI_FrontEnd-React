/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Spans from '../../components/Spans';

export default function CreateQuestions() {
  const [alt, setAlt] = useState(false);
  const [mult, setMult] = useState(false);

  return (
    <div>
      <div className="flex justify-content-center" style={{ margin: '15px' }}>
        <h1>Criar Questões</h1>
      </div>

      <div style={{
        justifyContent: 'center', marginTop: '150px', marginBottom: '10px', marginLeft: '60px', marginRight: '60px',
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

          <div className=" flex justify-content-center">
            <Button id="botoes" label="0 a 10" />
            <Button id="botoes" label="Alternativa" onClick={() => setAlt(true)} />
            <Dialog id="alt" header="Alternativa" headerStyle={{ position: 'relative', textAlign: 'center' }} justifyContent="center" visible={alt} maximizable style={{ width: '50vw' }} onHide={() => setAlt(false)}>
              <div>
                <InputText placeholder="teste" />
              </div>
            </Dialog>
            <Button id="botoes" label="Múltipla Escolha" onClick={() => setMult(true)} />
            <Dialog id="mult" header="Múltipla Escolha" headerStyle={{ position: 'relative', textAlign: 'center' }} justifyContent="center" visible={mult} maximizable style={{ width: '50vw' }} onHide={() => setMult(false)}>
              <div>
                <InputText placeholder="teste2" />
              </div>
            </Dialog>
            <Button id="botoes" label="Aberta" />
          </div>
        </div>
      </div>
      <div
        className="flex flex-wrap justify-content-center gap-3"
        style={{
          justifySelf: 'end',
          alignItems: 'end',
          justifyContent: 'end',
        }}
      >
        <Button label="Limpar" icon="pi pi-check" />
        <Button label="Listar" icon="pi pi-check" />
        <Button label="Salvar" icon="pi pi-check" />
      </div>
    </div>
  );
}
