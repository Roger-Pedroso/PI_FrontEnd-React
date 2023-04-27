/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputMask } from 'primereact/inputmask';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../../utils/Api';
import Spans from '../../components/Spans';

export default function Cadastro() {
  const { navigate } = useNavigate();
  const [admin, setAdmin] = useState({
    nome: '',
    email: '',
    ramal: '',
    cracha: '',
    senha: '',
  });
  const [date, setDate] = useState('');
  const onChange = (e) => {
    if (e.target.name === 'nascimento') {
      setDate(e.target.value);
    } else {
      setAdmin({ ...admin, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async () => {
    try {
      const adminParsed = { ...admin, nascimento: format(new Date(date), 'yyyy-MM-dd') };
      console.log(adminParsed.nascimento);
      await api.post('/user', { ...adminParsed });
      navigate('/user');
    } catch (error) {
      console.log(error);
    }
  };
  return (

    <>

      <div style={{ textAlign: 'center' }}>
        <h1>Cadastro de Administradores</h1>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '60px' }}>
        <div style={{ width: '60%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="p-inputgroup">
              <Spans icon="pi pi-user" />
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
              <Spans icon="pi pi-calendar" />
              <Calendar name="nascimento" onChange={(e) => { onChange(e); }} id="date" placeholder="Data de Nascimento" useGrouping={false} />
            </div>

            <div className="p-inputgroup">
              <Spans icon="pi pi-phone" />
              <InputMask name="ramal" onChange={(e) => { onChange(e); }} mask="452103-9999" placeholder="Ramal" useGrouping={false} />
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
              <Spans icon="pi pi-key" />
              <Password
                feedback={false}
                toggleMask
                placeholder="Confirmação de senha"
              />
            </div>

            <div style={{
              display: 'flex', marginTop: '20px', gap: '10px', justifyContent: 'flex-end',
            }}
            >
              <Button label="Cancelar" />
              <Button label="Confirmar" type="button" onClick={onSubmit} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
