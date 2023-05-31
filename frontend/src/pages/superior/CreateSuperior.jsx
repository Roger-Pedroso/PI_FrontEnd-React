/* eslint-disable linebreak-style */
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import api from '../../utils/Api';
import Spans from '../../components/Spans';

export default function CreateSuperior() {
  const [superior, setSuperior] = useState({
    nome: '',
    cracha: '',
    cargo: '',
    email: '',
  });
  const navigate = useNavigate();
  const [selectedArea, setSelectedArea] = useState(null);
  const [areas, setAreas] = useState([]);
  const toast = useRef(null);

  const showWarn = () => {
    toast.current.show({
      severity: 'warn', summary: 'Aviso', detail: 'Um ou mais campos estão vazios.', life: 3000,
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

  const findAreas = async () => {
    const data = await api.get('/sector');
    setAreas(data.data);
  };

  useEffect(() => {
    if (areas.length === 0) {
      findAreas();
    }
  }, [areas]);

  const onChange = (e) => {
    setSuperior({ ...superior, [e.target.name]: e.target.value });
  };

  const checkInput = (object) => {
    if (object.nome === '' || object.cargo === '' || object.cracha === '' || object.email === '') {
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    setSuperior({ ...superior, idSector: selectedArea.id });
    try {
      if (checkInput(superior) === true) {
        await api.post('/superior', { ...superior });
        showSuccess('Superior imediato criado com sucesso!');
        setTimeout(() => {
          navigate('/app/superior');
        }, 2000);
      } else {
        showWarn();
      }
    } catch (error) {
      showError('Ocorreu um erro ao se comunicar com o backend.');
    }
  };

  const superiorRoute = () => {
    navigate('/app/superior');
  };
  return (
    <div>
      <div style={{ textAlign: 'center' }}><h1>Cadastrar Superior Imediato</h1></div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '60px' }}>
        <div style={{ width: '60%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="p-inputgroup">
              <Spans icon="pi pi-user" />
              <InputText name="nome" onChange={(e) => { onChange(e); }} id="name" placeholder="Nome completo" />
            </div>

            <div className="p-inputgroup">
              <Spans icon="pi pi-tag" />
              <InputText
                type="number"
                placeholder="Crachá"
                name="cracha"
                onChange={(e) => { onChange(e); }}
              />
            </div>

            <div className="p-inputgroup">
              <Spans icon="pi pi-briefcase" />
              <InputText name="cargo" onChange={(e) => { onChange(e); }} placeholder="Cargo" />
            </div>

            <div className="p-inputgroup">
              <Spans icon="pi pi-inbox" />
              <InputText
                type="email"
                placeholder="Email"
                useGrouping={false}
                name="email"
                onChange={(e) => { onChange(e); }}
              />
            </div>

            <div className="p-inputgroup">
              <Spans icon="pi pi-table" />
              <Dropdown
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                options={areas}
                optionLabel="nome"
                placeholder="Selecione uma área"
                className="w-full md:w-14rem"
              />
            </div>

          </div>

          <div
            className="flex justify-content-end gap-3"
            style={{
              marginTop: '20px',
            }}
          >
            <Button label="Cancelar" onClick={superiorRoute} />
            <Button label="Confirmar" onClick={onSubmit} />
          </div>
        </div>
      </div>
      <div>
        <Toast ref={toast} />
      </div>
    </div>
  );
}
