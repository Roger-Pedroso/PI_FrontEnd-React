import React from 'react';
import './Login.css';
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
            <InputText placeholder="Chave de acesso" />
          </div>

        </div>

        <div className="button_div">
          <a href="/login/adm">
            {' '}
            <Button type="button" label="Entrar como administrador" />
            {' '}
          </a>
          <Button type="submit" label="Entrar" />
        </div>

      </form>

    </body>
  );
}
