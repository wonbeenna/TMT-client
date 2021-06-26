import { useState } from "react";
import {
  ValidationEmail,
  ValidationPassword,
} from "../components/ValidationCheck";
import "./CSS/SignIn.css";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { LoginStatus, UserInfo, AccessToken } from "../actions";

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

  const responseGoogle = (response: any) => {
    console.log(response);
    dispatch(UserInfo(response.profileObj.name, response.profileObj.email));
    dispatch(AccessToken(response.accessToken));
    dispatch(LoginStatus(true));
  };

  //-------------- 배포 전에 .env에 넣기 ------------------//
  const clientId =
    "1042773632188-kg96tbbtspt09ros7tpo67h8phguuvkv.apps.googleusercontent.com";

  return (
    <div className="signIn">
      <div className="signIn__modal">
        <div className="signIn__contents">
          <div className="signIn__close">
            <div className="signIn__closeBtn">&times;</div>
          </div>
          <div className="signIn__title">TMT</div>

          <div className="signIn__email">이메일</div>
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
          <div className="signIn__password">비밀번호</div>
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

          <div className="signIn__social">
            <GoogleLogin
              clientId={clientId}
              render={(renderProps) => (
                <button
                  className="signIn__google"
                  onClick={renderProps.onClick}
                >
                  Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
            {/* <button className="signIn__google">Google</button> */}
            <button className="signIn__kakao">Kakao</button>
            <button className="signIn__nonMember">비회원</button>
          </div>

          <div className="signIn__Search">
            <div className="signIn__emailSearch">이메일 찾기</div>
            <div className="signIn__pwSearch">비밀번호 찾기</div>
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
