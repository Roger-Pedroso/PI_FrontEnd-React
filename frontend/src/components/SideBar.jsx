import React from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import logo from '../img/logo.jpg';

export default function SideBar() {
  const items = [
    {
      label: 'Administradores',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Criar',
          icon: 'pi pi-fw pi-plus',
          url: '/admin/cadastrar',
        },
        {
          label: 'Listar',
          icon: 'pi pi-fw pi-list',
        },
      ],
    },
    {
      label: 'Usuários',
      icon: 'pi pi-users',
      items: [
        {
          label: 'Criar',
          icon: 'pi pi-fw pi-plus',
          url: '/supervisor/cadastrar',
        },
        {
          label: 'Listar',
          icon: 'pi pi-fw pi-list',
          url: '/supervisor',
        },
      ],
    },
    {
      label: 'Questionários',
      icon: 'pi pi-fw pi-question',
      items: [
        {
          label: 'Listar',
          icon: 'pi pi-fw pi-list',
        },
        {
          label: 'Enviados',
          icon: 'pi pi-fw pi-send',
        },
      ],
    },
    {
      label: 'Areas',
      icon: 'pi pi-fw pi-th-large',
      items: [
        {
          label: 'Cadastrar',
          icon: 'pi pi-fw pi-plus',
          url: '/area/cadastrar',
        },
        {
          label: 'Listar',
          icon: 'pi pi-fw pi-list',
          url: '/area',
        },
      ],
    },
    {
      label: 'Relatórios',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'Criar',
          icon: 'pi pi-fw pi-plus',
        },
        {
          label: 'Listar',
          icon: 'pi pi-fw pi-list',
        },
        {
          label: 'Exportar',
          icon: 'pi pi-fw pi-file-export',
        },
      ],
    },
  ];

  return (
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        justifyContent: 'center',
      }}
      >
        <div style={{ display: 'flex' }}>
          <img src={logo} alt="" style={{ height: '100px' }} />
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
