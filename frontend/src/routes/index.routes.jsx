/* eslint-disable linebreak-style */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import CreateAdmin from '../pages/admin/CreateAdmin';
import LoginUser from '../pages/login/usuario/UserLogin';
import LoginRecovery from '../pages/login/recuperar/Recovery';
import LoginAdmin from '../pages/login/admin/AdminLogin';
import CreateSuperior from '../pages/superior/CreateSuperior';
import ListSuperior from '../pages/superior/ListSuperior';
import ListArea from '../pages/area/ListArea';
import CreateArea from '../pages/area/CreateArea';
import CreateQuestions from '../pages/quizes/CreateQuestions';
import CreateQuiz from '../pages/quizes/CreateQuiz';
import ListAdmin from '../pages/admin/ListaAdministrador';
import QuestionsList from '../pages/quizes/QuestionsList';
import QuizesList from '../pages/quizes/QuizesList';
import SendQuiz from '../pages/quizes/SendQuiz';

function AllRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginUser />} />
      <Route path="login/admin" element={<LoginAdmin />} />
      <Route path="recuperar" element={<LoginRecovery />} />
      <Route path="/" element={<App />}>
        <Route path="admin/cadastrar" element={<CreateAdmin />} />
        <Route path="admin" element={<ListAdmin />} />
        <Route path="supervisor/cadastrar" element={<CreateSuperior />} />
        <Route path="supervisor" element={<ListSuperior />} />
        <Route path="area" element={<ListArea />} />
        <Route path="area/cadastrar" element={<CreateArea />} />
        <Route path="quizes/CreateQuestions" element={<CreateQuestions />} />
        <Route path="quizes/CreateQuestions/:id" element={<CreateQuestions />} />
        <Route path="quizes/CreateQuiz" element={<CreateQuiz />} />
        <Route path="quizes/QuestionsList" element={<QuestionsList />} />
        <Route path="quizes/QuizesList" element={<QuizesList />} />
        <Route path="quizes/CreateQuiz/:id" element={<CreateQuiz />} />
        <Route path="quizes/SendQuiz/:id" element={<SendQuiz />} />

      </Route>
    </Routes>
  );
}

export default AllRoutes;
