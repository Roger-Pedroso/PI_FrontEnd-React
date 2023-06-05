/* eslint-disable linebreak-style */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './context';
import { AnswersProvider } from './context/AnswersContext';
import { AuthProvider } from './context/Login/AuthContext';
import { KeyProvider } from './context/Login/KeyContext';
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
        <AnswersProvider>
          <KeyProvider>
            <AppProvider>
              <AllRoutes />
            </AppProvider>
          </KeyProvider>
        </AnswersProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
