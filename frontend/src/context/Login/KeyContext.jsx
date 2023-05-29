import React, { createContext, useMemo, useState } from 'react';

const KeyContext = createContext();

function KeyProvider({ children }) {
  const [key, setKey] = useState({});
  const [answer, setAnswer] = useState();

  const memo = useMemo(() => ({
    key,
    setKey,
    answer,
    setAnswer,
  }), [key, setKey, answer, setAnswer]);

  return (
    <KeyContext.Provider value={memo}>
      {children}
    </KeyContext.Provider>
  );
}

export { KeyContext, KeyProvider };
