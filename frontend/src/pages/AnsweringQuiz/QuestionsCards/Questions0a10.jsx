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
    <div style={{ width: '100%' }}>
      <div
        className="card flex"
        style={{
          flexDirection: 'column', alignItems: 'center', border: '2px solid black', backgroundColor: 'white', boxShadow: '10px 10px 10px purple',
        }}
      >
        <div style={{ width: '100%', margin: '-10px' }}>
          <p style={{ margin: '-8px', fontSize: '12px' }}>
            <b>
              {targetQuestion.obrigatorio === 'false' ? '*Opcional' : '*Obrigatório'}
            </b>
          </p>
          <p style={{ textAlign: 'end' }}>
            <b>Tipo: </b>
            <i>0 à 10</i>
          </p>
        </div>
        <h2>{targetQuestion.nome_campo}</h2>
        <p><i>{targetQuestion.descricao}</i></p>
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
