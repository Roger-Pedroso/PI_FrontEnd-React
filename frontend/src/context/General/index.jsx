import React from 'react';

import DataRegister from './DataRegister';

function AppProviderGeneral({ children }) {
  return (
    <DataRegister>
      {children}
    </DataRegister>
  );
}

export default AppProviderGeneral;
