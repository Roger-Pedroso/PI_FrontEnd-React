import React, { useEffect, useState } from 'react';

export default function QuestionsME(question) {
  const [targetQuestion, setTargetQuestion] = useState(question);

  useEffect(() => {
    setTargetQuestion(question);
  }, []);

  return (
    <div>
      <h2>{targetQuestion.question.nome_campo}</h2>
    </div>
  );
}
