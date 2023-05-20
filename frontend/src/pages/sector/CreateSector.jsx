/* eslint-disable linebreak-style */
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { InputSwitch } from 'primereact/inputswitch';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spans from '../../components/Spans';
import api from '../../utils/Api';

export default function CreateSector() {
  const navigate = useNavigate();
  const [area, setArea] = useState({ nome: '', tipo: '' });
  const [status, setStatus] = useState(true);
  const toast = useRef(null);
  const onChange = (e) => {
    setArea({ ...area, [e.target.name]: e.target.value });
  };

  const checkInput = (object) => {
    if (object.nome === '' || object.tipo === '') {
      return false;
    }
    return true;
  };

  const showWarn = () => {
    toast.current.show({
      severity: 'warn', summary: 'Aviso', detail: 'Um ou mais campos estão vazios', life: 3000,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: 'error', summary: 'Erro', detail: 'Erro ao salvar área.', life: 3000,
    });
  };

  const showSuccess = () => {
    toast.current.show({
      severity: 'success', summary: 'Concluído', detail: 'Criado com sucesso!', life: 3000,
    });
  };

  const onSubmit = async () => {
    if (checkInput(area)) {
      try {
        const areaParsed = { ...area, status: status ? 'Ativo' : 'Inativo' };
        await api.post('/sector', { ...areaParsed });
        showSuccess();
        navigate('/area');
      } catch (error) {
        console.log(error);
        showError();
      }
    } else {
      showWarn();
    }
  };

  const backToList = () => {
    navigate('/app/sector');
  };
  return (
    <div>
      <div className="flex justify-content-center">
        <h1>Cadastro de Setor</h1>
      </div>

      <div className="flex justify-content-center mt-5">
        {/* <form onSubmit={(e) => { onSubmit(e); }}> */}
        <div className="flex flex-column gap-3" style={{ width: '50%' }}>

          <div className="p-inputgroup">
            <Spans icon="pi pi-user" />
            <InputText name="nome" onChange={(e) => { onChange(e); }} id="nome" placeholder="Nome do Setor" />
          </div>
          <div className="p-inputgroup">
            <Spans icon="pi pi-user" />
            <InputText name="tipo" onChange={(e) => { onChange(e); }} id="tipo" placeholder="Tipo" />
          </div>
          <div className="p-inputgroup flex align-items-center">
            <span className="p-inputgroup-addon mr-3">
              Status:
              {' '}
              {status ? 'Ativo' : 'Inativo'}
            </span>
            <InputSwitch checked={status} onChange={(e) => setStatus(e.value)} />
          </div>

          <div className="flex gap-3 justify-content-end">
            <Button label="Cancelar" onClick={backToList} />
            <Button label="Enviar" type="button" onClick={onSubmit} />
          </div>

        </div>
        {/* </form> */}

      </div>
      <div>
        <Toast ref={toast} />
      </div>
    </div>
  );
}
