import React, { useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import logo from '../../../img/logo.jpg';
import { KeyContext } from '../../../context/Login/KeyContext';

export default function Login() {
  const { setKey, getQuiz } = useContext(KeyContext);
  const [keyAux, setKeyAux] = useState('');

  const onChange = (e) => {
    setKeyAux(e.target.value);
  };

  const submit = () => {
    setKey(keyAux);
    getQuiz();
  };

  return (

    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '99vw', height: '95vh',
    }}
    >
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
          <Button style={{ backgroundColor: '#75298c' }} type="submit" label="Entrar" onClick={() => getQuiz()} />
        </div>
      </div>
      <div style={{ textAlign: 'end', fontSize: '1.2em' }}><p style={{ color: 'red' }}>{}</p></div>
    </div>

  );
}
