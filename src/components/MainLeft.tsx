import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Map from "./Map";
import "./CSS/MainLeft.css";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import moment, { Moment } from "moment";
import "react-dates/initialize";
import "./CSS/_datepicker.css";
import { useDispatch } from "react-redux";
import { RangeController } from "../actions";


const options = [
  "서울",
  "인천",
  "대전",
  "대구",
  "울산",
  "부산",
  "광주",
  "경기",
  "강원도",
  "충청북도",
  "충청남도",
  "경상북도",
  "경상남도",
  "전라북도",
  "전라남도",
  "제주도",
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 500,
      "& > * + *": {
        marginTop: theme.spacing(3),
      },
    },
  })
);

const Mainleftpage = () => {
  const [value, setValue] = React.useState<string | null>(options[0]);
  const [inputValue, setInputValue] = React.useState("");
  const theme18 = [
    { title: "레저" },
    { title: "바다" },
    { title: "산" },
    { title: "드라이브" },
    { title: "사진" },
    { title: "야경" },
    { title: "캠핑" },
    { title: "맛집" },
    { title: "노을" },
    { title: "휴식&힐링" },
    { title: "역사&문화" },
    { title: "데이트" },
    { title: "일출" },
    { title: "강" },
    { title: "가족" },
    { title: "계곡" },
    { title: "섬" },
    { title: "랜드마크" },
  ];

  const handleSearch = () => {
    // post => res
  };

  const classes = useStyles();

  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );

  const dispatch = useDispatch();
  const handlendDatesChange = (arg: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => {
    setStartDate(arg.startDate);
    setEndDate(arg.endDate);
    console.log(arg.startDate);
    console.log(arg.endDate);
  };
  dispatch(RangeController(startDate, endDate));

  const _startDate = moment(startDate).format("YYYY-MM-DD");
  const _endDate = moment(endDate).format("YYYY-MM-DD");
  console.log(_startDate);
  console.log(_endDate);

  const handleFocusChange = (arg: FocusedInputShape | null) => {
    setFocusedInput(arg);
  };

  return (
    <div className="leftsidewrap">
      <div className="mainpage_top">
        <div className="location">
          <Autocomplete
            value={value}
            onChange={(event: any, newValue: string | null) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            renderInput={(params) => (
              <TextField {...params} label="Location" variant="standard" />
            )}
          />
        </div>
        <div className="mainleft_buttoncontainer">
          <Autocomplete
            multiple
            id="tags"
            options={theme18}
            getOptionLabel={(option) => option.title}
            defaultValue={[theme18[0]]}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Theme"
              // placeholder="Favorites"
              />
            )}
          />
          <div className="searchBtn">
            <button className="themeButton" onClick={handleSearch} title="지역&테마로 검색">
              <div className="themeEff"></div><a>search</a></button>
          </div>
        </div>
        <div className="place">
          <input type="text" list="spotlist" placeholder="Place"></input>
          <button title="장소로 검색">TMT</button>
        </div>
      </div>

      <div className="mainpage_body">
        <ul className='mainleft_list'>

          {/* map으로 사진, 장소 받아 */}
          <li className="mainleft_destination">
            <div className="destination_list">
              <img src="../img/pic1.jpeg" alt="tes1" />
            </div>
            <div className="list_content">경복궁</div>
          </li>

          <li className="mainleft_destination">
            <div className="destination_list">
              <img src="../img/pic1.jpeg" alt="tes1" />
            </div>
            <div className="list_content">경복궁</div>
          </li>

          <li className="mainleft_destination">
            <div className="destination_list">
              <img src="../img/pic1.jpeg" alt="tes1" />
            </div>
            <div className="list_content">경복궁</div>
          </li>

          <li className="mainleft_destination">
            <div className="destination_list">
              <img src="../img/pic2.jpeg" alt="tes1" />
            </div>
            <div className="list_content">한라산</div>
          </li>

          <li className="mainleft_destination">
            <div className="destination_list">
              <img src="../img/pic2.jpeg" alt="tes1" />
            </div>
            <div className="list_content">한라산</div>
          </li>

          <li className="mainleft_destination">
            <div className="destination_list">
              <img src="../img/pic2.jpeg" alt="tes1" />
            </div>
            <div className="list_content">한라산</div>
          </li>

        </ul>
        <div id="map">
          <Map /*setCenter={setCenter}*/ />
        </div>
        <DateRangePicker
          startDate={startDate}
          startDateId="startDate"
          endDate={endDate}
          endDateId="endDate"
          onDatesChange={handlendDatesChange}
          focusedInput={focusedInput}
          onFocusChange={handleFocusChange}
          startDatePlaceholderText={"여행 시작"}
          endDatePlaceholderText={"여행 끝"}
          isOutsideRange={(day) => moment().diff(day) >= -1}
          monthFormat={"YYYY년 MM월"}
          minimumNights={0}
          block
          noBorder
          showClearDates
        />
      </div>
    </div>
  );
};

export default Mainleftpage;
