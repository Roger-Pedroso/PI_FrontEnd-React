import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import CadastroAdmin from '../pages/admin/Cadastro';
import LoginUser from '../pages/login/usuario/Login';
import LoginRecovery from '../pages/login/recuperar/Recovery';
import LoginAdmin from '../pages/login/admin/Login';

function AllRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginUser />} />
      <Route path="login/adm" element={<LoginAdmin />} />
      <Route path="login/rec" element={<LoginRecovery />} />
      <Route path="/" element={<App />}>
        <Route path="admin/cad" element={<CadastroAdmin />} />
      </Route>
    </Routes>
  );
}

export default AllRoutes;
