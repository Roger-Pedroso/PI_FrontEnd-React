import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import AdminCad from '../pages/admin/CreateAdmin';
import LoginUser from '../pages/login/usuario/UserLogin';
import LoginRecovery from '../pages/login/recuperar/Recovery';
import LoginAdmin from '../pages/login/admin/AdminLogin';
import CreateSuperior from '../pages/superior/CreateSuperior';
import ListSuperior from '../pages/superior/ListSuperior';

function AllRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginUser />} />
      <Route path="login/adm" element={<LoginAdmin />} />
      <Route path="recovery" element={<LoginRecovery />} />
      <Route path="/" element={<App />}>
        <Route path="admin/add" element={<AdminCad />} />
        <Route path="superior/add" element={<CreateSuperior />} />
        <Route path="superior/list" element={<ListSuperior />} />
      </Route>
    </Routes>
  );
}

export default AllRoutes;
