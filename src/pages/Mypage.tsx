import React, { useState, useEffect } from "react";
import MyMap from "../components/MyMap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserLike from "../components/UserLike";
import MyTriproute from "../components/MyTriproute";
import { DayPickerRangeController, FocusedInputShape } from "react-dates";
import "./CSS/Mypage.css";
import "react-dates/initialize";
import moment from "moment";
import Modal from "../components/Modal";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducer } from "../reducers";
import axios from "axios";
axios.defaults.withCredentials = true;
const Mypage = () => {
  const [myplace, setMyPlace] = useState<any>({});
  const [_startDate, _setStartDate] = useState<any>();
  const [_endDate, _setEndDate] = useState<any>();
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );
  const accessToken: any = useSelector(
    (state: RootReducer) => state.accessTokenReducer
  );
  const setAccessToken = accessToken.AccessToken.accessToken;
  const searchURL = `${process.env.REACT_APP_API}/user/myPage`;

  const startDate = moment(_startDate);
  const endDate = moment(_endDate);

  const handlendDatesChange = (arg: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => {
    console.log(arg.startDate);
    console.log(arg.endDate);
  };

  useEffect(() => {
    async function fetchData() {
      const response: any = await axios.get(searchURL, {
        headers: {
          authorization: `Bearer ${setAccessToken}`,
        },
      });
      if (response.data === null || response.data === undefined) {
        return;
      } else {
        setMyPlace(response.data);
        _setStartDate(response.data.startDate);
        _setEndDate(response.data.endDate);
      }
    }
    fetchData();
  }, []);

  const msDiff = new Date(_startDate).getTime() - new Date(_endDate).getTime();
  const range = Math.abs(msDiff / (1000 * 60 * 60 * 24)) + 1;

  return (
    <>
      <div className="myPage">
        <Modal />
        <Header />
        {/* <MyMap /> */}
        <div className="myPage__warp">
          <div className="myPage__title">
            <h1>{range}일 간의 여행 일정</h1>
          </div>
          <div className="myPage__section">
            <div className="myPage__Map">
              <MyMap />
            </div>
            <div className="myPage__calendar">
              <DayPickerRangeController
                startDate={startDate}
                endDate={endDate}
                onDatesChange={handlendDatesChange}
                focusedInput={focusedInput}
                onFocusChange={setFocusedInput}
                initialVisibleMonth={null}
                numberOfMonths={2}
                monthFormat={"YYYY년 MM월"}
              />
            </div>
          </div>
          <div className="myPage__section__route__title">
            <h4>나의 여행 경로</h4>
          </div>
          <div className="myPage__section__route">
            <MyTriproute myplace={myplace} />
          </div>
          <div className="myPage__like__title">
            <h1>좋아요 목록</h1>
          </div>
          <div className="myPage__like">
            <UserLike />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default withRouter(Mypage);
