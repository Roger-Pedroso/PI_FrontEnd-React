/* eslint-disable linebreak-style */
import React, { useContext } from 'react';
import { AuthContext } from '../context/Login/AuthContext';
import PublicRoutes from './public.routes';
import PrivateRoutes from './private.routes';

function AllRoutes() {
  const { isLogged } = useContext(AuthContext);
  return isLogged ? <PrivateRoutes /> : <PublicRoutes />;
}

export default AllRoutes;
