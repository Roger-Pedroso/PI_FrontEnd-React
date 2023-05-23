/* eslint-disable react/destructuring-assignment */
import React from 'react';

export default function QuestionsME(item) {
  console.log(item);
  return (
    <div>
      <h2>{item.nome_campo}</h2>
    </div>
  );
}
