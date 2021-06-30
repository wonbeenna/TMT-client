import React from 'react'
import './CSS/MainLeft.css'
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const options = ["서울", "인천", "대전", "대구", "울산", "부산", "광주", "경기", "강원도", "충청북도", "충청남도", "경상북도", "경상남도", "전라북도", "전라남도", "제주도"];

const Mainleftpage = () => {

  const [value, setValue] = React.useState<string | null>(options[0]);
  const [inputValue, setInputValue] = React.useState("");

  return (
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
        <button className="themeButton"><div className="themeEff"></div><a>레저</a></button>
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
        <button className="themeButton"><div className="themeEff"></div><a href="#"> 랜드마크 </a></button>
        <button>search</button>
      </div>
      <hr
        style={{
          backgroundColor: "#F2F2F2",
          width: 500,
          marginBottom: 40,
          marginRight: 10,
        }}
      />

      <div className="place">
        <input type="text" list="spotlist" placeholder="장소검색"></input>
        <button>TMT</button>
      </div>

      <div className='mainleft_list'>
        <li className='mainleft_destination'>
          <div className='list_img'>
            <img src="../img/Logo004.png" alt="tes1" />
          </div>
          <div className='list_content'>제주도
            {/* <img src="img/Logo004.png" alt="heart" /> */}
          </div>
        </li>
        <li className='mainleft_destination'>
          <div className='list_img'>
            <img src='/img/Logo004.png' alt="tes2"></img>
          </div>
          <div className='list_content'>서울 </div>
        </li>
      </div>
    </div>)
}

export default Mainleftpage;