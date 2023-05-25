/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';

export default function QuestionsAlternativas(item) {
  const [targetQuestion, setTargetQuestion] = useState(item.item);
  const [selectedAlternativa, setSelectedAlternativa] = useState();
  const alternativas = JSON.parse(targetQuestion.alternativas);
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
            <i>Alternativa</i>
          </p>
        </div>
        <h2>{targetQuestion.nome_campo}</h2>
        <p><i>{targetQuestion.descricao}</i></p>
        {alternativas.map((alternativa) => (
          <div className="flex align-items-center">
            <RadioButton
              value={alternativa}
              onChange={(e) => setSelectedAlternativa(e.value)}
              checked={selectedAlternativa === alternativa}
            />
            <p className="ml-2">{alternativa}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
