import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import React, { useContext, useRef, useState } from 'react';
import { InputMask } from 'primereact/inputmask';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Spans from '../../components/Spans';
import api from '../../utils/Api';
import { AuthContext } from '../../context/Login/AuthContext';

export default function Profile() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const toast = useRef(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const { user } = useContext(AuthContext);
  const [editedUser, setEditedUser] = useState({});

  const showWarn = (msg) => {
    toast.current.show({
      severity: 'warn', summary: 'Aviso', detail: msg, life: 3000,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar administrador.', life: 3000,
    });
  };

  const [date, setDate] = useState('');

  const onChange = (e) => {
    if (e.target.name === 'nascimento') {
      setDate(e.target.value);
    } else {
      setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    }
  };

  const checkInput = (object) => {
    if (object.nome === '' || object.email === '' || object.ramal === '' || object.cracha === '' || object.senha === '') {
      return false;
    }
    return true;
  };

  const checkPass = (object) => {
    if (object.senha !== password) {
      return false;
    } return true;
  };

  const onSubmit = async () => {
    const userParsed = { ...editedUser, nascimento: format(new Date(date), 'yyyy-MM-dd') };
    if (checkInput(userParsed)) {
      if (checkPass(userParsed)) {
        try {
          await api.put(`/user/${user?.id}`, { ...userParsed });
          navigate('/admin');
          console.log(setIsDisabled);
        } catch (error) {
          showError();
        }
      } else {
        showWarn('Senhas não conferem!');
      }
    } else {
      showWarn('Um ou mais campos estão vazios.');
    }
  };
  return (

    <>

      <div style={{ textAlign: 'center' }}>
        <h1>Cadastro de Administradores</h1>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '60px' }}>
        <div style={{ width: '60%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="p-inputgroup">
              <Spans icon="pi pi-user" />
              <InputText name="nome" onChange={(e) => { onChange(e); }} id="name" placeholder="Nome" value={user?.nome} disabled={isDisabled} />
            </div>

            <div className="p-inputgroup">
              <Spans icon="pi pi-inbox" />
              <InputText name="email" onChange={(e) => { onChange(e); }} id="email" placeholder="Email" value={user?.email} disabled={isDisabled} />
            </div>

            <div className="p-inputgroup">
              <Spans icon="pi pi-tag" />

              <InputText
                placeholder="Crachá"
                type="number"
                name="cracha"
                value={user?.cracha}
                disabled
                onChange={(e) => { onChange(e); }}
              />
            </div>

            <div className="p-inputgroup">
              <Spans icon="pi pi-calendar" />
              <Calendar name="nascimento" placeholder="Data de nascimento" onChange={(e) => { onChange(e); }} id="date" value={user?.nascimento} useGrouping={false} disabled />
            </div>

            <div className="p-inputgroup">
              <Spans icon="pi pi-phone" />
              <InputMask name="ramal" onChange={(e) => { onChange(e); }} mask="452103-9999" placeholder="Ramal" useGrouping={false} value={user?.ramal} disabled />
            </div>

            <div className="p-inputgroup">
              <Spans icon="pi pi-key" />
              <Password
                onChange={(e) => setPassword(e.target.value)}
                feedback={false}
                toggleMask
                disabled
                placeholder="Confirmação de senha"
              />
            </div>

            <div
              className="flex justify-content-end gap-3"
              style={{
                marginTop: '20px',
              }}
            >
              <Button label="Cancelar" />
              <Button label="Confirmar" type="button" onClick={onSubmit} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Toast ref={toast} />
      </div>
    </>
  );
}
