import React from 'react';
import { Routes, Route } from 'react-router-dom';

import App from '../App';
import Admin from '../pages/admin/Admin';

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default AllRoutes;
