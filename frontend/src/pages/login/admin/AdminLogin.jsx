/* eslint-disable linebreak-style */
import React, { useContext, useRef, useState } from 'react';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import logo from '../../../img/logo.jpg';
import sqhg from '../../../img/sqhg.png';
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
      <div className="flex flex-column gap-3 justify-content-center align-items-center">

        <div className="flex flex-column gap-6" style={{ width: '100%' }}>
          <img style={{ height: '200px' }} id="logo" src={sqhg} alt="" />
          <div style={{
            display: 'flex',
            gap: '10px',
            flexDirection: 'column',
            width: '100%',
          }}
          >
            <div className="p-inputgroup">
              <InputText id="email" placeholder="Email" onChange={(e) => onChange(e)} name="email" type="email" />
            </div>

            <div className="p-inputgroup">
              <Password feedback={false} id="password" placeholder="Senha" toggleMask onChange={(e) => onChange(e)} name="senha" />
            </div>
            <div className="flex gap-3 justify-content-center" style={{ width: '100%' }}>
              <Button style={{ backgroundColor: '#75298c', width: '70%' }} type="button" label="Entrar como usuário" onClick={() => navigate('/')} />
              <Button style={{ backgroundColor: '#75298c', width: '30%' }} label="Entrar" onClick={handleLogin} />
            </div>
          </div>

          <div>
            <a style={{ color: 'white' }} href="/recovery">
              Esqueceu sua senha?
            </a>
          </div>
        </div>

        <div>
          <img style={{ height: '150px' }} id="logo" src={logo} alt="" />
        </div>
      </div>
    </div>
  );
}
