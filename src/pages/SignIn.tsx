import { useState } from "react";
import {
  ValidationEmail,
  ValidationPassword,
} from "../components/ValidationCheck";
import "./CSS/SignIn.css";
import GoogleLogin from "react-google-login";
import KakaoLogin from "react-kakao-login";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Actions } from "../actions";
import { useHistory } from "react-router-dom";
require("dotenv").config();

function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const [errEmail, setErrEmail] = useState<string>("");
  const [errPassword, setErrPassword] = useState<string>("");
  const [errLogin, setErrLogin] = useState<string>("");

  const ModalHandler = (name: string) => {
    dispatch(Actions.modalStatus(true));
    dispatch(Actions.modalName(name));
  };
  const modalCloseHandler = () => {
    dispatch(Actions.modalStatus(false));
    dispatch(Actions.modalName(""));
  };
  // 이메일, 비밀번호 유효성 검사
  const onChangeHandler = (event: any, type: string): void => {
    if (type === "Email") {
      setEmail(event.target.value);
      if (event.target.value.length === 0) {
        setEmailValid(true);
        setErrEmail("");
      } else if (ValidationEmail(event.target.value)) {
        setEmailValid(true);
        setErrEmail("");
      } else {
        setEmailValid(false);
        setErrEmail("이메일을 정확하게 입력해주세요");
      }
    }
    if (type === "Password") {
      setPassword(event.target.value);
      if (event.target.value.length === 0) {
        setPasswordValid(true);
        setErrPassword("");
      } else if (ValidationPassword(event.target.value)) {
        setPasswordValid(true);
        setErrPassword("");
      } else {
        setPasswordValid(false);
        setErrPassword(
          "비밀번호는 영문, 숫자, 특수문자를 포함해 8자리 이상 입니다"
        );
      }
    }
  };

  const loginHandler = async () => {
    const loginURL = `${process.env.REACT_APP_API}/user/signIn`;
    if (!email) {
      setEmailValid(false);
      setErrEmail("이메일을 입력해 주세요");
    }
    if (!password) {
      setPasswordValid(false);
      setErrPassword("비밀번호를 입력해 주세요");
    }
    await axios
      .post(
        loginURL,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const accessToken = res.data.accessToken;
        const refreshToken = res.data.refreshToken;
        dispatch(Actions.AccessToken(accessToken, refreshToken));
        dispatch(Actions.LoginStatus(true));
        modalCloseHandler();
        setErrLogin("");
        window.location.href = "/Mainpage";
      })
      .catch((err) => {
        const status = err.response.status;
        if (status === 409) {
          setErrLogin("이메일과 비밀번호를 확인해 주세요");
        }
      });
  };

  const nonUserLoginHandler = async () => {
    const nonUserLoginURL = `${process.env.REACT_APP_API}/user/nonUser`;
    await axios
      .get(nonUserLoginURL, {})
      .then((res) => {
        const accessToken = res.data.accessToken;
        const refreshToken = res.data.refreshToken;
        dispatch(Actions.AccessToken(accessToken, refreshToken));
        dispatch(Actions.LoginStatus(true));
        modalCloseHandler();
        window.location.href = "/Mainpage";
        console.log(accessToken, refreshToken);
        console.log(res);
      })
      .catch((err) => {
        const status = err.response.status;
        if (status === 500) {
          setErrLogin("서버와 연결이 불안정 합니다!");
        }
      });
  };
  const searchHandler = () => {
    setErrPassword("");
    setErrEmail("");
    setEmailValid(true);
    setPasswordValid(true);
    setErrLogin("개발 중인 기능입니다 :)");
  };
  // 구글
  const clientId: any = process.env.REACT_APP_GOOGLE_API;
  const responseGoogle = async (response: any) => {
    const googleURL = `${process.env.REACT_APP_API}/auth/google`;
    await axios
      .post(googleURL, {
        token: response.tokenObj.id_token,
      })
      .then((res) => {
        const status = res.status;
        if (status === 200 || status === 201) {
          const accessToken = res.data.accessToken;
          const refreshToken = res.data.refreshToken;
          dispatch(Actions.AccessToken(accessToken, refreshToken));
          dispatch(Actions.LoginStatus(true));
          modalCloseHandler();
          setErrLogin("");
          window.location.href = "/Mainpage";
        }
      })
      .catch((err) => {
        const status = err.response.status;
        if (status === 404) {
          alert("다시 시도해 주세요");
        }
      });
  };

  // 카카오
  const CLIENT_ID: any = process.env.REACT_APP_KAKAO_KEY;
  // const REDIRECT_URL: any = `http://localhost:3000/oauth/kakao`;
  // const KAKAO_AUTH_URL: any = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`;
  // const responseKakao = () => {
  //   window.location.assign(KAKAO_AUTH_URL);
  // };
  // let KAKAO_CODE = new URL(window.location.href).searchParams.get("code");
  // console.log(KAKAO_CODE);
  // 리다이렉트 URL로 인증코드를 발급받는다,
  // 발급 받은 코드를 서버로 전송해 서버에서 토큰을 발급받고,
  // 유저를 확인한 후 클라이언트로 보내줌

  return (
    <div className="signIn">
      <div className="signIn__modal">
        <div className="signIn__contents">
          <div className="signIn__close">
            <div className="signIn__closeBtn" onClick={modalCloseHandler}>
              &times;
            </div>
          </div>
          <div className="signIn__title">
            <img className="signIn__title__img" src="/img/Logo005.png" alt="" />
          </div>

          <input
            className={
              emailValid ? "signIn__inputEmail" : "signIn__inputEmail__inValid"
            }
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => {
              onChangeHandler(e, "Email");
            }}
          />
          <span className="signIn__errEmail">{errEmail}</span>

          <input
            className={
              passwordValid
                ? "signIn__inputPassword"
                : "signIn__inputPassword__inValid"
            }
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              onChangeHandler(e, "Password");
            }}
          />
          <span className="signIn__errPassword">{errPassword}</span>
          <span className="signIn__errLogin">{errLogin}</span>
          <button className="signIn__loginBtn" onClick={loginHandler}>
            로그인
          </button>

          <div className="signIn__Search">
            <button className="signIn__emailSearch" onClick={searchHandler}>
              이메일 찾기
            </button>
            <div>&#124;</div>
            <button className="signIn__pwSearch" onClick={searchHandler}>
              비밀번호 찾기
            </button>
          </div>

          <div className="signIn__social">
            <GoogleLogin
              clientId={clientId}
              render={(renderProps) => (
                <button
                  className="signIn__google"
                  onClick={renderProps.onClick}
                >
                  구글로 로그인하기
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
            {/* <button className="signIn__google">Google</button> */}
            <KakaoLogin
              token={CLIENT_ID}
              onSuccess={(res) => console.log(res)}
              onFail={console.error}
              onLogout={console.info}
              className="signIn__kakao"
              style={{}}
            />
            {/* <button onClick={responseKakao} className="signIn__kakao">
              카카오계정으로 로그인
            </button> */}
            <button className="signIn__nonMember" onClick={nonUserLoginHandler}>
              비회원으로 로그인하기
            </button>
          </div>

          <div className="signIn__signUp">
            <div className="signIn__signUpText">아직 회원이 아니신가요?</div>
            <div
              className="signIn__signUpBtn"
              onClick={() => {
                ModalHandler("SignUp");
              }}
            >
              회원가입
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
