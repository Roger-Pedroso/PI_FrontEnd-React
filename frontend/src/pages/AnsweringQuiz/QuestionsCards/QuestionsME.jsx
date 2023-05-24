/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';

export default function QuestionsME(item) {
  const [targetQuestion, setTargetQuestion] = useState(item.item);
  useEffect(() => {
    if (targetQuestion === null) {
      setTargetQuestion(item.item);
    }
  }, [targetQuestion]);

  return (
    <div>
      <h2>{targetQuestion.nome_campo}</h2>
    </div>
  );
}
