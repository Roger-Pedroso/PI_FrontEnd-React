import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Divider } from 'primereact/divider';
import api from '../../utils/Api';

export default function Keys() {
  const [quiz, setQuiz] = useState(null);
  const [keys, setKeys] = useState([]);
  const [superior, setSuperior] = useState('');
  let numberOfKeysActive = 0;
  const isSuperiorSelected = superior !== '';
  const { id } = useParams();

  const findQuiz = async () => {
    const qst = await api.get(`/quiz/${id}`);
    const quizParsed = qst.data;
    setQuiz({
      // eslint-disable-next-line max-len
      id: quizParsed.id, nome: quizParsed.nome, descricao: quizParsed.descricao, questoes: quizParsed.questions,
    });
  };

  const findKeys = async () => {
    const kys = await api.get(`/key-by-quiz/${id}`);
    setKeys(kys.data);
  };
  useEffect(() => {
    findQuiz();
    findKeys();
  }, []);
  useEffect(() => {
    if (quiz === null) {
      findQuiz();
    }
  }, []);
  useEffect(() => {
    if (keys.length === 0) {
      findKeys();
    }
  }, []);

  function returnKeys(key) {
    if (key.status === true) {
      numberOfKeysActive += 1;
      if (!isSuperiorSelected) {
        setSuperior(key.superior.nome);
      }
      return (
        <p>{key.keyAccess}</p>
      );
    }
    return null;
  }

  return (
    <div>
      <div className="card" style={{ margin: '20px', backgroundColor: 'rgba(89,31,107,255)' }}>
        <div className="flex align-items-center" style={{ flexDirection: 'column', color: 'white' }}>
          <h1 style={{ color: 'white', margin: '-5px' }}>Chaves do Questionário.</h1>
          <h3 style={{ color: 'white' }}>
            Superior avaliado:
            {' '}
            {superior}
            .
          </h3>
        </div>
        <div
          className="card flex justify-content-center align-items-center"
          style={{
            flexDirection: 'column', border: '2px solid black', boxShadow: '10px 10px 10px purple', backgroundColor: 'white',
          }}
        >
          {keys.map((key) => returnKeys(key))}
          <Divider type="solid" style={{ border: '1px solid black' }} />
          <p>
            <b>Número de Chaves Ativas: </b>
            {numberOfKeysActive}
            .
          </p>
        </div>
      </div>
    </div>
  );
}
