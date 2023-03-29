import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
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
    <body id="background">

      <div className="logo_div">
        <img id="logo" src={logo} alt="" />
      </div>

      <form onSubmit={(e) => { isValid(e); }}>
        <div id="input_div">

          <div className="p-inputgroup">
            <InputText onChange={(e) => { onChange(e); }} name="key" placeholder="Chave de acesso" />
          </div>

        </div>

        <div className="button_div">
          <a href="/login/adm">
            {' '}
            <Button style={{ backgroundColor: '#75298c' }} type="button" label="Entrar como administrador" />
            {' '}
          </a>
          <Button style={{ backgroundColor: '#75298c' }} type="submit" label="Entrar" />
        </div>
      </form>
      <div style={{ textAlign: 'end', fontSize: '1.2em' }}><p style={{ color: 'red' }}>{warning}</p></div>
    </body>
  );
}
