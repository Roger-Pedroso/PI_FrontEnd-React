import React from 'react';

import General from './General';

function AppProvider({ children }) {
  return (
    <General>
      {children}
    </General>
  );
}

export default AppProvider;
