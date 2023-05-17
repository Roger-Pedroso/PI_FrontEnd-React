import React, { useContext } from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo.jpg';
import { AuthContext } from '../context/Login/AuthContext';

export default function SideBar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const items = [
    {
      label: 'Administradores',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Cadastrar',
          icon: 'pi pi-fw pi-plus',
          url: '/admin/cadastrar',
        },
        {
          label: 'Listar',
          icon: 'pi pi-fw pi-list',
          url: '/admin',
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
          url: '/supervisor/cadastrar',
        },
        {
          label: 'Listar Superior',
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
          label: 'Cadastrar Questões',
          icon: 'pi pi-fw pi-plus',
          url: '/quizes/CreateQuestions',
        },
        {
          label: 'Listar Questões',
          icon: 'pi pi-fw pi-list',
          url: '/quizes/QuestionsList',
        },
        {
          label: 'Criar Modelo de Questionário',
          icon: 'pi pi-fw pi-plus',
          url: '/quizes/CreateQuiz',
        },
        {
          label: 'Listar Modelo de Questionário',
          icon: 'pi pi-fw pi-list',
          url: '/quizes/QuizesList',
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
          label: 'Abrir Relatório',
          icon: 'pi pi-fw pi-plus',
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={logo} alt="" style={{ height: '100px' }} />
          <div
            className="flex"

          >
            <Button
              style={{
                borderRadius: '5px', backgroundColor: '#9c27b0', color: 'white', padding: '10px', gap: '10px',
              }}
              icon="pi pi-user"
              onClick={() => navigate('/profile')}
            >
              {user?.nome}
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
