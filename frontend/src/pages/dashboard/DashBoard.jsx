/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';

export default function DashBoard() {
  const [chartType, setChartType] = useState('pie');
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

  useEffect(() => {
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
  return (
    <div style={innerWidth > 600 ? { margin: '50px' } : {}}>
      <div className="card flex gap-3">
        <div className="flex flex-column gap-3">
          <div>
            <Dropdown
              value={chartType}
              onChange={(e) => setChartType(e.value)}
              optionLabel="nome"
              placeholder="Superior Imediato"
              className="w-full md:w-14rem"
            />
          </div>
          <div>
            <Dropdown
              placeholder="Tipo de Questão"
              className="w-full md:w-14rem"
              disabled
            />
          </div>
        </div>
        <div>
          <Dropdown
            placeholder="Questionário"
            className="w-full md:w-14rem"
            disabled
          />
        </div>
        <div className="flex-column" style={{ textAlign: 'end', width: '100%', marginRight: '5px' }}>
          <h3>Nome do Superior</h3>
          <h3>Nome do Questionário</h3>
        </div>
      </div>
      <div className="card flex p-5 justify-content-between">
        {questions.map((item) => (
          <div><Chart key={item.id} type={chartType} data={chartData} options={chartOptions} className="w-full md:w-25rem" /></div>
        ))}
      </div>
    </div>
  );
}
