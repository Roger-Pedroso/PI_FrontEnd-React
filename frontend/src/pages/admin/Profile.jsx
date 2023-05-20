import React, { useContext } from 'react';
import { Button } from 'primereact/button';
import moment from 'moment';
import { AuthContext } from '../../context/Login/AuthContext';
import profile from '../../img/profile.png';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const data = moment(user?.data).format('DD/MM/YYYY');
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
                <h3 style={{ margin: '10px' }}>{data}</h3>
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
            <Button label="Editar perfil" />
          </div>
        </div>
      </div>
    </div>
  );
}
