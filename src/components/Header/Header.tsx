import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../../modules/api";
import { RootReducer } from "../../modules/reducer";
import "./Header.css";
import { useHistory } from "react-router";
import { withRouter } from "react-router-dom";
require("dotenv").config();

const Header = () => {
  const { isLogin } = useSelector((state: RootReducer) => state.LoginReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const { headerStatus } = useSelector(
    (state: RootReducer) => state.headerReducer
  );

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
    if (headerStatus === "/Mypage") {
      return (
        <div className="headerContainer">
          <div className="headerLogo" onClick={landingPage}>
            <img src="../img/Logo005.png" alt="" />
          </div>
          {isLogin ? (
            <div className="headerRightside">
              <p onClick={mainpage}>돌아가기</p>
              <p
                onClick={() => {
                  ModalHandler("UserInfo");
                }}
              >
                회원정보수정
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
    if (headerStatus === "/Mainpage") {
      return (
        <div className="headerContainer">
          <div className="headerLogo" onClick={landingPage}>
            <img src="../img/Logo005.png" alt="" />
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
