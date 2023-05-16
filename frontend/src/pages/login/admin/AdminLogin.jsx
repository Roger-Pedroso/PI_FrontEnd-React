/* eslint-disable linebreak-style */
import React, { useContext, useState } from 'react';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../../../img/logo.jpg';
import { AuthContext } from '../../../context/Login/AuthContext';
// import api from '../../../utils/Api';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    senha: '',
  });

  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    authUser(credentials);
    window.location.reload();
    navigate('/admin');
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '99vw', height: '95vh',
    }}
    >

      <div>
        <img style={{ height: '200px' }} id="logo" src={logo} alt="" />
      </div>

      {/* <form
        onSubmit={handleLogin}
        style={{
          display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end',
        }}
      > */}
      <div style={{
        display: 'flex', gap: '10px', flexDirection: 'column',
      }}
      >

        <div className="p-inputgroup">
          <InputText id="email" placeholder="Email" onChange={(e) => { onChange(e); }} name="email" type="email" />
        </div>

        <div className="p-inputgroup">
          <Password feedback={false} id="password" placeholder="Senha" toggleMask onChange={(e) => { onChange(e); }} name="senha" />
        </div>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <Button style={{ backgroundColor: '#75298c' }} type="button" label="Entrar como usuário" onClick={handleLogin} />
        <Button style={{ backgroundColor: '#75298c' }} label="Entrar" onClick={handleLogin} />
      </div>

      <div style={{ marginTop: '20px' }}>
        <a style={{ color: 'white' }} href="/login/rec">Esqueceu sua senha?</a>
      </div>
      {/* </form> */}
      <div style={{ textAlign: 'end', fontSize: '1.2em' }} />
    </div>
  );
}
