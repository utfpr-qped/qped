import { useState } from "react";
import FluidHeading from "../../components/FluidHeading";
import { runHash } from "../../utils/hash"

import './index.css'

const ManageHistory = () => {
  const [eventList, setEventList] = useState([])
  const [integrity, setIntegrity] = useState(null)

  const readJSONFile = file => {
    // Check if the file is a JSON
    if (file.type && !file.type.startsWith('application/json')) {
      console.log('Arquivo não é um JSON.', file.type, file)
      return
    }

    const reader = new FileReader()

    reader.addEventListener('load', function (e) {
      let parsed = JSON.parse(e.target.result)
      //setIntegrity(runHash(parsed.history) === parsed.hash)
      setIntegrity(runHash(JSON.stringify(parsed.history)) === parsed.hash)
      setEventList(parsed.history)
    })

    reader.readAsText(file)
  }

  const handleChange = e => {
    //TODO: should data of the file uploaded be stored in localStorage or global state to be used later?
    //returns list of files uploaded by the user during that session
    const fileList = e.target.files
    //get only file uploaded by accessing index 0 of the FileList array, returns a File object
    readJSONFile(fileList[0])
  }

  return (
    <>
      <FluidHeading title={"Gerenciar"} />

      <div className="ManageHistory container-fluid">
        <div className="row">
          {/* Section for viewing the event records table */}
          <section className="records-table col-md-10 col-xl-8 col-xxl-6 mx-auto">
            <header>
              <h2 className="h4">Consultar histórico</h2>
              <p className="text-muted mb-0">Importe um arquivo de histórico e visualize abaixo.</p>
              <div className="actions-wrapper">
                <label htmlFor="uploadButton" className="btn btn-dark">
                  <span className="me-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-in-up" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z" />
                      <path fillRule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                    </svg>
                  </span>
                  Importar
                </label>
                <input type="file" id="uploadButton" onChange={handleChange} accept=".json" hidden />
              </div>
            </header>

            <p>INTEGRITY</p>
            {
              // TODO: insert some style
              integrity === true
                ? (
                  <p>true</p>
                )
                : (
                  <p>false</p>
                )
            }
            {/* Container for the table wrapper */}
            <div className="table-wrapper">
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Resposta</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Tempo (minutos)</th>
                    <th scope="col">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    // Returns rows populated with the data of one Event History file
                    eventList.length ? (
                      eventList.map((eventItem, index) => {
                        // format type
                        let type = eventItem.inputLevel
                        let formattedType =
                          type === 'easy' ? 'TrueOrFalse'
                            : type === 'medium' ? 'MultipleChoice'
                              : type === 'hard' ? 'Written'
                                : 'Outro'

                        // format date to 'dd/mm/yyyy'
                        let date = new Date(eventItem.date)
                        let formattedDate = ((date.getDate())) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear()

                        return (
                          <tr key={index}>
                            <th scope="row">{eventItem.questionId}</th>
                            <td>{eventItem.isAnswerCorrect ? '✅' : '❌'} {eventItem.userAnswer}</td>
                            <td>{formattedType}</td>
                            <td>{Math.round(eventItem.timeSpent / 60)}</td>
                            <td>{formattedDate}</td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-muted">Nenhum arquivo selecionado.</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default ManageHistory;