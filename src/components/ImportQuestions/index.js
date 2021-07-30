import { setParsedQuestions, getRemoteQuestions } from "../../utils/questions/helper";
import { ImportCard } from "../EventsHistoryActions";

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
    <ImportCard 
      handleFileUpload={handleFileUpload} 
      getRemote={getRemote} 
      text="Importe um arquivo que contém o banco de questões mais atualizado." 
    />
  );
}

export default ImportQuestions;
