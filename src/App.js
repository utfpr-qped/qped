import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import ViewQuestion from "./view/ViewQuestion";
import Topics from "./view/Topics";

import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Switch>
          <Route exact path="/topics" component={Topics} />
          <Route path="/topics/question/:idQuestion" component={ViewQuestion} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
