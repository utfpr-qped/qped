import { HashRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./view/Home";
import ManageHistory from "./view/ManageHistory";
import ManageQuestions from "./view/ManageQuestions";
import ViewQuestion from "./view/ViewQuestion";
import Topics from "./view/Topics";
import EditQuestion from "./view/EditQuestion";

import './index.css';

function App() {
  return (
    <HashRouter>
      <Navbar />

      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/manage" component={ManageHistory} />
          <Route path="/manage-questions" component={ManageQuestions} />
          {/*<Route path="/new" component={} /> */}
          <Route exact path="/topics" component={Topics} />
          <Route path="/topics/question/:idQuestion" component={ViewQuestion} />
          <Route path="/edit-question/:subject/:idQuestion" component={EditQuestion} />
        </Switch>
      </main>
    </HashRouter>
  );
}

export default App;
