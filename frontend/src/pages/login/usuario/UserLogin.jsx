import React, { useContext, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import logo from '../../../img/logo.jpg';
import { KeyContext } from '../../../context/Login/KeyContext';

export default function Login() {
  const { key, setKey, getQuiz } = useContext(KeyContext);
  const toast = useRef(null);

  const showError = (msg) => {
    toast.current.show({
      severity: 'error', summary: 'Erro', detail: msg, life: 3000,
    });
  };

  const showWarn = (msg) => {
    toast.current.show({
      severity: 'warn', summary: 'Aviso', detail: msg, life: 3000,
    });
  };

  const checkInput = () => {
    if (key.trim() === '' || key === undefined) {
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (checkInput() === true) {
      try {
        if (await getQuiz() === false) {
          showWarn('Chave inválida.');
        }
      } catch (error) {
        showError('Ocorreu um erro inesperado.');
      }
    } else {
      showWarn('Preencha os campos corretamente.');
    }
  };

  return (

    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '99vw', height: '95vh',
    }}
    >
      <Toast ref={toast} />
      <div>
        <img style={{ height: '200px' }} src={logo} alt="" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>

          <div className="p-inputgroup">
            <InputText onChange={(e) => setKey(e.target.value)} name="key" placeholder="Chave de acesso" />
          </div>

        </div>

        <div className="flex gap-2" style={{ marginTop: '20px' }}>
          <a href="/login">
            <Button style={{ backgroundColor: '#75298c' }} type="button" label="Entrar como administrador" />
          </a>
          <Button style={{ backgroundColor: '#75298c' }} type="submit" label="Entrar" onClick={() => submit()} />
        </div>
      </div>
      <div style={{ textAlign: 'end', fontSize: '1.2em' }}><p style={{ color: 'red' }}>{}</p></div>
    </div>

  );
}
