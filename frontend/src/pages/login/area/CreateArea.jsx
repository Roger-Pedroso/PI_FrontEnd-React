import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { InputSwitch } from 'primereact/inputswitch';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/Api';

export default function CreateArea() {
  const navigate = useNavigate();
  const [area, setArea] = useState({ nome: '', tipo: '' });
  const [status, setStatus] = useState(true);

  const onChange = (e) => {
    setArea({ ...area, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    const areaParsed = { ...area, status: status ? 'Ativo' : 'Inativo' };

    e.preventDefault();
    await api.post('/sector', { ...areaParsed });

    navigate('/area');
  };

  const backToList = () => {
    navigate('/area');
  };
  return (
    <div>
      <div className="flex justify-content-center">
        <h1>Cadastro de Área</h1>
      </div>

      <div className="flex justify-content-center mt-5">
        {/* <form onSubmit={(e) => { onSubmit(e); }}> */}
        <div className="flex flex-column gap-3" style={{ width: '50%' }}>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user" />
            </span>
            <InputText name="nome" onChange={(e) => { onChange(e); }} id="nome" placeholder="Nome da Área" />
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user" />
            </span>
            <InputText name="tipo" onChange={(e) => { onChange(e); }} id="tipo" placeholder="Tipo" />
          </div>
          <div className="p-inputgroup flex align-items-center">
            <span className="p-inputgroup-addon mr-3">
              Status
            </span>
            <InputSwitch checked={status} onChange={(e) => setStatus(e.value)} />
          </div>

          <div id="cad_button">
            <Button label="Cancelar" onClick={backToList} />
            <Button label="Enviar" type="button" onClick={onSubmit} />
          </div>

        </div>
        {/* </form> */}

      </div>
    </div>
  );
}
