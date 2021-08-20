import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../../modules/api";
import "./Header.css";
import { useHistory } from "react-router";
import { RootState } from "../../modules/store";
require("dotenv").config();

const Header = () => {
  const { isLogin } = useSelector((state: RootState) => state.LoginReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const { headerStatus } = useSelector(
    (state: RootState) => state.headerReducer
  );

  const signOutHandler = () => {
    history.push("/MainPage");
    dispatch(Actions.userActions.LoginStatus(false));
    dispatch(Actions.userActions.AccessToken("", ""));
    dispatch(Actions.userActions.userInfo("", ""));
    dispatch(Actions.userActions.userLike([]));
    dispatch(Actions.placeActions.placeList([]));
    dispatch(Actions.placeActions.nextPlaceList([]));
  };
  const landingPage = () => {
    window.location.href = "/Landing.html";
  };
  const myPage = () => {
    window.location.href = "/MyPage";
  };
  const mainPage = () => {
    window.location.href = "/MainPage";
  };

  const ModalHandler = (name: string) => {
    dispatch(Actions.modalActions.modalStatus(true));
    dispatch(Actions.modalActions.modalName(name));
  };

  const myPageRender = () => {
    if (headerStatus === "/MyPage") {
      return (
        <div className="MyHeaderContainer">
          <div className="headerLogo" onClick={landingPage}>
            <img src="../img/Logo005.png" alt="" />
          </div>
          {isLogin ? (
            <div className="headerRightside">
              <p onClick={mainPage}>돌아가기</p>
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
            ""
          )}
        </div>
      );
    } else {
      return "";
    }
  };

  const mainPageRender = () => {
    if (headerStatus === "/MainPage") {
      return (
        <div className="MainHeaderContainer">
          <div className="headerLogo" onClick={landingPage}>
            <img src="../img/Logo005.png" alt="" />
          </div>
          {isLogin ? (
            <div className="headerRightside">
              <p onClick={myPage}>마이페이지</p>
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

  const planPageRender = () => {
    if (headerStatus === "/PlanPage") {
      return (
        <div className="MyHeaderContainer">
          <div className="headerLogo" onClick={landingPage}>
            <img src="../img/Logo005.png" alt="" />
          </div>
          {isLogin ? (
            <div className="headerRightside">
              <p onClick={myPage}>돌아가기</p>
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
      {myPageRender()}
      {mainPageRender()}
      {planPageRender()}
    </>
  );
};

export default Header;
