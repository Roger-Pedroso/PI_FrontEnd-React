import React, { useContext } from 'react';
import PublicRoutes from './public.routes';
import PrivateRoutes from './private.routes';
import { AuthContext } from '../context/Login/AuthContext';

function AllRoutes() {
  // eslint-disable-next-line no-unused-vars
  const { authenticated } = useContext(AuthContext);
  const a = true;
  console.log(a);

  return authenticated ? <PrivateRoutes /> : <PublicRoutes />;
}

export default AllRoutes;
