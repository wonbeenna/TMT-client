import React, { useState, useEffect } from "react";
import MyMap from "../components/MyMap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MyTriproute from "../components/MyTriproute"
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
  const startDate = moment("2021-07-01");
  const endDate = moment("2021-07-10");

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

      console.log('myres1', response.data.spot)
    }
    fetchData();
  }, [setMyplace]);




  // response.data
  // {spot: Array(2), startDate: "2021-07-13", endDate: "2021-07-13"}
  // response.data.spot
  // [Array(1), Array(1)]
  // -> place: response.data.spot.map(el.place, el.address, )
  // 여기서 lat, long받을수있는데 이걸 mymap에 뿌려줄까?
  return (
    <>
      <Modal />
      <Header />
      <MyMap />
      <div className="mypage">
        <div className="mypageMap">

          <div className="MapWrap">
            <MyMap />
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
          {/* <div className="like"> */}
          여행지like
          {/* </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withRouter(Mypage);
