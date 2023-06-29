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
  const [altData, setAltData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [alternativas, setAlternativas] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [allData, setAllData] = useState([]);
  const [ratings, setRatings] = useState([]);
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
      await api.get(`relatorio-alternativas/${selectedQuiz.id}`).then((response) => {
        const { data } = response;
        setAltData(data);
      });
      await api.get(`relatorio-completo/${selectedQuiz.id}`).then((response) => {
        const { data } = response;
        setQuizData(data);
        console.log(data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const convertDashBoardData = () => {
    const data = altData.map(([alternativa, valor, idQuestao, nome]) => ({
      alternativa,
      valor: String(valor),
      idQuestao,
      nome,
    }));

    const grupos = data.reduce((acumulator, resposta) => {
      const {
        nome, idQuestao, alternativa, valor,
      } = resposta;
      if (acumulator[idQuestao]) {
        acumulator[idQuestao].alternativas.push(alternativa);
        acumulator[idQuestao].valores.push(valor);
      } else {
        acumulator[idQuestao] = {
          nome,
          idQuestao,
          alternativas: [alternativa],
          valores: [valor],
        };
      }
      return acumulator;
    }, {});
    setAlternativas(Object.values(grupos));
  };

  const getRatingAnswers = () => {
    const grupos = allData.reduce((acumulator, resposta) => {
      if (resposta.tipo === '0_a_10') {
        if (acumulator[resposta.id]) {
          acumulator[resposta.id].push(resposta.resposta);
        } else {
          acumulator[resposta.id] = [resposta.resposta];
        }
      }
      return acumulator;
    }, {});
    setRatings(grupos);
    console.log('Agrupado', grupos);
    console.log(ratings);
  };

  const convertQuizData = () => {
    if (quizData[0] === null || quizData.length === 0) return;
    const data = JSON.parse(quizData);
    const parsedData = data.map((q) => {
      const id = q.id.split(':');
      return {
        id: id[2],
        resposta: q.resposta,
        tipo: q.tipo,
        questao: q.nome_campo,
      };
    });

    setAllData(parsedData);
    console.log(allData);
  };

  useEffect(() => {
    getRatingAnswers();
  }, [allData]);

  useEffect(() => {
    convertDashBoardData();
    convertQuizData();
  }, [altData, quizData]);

  useEffect(() => {
    findQuiz();
  }, [selectedSuperior]);

  useEffect(() => {
    getDashBoardData();
  }, [selectedQuiz]);

  useEffect(() => {
    findSuperior();
  }, [selectedSuperior]);

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
  }, [alternativas]);

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
          {alternativas.map((item) => (
            <div className="flex justify-content-center p-5" key={item.idQuestao}>
              <div className="flex flex-column" style={{ textAlign: 'center' }}>
                <h3>
                  {item.nome}
                </h3>
                <Chart
                  type={tipo}
                  data={{
                    labels: item.alternativas,
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
