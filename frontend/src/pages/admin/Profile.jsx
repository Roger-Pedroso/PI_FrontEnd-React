import React, { useContext, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { format } from 'date-fns';
import { Toast } from 'primereact/toast';
import { AuthContext } from '../../context/Login/AuthContext';
import profile from '../../img/profile.png';
import api from '../../utils/Api';

export default function Profile() {
  const { user, updateUser } = useContext(AuthContext);
  const [nascimento] = useState(format(new Date(user?.nascimento), 'dd/MM/yyyy'));
  const [editedUser, setEditedUser] = useState({});
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);

  const showWarn = () => {
    toast.current.show({
      severity: 'warn', summary: 'Aviso', detail: 'Um ou mais campos estão vazios', life: 3000,
    });
  };

  const showSuccess = () => {
    toast.current.show({
      severity: 'success', summary: 'Concluído', detail: 'Editado com sucesso!', life: 3000,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: 'error', summary: 'Erro', detail: 'Erro ao editar Perfil.', life: 3000,
    });
  };

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
        updateUser();
        showSuccess();
      } else {
        showWarn();
      }
    } catch (error) {
      showError();
    }
  };

  return (
    <div className="flex-column" style={{ marginTop: '10%' }}>
      <Toast ref={toast} />
      <div className="flex justify-content-center align-items-center">
        <img src={profile} alt="" style={{ width: '300px' }} />
        <div
          className="flex-column"
          style={{
            backgroundColor: '#c4c4c4', borderRadius: '10px', marginLeft: '40px', padding: '35px',
          }}
        >
          <div className="flex gap-5" style={{ marginBottom: '50px', justifyContent: 'space-between' }}>
            <div>
              <h3>Nome</h3>
              <div style={{
                maxWidth: '1px', minWidth: '200px', backgroundColor: '#dedede', padding: '1px', borderRadius: '5px',
              }}
              >
                <h3 style={{ margin: '10px' }}>{user?.nome}</h3>
              </div>
            </div>
            <div>
              <h3>Data de nascimento</h3>
              <div
                style={{
                  maxWidth: '1px', minWidth: '200px', backgroundColor: '#dedede', padding: '1px', borderRadius: '5px',
                }}
              >
                <h3 style={{ margin: '10px' }}>{nascimento}</h3>
              </div>
            </div>
          </div>
          <div className="flex gap-5" style={{ marginBottom: '50px', justifyContent: 'space-between' }}>
            <div>
              <h3>Email</h3>
              <div
                style={{
                  minWidth: '200px', backgroundColor: '#dedede', padding: '1px', borderRadius: '5px',
                }}
              >
                <h3 style={{ margin: '10px' }}>{user?.email}</h3>
              </div>
            </div>
            <div>
              <h3>Crachá</h3>
              <div style={{
                maxWidth: '1px', minWidth: '200px', backgroundColor: '#dedede', padding: '1px', borderRadius: '5px',
              }}
              >
                <h3 style={{ margin: '10px' }}>{user?.cracha}</h3>
              </div>
            </div>
          </div>
          <div className="flex gap-5" style={{ marginBottom: '50px', justifyContent: 'space-between' }}>
            <div>
              <h3>Ramal</h3>
              <div style={{
                maxWidth: '1px', minWidth: '200px', backgroundColor: '#dedede', padding: '1px', borderRadius: '5px',
              }}
              >
                <h3 style={{ margin: '10px' }}>{user?.ramal}</h3>
              </div>
            </div>
          </div>
          <div className="flex justify-content-end gap-2" style={{ marginTop: '50px' }}>
            <Button label="Alterar senha" />
            <Button label="Editar perfil" onClick={() => setVisible(true)} />
          </div>
        </div>
      </div>
      <div>
        <Dialog visible={visible} header="Edição de perfil" onHide={() => setVisible(false)}>
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
                <Button label="Confirmar" onClick={() => onSubmit()} />
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
