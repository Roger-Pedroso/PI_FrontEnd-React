import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginUser from '../pages/login/usuario/UserLogin';
import LoginRecovery from '../pages/login/recuperar/Recovery';
import LoginAdmin from '../pages/login/admin/AdminLogin';

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginUser />} />
      <Route path="login" element={<LoginAdmin />} />
      <Route path="recovery" element={<LoginRecovery />} />
    </Routes>
  );
}
