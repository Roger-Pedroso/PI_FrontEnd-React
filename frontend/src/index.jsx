/* eslint-disable linebreak-style */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './context';
import AuthProvider from './context/Login/AuthContext';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './theme.css';
import './index.css';

import AllRoutes from './routes/index.routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <AllRoutes />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
