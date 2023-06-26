import React, { useContext, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import logo from '../../../img/logo.jpg';
import sqhg from '../../../img/sqhg.png';
import { KeyContext } from '../../../context/Login/KeyContext';

export default function Login() {
  const navigate = useNavigate();
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
        } else if (await getQuiz() === 'utilizada') {
          showWarn('Essa chave já foi utilizada ou foi desativada por um administrador.');
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
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '99vw',
      height: '95vh',
      gap: '50px',
    }}
    >
      <Toast ref={toast} />
      <div className="flex flex-column justify-content-center gap-5">
        <img style={{ height: '200px' }} src={sqhg} alt="" />
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '10px', width: '100%',
        }}
        >
          <div>

            <div className="p-inputgroup">
              <InputText onChange={(e) => setKey(e.target.value)} name="key" placeholder="Chave de acesso" />
            </div>

          </div>

          <div className="flex gap-3 justify-content-center" style={{ width: '100%' }}>
            <Button style={{ backgroundColor: '#75298c', width: '75%' }} type="button" label="Entrar como Administrador" onClick={() => navigate('/login')} />
            <Button style={{ backgroundColor: '#75298c', width: '25%' }} type="submit" label="Entrar" onClick={() => submit()} />
          </div>
        </div>
      </div>

      <div className="flex justify-self-end">
        <img style={{ height: '150px' }} src={logo} alt="" />
      </div>
    </div>

  );
}
