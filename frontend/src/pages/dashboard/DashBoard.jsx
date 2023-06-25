/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import api from '../../utils/Api';

export default function DashBoard() {
  const [superior, setSuperior] = useState([]);
  const [question, setQuestion] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [selectedSuperior, setSelectedSuperior] = useState({});
  const [quiz, setQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState([]);
  const [altData, setAltData] = useState([]);
  const [altDataConv, setAltDataConv] = useState([]);

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
      await api.get('/key').then((response) => {
        const filteredQuizzes = response.data.filter(
          (item) => item.superior.id === selectedSuperior.id,
        );
        setQuiz(filteredQuizzes.map((item) => item.quiz));
      });
    } catch (err) {
      console.log(err);
    }
  };

  const findQuestion = async () => {
    try {
      const questionsMapped = selectedQuiz.questions;
      setQuestion(questionsMapped);
    } catch (err) {
      console.log(err);
    }
  };

  const getDashBoardData = async () => {
    console.log(altData);
    try {
      await api.get(`relatorio/${selectedQuiz.id}`).then((response) => {
        const { data } = response;
        setAltData(data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const convertDashBoardData = () => {
    const data = altData.map(([alternativa, valor]) => ({
      alternativa,
      valor: String(valor),
    }));
    setAltDataConv(data);
  };

  useEffect(() => {
    convertDashBoardData();
    console.log(altDataConv);
  }, [altData]);

  useEffect(() => {
    findQuestion();
  }, [selectedQuiz]);

  useEffect(() => {
    findQuiz();
    console.log('aqui');
  }, [selectedSuperior]);

  useEffect(() => {
    if (selectedSuperior || selectedQuiz || selectedQuestion) {
      getDashBoardData();
    }
  }, [selectedQuestion]);

  useEffect(() => {
    if (superior.length === 0) {
      findSuperior();
    }

    const data = {
      labels: altDataConv.map((item) => item.alternativa),
      datasets: [
        {
          data: altDataConv.map((item) => item.valor),
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
  }, [superior]);

  const clearFilter = () => {
    setSelectedSuperior('');
    setSelectedQuiz('');
    setSelectedQuestion('');
  };

  return (
    <div style={innerWidth > 600 ? { margin: '50px' } : {}}>
      <div className="card flex flex-wrap gap-3 justify-content-between flex-row-reverse">
        <div className="flex flex-column" style={{ textAlign: 'end', marginRight: '5px' }}>
          <h3>
            Avaliado:
            {' '}
            {selectedSuperior?.nome}
          </h3>
          <h3>
            Questionário:
            {' '}
            {selectedQuiz?.nome}
          </h3>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="flex flex-column gap-3">
            <div>
              <Dropdown
                value={selectedSuperior}
                onChange={(e) => setSelectedSuperior(e.value)}
                optionLabel="nome"
                options={superior}
                placeholder="Superior Imediato"
                className="w-full md:w-14rem"
              />
            </div>
            <div>
              <Dropdown
                value={selectedQuestion}
                onChange={(e) => setSelectedQuestion(e.value)}
                optionLabel="nome_campo"
                options={question}
                placeholder="Questão"
                className="w-full md:w-14rem"
              />
            </div>
          </div>
          <div className="flex flex-column gap-3">
            <div>
              <Dropdown
                value={selectedQuiz}
                onChange={(e) => setSelectedQuiz(e.value)}
                optionLabel="nome"
                options={quiz}
                placeholder="Questionário"
                className="w-full md:w-14rem"
              />
            </div>
            <div className="flex align-self-end">
              <Button label="Limpar Filtros" onClick={() => clearFilter()} />
            </div>
          </div>
        </div>
      </div>
      <div className={innerWidth > 600 ? 'card flex flex-wrap justify-content-between' : 'card flex flex-wrap justify-content-center'}>
        {altDataConv.map((item) => (
          <div className="flex justify-content-center p-5"><Chart key={item.id} type="pie" data={chartData} options={chartOptions} className="flex w-full md:w-20rem" /></div>
        ))}
      </div>
    </div>
  );
}
