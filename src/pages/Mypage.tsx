import React, { useState } from "react";
import Map from "../components/Map";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { DayPickerRangeController, FocusedInputShape } from "react-dates";
import "./CSS/Mypage.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/index";
import "react-dates/initialize";
import "../components/CSS/_datepicker.css";
import moment from "moment";

const Mypage = () => {
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );
  const startDate = moment("2021-07-01");
  const endDate = moment("2021-07-10");
  console.log(startDate);
  console.log(endDate);

  const handlendDatesChange = (arg: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => {
    console.log(arg.startDate);
    console.log(arg.endDate);
  };

  return (
    <>
      <Header />
      <div className="mypage">
        <div className="mypageMap">
          <Map />
          <div className="route">여행 경로</div>
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
          <div className="like">여행지like</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Mypage;
