import React from 'react'
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link, Router } from "react-router-dom";
import Map from './Map'
import './CSS/MainLeft.css'

const options = ["서울", "인천", "대전", "대구", "울산", "부산", "광주", "경기", "강원도", "충청북도", "충청남도", "경상북도", "경상남도", "전라북도", "전라남도", "제주도"];


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 500,
      '& > * + *': {
        marginTop: theme.spacing(3),
      },
    },
  }),
);

const Mainleftpage = () => {

  const [value, setValue] = React.useState<string | null>(options[0]);
  const [inputValue, setInputValue] = React.useState("");
  const theme18 = [
    { title: '레저' },
    { title: '바다' },
    { title: '산' },
    { title: '드라이브' },
    { title: '사진' },
    { title: '야경' },
    { title: '캠핑' },
    { title: '맛집' },
    { title: '노을' },
    { title: '휴식&힐링' },
    { title: '역사&문화' },
    { title: '데이트' },
    { title: '일출' },
    { title: '강' },
    { title: '가족' },
    { title: '계곡' },
    { title: '섬' },
    { title: '랜드마크' }]

  const handleSearch = () => {
    // post => res
  }

  const classes = useStyles();

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
          {/* <button className="themeButton"><div className="themeEff"></div><a>레저</a></button>
          <button className="themeButton"><div className="themeEff"></div><a>바다</a></button>
          <button className="themeButton"><div className="themeEff"></div><a>산</a></button>
          <button className="themeButton"><div className="themeEff"></div><a>드라이브</a></button>
          <button className="themeButton"><div className="themeEff"></div><a href="#">휴식&힐링</a></button>
          <button className="themeButton"><div className="themeEff"></div><a href="#"> 사진 </a></button>
          <button className="themeButton"><div className="themeEff"></div><a href="#"> 역사&문화 </a></button>
          <button className="themeButton"><div className="themeEff"></div><a href="#"> 야경 </a></button>
          <button className="themeButton"><div className="themeEff"></div><a href="#"> 캠핑 </a></button>
          <button className="themeButton"><div className="themeEff"></div><a href="#"> 맛집 </a></button>
          <button className="themeButton"><div className="themeEff"></div><a href="#"> 노을 </a></button>
          <button className="themeButton"><div className="themeEff"></div><a href="#"> 일출 </a></button>
          <button className="themeButton"><div className="themeEff"></div><a href="#"> 데이트 </a></button>
          <button className="themeButton"><div className="themeEff"></div><a href="#"> 가족 </a></button>
          <button className="themeButton"><div className="themeEff"></div><a href="#"> 강 </a></button>
          <button className="themeButton"><div className="themeEff"></div><a href="#"> 계곡 </a></button>
          <button className="themeButton"><div className="themeEff"></div><a href="#"> 섬 </a></button>
          <button className="themeButton"><div className="themeEff"></div><a href="#"> 랜드마크 </a></button> */}
        </div>
        <div className="searchBtn">
          <button onClick={handleSearch}>search</button>
        </div>
        {/* <hr
          style={{
            backgroundColor: "#F2F2F2",
            width: 500,
            marginBottom: 40,
            marginRight: 10,
          }}
        /> */}
        <div className="place">
          <input type="text" list="spotlist" placeholder="Place"></input>
          <button>TMT</button>
        </div>
      </div>
      <div className="mainpage_body">
        <div className="tab-header">
          <div className="inactive">
            <Router>
              <Link
                to="/recommend"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                추천 여행지
              </Link>
            </Router>
          </div>

          <div className="active">내 여행경로</div>
        </div>
        <div className='mainleft_list'>
          {/* map으로 사진, 장소 받아 */}
          <li className='mainleft_destination'>
            <div className='list_img'>
              <img src="../img/Logo004.png" alt="tes1" />
            </div>
            <div className='list_content'>경복궁</div>
          </li>
          <li className='mainleft_destination'>
            <div className='list_img'>
              <img src="../img/Logo004.png" alt="tes1" />
            </div>
            <div className='list_content'>한라산</div>
          </li>
        </div>

        <div id="map">
          <Map /*setCenter={setCenter}*/ />
        </div>

      </div>
    </div>)
}

export default Mainleftpage;