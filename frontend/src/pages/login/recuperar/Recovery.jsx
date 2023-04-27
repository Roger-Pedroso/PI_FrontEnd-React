/* eslint-disable linebreak-style */
import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function Recovery() {
  return (

    <div className="flex justify-content-center align-items-center" style={{ width: '95vw', height: '95vh' }}>
      <div>
        <div>
          <h1 style={{ color: 'white' }}>Recuperação de senha</h1>
          <p style={{ color: 'white' }}>
            Se o email abaixo estiver cadastrado, uma mensagem contendo sua senha será enviada.
          </p>
        </div>

        <form action="">

          <div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-inbox" />
              </span>
              <InputText id="email" placeholder="Email" />
              <Button label="Enviar" style={{ backgroundColor: '#75298c' }} />
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
