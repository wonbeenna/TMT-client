import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../actions";
import { RootReducer } from "../reducers";
import "./CSS/Header.css";
import { useHistory } from "react-router";
import { withRouter } from "react-router-dom";
require("dotenv").config();

const Header = () => {
  const { isLogin } = useSelector((state: RootReducer) => state.LoginReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const signOutHandler = () => {
    dispatch(Actions.LoginStatus(false));
    dispatch(Actions.AccessToken("", ""));
    window.location.href = "/Landing.html";
  };
  const landingPage = () => {
    window.location.href = "/Landing.html";
  };
  const mypage = () => {
    history.push("/Mypage");
  };
  const mainpage = () => {
    history.push("/Mainpage");
  };

  const ModalHandler = (name: string) => {
    dispatch(Actions.modalStatus(true));
    dispatch(Actions.modalName(name));
  };

  const mypageRender = () => {
    const curURL = window.location.href;
    const mypageURL = `${process.env.REACT_APP_BUCKET}/Mypage`;
    console.log('mypageURL', mypageURL)
    if (curURL === mypageURL) {
      return (
        <div className="headerContainer">
          <div className="headerLogo" onClick={landingPage}>
            <img src="../img/Logo006.png" alt="" />
          </div>
          {isLogin ? (
            <div className="headerRightside">
              <p onClick={mainpage}>돌아가기</p>
              <p
                onClick={() => {
                  ModalHandler("UserInfo");
                }}
              >
                내정보
              </p>
              <p onClick={signOutHandler}>로그아웃</p>
            </div>
          ) : (
            <div className="headerRightside">
              <p
                onClick={() => {
                  ModalHandler("SignIn");
                }}
              >
                로그인
              </p>
              <p
                onClick={() => {
                  ModalHandler("SignUp");
                }}
              >
                회원가입
              </p>
            </div>
          )}
        </div>
      );
    } else {
      return "";
    }
  };

  const mainPageRender = () => {
    const curURL = window.location.href;
    const mainPageURL = `${process.env.REACT_APP_BUCKET}/Mainpage`;
    console.log('mainPageURL', mainPageURL)
    if (curURL === mainPageURL) {
      return (
        <div className="headerContainer">
          <div className="headerLogo" onClick={landingPage}>
            <img src="../img/Logo006.png" alt="" />
          </div>
          {isLogin ? (
            <div className="headerRightside">
              <p onClick={mypage}>마이페이지</p>
              <p onClick={signOutHandler}>로그아웃</p>
            </div>
          ) : (
            <div className="headerRightside">
              <p
                onClick={() => {
                  ModalHandler("SignIn");
                }}
              >
                로그인
              </p>
              <p
                onClick={() => {
                  ModalHandler("SignUp");
                }}
              >
                회원가입
              </p>
            </div>
          )}
        </div>
      );
    } else {
      return "";
    }
  };

  return (
    <>
      {mypageRender()}
      {mainPageRender()}
    </>
  );
};

export default withRouter(Header);
