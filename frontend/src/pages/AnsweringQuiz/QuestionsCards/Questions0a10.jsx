/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { Rating } from 'primereact/rating';

export default function Questions0a10(item) {
  const [targetQuestion, setTargetQuestion] = useState(item.item);
  useEffect(() => {
    if (targetQuestion === null) {
      setTargetQuestion(item.item);
    }
  }, [targetQuestion]);

  const [value, setValue] = useState(null);
  return (
    <div style={{ margin: '130px' }}>
      <div>
        <h2>{targetQuestion.nome_campo}</h2>
        <p><i>descrição</i></p>
        <Rating
          value={value}
          onChange={(e) => setValue(e.value)}
          stars={10}
          cancel={false}
        />
        <p>
          Nota:
          {' '}
          {value}
        </p>
      </div>
    </div>
  );
}
