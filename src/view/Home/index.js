import { useState, useEffect } from 'react'
import './index.css'

import FluidHeading from "../../components/FluidHeading";
import SummaryCard from '../../components/SummaryCard'
import { ExportCard } from '../../components/EventsHistoryActions';

import { runHash } from "../../utils/hash.js"

import { repositories } from '../../utils/repositories';
const repos = repositories()

const Home = () => {
  // The data that will be rendered in the Summary section
  const [summary, setSummary] = useState([
    { title: 0, desc: 'questões praticadas' },
    { title: 0, desc: 'questões corretas' },
    { title: 0, desc: 'total de minutos' }
  ])

  useEffect(() => {
    // read list of events from localStorage and store it as a state
    const history = repos.getHistory()
    if (history) {
      const eventsList = JSON.parse(history)

      let practiceCounter = 0
      let correctQuestionsCounter = 0
      let secondsCounter = 0
      eventsList.forEach(event => {
        practiceCounter++
        event.isAnswerCorrect && correctQuestionsCounter++
        secondsCounter += event.timeSpent
      });

      let formatToMinutes = Math.round(secondsCounter / 60)

      const new_summary = [
        { title: practiceCounter, desc: "questões praticadas" },
        { title: correctQuestionsCounter, desc: "questões corretas" },
        { title: formatToMinutes, desc: "total de minutos" }
      ]

      setSummary(new_summary)
    }
  }, [setSummary])

  const handleExport = () => {
    //TODO: change verification method and feedback
    //verify if localStorage exists
    const history = repos.getHistory()
    if (!history) {
      alert('Não existe histórico ainda. Resolva uma questão e tente novamente.')
      return
    }

    const element = document.createElement("a");
    const hash = runHash(history)
    const exportHistory = JSON.stringify({ hash, history: JSON.parse(history) })
    const blob = new Blob([exportHistory], { type: 'application/json' }); //pass data from localStorage API to blob
    element.href = URL.createObjectURL(blob);
    element.download = "history.json";
    element.click();
  }

  return (
    <>
      <FluidHeading title={"Início"} />

      <div className="Home container-fluid">
        <div className="row">
          {/* Section for Summary */}
          <section className="summary col-md-10 col-xl-8 col-xxl-6 mx-auto">
            <header>
              <h2 className="h4">
                <span className="me-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-text" viewBox="0 0 16 16">
                    <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                    <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                  </svg>
                </span>
                Resumo
              </h2>
            </header>
            <div className="SummaryCard-wrapper">
              {summary.map(element => <SummaryCard info={element} />)}
            </div>
          </section>
        </div>

        <div className="row">
          {/* Section for Download history */}
          <section className="history col-md-10 col-xl-8 col-xxl-6 mx-auto">
            <header>
              <h2 className="h4">
                <span className="me-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-clock-history" viewBox="0 0 16 16">
                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                  </svg>
                </span>
                Histórico
              </h2>
            </header>
            <div className="HistoryCard-wrapper">
              <ExportCard text="Exporte um arquivo contendo um histórico completo das atividades resolvidas." handleExport={handleExport} />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Home;