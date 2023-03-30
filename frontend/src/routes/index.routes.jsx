import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import AdminCad from '../pages/admin/Cadastro';
import LoginUser from '../pages/login/usuario/Login';
import LoginRecovery from '../pages/login/recuperar/Recovery';
import LoginAdmin from '../pages/login/admin/Login';
import SetorCad from '../pages/setor/Cadastro';

function AllRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginUser />} />
      <Route path="login/admin" element={<LoginAdmin />} />
      <Route path="login/rec" element={<LoginRecovery />} />
      <Route path="/" element={<App />}>
        <Route path="admin/cad" element={<AdminCad />} />
        <Route path="setor/cad" element={<SetorCad />} />
      </Route>
    </Routes>
  );
}

export default AllRoutes;
