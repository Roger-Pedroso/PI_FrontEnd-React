/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect, useContext } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { AnswersContext } from '../../../context/AnswersContext';

export default function QuestionsOpen(item) {
  const [targetQuestion, setTargetQuestion] = useState(item.item);
  const [description, setDescription] = useState();
  const { answers, setAnswers } = useContext(AnswersContext);
  useEffect(() => {
    if (targetQuestion === null) {
      setTargetQuestion(item.item);
    }
  }, [targetQuestion]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    const indice = answers.findIndex((answer) => answer.id_question === targetQuestion.id);
    if (indice !== -1) {
      const newAnswer = [...answers];
      newAnswer[indice].resposta = e.target.value;
      setAnswers(newAnswer);
    }
  };

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
              {targetQuestion.obrigatorio === false ? '*Opcional' : '*Obrigatório'}
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
          onChange={(e) => handleDescriptionChange(e)}
          rows={5}
          cols={80}
        />
      </div>
    </div>
  );
}
