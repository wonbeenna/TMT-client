import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "../actions";
import {
  ValidationName,
  ValidationEmail,
  ValidationPassword,
} from "../components/ValidationCheck";
import "./CSS/SignUp.css";
require("dotenv").config();

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCk, setPasswordCk] = useState("");
  const [nameValid, setNameValid] = useState<boolean>(true);
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const [passwordCkValid, setPasswordCKValid] = useState<boolean>(true);
  const [errName, setErrName] = useState<string>("");
  const [errEmail, setErrEmail] = useState<string>("");
  const [errPassword, setErrPassword] = useState<string>("");
  const [errPasswordCk, setErrPasswordCk] = useState<string>("");
  const dispatch = useDispatch();

  const ModalHandler = (name: string) => {
    dispatch(Actions.modalStatus(true));
    dispatch(Actions.modalName(name));
  };
  const modalCloseHandler = () => {
    dispatch(Actions.modalStatus(false));
    dispatch(Actions.modalName(""));
  };
  // 이름, 이메일, 비밀번호, 비밀번호체크 유효성 검사
  const onChangeHandler = (event: any, type: string): void => {
    if (type === "Name") {
      setName(event.target.value);
      if (event.target.value.length === 0) {
        setNameValid(true);
        setErrName("");
      } else if (ValidationName(event.target.value)) {
        setNameValid(true);
        setErrName("");
      } else {
        setNameValid(false);
        setErrName("이름을 정확하게 입력해주세요");
      }
    } else if (type === "Email") {
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
    } else if (type === "Password") {
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

      if (passwordCk === event.target.value) {
        setPasswordCKValid(true);
        setErrPasswordCk("");
      }
    } else if (type === "PasswordCk") {
      setPasswordCk(event.target.value);
      if (event.target.value.length === 0) {
        setPasswordCKValid(true);
        setErrPasswordCk("");
      } else if (password === event.target.value) {
        setPasswordCKValid(true);
        setErrPasswordCk("");
      } else {
        setPasswordCKValid(false);
        setErrPasswordCk("비밀번호가 일치하지 않습니다");
      }
    }
  };

  const handleSignUp = async () => {
    if (!name) {
      setNameValid(false);
      setErrName("이름을 입력해 주세요");
      return;
    }
    if (!email) {
      setEmailValid(false);
      setErrEmail("이메일을 입력해 주세요");
      return;
    }
    if (!password) {
      setPasswordValid(false);
      setErrPassword("비밀번호를 입력해 주세요");
      return;
    }
    if (!passwordCk) {
      setPasswordCKValid(false);
      setErrPasswordCk("비밀번호를 확인해 주세요");
      return;
    }
    if (password !== passwordCk) {
      return;
    }

    const signUpURL = `${process.env.REACT_APP_API}/user/signUp`;
    await axios
      .post(signUpURL, {
        name,
        email,
        ...(password ? { password: password } : {}),
      })
      .then((res) => {
        ModalHandler("SignIn");
      })
      .catch((err) => {
        const status = err.response.status;
        if (status === 409) {
          setErrEmail("이미 사용중인 이메일 입니다");
        }
      });
  };

  return (
    <div className="signUp">
      <div className="signUp__modal">
        <div className="signUp__contents">
          <div className="signUp__close">
            <div className="signUp__closeBtn" onClick={modalCloseHandler}>
              &times;
            </div>
          </div>
          <div className="signUp__title">
            <img className="signUp__title__img" src="/img/Logo005.png" alt="" />
          </div>

          <input
            className={
              nameValid ? "signUp__inputName" : "signUp__inputName__inValid"
            }
            name="name"
            type="name"
            placeholder="Name"
            onChange={(e) => {
              onChangeHandler(e, "Name");
            }}
          />
          <span className="signUp__errName">{errName}</span>

          <input
            className={
              emailValid ? "signUp__inputEmail" : "signUp__inputEmail__inValid"
            }
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => {
              onChangeHandler(e, "Email");
            }}
          />
          <span className="signUp__errEmail">{errEmail}</span>

          <input
            className={
              passwordValid
                ? "signUp__inputPassword"
                : "signUp__inputPassword__inValid"
            }
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              onChangeHandler(e, "Password");
            }}
          />
          <span className="signUp__errPassword">{errPassword}</span>

          <input
            className={
              passwordCkValid
                ? "signUp__inputPasswordCheck"
                : "signUp__inputPasswordCheck__inValid"
            }
            name="passwordCheck"
            type="password"
            placeholder="Password Check"
            onChange={(e) => {
              onChangeHandler(e, "PasswordCk");
            }}
          />
          <span className="signUp__errPasswordCk">{errPasswordCk}</span>

          <button className="signUp__SignUpBtn" onClick={handleSignUp}>
            회원가입
          </button>

          {/* <div className="signUp__social">
            <button className="signUp__google">Google</button>
            <button className="signUp__kakao">Kakao</button>
          </div> */}

          <div className="signUp__signIn">
            <div className="signUp__signInText">이미 회원 이신가요?</div>
            <div
              className="signUp__signInBtn"
              onClick={() => {
                ModalHandler("SignIn");
              }}
            >
              로그인
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
