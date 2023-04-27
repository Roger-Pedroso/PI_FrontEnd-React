/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import logo from '../../../img/logo.jpg';
import api from '../../../utils/Api';

export default function Login() {
  const [key, setKey] = useState('');
  const [warning, setWarning] = useState('');
  const navigate = useNavigate();
  const onChange = (e) => {
    setKey({ ...key, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => api.post('/login', key);

  const isValid = (e) => {
    onSubmit();
    e.preventDefault();
    if (onSubmit === true) {
      navigate('/');
    } else {
      setWarning('Chave de acesso inválida! Verifique com um administrador.');
    }
  };
  return (

    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '99vw', height: '95vh',
    }}
    >
      <div>
        <img style={{ height: '200px' }} src={logo} alt="" />
      </div>

      <form onSubmit={(e) => { isValid(e); }} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>

          <div className="p-inputgroup">
            <InputText onChange={(e) => { onChange(e); }} name="key" placeholder="Chave de acesso" />
          </div>

        </div>

        <div style={{ marginTop: '20px' }}>
          <a href="/login/admin">
            <Button style={{ backgroundColor: '#75298c' }} type="button" label="Entrar como administrador" />
          </a>
          <Button style={{ backgroundColor: '#75298c' }} type="submit" label="Entrar" />
        </div>
      </form>
      <div style={{ textAlign: 'end', fontSize: '1.2em' }}><p style={{ color: 'red' }}>{warning}</p></div>
    </div>

  );
}
