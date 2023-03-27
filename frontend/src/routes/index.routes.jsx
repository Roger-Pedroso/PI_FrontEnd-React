import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Route, Routes } from 'react-router-dom';

import App from '../App';

function AllRoutes() {
  return (
    <Routes>
      <Route path="/teste" element={<App />} />
    </Routes>
  );
}

export default AllRoutes;
