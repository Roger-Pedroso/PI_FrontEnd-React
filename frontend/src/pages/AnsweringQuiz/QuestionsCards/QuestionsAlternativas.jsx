/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState, useContext } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { AnswersContext } from '../../../context/AnswersContext';

export default function QuestionsAlternativas(item) {
  const [targetQuestion, setTargetQuestion] = useState(item.item);
  const [selectedAlternativa, setSelectedAlternativa] = useState();
  const { answers, setAnswers } = useContext(AnswersContext);
  const alternativas = JSON.parse(targetQuestion.alternativas);
  useEffect(() => {
    if (targetQuestion === null) {
      setTargetQuestion(item.item);
    }
  }, [targetQuestion]);

  const handleAlternativaChange = (e) => {
    setSelectedAlternativa(e.value);
    const indice = answers.findIndex((answer) => answer.id_question === targetQuestion.id);
    if (indice !== -1) {
      const newAnswer = [...answers];
      newAnswer[indice].resposta = e.value;
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
            <i>Alternativa</i>
          </p>
        </div>
        <h2>{targetQuestion.nome_campo}</h2>
        <p><i>{targetQuestion.descricao}</i></p>
        {alternativas.map((alternativa) => (
          <div className="flex align-items-center">
            <RadioButton
              value={alternativa}
              onChange={(e) => handleAlternativaChange(e)}
              checked={selectedAlternativa === alternativa}
            />
            <p className="ml-2">{alternativa}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
