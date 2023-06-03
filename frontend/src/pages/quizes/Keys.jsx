import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { useParams } from 'react-router-dom';
import { Column } from 'primereact/column';
import api from '../../utils/Api';

export default function Keys() {
  const [quiz, setQuiz] = useState(null);
  const [keysParsed, setKeysParsed] = useState([]);
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
    const kys = await api.get('/key');
    const keys = kys.data;
    console.log(keys);
    keys.forEach((key) => {
      if (key.quiz.id === id) {
        const keyss = key.key_access;
        setKeysParsed([...keysParsed, { keys: keyss }]);
      }
    });
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
    if (keysParsed.length === 0) {
      findKeys();
    }
  }, []);
  console.log(keysParsed);
  return (
    <div>
      <div className="card" style={{ margin: '20px' }}>
        <div className="flex justify-content-between align-items-center">
          <h1>Chaves do Questionário:</h1>
        </div>
        <DataTable
          value={keysParsed}
          scrollable
          paginator
          rows={9}
          scrollHeight="550px"
          tableStyle={{ maxHeight: '100px' }}
          globalFilterFields={['nome_campo', 'descricao', 'tipo', 'alternativas']}
        >
          <Column field="keys" />
        </DataTable>
      </div>
    </div>
  );
}
