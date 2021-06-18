import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import ViewQuestion from "./view/ViewQuestion";
import Topics from "./view/Topics";

import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <Switch>
          <Route path="/topics" component={Topics} />
          <Route path="/question/:subject/:idQuestion" component={ViewQuestion} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
