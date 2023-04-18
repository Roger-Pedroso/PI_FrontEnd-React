/* eslint-disable linebreak-style */
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useState } from 'react';
import api from '../../utils/Api';

export default function CreateSuperior() {
  const [superior, setSuperior] = useState({
    nome: '',
    cracha: '',
    cargo: '',
    email: '',
  });

  const [selectedArea, setSelectedArea] = useState(null);
  const [areas, setAreas] = useState([]);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    await api.post('/superior', { superior });
  };

  return (
    <div>
      <div style={{ textAlign: 'center' }}><h1>Cadastrar Superior Imediato</h1></div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '60px' }}>
        <form onSubmit={(e) => { onSubmit(e); }} style={{ width: '60%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user" />
              </span>
              <InputText name="nome" onChange={(e) => { onChange(e); }} id="name" placeholder="Nome completo" />
            </div>

            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-tag" />
              </span>
              <InputText
                type="number"
                placeholder="Crachá"
                name="cracha"
                onChange={(e) => { onChange(e); }}
              />
            </div>

            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-inbox" />
              </span>
              <InputText name="cargo" onChange={(e) => { onChange(e); }} placeholder="Cargo" />
            </div>

            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-tag" />
              </span>
              <InputText
                type="email"
                placeholder="Email"
                useGrouping={false}
                name="email"
                onChange={(e) => { onChange(e); }}
              />
            </div>

            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-tag" />
              </span>
              <Dropdown
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.value)}
                options={areas}
                optionLabel="name"
                placeholder="Select a City"
                className="w-full md:w-14rem"
              />
            </div>

          </div>

          <div style={{
            marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px',
          }}
          >
            <Button label="Cancelar" />
            <Button label="Confirmar" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
