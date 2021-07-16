import { useState } from "react";
import { ValidationPassword } from "../components/ValidationCheck";
import axios from "axios";
import "./CSS/UserInfo.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../reducers";
import { Actions } from "../actions";
import { useHistory } from "react-router-dom";
require("dotenv").config();
axios.defaults.withCredentials = true;
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
  const userInfoURL = `${process.env.REACT_APP_API}/user/userInfo`;
  const tokenURL = `${process.env.REACT_APP_API}/token/refreshToken`;
  const dispatch = useDispatch();
  const history = useHistory();
  const [infors, setInfors]: any = useState<string>("");
  const accessToken: any = useSelector(
    (state: RootReducer) => state.accessTokenReducer
  );
  const setAccessToken = accessToken.AccessToken.accessToken;
  const setRefreshToken = accessToken.AccessToken.refreshToken;
  const userInfoHandler = async () => {
    if (!curPassword) {
      setCurPasswordValid(false);
      setErrCurPassword("현재 비밀번호를 입력해 주세요.");
      return;
    }
    if (!password) {
      setPasswordValid(false);
      setErrPassword("변경하실 비밀번호를 입력해 주세요");
      return;
    }
    if (!passwordCk) {
      setPasswordCKValid(false);
      setErrPasswordCk("변경하실 비밀번호를 다시한번 입력해 주세요");
      return;
    }
    await axios
      .post(
        userInfoURL,
        {
          originalPw: curPassword,
          newPw: password,
        },
        {
          headers: {
            authorization: `Bearer ${setAccessToken}`,
          },
        }
      )
      .then((res) => {
        history.push("./Mypage");
      })
      .catch((err) => {
        const status = err.response.status;
        if (status === 405) {
          setErrCurPassword(
            "현재 비밀번호가 일치하지 않습니다. 다시 입력해주세요"
          );
        }
        if (status === 409) {
          dispatch(Actions.LoginStatus(false));
          const callbackAxios = async () => {
            await axios
              .post(
                tokenURL,
                {},
                {
                  headers: {
                    authorization: `Bearer ${setRefreshToken}`,
                  },
                }
              )
              .then((res) => {
                dispatch(Actions.LoginStatus(true));
                dispatch(
                  Actions.AccessToken(res.data.newAccessToken, setRefreshToken)
                );
              });
          };
          callbackAxios();
        }
      });
  };

  useEffect(() => {
    async function fetchDate() {
      await axios
        .get(userInfoURL, {
          headers: {
            authorization: `Bearer ${setAccessToken}`,
          },
        })
        .then((res) => {
          setInfors(res.data);
        })
        .catch((err) => {
          const status = err.response.status;
          if (status === 409) {
            dispatch(Actions.LoginStatus(false));
            const callbackAxios = async () => {
              await axios
                .post(
                  tokenURL,
                  {},
                  {
                    headers: {
                      authorization: `Bearer ${setRefreshToken}`,
                    },
                  }
                )
                .then((res) => {
                  dispatch(Actions.LoginStatus(true));
                  dispatch(
                    Actions.AccessToken(
                      res.data.newAccessToken,
                      setRefreshToken
                    )
                  );
                });
            };
            callbackAxios();
          }
        });
    }
    fetchDate();
  });

  const modalCloseHandler = () => {
    dispatch(Actions.modalStatus(false));
    dispatch(Actions.modalName(""));
  };

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

  return (
    <div className="UserInfo">
      <div className="UserInfo__modal">
        <div className="UserInfo__contents">
          <div className="UserInfo__close">
            <div className="UserInfo__closeBtn" onClick={modalCloseHandler}>
              &times;
            </div>
          </div>
          <div className="UserInfo__title">
            <img
              className="UserInfo__title__img"
              src="/img/Logo005.png"
              alt=""
            />
          </div>

          <div className="UserInfo__Name">{infors.name}</div>

          <div className="UserInfo__Email">{infors.email}</div>

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
