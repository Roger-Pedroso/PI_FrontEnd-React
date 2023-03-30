import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import CadastroAdmin from '../pages/admin/Cadastro';
import LoginUser from '../pages/login/usuario/Login';
import LoginRecovery from '../pages/login/recuperar/Recovery';
import LoginAdmin from '../pages/login/admin/Login';
import ListArea from '../pages/login/area/ListArea';
import CreateArea from '../pages/login/area/CreateArea';

function AllRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginUser />} />
      <Route path="login/admin" element={<LoginAdmin />} />
      <Route path="login/rec" element={<LoginRecovery />} />
      <Route path="/" element={<App />}>
        <Route path="admin/cadastrar" element={<CadastroAdmin />} />
        <Route path="area" element={<ListArea />} />
        <Route path="area/cadastrar" element={<CreateArea />} />
      </Route>
    </Routes>
  );
}

export default AllRoutes;
