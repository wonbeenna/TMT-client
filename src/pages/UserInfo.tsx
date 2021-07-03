import { useState } from "react";
import { ValidationPassword } from "../components/ValidationCheck";
import axios from "axios";
import "./CSS/UserInfo.css";

function UserInfo() {
  const [curPassword, setCurPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCk, setPasswordCk] = useState("");
  const [curPasswordValid, setCurPasswordValid] = useState<boolean>(true);
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const [passwordCkValid, setPasswordCKValid] = useState<boolean>(true);
  const [errCurPassword, setErrCurPassword] = useState<string>("");
  const [errPassword, setErrPassword] = useState<string>("");
  const [errPasswordCk, setErrPasswordCk] = useState<string>("");

  const onChangeHandler = (event: any, type: string): void => {
    if (type === "curPassword") {
      setCurPassword(event.target.value);
      if (event.target.value.length === 0) {
        setCurPasswordValid(true);
        setErrCurPassword("");
      } else if (ValidationPassword(event.target.value)) {
        setCurPasswordValid(true);
        setErrCurPassword("");
      } else {
        setCurPasswordValid(false);
        setErrCurPassword(
          "현재 비밀번호는 영문, 숫자, 특수문자를 포함해 8자리 이상 입니다"
        );
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

  const userInfoURL = "http://localhost:4000/user/userInfo";
  const userInfoHandler = (): void => {
    if (!curPassword) {
      setCurPasswordValid(false);
      setErrCurPassword("현재 비밀번호를 입력해 주세요.");
    }
    if (!password) {
      setPasswordValid(false);
      setErrPassword("변경하실 비밀번호를 입력해 주세요");
    }
    if (!passwordCk) {
      setPasswordCKValid(false);
      setErrPasswordCk("변경하실 비밀번호를 다시한번 입력해 주세요");
    }
  };

  return (
    <div className="UserInfo">
      <div className="UserInfo__modal">
        <div className="UserInfo__contents">
          <div className="UserInfo__close">
            <div className="UserInfo__closeBtn">&times;</div>
          </div>
          <div className="UserInfo__title">
            <img
              className="UserInfo__title__img"
              src="/img/Logo005.png"
              alt=""
            />
          </div>

          <div className="UserInfo__Name">{}</div>

          <div className="UserInfo__Email">{}</div>

          <input
            className={
              curPasswordValid
                ? "UserInfo__curPassword"
                : "UserInfo__curPassword__inValid"
            }
            name="curPassword"
            type="password"
            placeholder="현재 비밀번호"
            onChange={(e) => {
              onChangeHandler(e, "curPassword");
            }}
          />
          <span className="UserInfo__errCurPassword">{errCurPassword}</span>

          <input
            className={
              passwordValid
                ? "UserInfo__Password"
                : "UserInfo__Password__inValid"
            }
            name="password"
            type="password"
            placeholder="새 비밀번호"
            onChange={(e) => {
              onChangeHandler(e, "Password");
            }}
          />
          <span className="UserInfo__errPassword">{errPassword}</span>

          <input
            className={
              passwordCkValid
                ? "UserInfo__PasswordCk"
                : "UserInfo__PasswordCk__inValid"
            }
            name="passwordCheck"
            type="password"
            placeholder="새 비밀번호 확인"
            onChange={(e) => {
              onChangeHandler(e, "PasswordCk");
            }}
          />
          <span className="UserInfo__errPasswordCk">{errPasswordCk}</span>

          <button className="UserInfo__Btn" onClick={userInfoHandler}>
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
