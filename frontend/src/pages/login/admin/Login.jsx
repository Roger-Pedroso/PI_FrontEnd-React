import React, { useState } from 'react';
import './Login.css';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import logo from '../../../img/logo.jpg';
import api from '../../../utils/Api';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    senha: '',
  });

  const [warning, setWarning] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => api.post('/login/adm', { credentials });
  const isValid = (e) => {
    onSubmit();
    e.preventDefault();
    if (onSubmit === true) {
      navigate('/');
    } else {
      setWarning('Email ou senha inválidos!');
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
            <InputText id="email" placeholder="Email" onChange={(e) => { onChange(e); }} name="email" type="email" />
          </div>

          <div className="p-inputgroup">
            <Password feedback={false} id="password" placeholder="Senha" toggleMask onChange={(e) => { onChange(e); }} name="senha" />
          </div>

        </div>

        <div className="button_div">
          <a href="/login">
            {' '}
            <Button style={{ backgroundColor: '#75298c' }} type="button" label="Entrar como usuário" />
            {' '}
          </a>
          <Button style={{ backgroundColor: '#75298c' }} type="submit" label="Entrar" />
        </div>

        <div id="recovery_div">
          <a id="recovery" href="/login/rec">Esqueceu sua senha?</a>
        </div>
      </form>
      <div style={{ textAlign: 'end', fontSize: '1.2em' }}><p style={{ color: 'red' }}>{warning}</p></div>
    </body>
  );
}
