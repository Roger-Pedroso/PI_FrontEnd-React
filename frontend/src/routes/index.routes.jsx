/* eslint-disable linebreak-style */
import React, { useContext } from 'react';
import PublicRoutes from './public.routes';
import PrivateRoutes from './private.routes';
import { AuthContext } from '../context/Login/AuthContext';

function AllRoutes() {
  const { authenticated } = useContext(AuthContext);

  return authenticated ? <PrivateRoutes /> : <PublicRoutes />;
}

export default AllRoutes;
