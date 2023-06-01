import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { format } from 'date-fns';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import { AuthContext } from '../../context/Login/AuthContext';
import profile from '../../img/profile.png';
import api from '../../utils/Api';

export default function Profile() {
  const { logout, user, updateUser } = useContext(AuthContext);
  const [nascimento] = useState(format(new Date(user?.nascimento), 'dd/MM/yyyy'));
  const [editedUser, setEditedUser] = useState({});
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const toast = useRef(null);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [initialRender, setInitialRender] = useState(false);
  const [matched, setMatched] = useState(false);

  const showWarn = (msg) => {
    toast.current.show({
      severity: 'warn', summary: 'Aviso', detail: msg, life: 3000,
    });
  };

  const showSuccess = (msg) => {
    toast.current.show({
      severity: 'success', summary: 'Concluído', detail: msg, life: 3000,
    });
  };

  const showError = (msg) => {
    toast.current.show({
      severity: 'error', summary: 'Erro', detail: msg, life: 3000,
    });
  };

  const onPasswordChange = (e) => {
    if (e.target.name === 'senhaAtual') {
      setPassword(e.target.value);
    } else if (e.target.name === 'senhaNova') {
      setNewPassword(e.target.value);
    } else if (e.target.name === 'confirmaSenha') {
      setConfirmation(e.target.value);
    }
  };

  const passwordMatch = async () => {
    const email = user?.email;
    const senha = password;
    try {
      const response = await api.post('/login/adm', { email, senha });
      const req = response.data;
      setMatched(req.status);
      setInitialRender(Math.random());
    } catch (error) {
      showError('Não foi possível se comunicar com o backend');
    }
  };

  const passwordSubmit = () => {
    passwordMatch();
  };

  useEffect(() => {
    if (initialRender !== false) {
      if (password !== '' && newPassword !== '' && confirmation !== '') {
        if (matched === true) {
          if (confirmation === newPassword) {
            const senha = newPassword;
            try {
              api.put(`/user/change-password/${user?.id}`, { senha });
              showSuccess('A senha foi alterada com sucesso!');
              setTimeout(() => {
                logout();
              }, 2000);
            } catch (error) {
              showError('Não foi possível alterar a senha.');
            }
          } else {
            showWarn('A nova senha não confere.');
          }
        } else {
          showWarn('A senha atual não confere');
        }
      } else {
        showWarn('Nenhum campo pode ficar vazio!');
      }
    }
  }, [initialRender]);

  const onChange = (e) => {
    if (e.target.name === 'nascimento') {
      const formatedDate = format(new Date(e.target.value), 'yyyy-MM-dd');
      setEditedUser({ ...editedUser, nascimento: formatedDate });
    } else {
      setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    }
  };

  const checkField = (object) => {
    if (object.nome === '' || object.nascimento === '' || object.email === '' || object.ramal === '' || object.cracha === '') {
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    try {
      if (checkField(editedUser) === true) {
        await api.put(`/user/${user?.id}`, { ...editedUser });
        showSuccess('Editado com sucesso!');
        setTimeout(() => {
          updateUser();
        }, 2000);
      } else {
        showWarn('Um ou mais campos estão vazios');
      }
    } catch (error) {
      showError('Erro ao editar Perfil.');
    }
  };

  return (
    <div className="flex-column" style={{ marginTop: '2%' }}>
      <Toast ref={toast} />
      <div className="flex justify-content-center">
        <img src={profile} alt="perfil" style={{ maxWidth: '10vw' }} />
      </div>
      <div className="flex justify-content-center">
        <div className="flex-column card" style={{ minWidth: '30vw', boxShadow: '0 0px 5px 1px #471956' }}>
          <h3>
            Nome
          </h3>
          <h4 style={{ marginTop: '-1vh' }}>{user?.nome}</h4>
          <h3>Data de nascimento</h3>
          <h4 style={{ marginTop: '-1vh' }}>{nascimento}</h4>
          <h3>Email</h3>
          <h4 style={{ marginTop: '-1vh' }}>{user?.email}</h4>
          <h3>Crachá</h3>
          <h4 style={{ marginTop: '-1vh' }}>{user?.cracha}</h4>
          <h3>Ramal</h3>
          <h4 style={{ marginTop: '-1vh' }}>{user?.ramal}</h4>
          <div className="flex gap-1" style={{ justifyContent: 'flex-end' }}>
            <Button label="Alterar senha" onClick={() => setVisible2(true)} />
            <Button label="Editar perfil" onClick={() => setVisible(true)} />
          </div>
        </div>
      </div>
      <div>
        <Dialog visible={visible2} header="Alterar senha" onHide={() => setVisible2(false)} className="flex-column" style={{ minWidth: '23vw' }}>
          <div>
            <h3>Senha atual</h3>
            <div className="p-inputgroup">
              <Password name="senhaAtual" onChange={(e) => onPasswordChange(e)} feedback={false} />
            </div>
          </div>
          <div>
            <h3>Nova senha</h3>
            <div className="p-inputgroup">
              <Password name="senhaNova" onChange={(e) => onPasswordChange(e)} />
            </div>
          </div>
          <div>
            <h3>Confirme a nova senha</h3>
            <div className="p-inputgroup">
              <Password name="confirmaSenha" onChange={(e) => onPasswordChange(e)} feedback={false} />
            </div>
          </div>
          <div className="flex gap-3" style={{ marginTop: '4vh', justifyContent: 'flex-end' }}>
            <Button label="Alterar senha" onClick={passwordSubmit} />
          </div>
        </Dialog>
      </div>
      <div>
        <Dialog visible={visible} header="Editar perfil" onHide={() => setVisible(false)}>
          <div className="flex gap-5">
            <div>
              <h3>Nome</h3>
              <InputText name="nome" onChange={(e) => onChange(e)} defaultValue={user?.nome} />
            </div>
            <div>
              <h3>Data de Nascimento</h3>
              <Calendar name="nascimento" mask="99-99-9999" onChange={(e) => onChange(e)} placeholder={nascimento} />
            </div>
          </div>
          <div className="flex gap-5">
            <div>
              <h3>Email</h3>
              <InputText name="email" onChange={(e) => onChange(e)} defaultValue={user?.email} />
            </div>
            <div>
              <h3>Crachá</h3>
              <InputText name="cracha" onChange={(e) => onChange(e)} defaultValue={user?.cracha} />
            </div>
          </div>
          <div className="flex gap-5">
            <div>
              <h3>Ramal</h3>
              <InputText name="ramal" mask="452103-9999" onChange={(e) => onChange(e)} defaultValue={user?.ramal} />
            </div>
            <div style={{
              display: 'flex', width: '100%', alignItems: 'flex-end', justifyContent: 'end',
            }}
            >
              <div>
                <Button label="Editar perfil" onClick={() => onSubmit()} />
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
