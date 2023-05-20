import React, { useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { AuthContext } from '../../context/Login/AuthContext';
import profile from '../../img/profile.png';

export default function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex-column" style={{ marginTop: '10%' }}>
      <div className="flex justify-content-center align-items-center">
        <img src={profile} alt="" style={{ width: '300px' }} />
        <div
          className="flex-column"
          style={{
            backgroundColor: '#c4c4c4', borderRadius: '10px', marginLeft: '40px', padding: '35px',
          }}
        >
          <div className="flex justify-content-center" style={{ marginBottom: '15px' }}>
            <h1>
              {user?.nome}
            </h1>
          </div>
          <div className="flex gap-5" style={{ marginBottom: '50px' }}>
            <div className="flex gap-1">
              <InputText
                placeholder="Crachá"
                type="number"
                name="cracha"
                readOnly
              />
              <Button icon="pi pi-pencil" style={{ backgroundColor: 'white' }} />
            </div>
            <div className="flex gap-1">
              <InputText
                placeholder="Crachá"
                type="number"
                name="cracha"
                readOnly
              />
              <Button icon="pi pi-pencil" style={{ backgroundColor: 'white' }} />
            </div>
          </div>
          <div className="flex gap-5" style={{ marginBottom: '50px' }}>
            <div className="flex gap-1">
              <InputText
                placeholder="Crachá"
                type="number"
                name="cracha"
                readOnly
              />
              <Button icon="pi pi-pencil" style={{ backgroundColor: 'white' }} />
            </div>
            <div className="flex gap-1">
              <InputText
                placeholder="Crachá"
                type="number"
                name="cracha"
                readOnly
              />
              <Button icon="pi pi-pencil" style={{ backgroundColor: 'white' }} />
            </div>
          </div>
          <div className="flex gap-5" style={{ marginBottom: '50px' }}>
            <div className="flex gap-1">
              <InputText
                placeholder="Crachá"
                type="number"
                name="cracha"
                readOnly
              />
              <Button icon="pi pi-pencil" style={{ backgroundColor: 'white' }} />
            </div>
          </div>
          <div className="flex justify-content-end gap-2" style={{ marginTop: '50px' }}>
            <Button label="Alterar senha" />
            <Button label="Salvar" />
          </div>
        </div>
      </div>
    </div>
  );
}
