import Mainpage from "./pages/Mainpage";
import Mypage from "./pages/Mypage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import UserInfo from "./pages/UserInfo";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducer } from "./reducers";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
