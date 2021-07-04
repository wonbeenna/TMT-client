import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Link, Router } from "react-router-dom";
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
      <div className="mainpage_leftside">
        <div className="location">
          <div>
            <br />
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
              style={{ width: 400 }}
              renderInput={(params) => (
                <TextField {...params} label="Location" variant="outlined" />
              )}
            />
          </div>
        </div>

        <div className="mainleft_buttoncontainer">
          <Autocomplete
            multiple
            id="tags-outlined"
            options={theme18}
            getOptionLabel={(option) => option.title}
            defaultValue={[theme18[0]]}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Theme"
                placeholder="Favorites"
              />
            )}
          />
          {/* <Autocomplete
            multiple
            id="tags-standard"
            options={theme18}
            getOptionLabel={(option) => option.title}
            defaultValue={[theme18[13]]}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Theme"
                placeholder="Favorites"
              />
            )}
          /> */}
        </div>
        <div className="searchBtn">
          <button onClick={handleSearch}>search</button>
        </div>
        <div className="place">
          <input type="text" list="spotlist" placeholder="Place"></input>
          <button>TMT</button>
        </div>
      </div>

      <div className="mainpage_body">
        <div className='mainleft_list'>
          {/* map으로 사진, 장소 받아 */}
          <li className="mainleft_destination">
            <div className="list_img">
              <img src="../img/pic1.jpeg" alt="tes1" />
            </div>
            <div className="list_content">경복궁</div>
          </li>
          <li className="mainleft_destination">
            <div className="list_img">
              <img src="../img/pic2.jpeg" alt="tes1" />
            </div>
            <div className="list_content">한라산</div>
          </li>
          <li className="mainleft_destination">
            <div className="list_img">
              <img src="../img/pic2.jpeg" alt="tes1" />
            </div>
            <div className="list_content">한라산</div>
          </li>
          <li className="mainleft_destination">
            <div className="list_img">
              <img src="../img/pic2.jpeg" alt="tes1" />
            </div>
            <div className="list_content">한라산</div>
          </li>
          <li className="mainleft_destination">
            <div className="list_img">
              <img src="../img/pic2.jpeg" alt="tes1" />
            </div>
            <div className="list_content">한라산</div>
          </li>
          <li className="mainleft_destination">
            <div className="list_img">
              <img src="../img/pic2.jpeg" alt="tes1" />
            </div>
            <div className="list_content">한라산</div>
          </li>
          <li className="mainleft_destination">
            <div className="list_img">
              <img src="../img/pic2.jpeg" alt="tes1" />
            </div>
            <div className="list_content">한라산</div>
          </li>
          <li className="mainleft_destination">
            <div className="list_img">
              <img src="../img/pic2.jpeg" alt="tes1" />
            </div>
            <div className="list_content">한라산</div>
          </li>
          <li className="mainleft_destination">
            <div className="list_img">
              <img src="../img/pic2.jpeg" alt="tes1" />
            </div>
            <div className="list_content">한라산</div>
          </li>
          <li className="mainleft_destination">
            <div className="list_img">
              <img src="../img/pic2.jpeg" alt="tes1" />
            </div>
            <div className="list_content">한라산</div>
          </li>
          <li className="mainleft_destination">
            <div className="list_img">
              <img src="../img/pic2.jpeg" alt="tes1" />
            </div>
            <div className="list_content">한라산</div>
          </li>
          <li className="mainleft_destination">
            <div className="list_img">
              <img src="../img/pic2.jpeg" alt="tes1" />
            </div>
            <div className="list_content">한라산</div>
          </li>
        </div>

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
