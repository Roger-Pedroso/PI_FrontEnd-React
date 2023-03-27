import React, { createContext, useContext, useState } from 'react';

const DataRegisterContext = createContext();

export default function DataRegisterProvider({ children }) {
  const [teste, setTeste] = useState('A');

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <DataRegisterContext.Provider value={{ teste, setTeste }}>
      {children}
    </DataRegisterContext.Provider>
  );
}

export function useLoadingData() {
  const context = useContext(DataRegisterContext);

  if (!context) throw new Error('useLoadingData must be used within a LoadingDataProvider');
}
