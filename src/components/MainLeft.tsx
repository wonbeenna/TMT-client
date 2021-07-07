import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Placelist from "./Placelist";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Map from "./Map";
import "./CSS/MainLeft.css";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import moment, { Moment } from "moment";
import "moment/locale/ko";
import "react-dates/initialize";
import "./CSS/_datepicker.css";
import { useDispatch } from "react-redux";
import { Actions } from "../actions";
import InputList from "./InputList";
import axios from "axios";
require("dotenv").config();

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

  const [province, setProvince] = useState<number | null>(null);
  const [theme, setTheme] = useState<string | null>(null);
  const [placedata, setPlacedata]: any = useState<string | any>([]);

  const changeHandler = (event: any, type: string): void => {
    if (type === "location") {
      //num로 보내려고 index값을 상태값업데이트함 => 숫자가 랜덤으로 바뀜
      // const spot = event.target.innerText
      // setProvince(options.indexOf(spot))
      setProvince(event.target.innerText);
      console.log("province", province);
      // console.log('spot', spot)
    }
    if (type === "theme") {
      setTheme(event.target.value);
      console.log(event);
    }
  };

  const handleSearch = (): void => {
    const searchURL = `${process.env.REACT_APP_API}/trip/list`;
    // if (!province) {
    //   setValue(null)
    // }
    axios
      .post(
        searchURL,
        {
          //state값으로
          // province: province,
          // theme: theme

          //임의값으로
          province: null,
          theme: ["야경"],
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("res.data", res.data);
        setPlacedata(res.data);
        // console.log("res.data[0].place: ", res.data[0].place);
        // console.log("placedata[0].place: ", placedata[0].place);
        // console.log("placedata: ", placedata);
        // console.log("placedata.place: ", placedata.place);

        //--->새로고침하면 place를 읽지못하더라... 왜그러지

        // console.log('num', placedata.indexOf(1))
      })
      .catch((err) => console.log("err", err));
  };
  console.log(placedata);
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
  };
  const _startDate = moment(startDate).format("YYYY-MM-DD");
  const _endDate = moment(endDate).format("YYYY-MM-DD");
  dispatch(Actions.RangeController(_startDate, _endDate));

  const handleFocusChange = (arg: FocusedInputShape | null) => {
    setFocusedInput(arg);
  };

  return (
    <div className="mainpage_wrap">
      <div className="mainpage_top">
        <div className="location">
          <Autocomplete
            value={value}
            onChange={(event: any, newValue: string | null) => {
              setValue(newValue);
              changeHandler(event, "location");
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
        <div className="mainpage_plancontainer">
          <Autocomplete
            multiple
            id="tags"
            options={theme18}
            getOptionLabel={(option) => option.title}
            // defaultValue={[theme18[0]]}
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
            <button
              className="themeButton"
              onClick={handleSearch}
              title="지역&테마로 검색"
            >
              <div className="themeEff"></div>
              <a>search</a>
            </button>
          </div>
        </div>

        <DateRangePicker
          startDate={startDate}
          startDateId="startDate"
          endDate={endDate}
          endDateId="endDate"
          onDatesChange={handlendDatesChange}
          focusedInput={focusedInput}
          onFocusChange={handleFocusChange}
          startDatePlaceholderText={"여행 시작일"}
          endDatePlaceholderText={"여행 종료일"}
          isOutsideRange={(day) => moment().diff(day) >= 0}
          monthFormat={"YYYY년 MM월"}
          minimumNights={0}
          block
          noBorder
          showClearDates
        />
        <div className="place">
          <input type="text" list="spotlist" placeholder="Place"></input>
          <button title="장소로 검색">TMT</button>
        </div>
      </div>

      <div className="mainpage_body">
        <ul className="mainleft_list">
          <div className="mainleft_title">검색결과</div>
          {/* map으로 사진, 장소 받아 */}

          {/* {Object.values(placedata).map((el: any, idx: number) => (
            <Placelist key={idx} place={el.place} />
          ))} */}
          {/* placedata = [ {0}, {1}, {2}] */}
          {placedata.map((el: any, idx: number) => {
            return (
              <Placelist
                key={idx}
                place={el.place}
                address={el.address}
              ></Placelist>
            );
          })}
          {placedata.map((el: any, idx: number) => {
            return (
              <Placelist
                key={idx}
                place={el.place}
                address={el.address}
              ></Placelist>
            );
          })}
          {placedata.map((el: any, idx: number) => {
            return (
              <Placelist
                key={idx}
                place={el.place}
                address={el.address}
              ></Placelist>
            );
          })}
          {placedata.map((el: any, idx: number) => {
            return (
              <Placelist
                key={idx}
                place={el.place}
                address={el.address}
              ></Placelist>
            );
          })}
          {placedata.map((el: any, idx: number) => {
            return (
              <Placelist
                key={idx}
                place={el.place}
                address={el.address}
              ></Placelist>
            );
          })}
          {placedata.map((el: any, idx: number) => {
            return (
              <Placelist
                key={idx}
                place={el.place}
                address={el.address}
              ></Placelist>
            );
          })}
        </ul>

        <div id="map">
          <Map /*setCenter={setCenter}*/ />
          <InputList />
        </div>
      </div>
    </div>
  );
};

export default Mainleftpage;
