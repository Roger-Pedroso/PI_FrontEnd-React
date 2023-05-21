import React, { useEffect, useState } from 'react';

export default function Questions0a10(question) {
  const [targetQuestion, setTargetQuestion] = useState({ question });

  useEffect(() => {
    setTargetQuestion(question);
  }, []);

  return (
    <div>
      <h2>{targetQuestion.question.nome_campo}</h2>
    </div>
  );
}
