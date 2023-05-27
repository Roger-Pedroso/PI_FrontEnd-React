/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';

export default function QuestionsOpen(item) {
  const [targetQuestion, setTargetQuestion] = useState(item.item);
  const [description, setDescription] = useState();
  useEffect(() => {
    if (targetQuestion === null) {
      setTargetQuestion(item.item);
    }
  }, [targetQuestion]);

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
            <i>Aberta</i>
          </p>
        </div>
        <h2>{targetQuestion.nome_campo}</h2>
        <p><i>{targetQuestion.descricao}</i></p>
        <InputTextarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          cols={80}
        />
      </div>
    </div>
  );
}
