import Mainpage from "./pages/Mainpage";
import Mypage from "./pages/Mypage";
import UserInfo from "./pages/UserInfo";
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
          <Route path="/Mypage">
            <Mypage />
          </Route>
          <Route path="/UserInfo">
            <UserInfo />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
