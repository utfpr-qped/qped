import { setParsedQuestions, getRemoteQuestions } from "../../utils/questions/helper";

const ImportQuestions = () => {

  const readJSONFile = file => {
    // Check if the file is a JSON
    if (file.type && !file.type.startsWith('application/json')) {
      console.error('Arquivo não é um JSON.', file.type, file)
      return
    }
    const reader = new FileReader()
    reader.addEventListener('load', function (e) {
      setParsedQuestions(e.target.result)
      window.location.reload()
    })
    reader.readAsText(file)
  }

  function handleFileUpload(e) {
    const fileList = e.target.files
    readJSONFile(fileList[0])
  }

  function getRemote() {
    setParsedQuestions(getRemoteQuestions())
    window.location.reload()
  }

  return (
    // TODO: arrumar textos e estilo
    <header>
      <h2 className="h4">Importar Questoes</h2>
      <p className="text-muted mb-0">Importe o arquivo de questoes disponibilzado por seu professor</p>
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
        <input type="file" id="uploadButton" onChange={handleFileUpload} accept=".json" hidden />
      </div>
      <button onClick={() => getRemote()}>REMOTO</button>
    </header>
  );
}

export default ImportQuestions;
