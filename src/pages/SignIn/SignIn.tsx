import { useState } from "react";
import {
  ValidationEmail,
  ValidationPassword,
} from "../../modules/utils/ValidationCheck";
import "./SignIn.css";
import GoogleLogin from "react-google-login";
import KakaoLogin from "react-kakao-login";
import { useDispatch } from "react-redux";
import { Actions } from "../../modules/api";
import { googleReq, kakaoReq, nonUserReq } from "../../modules/api/user";
require("dotenv").config();

function SignIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const [errEmail, setErrEmail] = useState<string>("");
  const [errPassword, setErrPassword] = useState<string>("");

  const ModalHandler = (name: string) => {
    dispatch(Actions.modalActions.modalStatus(true));
    dispatch(Actions.modalActions.modalName(name));
  };
  const modalCloseHandler = () => {
    dispatch(Actions.modalActions.modalStatus(false));
    dispatch(Actions.modalActions.modalName(""));
  };
  // 이메일, 비밀번호 유효성 검사
  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ): void => {
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
    if (!emailValid) {
      setEmailValid(false);
      setErrEmail("이메일을 입력해 주세요");
    }
    if (!passwordValid) {
      setPasswordValid(false);
      setErrPassword("비밀번호를 입력해 주세요");
    }
    dispatch(Actions.signInReq({ email, password }));
  };

  const nonUserLoginHandler = () => {
    dispatch(nonUserReq());
  };
  // 구글
  const clientId: any = process.env.REACT_APP_GOOGLE_API;
  const responseGoogle = async (response: any) => {
    dispatch(googleReq(response));
  };

  // 카카오
  const CLIENT_ID: any = process.env.REACT_APP_KAKAO_KEY;
  const responseKakao = async (res: any) => {
    dispatch(kakaoReq(res));
  };

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
          <button className="signIn__loginBtn" onClick={loginHandler}>
            로그인
          </button>

          <div className="signIn__Search">
            <button
              className="signIn__emailSearch"
              onClick={() => {
                ModalHandler("EmailCheck");
              }}
            >
              이메일 찾기
            </button>
            <div>&#124;</div>
            <button
              className="signIn__pwSearch"
              onClick={() => {
                ModalHandler("PasswordCheck");
              }}
            >
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
            <KakaoLogin
              token={CLIENT_ID}
              onSuccess={(res) => responseKakao(res)}
              onFail={console.error}
              onLogout={console.info}
              className="signIn__kakao"
              style={{}}
            />
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
