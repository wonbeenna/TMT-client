import Mainpage from "./pages/Mainpage";

import Mypage from "./pages/Mypage";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/mainpage">
            <Mainpage />
          </Route>
        </Switch>
        <Switch>
          <Route path="/mypage">
            <Mypage />
          </Route>
        </Switch>
        {/* <SignIn /> */}
        {/* <SignUp /> */}
      </div>
    </BrowserRouter>

  );
}

export default App;
