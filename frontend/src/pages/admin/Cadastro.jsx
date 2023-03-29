import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import './Cadastro.css';
import { InputMask } from 'primereact/inputmask';

export default function Cadastro() {
  const [value, setValue] = useState('');

  return (
    <>

      <div id="cad_title">
        <h1>Cadastro de Administradores</h1>
      </div>

      <div id="cad_form_box">
        <form action="">
          <div id="cad_input">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user" />
              </span>
              <InputText id="name" placeholder="Nome completo" />
            </div>

            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-inbox" />
              </span>
              <InputText id="email" placeholder="Email" />
            </div>

            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-tag" />
              </span>
              <InputNumber
                placeholder="Crachá"
                useGrouping={false}
              />
            </div>

            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-calendar" />
              </span>
              <InputMask id="date" mask="99/99/9999" placeholder="Data de Nascimento" useGrouping={false} />
            </div>

            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-phone" />
              </span>
              <InputMask mask="(99) 9 9999-9999" placeholder="Número de Telefone" useGrouping={false} />
            </div>

            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-key" />
              </span>
              <Password
                value={value}
                onChange={(e) => setValue(e.target.value)}
                toggleMask
                placeholder="Senha"
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

          <div id="cad_button">
            <Button label="Cancelar" />
            <Button label="Enviar" />
          </div>
        </form>
      </div>
    </>
  );
}
