import React, { useState, useEffect } from "react";
import MyMap from "../components/MyMap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MyTriproute from "../components/MyTriproute"
import UserLike from "../components/UserLike"
import { DayPickerRangeController, FocusedInputShape } from "react-dates";
import "./CSS/Mypage.css";
import "react-dates/initialize";
import moment from "moment";
import Modal from "../components/Modal";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducer } from "../reducers";
import axios from "axios";

const Mypage = () => {
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );
  const [startdate, setStartdate] = useState<string | null>(null);
  const [enddate, setEnddate] = useState<string | null>(null);
  const startDate = moment(startdate);
  const endDate = moment(enddate);

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

  const [myplace, setMyplace] = useState<Array<object>>([]);

  const searchURL = `${process.env.REACT_APP_API}/user/myPage`;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(searchURL, {
        headers: {
          authorization: `Bearer ${setAccessToken}`,
        },
      });

      setMyplace(response.data.spot);
      setStartdate(response.data.startDate)
      setEnddate(response.data.endDate)
      console.log('myres1', response.data.startDate, response.data.endDate)
      console.log(typeof (response.data.endDate))
    }
    fetchData();
  }, [setMyplace]);

  console.log('startDate,endDate', startDate, endDate)
  // const _startDate = moment(startDate).format("YYYY-MM-DD");
  // const _endDate = moment(endDate).format("YYYY-MM-DD");

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

  console.log('likePlace', likePlace)

  return (
    <>
      <Modal />
      <Header />
      {/* <MyMap /> */}
      <div className="mypage">
        <div className="mypageMap">

          <div className="MapWrap">
            {/* <MyMap /> */}
          </div>
          <div className="route">
            <div className="route_title">여행 경로</div>
            <MyTriproute
              myplace={myplace} />

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
            <UserLike likePlace={likePlace} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withRouter(Mypage);
