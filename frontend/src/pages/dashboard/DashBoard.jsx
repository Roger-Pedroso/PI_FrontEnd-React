/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import api from '../../utils/Api';

export default function DashBoard() {
  const [superior, setSuperior] = useState([]);
  const [selectedSuperior, setSelectedSuperior] = useState({});
  const [quiz, setQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [answers, setAnswers] = useState([]);
  const [answers10, setAnswers10] = useState([]);
  const [tipo, setTipo] = useState('');

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
        const quizzes = filteredQuizzes.map((item) => item.quiz);
        const excludeRepetition = Object.values(quizzes.reduce((accumulator, obj) => {
          accumulator[obj.id] = obj;
          return accumulator;
        }, {}));
        setQuiz(excludeRepetition);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getDashBoardData = async () => {
    try {
      await api.get(`relatorio-completo/${selectedQuiz.id}`).then((response) => {
        const { data } = response;
        if (data[0] === null || data.length === 0) return;
        const dataAux = JSON.parse(data);
        const parsedData = dataAux.map((q) => {
          const id = q.id.split(':');
          return {
            id: id[2],
            resposta: q.resposta,
            tipo: q.tipo,
            questao: q.nome_campo,
          };
        });
        const alt10 = parsedData.reduce((acumulator, resposta) => {
          if (resposta.tipo === '0_a_10') {
            if (acumulator[resposta.id]) {
              acumulator[resposta.id].push(resposta.resposta);
            } else {
              acumulator[resposta.id] = [resposta.resposta];
            }
          }
          return acumulator;
        }, {});
        const alt = parsedData.reduce((acumulator, resposta) => {
          if (resposta.tipo === 'alternativa') {
            if (acumulator[resposta.id]) {
              acumulator[resposta.id].push(resposta.resposta);
            } else {
              acumulator[resposta.id] = [resposta.resposta];
            }
          }
          return acumulator;
        }, {});
        setAnswers(alt);
        setAnswers10(alt10);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    findSuperior();
    findQuiz();
    getDashBoardData();
    console.log(answers10);
  }, []);

  useEffect(() => {
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };
    setChartOptions(options);
  }, []);

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
        <div className="flex gap-5 flex-wrap flex-column">
          <div className="flex gap-3">
            <Dropdown
              value={selectedSuperior}
              onChange={(e) => setSelectedSuperior(e.value)}
              optionLabel="nome"
              options={superior}
              placeholder="Superior Imediato"
              className="w-full md:w-14rem"
            />
            <Dropdown
              value={selectedQuiz}
              onChange={(e) => setSelectedQuiz(e.value)}
              optionLabel="nome"
              options={quiz}
              placeholder="Questionário"
              className="w-full md:w-14rem"
            />
          </div>
          <div className="flex gap-3">
            <Button label="Alternativas" onClick={setTipo('pie')} />
            <Button label="0 a 10" onClick={setTipo('bar')} />
          </div>
        </div>
      </div>
      <div className="card flex-column justify-content-center" style={{ textAlign: 'center' }}>
        <h1>Questões</h1>
        <div className={innerWidth > 600 ? 'flex flex-wrap justify-content-between' : 'card flex flex-wrap justify-content-center'}>
          {answers.map((item) => (
            <div className="flex justify-content-center p-5" key={item.id}>
              <div className="flex flex-column" style={{ textAlign: 'center' }}>
                <h3>
                  {item.nome_campo}
                </h3>
                <Chart
                  type={tipo}
                  data={{
                    labels: item.nome_campo,
                    datasets: [
                      {
                        data: item.valores,
                      },
                    ],
                  }}
                  options={chartOptions}
                  className="flex w-full md:w-20rem"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
