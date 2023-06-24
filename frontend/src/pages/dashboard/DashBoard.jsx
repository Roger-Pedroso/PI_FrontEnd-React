/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';
import api from '../../utils/Api';

export default function DashBoard() {
  const chartType = useState('pie');
  const [selectedSuperior, setSelectedSuperior] = useState();
  const [enableQuiz, setEnableQuiz] = useState(true);
  const [enableAnswer, setEnableAnswer] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [quiz, setQuiz] = useState({});
  const [superior, setSuperior] = useState({});
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
      const data = await api.get('/superior');
      setSuperior(data.data);
    } catch (err) {
      console.log(`Ocorreu um erro: ${err}`);
    }
  };

  const findQuiz = async () => {
    try {
      const data = await api.get('/quiz');
      setQuiz(data.data);
    } catch (err) {
      console.log(`Ocorreu um erro: ${err}`);
    }
  };

  useEffect(() => {
    findSuperior();
    findQuiz();
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
  }, []);

  const superiorDropdownChange = (e) => {
    setSelectedSuperior(e.target.value);
    setEnableQuiz(false);
  };

  const quizDropdownChange = (e) => {
    setSelectedQuiz(e.target.value);
    setEnableAnswer(false);
  };

  return (
    <div style={innerWidth > 600 ? { margin: '50px' } : {}}>
      <div className="card flex flex-wrap gap-3 justify-content-between flex-row-reverse">
        <div className="flex flex-column" style={{ textAlign: 'end', marginRight: '5px' }}>
          <h3>{selectedSuperior?.nome}</h3>
          <h3>{selectedQuiz?.nome}</h3>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="flex flex-column gap-3">
            <div>
              <Dropdown
                options={superior}
                value={selectedSuperior}
                onChange={(e) => superiorDropdownChange(e)}
                optionLabel="nome"
                placeholder="Superior Imediato"
                className="w-full md:w-14rem"
              />
            </div>
            <div>
              <Dropdown
                placeholder="Tipo de Questão"
                className="w-full md:w-14rem"
                disabled={enableAnswer}
              />
            </div>
          </div>
          <div>
            <Dropdown
              options={quiz}
              value={selectedQuiz}
              optionLabel="nome"
              placeholder="Questionário"
              className="w-full md:w-14rem"
              onChange={(e) => quizDropdownChange(e)}
              disabled={enableQuiz}
            />
          </div>
        </div>
      </div>
      <div className={innerWidth > 600 ? 'card flex flex-wrap justify-content-between' : 'card flex flex-wrap justify-content-center'}>
        {questions.map((item) => (
          <div className="flex justify-content-center p-5"><Chart key={item.id} type={chartType} data={chartData} options={chartOptions} className="flex w-full md:w-20rem" /></div>
        ))}
      </div>
    </div>
  );
}