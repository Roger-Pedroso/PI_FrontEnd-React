import React, { useContext } from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import logo from '../img/logo.jpg';
import { AuthContext } from '../context/Login/AuthContext';

export default function SideBar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const onConfirm = () => {
    logout();
    navigate('/');
  };
  const confirm = () => {
    confirmDialog({
      message: 'Tem certeza que quer sair?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: onConfirm,
    });
  };
  const items = [
    {
      label: 'Administradores',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Cadastrar',
          icon: 'pi pi-fw pi-plus',
          url: '/app/admin/new',
        },
        {
          label: 'Listar',
          icon: 'pi pi-fw pi-list',
          url: '/app/admin',
        },
      ],
    },
    {
      label: 'Superiores Imediatos',
      icon: 'pi pi-users',
      items: [
        {
          label: 'Cadastrar Superior',
          icon: 'pi pi-fw pi-plus',
          url: '/app/superior/new',
        },
        {
          label: 'Listar Superior',
          icon: 'pi pi-fw pi-list',
          url: '/app/superior',
        },
      ],
    },
    {
      label: 'Questionários',
      icon: 'pi pi-fw pi-question',
      items: [
        {
          label: 'Cadastrar Questões',
          icon: 'pi pi-fw pi-plus',
          url: '/app/questions/new',
        },
        {
          label: 'Listar Questões',
          icon: 'pi pi-fw pi-list',
          url: '/app/questions',
        },
        {
          label: 'Criar Modelo de Questionário',
          icon: 'pi pi-fw pi-plus',
          url: '/app/quizes/new',
        },
        {
          label: 'Listar Modelo de Questionário',
          icon: 'pi pi-fw pi-list',
          url: '/app/quizes',
        },
      ],
    },
    {
      label: 'Setores',
      icon: 'pi pi-fw pi-th-large',
      items: [
        {
          label: 'Cadastrar',
          icon: 'pi pi-fw pi-plus',
          url: '/app/sector/new',
        },
        {
          label: 'Listar',
          icon: 'pi pi-fw pi-list',
          url: '/app/sector',
        },
      ],
    },
    {
      label: 'Relatórios',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'Abrir Relatório',
          icon: 'pi pi-fw pi-plus',
        },
      ],
    },
  ];

  return (
    <div>
      <div><ConfirmDialog /></div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        justifyContent: 'center',
      }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={logo} alt="" style={{ height: '100px' }} />
          <div
            className="flex gap-3"
          >
            <Button
              icon="pi pi-times"
              onClick={confirm}
              style={{
                borderRadius: '5px', backgroundColor: '#9c27b0', color: 'white', padding: '10px', gap: '10px',
              }}
            >
              Logout

            </Button>
            <Button
              style={{
                borderRadius: '5px', backgroundColor: '#9c27b0', color: 'white', padding: '10px', gap: '10px',
              }}
              icon="pi pi-user"
              onClick={() => navigate('/app/profile')}
            >
              Perfil
            </Button>
          </div>
        </div>
        <div style={{ color: 'black' }}>
          <PanelMenu
            model={items}
          />
        </div>
      </div>
    </div>
  );
}
