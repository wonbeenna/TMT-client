import { MainPage, MyPage, PlanPage, PlanView } from "./pages/index";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/MainPage" component={MainPage} />
          <Route exact path="/MyPage" component={MyPage} />
          <Route exact path="/PlanPage" component={PlanPage} />
          <Route exact path="/PlanView/:_id" component={PlanView} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
