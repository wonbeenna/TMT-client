import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Placelist from "./Placelist";
import "./CSS/MainLeft.css";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import moment, { Moment } from "moment";
import "moment/locale/ko";
import "react-dates/initialize";
import "./CSS/_datepicker.css";
import { useDispatch } from "react-redux";
import { Actions } from "../actions";
import axios from "axios";
import InputList from "./InputList";
import Paging from "./Pagination";

require("dotenv").config();

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

  const [inputElement, setInputElement] = useState<string | any>(null)
  const [value, setValue] = React.useState<string | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [province, setProvince] = useState<string | null>("");
  const [theme, setTheme] = useState<string | any>(null)
  const [placedata, setPlacedata]: any = useState<string | any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const handlePlace = () => {
    // console.log('Click');
    const searchURL = `${process.env.REACT_APP_API}/trip/search`;
    axios
      .post(
        searchURL,
        {
          //state값으로
          inputElement: inputElement,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log('res', res.data)
      })
      .catch((err) => console.log("err", err));
  };
  const placeHandler = (event: any) => {
    setInputElement(event.target.value)
  }

  const locationHandler = (event: any, type: string): void => {
    if (type === "location") {
      console.log('location', event.target.innerText)
      setProvince(event.target.innerText);
    }
  };
  console.log('setProvince', province)

  const themeHandler = (event: any, type: string): void => {
    if (type === "theme") {
      console.log('theme', event.target.innerText)
      setTheme(event.target.innerText)
    }
  }

  const handleSearch = () => {
    const searchURL = `${process.env.REACT_APP_API}/trip/list`;
    console.log('province', province)
    axios
      .post(
        searchURL,
        {
          'province': province,
          'theme': theme
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log('res1', res.data)
        setPlacedata(res.data);
      })
      .catch((err) => console.log("err", err));
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = placedata.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
    <div className="mainleft_warp">
      <div className="mainpage_wrap">
        <div className="mainpage_top"></div>
      </div>

      <div className="mainleft_container">
        <div className="place">
          <input
            className="mainleft_placeInput"
            type="text"
            list="spotlist"
            placeholder="지역, 테마, 장소 검색"
            onChange={placeHandler}
          ></input>
          <img
            className="mainleft_placeInputImg"
            src="../img/search.png"
            alt=""
            title="장소로 검색"
            onClick={handlePlace}

          />
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

          <div className="location">
            <Autocomplete
              value={value}
              onChange={(event: any, newValue: string | null) => {
                setValue(newValue);
                // locationHandler(event, "location");
              }}
              inputValue={inputValue}
              onInputChange={(event: any, newInputValue) => {
                setInputValue(newInputValue)
                locationHandler(event, "location");
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
              filterSelectedOptions
              onChange={(event: any) => {
                themeHandler(event, "theme");
              }}
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
        </div>
        <Placelist place={currentPosts} />
        <Paging
          postsPerPage={postsPerPage}
          totalPosts={placedata.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Mainleftpage;
