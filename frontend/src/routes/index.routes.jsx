/* eslint-disable linebreak-style */
import React from 'react';
import PublicRoutes from './public.routes';
import PrivateRoutes from './private.routes';

function AllRoutes() {
  if (sessionStorage.getItem('isLoggedKey') === true) {
    return <PrivateRoutes />;
  }
  return <PublicRoutes />;

  // return sessionStorage.getItem('isLoggedKey') ? <PrivateRoutes /> : <PublicRoutes />;
}

export default AllRoutes;
