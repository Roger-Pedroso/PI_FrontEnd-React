import React, { createContext, useMemo, useState } from 'react';

const AnswersContext = createContext();

function AnswersProvider({ children }) {
  const [form, setForm] = useState([{
    nome: '',
    exemplo: '',
  }]);

  const memo = useMemo(() => ({
    form,
    setForm,
  }), [form, setForm]);

  return (
    <AnswersContext.Provider value={memo}>
      {children}
    </AnswersContext.Provider>
  );
}

export { AnswersContext, AnswersProvider };
