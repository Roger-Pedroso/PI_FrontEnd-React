import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ListAdmin from '../pages/admin/ListAdmin';
import CreateSuperior from '../pages/superior/CreateSuperior';
import ListSuperior from '../pages/superior/ListSuperior';
import ListSector from '../pages/sector/ListSector';
import CreateSector from '../pages/sector/CreateSector';
import CreateQuestions from '../pages/quizes/CreateQuestions';
import CreateQuiz from '../pages/quizes/CreateQuiz';
import QuestionsList from '../pages/quizes/QuestionsList';
import QuizesList from '../pages/quizes/QuizesList';
import SendQuiz from '../pages/quizes/SendQuiz';
import CreateAdmin from '../pages/admin/CreateAdmin';
import Profile from '../pages/admin/Profile';
import AnsweringQuiz from '../pages/AnsweringQuiz/AnsweringQuiz';
import App from '../App';

export default function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/app" element={<App />}>
        <Route path="admin/new" element={<CreateAdmin />} />
        <Route path="admin" element={<ListAdmin />} />
        <Route path="profile" element={<Profile />} />
        <Route path="superior/new" element={<CreateSuperior />} />
        <Route path="superior" element={<ListSuperior />} />
        <Route path="sector" element={<ListSector />} />
        <Route path="sector/new" element={<CreateSector />} />
        <Route path="questions/new" element={<CreateQuestions />} />
        <Route path="questions/new/:id" element={<CreateQuestions />} />
        <Route path="quizes/new" element={<CreateQuiz />} />
        <Route path="questions" element={<QuestionsList />} />
        <Route path="quizes" element={<QuizesList />} />
        <Route path="quizes/new/:id" element={<CreateQuiz />} />
        <Route path="quizes/send/:id" element={<SendQuiz />} />
        <Route path="quizes/answer/:id" element={<AnsweringQuiz />} />
      </Route>
    </Routes>
  );
}
