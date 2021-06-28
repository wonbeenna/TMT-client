import { useState } from "react";
import {
  ValidationEmail,
  ValidationPassword,
} from "../components/ValidationCheck";
import "./CSS/SignIn.css";
import GoogleLogin from "react-google-login";
import KakaoLogin from "react-kakao-login";
import { useDispatch } from "react-redux";
import { LoginStatus, UserInfo, AccessToken } from "../actions";
import { isNonNullExpression } from "typescript";
require("dotenv").config();

function SignIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const [errEmail, setErrEmail] = useState<string>("");
  const [errPassword, setErrPassword] = useState<string>("");

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

  // 구글
  const clientId: any = process.env.REACT_APP_GOOGLE_API;
  const responseGoogle = (response: any) => {
    console.log(response);
    dispatch(UserInfo(response.profileObj.name, response.profileObj.email));
    dispatch(AccessToken(response.accessToken));
    dispatch(LoginStatus(true));
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
            <div className="signIn__closeBtn">&times;</div>
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
          <button className="signIn__loginBtn">로그인</button>

          <div className="signIn__Search">
            <div className="signIn__emailSearch">이메일 찾기</div>
            <div>&#124;</div>
            <div className="signIn__pwSearch">비밀번호 찾기</div>
          </div>

          <div className="signIn__social">
            <GoogleLogin
              clientId={clientId}
              render={(renderProps) => (
                <button
                  className="signIn__google"
                  onClick={renderProps.onClick}
                >
                  구글계정으로 로그인
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
            <button className="signIn__nonMember">비회원으로 로그인</button>
          </div>

          <div className="signIn__signUp">
            <div className="signIn__signUpText">아직 회원이 아니신가요?</div>
            <div className="signIn__signUpBtn">회원가입</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
