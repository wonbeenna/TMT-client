import Mainpage from "./pages/Mainpage";
import Mypage from "./pages/Mypage";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/Mainpage">
            <Mainpage />
          </Route>
          <Route exact path="/Mypage">
            <Mypage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
