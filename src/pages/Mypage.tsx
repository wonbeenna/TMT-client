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
  const { isLogin } = useSelector((state: RootReducer) => state.LoginReducer);
  const [likePlace, setLikePlace] = useState<any>([]);
  const likeURL = `${process.env.REACT_APP_API}/user/like`;
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

  useEffect(() => {
    const fetchData = async () => {
      if (isLogin) {
        await axios
          .get(likeURL, {
            headers: {
              authorization: `Bearer ${setAccessToken}`,
            },
          })
          .then((res) => {
            if (res.data.length === 0) {
              return;
            } else {
              setLikePlace(res.data)
              console.log('www', res.data)
            }
          });
      } else {
        setLikePlace([]);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Modal />

      <Header />
      {/* <MyMap /> */}
      <div className="mypage">
        <div className="mypageside">
          <div className="route">
            <div className="route_title"> 경로</div>
            <MyTriproute myplace={myplace} />
          </div>
        </div>
        <div className="mypageLeft">
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
            <UserLike likePlace={likePlace} />
          </div>
        </div>
        <div className="mypageLeft">
          <div className="MapWrap">
            <MyMap className="MyMap1" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withRouter(Mypage);
