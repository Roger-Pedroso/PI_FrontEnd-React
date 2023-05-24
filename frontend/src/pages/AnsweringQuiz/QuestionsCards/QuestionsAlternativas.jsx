/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';

export default function QuestionsAlternativas(item) {
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
