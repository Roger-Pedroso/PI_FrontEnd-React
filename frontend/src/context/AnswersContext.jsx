import React, { createContext, useMemo, useState } from 'react';

const AnswersContext = createContext();

function AnswersProvider({ children }) {
  const [answers, setAnswers] = useState([]);

  const memo = useMemo(() => ({
    answers,
    setAnswers,
  }), [answers, setAnswers]);

  return (
    <AnswersContext.Provider value={memo}>
      {children}
    </AnswersContext.Provider>
  );
}

export { AnswersContext, AnswersProvider };
