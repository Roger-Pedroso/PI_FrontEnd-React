import React from 'react';
import './Login.css';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import logo from '../../../img/logo.jpg';

export default function Login() {
  return (
    <body id="background">

      <div className="logo_div">
        <img id="logo" src={logo} alt="" />
      </div>

      <form action="">
        <div id="input_div">

          <div className="p-inputgroup">
            <InputText id="email" placeholder="Email" />
          </div>

          <div className="p-inputgroup">
            <Password id="password" placeholder="Senha" toggleMask />
          </div>

        </div>

        <div className="button_div">
          <a href="/login">
            {' '}
            <Button type="button" label="Entrar como usuário" />
            {' '}
          </a>
          <Button type="submit" label="Entrar" />
        </div>

        <div id="recovery_div">
          <a id="recovery" href="/login/rec">Esqueceu sua senha?</a>
        </div>
      </form>

    </body>
  );
}
