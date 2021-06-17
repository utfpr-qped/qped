import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ViewQuestion from "./view/ViewQuestion";
import './index.css';
import Topics from "./view/Topics";

function App() {
  const [question, setQuestion] = useState({})

  useEffect(() => {
    setQuestion({
      id: 'busca-2',
      title: 'Titulo da questao',
      text: `Considere o método de busca sequencial em um vetor contendo os elementos: **[{vet=2:23:+{5:10}}]**. 
  
  Qual deve ser o retorno da busca quando o usuário pesquisar pelo item **"{valor=2:23}"**?`,
      // answer: function (vet, valor) {
      //   for (let i = 0; i < vet.length; i++) {
      //     if (vet[i] === valor) return i;
      //   }
      //   return -1;
      // },
      subject: 'Busca',
      level: 1,
      tags: ['busca sequencial', 'busca']
    })
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <Switch>
          <Route path="/viewquestion">
            <ViewQuestion question={question} />
          </Route>
          <Route path="/topics" component={Topics} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
