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
    dispatch(Actions.AccessToken("", ""));
    dispatch(Actions.LoginStatus(false));
    history.push("/Mainpage");
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
    dispatch(Actions.modalStatus(true));
    dispatch(Actions.modalName(name));
  };

  const mypageRender = () => {
    const curURL = window.location.href;
    const mypageURL = `${process.env.REACT_APP_BUCKET}/Mypage`;
    const domainURL = `${process.env.REACT_APP_DOMAIN}/Mypage`;
    if (curURL === mypageURL || curURL === domainURL) {
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
    const mainPageURL = `${process.env.REACT_APP_BUCKET}/Mainpage`;
    const domainURL = `${process.env.REACT_APP_DOMAIN}/Mainpage`;
    if (curURL === mainPageURL || curURL === domainURL) {
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
