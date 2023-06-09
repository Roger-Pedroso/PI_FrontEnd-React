/* eslint-disable linebreak-style */
import React, { useContext, useRef, useState } from 'react';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import logo from '../../../img/logo.jpg';
import { AuthContext } from '../../../context/Login/AuthContext';
// import api from '../../../utils/Api';

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    senha: '',
  });

  const { login, authenticated } = useContext(AuthContext);
  const toast = useRef(null);

  const showError = () => {
    toast.current.show({
      severity: 'error', summary: 'Erro', detail: 'Email ou senha inválidos', life: 3000,
    });
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    await login({ ...credentials });
    if (authenticated !== true) {
      showError();
    }
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '99vw', height: '95vh',
    }}
    >
      <div><Toast ref={toast} /></div>

      <div>
        <img style={{ height: '200px' }} id="logo" src={logo} alt="" />
      </div>

      <div style={{
        display: 'flex', gap: '10px', flexDirection: 'column',
      }}
      >

        <div className="p-inputgroup">
          <InputText id="email" placeholder="Email" onChange={(e) => onChange(e)} name="email" type="email" />
        </div>

        <div className="p-inputgroup">
          <Password feedback={false} id="password" placeholder="Senha" toggleMask onChange={(e) => onChange(e)} name="senha" />
        </div>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <Button style={{ backgroundColor: '#75298c' }} type="button" label="Entrar como usuário" onClick={() => navigate('/')} />
        <Button style={{ backgroundColor: '#75298c' }} label="Entrar" onClick={handleLogin} />
      </div>

      <div style={{ marginTop: '20px' }}>
        <a style={{ color: 'white' }} href="/recovery">
          Esqueceu sua senha?
        </a>
      </div>

      <div style={{ textAlign: 'end', fontSize: '1.2em' }} />
    </div>
  );
}
