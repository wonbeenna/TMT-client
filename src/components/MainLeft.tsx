import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Popper from "@material-ui/core/Popper";
import Button from "@material-ui/core/Button";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Placelist from "./Placelist";
import axios from "axios";
import "./CSS/MainLeft.css";
import "react-dates/initialize";
import "./CSS/_datepicker.css";
import moment, { Moment } from "moment";
import { DateRangePicker, FocusedInputShape } from "react-dates";
require("dotenv").config();
axios.defaults.withCredentials = true;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      border: "0.1px solid",
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      display: "grid",
      gridTemplateColumns: "1.5fr 5fr",
      justifyContent: "center",
    },
    paperInput: {
      margintop: "3px",
    },
  })
);

const Mainleftpage = ({ lists, setLists }: any) => {
  const options = [
    "서울",
    "인천",
    "대전",
    "대구",
    "울산",
    "부산",
    "광주",
    "경기",
    "세종",
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
    { title: "야경" },
    { title: "캠핑" },
    { title: "역사&문화" },
    { title: "휴식&힐링" },
    { title: "데이트" },
    { title: "가족" },
    { title: "계곡" },
  ];

  const [value, setValue] = React.useState<string | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [province, setProvince] = useState<string | null>("");

  const [placedata, setPlacedata]: any = useState<string | any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = placedata.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const listURL = `${process.env.REACT_APP_API}/trip/list`;
    const fetchData = async () => {
      await axios.get(listURL, {}).then((res) => setPlacedata(res.data));
    };
    fetchData();
  }, []);

  //지역 onchange
  const locationHandler = (event: any, type: string): void => {
    if (type === "location") {
      setProvince(event.target.innerText);
    }
  };

  const handleSearch = () => {
    const searchURL = `${process.env.REACT_APP_API}/trip/list`;
    axios
      .post(
        searchURL,
        {
          province: province,
          theme: checkItems,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setPlacedata(res.data);
      })
      .catch((err) => console.log("err", err));
  };

  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );

  const handlendDatesChange = (arg: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => {
    setStartDate(arg.startDate);
    setEndDate(arg.endDate);
  };
  const _startDate = moment(startDate).format("YYYY-MM-DD");
  const _endDate = moment(endDate).format("YYYY-MM-DD");

  const handleFocusChange = (arg: FocusedInputShape | null) => {
    setFocusedInput(arg);
  };

  const [checkItems, setCheckItems] = useState<Array<string>>([]);
  const handleSingleCheck = (checked: boolean, theme: string) => {
    if (checked) {
      setCheckItems([...checkItems, theme]);
    } else {
      setCheckItems(checkItems.filter((el: string) => el !== theme));
    }
  };

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const [spot, setSpot] = useState<string | any>([]);
  const [spotMatch, setSpotMatch] = useState<string | any>([]);
  const [search, setSearch] = useState<string | any>("");

  useEffect(() => {
    const place = async (): Promise<any> => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/trip/search`
      );
      setSpot(response.data);
    };
    place();
  }, []);

  const searchPlace = (text: string) => {
    if (!text) {
      setSpotMatch([]);
      setSearch("");
    } else {
      let matchedPlace = spot?.placeOnly?.filter((el: any) => {
        let regex = new RegExp(`${text}`, "gi");
        return el.place.match(regex);
      });
      setSpotMatch(matchedPlace);
      setSearch(text);
    }
  };

  let changeInput = (el: any) => {
    setSearch(el);
    setSpotMatch([el]);
  };

  const sendSearchReq = async (): Promise<any> => {
    let placeInfo = await axios
      .post(`${process.env.REACT_APP_API}/trip/search`, {
        inputElement: search,
      })
      .then((res) => {
        setPlacedata([res.data]);
        setSearch("");
      });
    return placeInfo;
  };

  return (
    <>
      <div className="mainleft_warp">
        <div className="mainpage_wrap">
          <div className="mainpage_top"></div>
        </div>
        <div className="mainleft_container">
          <div className="place">
            <div className="mainleft_place">
              {/*장소입력*/}
              <input
                className="mainleft_placeInput"
                type="text"
                list="spotlist"
                placeholder="장소 검색"
                onChange={(e) => searchPlace(e.target.value)}
                value={search || [search] || ""}
              />
              {spotMatch && (
                <div className="placeContainer">
                  {spotMatch.map((el: any, index: number) => {
                    return (
                      <div
                        onClick={() => changeInput(el.place)}
                        className="option"
                        key={index}
                      >
                        <div>{el.place}</div>
                      </div>
                    );
                  })}
                </div>
              )}
              {/*장소검색*/}
              <img
                className="mainleft_placeInputImg"
                src="../img/search.png"
                alt=""
                title="장소로 검색"
                onClick={sendSearchReq}
              />
            </div>
            {/*지역입력*/}
            <div className="location__warp">
              <div className="location">
                <Autocomplete
                  value={value}
                  onChange={(event: any, newValue: string | null) => {
                    setValue(newValue);
                    // changeHandler(event, "location");
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    locationHandler(event, "location");
                  }}
                  id="controllable-states-demo"
                  options={options}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="지역 선택"
                      variant="standard"
                      className="loaction_label"
                    />
                  )}
                />
              </div>
              {/*테마입력*/}
              <div className="mainpage_plancontainer">
                <Button
                  aria-describedby={id}
                  type="button"
                  onClick={handleClick}
                >
                  테마 선택
                </Button>
                <Popper id={id} open={open} anchorEl={anchorEl}>
                  <div className={classes.paper}>
                    {theme18.map((el, idx: number) => (
                      <>
                        <input
                          className="paperInput"
                          key={idx}
                          type={"checkbox"}
                          onChange={(e) => {
                            handleSingleCheck(e.target.checked, el.title);
                          }}
                          checked={checkItems.includes(el.title) ? true : false}
                        ></input>
                        <span className="theme">{el.title}</span>
                      </>
                    ))}
                  </div>
                </Popper>
                {/*지역,테마검색*/}
                <button
                  className="searchBtn"
                  onClick={handleSearch}
                  title="지역&테마로 검색"
                >
                  search
                </button>
              </div>
            </div>
            <div className="mainleft_placeCalendar">
              <img src="../img/calendar-icon.png" alt="" />
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
            </div>
          </div>
          <Placelist
            place={currentPosts}
            _startDate={_startDate}
            _endDate={_endDate}
            postsPerPage={postsPerPage}
            totalPosts={placedata.length}
            paginate={paginate}
            currentPage={currentPage}
            lists={lists}
            setLists={setLists}
          />
        </div>
      </div>
    </>
  );
};

export default Mainleftpage;
