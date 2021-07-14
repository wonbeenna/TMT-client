import React, { useState, useEffect } from "react";
import MyMap from "../components/MyMap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserLike from "../components/UserLike";
import MyTriproute from "../components/MyTriproute";

import { DayPickerRangeController, FocusedInputShape } from "react-dates";
import "./CSS/Mypage.css";
import "react-dates/initialize";
import moment, { Moment } from "moment";
import Modal from "../components/Modal";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducer } from "../reducers";
import axios from "axios";

const Mypage = () => {
  const [myplace, setMyPlace] = useState<Array<object>>([]);
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );
  const accessToken: any = useSelector(
    (state: RootReducer) => state.accessTokenReducer
  );
  const setAccessToken = accessToken.AccessToken.accessToken;
  const searchURL = `${process.env.REACT_APP_API}/user/myPage`;

  const _startDate = moment(startDate);
  const _endDate = moment(endDate);

  const handlendDatesChange = (arg: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => {
    console.log(arg.startDate);
    console.log(arg.endDate);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(searchURL, {
        headers: {
          authorization: `Bearer ${setAccessToken}`,
        },
      });

      setMyPlace(response.data.spot);
      setStartDate(moment(response.data.startDate));
      setEndDate(moment(response.data.endDate));
    }
    fetchData();
  }, []);

  console.log(_startDate);
  console.log(_endDate);


  const { isLogin } = useSelector((state: RootReducer) => state.LoginReducer);
  const [likePlace, setLikePlace] = useState<any>([]);
  const likeURL = `${process.env.REACT_APP_API}/user/like`;

  useEffect(() => {
    const fetchData = async () => {
      if (isLogin) {
        await axios
          .get(likeURL, {
            headers: {
              authorization: `Bearer ${setAccessToken}`,
            },
          })
          .then((res) => setLikePlace(res.data.place));
      } else {
        setLikePlace([]);
      }
    };
    fetchData();
  }, []);

  console.log('likePlace_Mypage', likePlace)

  return (
    <>
      <Modal />

      <Header />
      {/* <MyMap /> */}
      <div className="mypage">
        <div className="mypageMap">
          <div className="MapWrap">
            <MyMap />
          </div>
          <div className="route">
            <div className="route_title">여행 경로</div>
            <MyTriproute myplace={myplace} />
          </div>
        </div>
        <div className="mypageMap">
          <div className="calendar">
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
          <div className="like">
            여행지like
            {/* <UserLike likePlace={likePlace} /> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withRouter(Mypage);
