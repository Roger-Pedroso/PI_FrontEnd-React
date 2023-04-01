import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { InputMask } from 'primereact/inputmask';
import api from '../../utils/Api';
import Spans from '../../components/Spans';

export default function Cadastro() {
  const [admin, setAdmin] = useState({
    nome: '',
    nascimento: '',
    email: '',
    ramal: '',
    cracha: '',
    senha: '',
  });
  const onChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await api.post('/user', { admin });
  };
  return (

    <>

      <div style={{ textAlign: 'center' }}>
        <h1>Cadastro de Administradores</h1>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '60px' }}>
        <form onSubmit={(e) => { onSubmit(e); }} style={{ width: '60%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="p-inputgroup">
              <Spans icon="pi pi-inbox" />
              <InputText name="nome" onChange={(e) => { onChange(e); }} id="name" placeholder="Nome completo" />
            </div>

            <div className="p-inputgroup">
              <span className="p-inputgroup-addon" id="span">
                <i className="pi pi-inbox" id="i" />
              </span>
              <InputText name="email" onChange={(e) => { onChange(e); }} id="email" placeholder="Email" />
            </div>

            <div className="p-inputgroup">
              <span className="p-inputgroup-addon" id="span">
                <i className="pi pi-tag" id="i" />
              </span>

              <InputText
                placeholder="Crachá"
                type="number"
                name="cracha"
                onChange={(e) => { onChange(e); }}
              />
            </div>

            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-calendar" />
              </span>
              <InputMask name="nascimento" onChange={(e) => { onChange(e); }} id="date" mask="99/99/9999" placeholder="Data de Nascimento" useGrouping={false} />
            </div>

            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-phone" />
              </span>
              <InputMask name="ramal" onChange={(e) => { onChange(e); }} mask="9999" placeholder="Ramal" useGrouping={false} />
            </div>

            <div className="p-inputgroup">
              <Spans icon="pi pi-key" />
              <Password
                toggleMask
                placeholder="Senha"
                name="senha"
                onChange={(e) => { onChange(e); }}
              />
            </div>

            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-key" />
              </span>
              <Password
                feedback={false}
                toggleMask
                placeholder="Confirmação de senha"
              />
            </div>

          </div>

          <div style={{
            marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px',
          }}
          >
            <Button label="Cancelar" />
            <Button label="Confirmar" type="submit" />
          </div>
        </form>
      </div>
    </>
  );
}
