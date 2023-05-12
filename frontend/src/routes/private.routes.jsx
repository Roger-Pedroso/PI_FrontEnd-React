import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ListaAdministrador from '../pages/admin/ListaAdministrador';
import CreateSuperior from '../pages/superior/CreateSuperior';
import ListSuperior from '../pages/superior/ListSuperior';
import ListArea from '../pages/area/ListArea';
import CreateArea from '../pages/area/CreateArea';
import CreateQuestions from '../pages/quizes/CreateQuestions';
import CreateQuiz from '../pages/quizes/CreateQuiz';
import QuestionsList from '../pages/quizes/QuestionsList';
import QuizesList from '../pages/quizes/QuizesList';
import SendQuiz from '../pages/quizes/SendQuiz';
import CreateAdmin from '../pages/admin/CreateAdmin';
import App from '../App';

export default function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="admin/cadastrar" element={<CreateAdmin />} />
        <Route path="admin" element={<ListaAdministrador />} />
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
