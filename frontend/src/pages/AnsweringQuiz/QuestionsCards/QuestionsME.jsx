/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect, useContext } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { AnswersContext } from '../../../context/AnswersContext';

export default function QuestionsME(item) {
  const [targetQuestion, setTargetQuestion] = useState(item.item);
  const [selectedAlternativas, setSelectedAlternativas] = useState([]);
  const { answers, setAnswers } = useContext(AnswersContext);
  let checkedConst = false;
  const alternativas = JSON.parse(targetQuestion.alternativas);
  useEffect(() => {
    if (targetQuestion === null) {
      setTargetQuestion(item.item);
    }
  }, [targetQuestion]);

  const verifyAlternativas = (e) => {
    const isAlreadyAdded = selectedAlternativas.includes(e.value);
    if (isAlreadyAdded) {
      const newSelectedAlternativas = selectedAlternativas.filter(
        (alternativa) => alternativa !== e.value,
      );
      setSelectedAlternativas(newSelectedAlternativas);
    } else {
      setSelectedAlternativas([...selectedAlternativas, e.value]);
    }
  };

  useEffect(() => {
    const indice = answers.findIndex((answer) => answer.id_question === targetQuestion.id);
    if (indice !== -1) {
      const newAnswer = [...answers];
      newAnswer[indice].resposta = selectedAlternativas;
      setAnswers(newAnswer);
    }
  }, [selectedAlternativas]);

  const verifyAlternativaChecked = (alternativa) => {
    if (selectedAlternativas.includes(alternativa)) {
      checkedConst = true;
      return true;
    }
    checkedConst = false;
    return false;
  };

  const updateSelectedAlternativas = (alternativa) => {
    const updateArray = selectedAlternativas.filter((alter) => alter !== alternativa);
    setSelectedAlternativas(updateArray);
  };

  return (
    <div style={{ width: '100%' }}>
      <div
        className="card flex"
        style={{
          flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', boxShadow: '10px 10px 10px purple',
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
            <i>Múltipla Escolha</i>
          </p>
        </div>
        <h2>{targetQuestion.nome_campo}</h2>
        <p><i>{targetQuestion.descricao}</i></p>
        {alternativas.map((alternativa) => (
          <div className="flex align-items-center">
            <RadioButton
              value={alternativa}
              onChange={(e) => verifyAlternativas(e)}
              checked={verifyAlternativaChecked(alternativa)}
            />
            <p className="ml-2">{alternativa}</p>
            <Button
              icon="pi pi-times"
              rounded
              text
              raised
              severity="danger"
              aria-label="Cancel"
              visible={checkedConst}
              onClick={() => {
                updateSelectedAlternativas(alternativa);
              }}
              style={{ marginLeft: '5px', height: '20px', width: '20px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
