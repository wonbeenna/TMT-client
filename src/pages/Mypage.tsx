import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MyMap from "../components/MyMap";
import Modal from "../components/Modal";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserLike from "../components/UserLike";
import MyTriproute from "../components/MyTriproute";
import moment from "moment";
import { DayPickerRangeController, FocusedInputShape } from "react-dates";
import "./CSS/Mypage.css";
import "react-dates/initialize";
import axios from "axios";
import requests from "../modules/utils/requests";
import { RootReducer } from "../modules/reducer";
import { Actions } from "../modules/api";
axios.defaults.withCredentials = true;
const Mypage = () => {
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );
  const dispatch = useDispatch();
  const { myListData }: any = useSelector(
    (state: RootReducer) => state.myPlaceListReducer
  );
  console.log(myListData);
  const startDate = moment(myListData?.startDate);
  const endDate = moment(myListData?.endDate);

  const handlendDatesChange = (arg: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => {
    console.log(arg.startDate);
    console.log(arg.endDate);
  };

  const accessToken: any = useSelector(
    (state: RootReducer) => state.accessTokenReducer
  );

  const setAccessToken = accessToken.AccessToken.accessToken;

  useEffect(() => {
    dispatch(Actions.myPlaceListReq(setAccessToken));
  }, [setAccessToken]);

  const msDiff =
    new Date(myListData?.startDate).getTime() -
    new Date(myListData?.endDate).getTime();
  const range = Math.abs(msDiff / (1000 * 60 * 60 * 24)) + 1;

  return (
    <>
      <div className="myPage">
        <Modal />
        <Header />
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
                numberOfMonths={1}
                monthFormat={"YYYY년 MM월"}
              />
            </div>
          </div>
          <div className="myPage__section__route__title">
            <h1>나의 여행 경로</h1>
          </div>
          <div className="myPage__section__route">
            <MyTriproute myplace={myListData} />
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
