/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';
import api from '../../utils/Api';

export default function DashBoard() {
  const [superior, setSuperior] = useState('');
  const [question, setQuestion] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [selectedSuperior, setSelectedSuperior] = useState({});
  const [disabledDropQuiz, setDisabledDropQuiz] = useState(true);
  const [disabledDropQuestion, setDisabledDropQuestion] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [quiz, setQuiz] = useState('');
  const questions = [
    {
      id: 1,
      resposta1: 'sim',
      resposta2: 'nao',
    },
    {
      id: 2,
      resposta1: 'sim',
      resposta2: 'nao',
    },
    {
      id: 2,
      resposta1: 'sim',
      resposta2: 'nao',
    },
  ];
  const dataBanco = [
    {
      nome: 'abc',
      valor: '200',
    },
    {
      nome: 'jfc',
      valor: '200',
    },
  ];

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const findSuperior = async () => {
    try {
      await api.get('/superior').then((response) => {
        const { data } = response;
        setSuperior(data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const findQuiz = async () => {
    try {
      await api.get('/quiz').then((response) => {
        const { data } = response;
        setQuiz(data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const findQuestion = async () => {
    try {
      await api.get('/question').then((response) => {
        const { data } = response;
        setQuestion(data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (superior.length === 0) {
      findSuperior();
    }
    if (quiz.length === 0) {
      findQuiz();
    }
    if (question.length === 0) {
      findQuestion();
    }
    const data = {
      labels: dataBanco.map((item) => item.nome),
      datasets: [
        {
          data: dataBanco.map((item) => item.valor),
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [superior, quiz, question]);

  const superiorDropChange = (e) => {
    setSelectedSuperior(e.target.value);
    setDisabledDropQuiz(false);
  };

  const quizDropChange = (e) => {
    setSelectedQuiz(e.target.value);
    setDisabledDropQuestion(false);
  };
  return (
    <div style={innerWidth > 600 ? { margin: '50px' } : {}}>
      <div className="card flex flex-wrap gap-3 justify-content-between flex-row-reverse">
        <div className="flex flex-column" style={{ textAlign: 'end', marginRight: '5px' }}>
          <h3>{selectedSuperior?.nome}</h3>
          <h3>Nome do Questionário</h3>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="flex flex-column gap-3">
            <div>
              <Dropdown
                value={selectedSuperior}
                onChange={(e) => superiorDropChange(e)}
                optionLabel="nome"
                options={superior}
                placeholder="Superior Imediato"
                className="w-full md:w-14rem"
              />
            </div>
            <div>
              <Dropdown
                disabled={disabledDropQuestion}
                value={selectedQuestion}
                onChange={(e) => setSelectedQuestion(e.value)}
                optionLabel="nome_campo"
                options={question}
                placeholder="Tipo de Questão"
                className="w-full md:w-14rem"
              />
            </div>
          </div>
          <div>
            <Dropdown
              disabled={disabledDropQuiz}
              value={selectedQuiz}
              onChange={(e) => quizDropChange(e)}
              optionLabel="nome"
              options={quiz}
              placeholder="Questionário"
              className="w-full md:w-14rem"
            />
          </div>
        </div>
      </div>
      <div className={innerWidth > 600 ? 'card flex flex-wrap justify-content-between' : 'card flex flex-wrap justify-content-center'}>
        {questions.map((item) => (
          <div className="flex justify-content-center p-5"><Chart key={item.id} type="pie" data={chartData} options={chartOptions} className="flex w-full md:w-20rem" /></div>
        ))}
      </div>
    </div>
  );
}
