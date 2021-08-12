import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../modules/api";
import { RootReducer } from "../modules/reducer";
import "./CSS/Header.css";
import { useHistory } from "react-router";
import { withRouter } from "react-router-dom";
import requests from "../modules/utils/requests";
require("dotenv").config();

const Header = () => {
  const { isLogin } = useSelector((state: RootReducer) => state.LoginReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const signOutHandler = () => {
    history.push("/Mainpage");
    dispatch(Actions.userActions.LoginStatus(false));
    dispatch(Actions.userActions.AccessToken("", ""));
    dispatch(Actions.userActions.userInfo("", ""));
    dispatch(Actions.userActions.userLike([]));
  };
  const landingPage = () => {
    window.location.href = "/Landing.html";
  };
  const mypage = () => {
    window.location.href = "/Mypage";
  };
  const mainpage = () => {
    window.location.href = "/Mainpage";
  };

  const ModalHandler = (name: string) => {
    dispatch(Actions.modalActions.modalStatus(true));
    dispatch(Actions.modalActions.modalName(name));
  };

  const mypageRender = () => {
    const curURL = window.location.href;
    if (curURL === requests.myPageURL || curURL === requests.MyDomainURL) {
      return (
        <div className="headerContainer">
          <div className="headerLogo" onClick={landingPage}>
            <img src="../img/Logo005.png" alt="" />
          </div>
          {isLogin ? (
            <div className="headerRightside">
              <img
                src="../img/business-plan.png"
                alt="돌아가기"
                title="돌아가기"
                onClick={mainpage}
              ></img>
              <img
                src="../img/profile.png"
                alt=""
                title="회원정보수정"
                onClick={() => {
                  ModalHandler("UserInfo");
                }}
              ></img>
              <img
                src="./img/logout.png"
                alt=""
                title="로그아웃"
                onClick={signOutHandler}
              />
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
    if (curURL === requests.mainPageURL || curURL === requests.MainDomainURL) {
      return (
        <div className="headerContainer">
          <div className="headerLogo" onClick={landingPage}>
            <img src="../img/Logo005.png" alt="" />
          </div>
          {isLogin ? (
            <div className="headerRightside">
              <img
                src="./img/account.png"
                alt=""
                title="마이페이지"
                onClick={mypage}
              />
              <img
                src="./img/logout.png"
                alt=""
                title="로그아웃"
                onClick={signOutHandler}
              />
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
