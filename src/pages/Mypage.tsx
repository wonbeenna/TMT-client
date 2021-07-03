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
  // const [startDate, setStartDate] = useState(new Date())
  // const [state, setState] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: null,
  //     key: "selection",
  //   },
  // ]);

  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );
  const { startDate } = useSelector(
    (state: RootState) => state.RangeControllerReducer
  );
  console.log(startDate);

  const { endDate } = useSelector(
    (state: RootState) => state.RangeControllerReducer
  );
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
            />
            {/* <Calendar onChange={(date: Date) => setDate(date)} /> */}
            {/* <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)}
                        /> */}
          </div>
          <div className="like">여행지like</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Mypage;
