/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import api from '../../utils/Api';

export default function DashBoard() {
  const [superior, setSuperior] = useState([]);
  const [selectedSuperior, setSelectedSuperior] = useState({});
  const [quiz, setQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [alternativas, setAlternativas] = useState([{}]);
  const [allData, setAllData] = useState([]);
  const [ratings, setRatings] = useState([{}]);
  const [open, setOpen] = useState([{}]);
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
        setQuizData(data);
        console.log(data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getAnswers = () => {
    const rating = allData.reduce((acumulator, resposta) => {
      if (resposta.tipo === '0_a_10') {
        if (acumulator[resposta.id]) {
          acumulator[resposta.id].resposta.push(resposta.resposta);
          acumulator[resposta.id].qtd.push(resposta.qtd);
        } else {
          acumulator[resposta.id] = {
            questao: [resposta.questao],
            resposta: [resposta.resposta],
            qtd: [resposta.qtd],
          };
        }
      }
      return acumulator;
    }, {});

    const alternatives = allData.reduce((acumulator, resposta) => {
      if (resposta.tipo === 'alternativa') {
        if (acumulator[resposta.id]) {
          acumulator[resposta.id].resposta.push(resposta.resposta);
          acumulator[resposta.id].qtd.push(resposta.qtd);
        } else {
          acumulator[resposta.id] = {
            questao: [resposta.questao],
            resposta: [resposta.resposta],
            qtd: [resposta.qtd],
          };
        }
      }
      return acumulator;
    }, {});

    const abertas = allData.reduce((acumulator, resposta) => {
      if (resposta.tipo === 'aberta') {
        if (acumulator[resposta.id]) {
          acumulator[resposta.id].resposta.push(resposta.resposta);
        } else {
          acumulator[resposta.id] = {
            questao: [resposta.questao],
            resposta: [resposta.resposta],
          };
        }
      }
      return acumulator;
    }, {});

    const ratingsWithAverage = Object.values(rating).map((item) => {
      const total = item.resposta.reduce((accumulator, value) => accumulator + parseInt(value, 10), 0);
      const average = total / item.resposta.length;

      return {
        ...item,
        media: [average.toFixed(2)],
      };
    });

    setOpen(Object.values(abertas));
    setAlternativas(Object.values(alternatives));
    setRatings(Object.values(ratingsWithAverage));
    console.log(abertas);
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
        qtd: q.qtd,
      };
    });
    setAllData(parsedData);
  };

  useEffect(() => {
    getAnswers();
  }, [allData]);

  useEffect(() => {
    convertQuizData();
  }, [quizData]);

  useEffect(() => {
    findQuiz();
  }, [selectedSuperior]);

  useEffect(() => {
    getDashBoardData();
  }, [selectedQuiz]);

  useEffect(() => {
    findSuperior();
  }, [selectedSuperior]);

  const graficoAlternativa = () => {
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };
    return (
      <div className="flex justify-content-center">
        <div className={innerWidth > 600 ? 'flex justify-content-between flex-wrap' : 'flex justify-content-center flex-wrap'}>
          {alternativas.map((item) => (
            <div className="flex flex-column" key={item.id}>
              <div style={{ textAlign: 'center' }}>
                <h3>
                  {item.questao}
                </h3>
                <Chart
                  type="pie"
                  data={{
                    labels: item.resposta,
                    datasets: [
                      {
                        data: item.qtd,
                      },
                    ],
                  }}
                  options={options}
                  className="flex w-full md:w-20rem"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    );
  };

  const graficoZeroADez = () => {
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
    return (
      <div>
        <div className="flex justify-content-center">
          <div className="flex flex-column" style={{ textAlign: 'center', width: '100%' }}>
            <h3>
              {ratings?.questao}
            </h3>
            <Chart
              autoResize
              type="bar"
              data={{
                labels: ratings?.map((item) => item.questao),
                datasets: [
                  {
                    label: 'Média das Respostas',
                    data: ratings?.map((item) => item.media),
                  },
                ],
              }}
              options={options}
            />
          </div>
        </div>
      </div>
    );
  };

  const questoesAbertas = () => (
    <div className="flex flex-column gap-5">
      {open.map((item) => (
        <div key={item.id} className="flex flex-column gap-5">
          <h3>{item.questao}</h3>
          {item.resposta.map((resp, index) => (
            <InputTextarea
              key={index}
              value={resp}
              rows={5}
              cols={innerWidth > 600 ? 80 : 20}
              autoResize
              readOnly
            />
          ))}
        </div>
      ))}
    </div>
  );

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
          <div className={innerWidth > 600 ? 'flex gap-3' : 'flex flex-column gap-3'}>
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
          <div className={innerWidth > 600 ? 'flex gap-3 flex-wrap' : 'flex flex-column gap-3'}>
            <Button label="Alternativas" onClick={() => setTipo('alternativa')} />
            <Button label="0 a 10" onClick={() => setTipo('0a10')} />
            <Button label="Abertas" onClick={() => setTipo('aberta')} />
          </div>
        </div>
      </div>
      <div className="card justify-content-center" style={{ textAlign: 'center' }}>
        <h1>Questões</h1>
        {tipo === 'alternativa' ? graficoAlternativa() : null}
        {tipo === '0a10' && ratings.length > 0 ? graficoZeroADez() : null}
        {tipo === 'aberta' ? questoesAbertas() : null}
      </div>
    </div>
  );
}
