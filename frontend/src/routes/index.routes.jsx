import React, { useContext } from 'react';
import PublicRoutes from './public.routes';
import PrivateRoutes from './private.routes';
import { AuthContext } from '../context/Login/AuthContext';

function AllRoutes() {
  const { authenticated } = useContext(AuthContext);
  console.log(authenticated);
  const a = true;
  console.log(a);

  return authenticated ? <PrivateRoutes /> : <PublicRoutes />;
}

export default AllRoutes;
