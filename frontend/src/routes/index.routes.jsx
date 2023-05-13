/* eslint-disable linebreak-style */
import React from 'react';
import PublicRoutes from './public.routes';
import PrivateRoutes from './private.routes';

function AllRoutes() {
  const aux = false;
  // const aux = sessionStorage.getItem('isLoggedKey') === 'logado';
  return aux ? <PrivateRoutes /> : <PublicRoutes />;
}

export default AllRoutes;
