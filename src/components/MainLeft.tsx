import React from 'react'
import './CSS/MainLeft.css'


const Mainleftpage = () =>

(<div className="mainpage_leftside">
  <input></input>
  <button>TMT</button>

  <div className="mainleft_buttoncontainer">
    <button className="themeButton">
      <div className="themeEff"></div>
      <a>레저</a>
    </button>
    <button className="themeButton"><div className="themeEff"></div><a>바다</a></button>
    <button className="button">산</button>
  </div>
  <div className="themeButton">
    <div className="themeEff"></div>
    <a href="#"> 드라이브 </a>
  </div>
  <div className="themeButton">
    <div className="themeEff"></div>
    <a href="#"> 휴식&힐링 </a>
  </div>
  <div className="themeButton">
    <div className="themeEff"></div>
    <a href="#"> 사진 </a>
  </div>
  <div className="themeButton">
    <div className="themeEff"></div>
    <a href="#"> 역사&문화 </a>
  </div>
  <div className="themeButton">
    <div className="themeEff"></div>
    <a href="#"> 야경 </a>
  </div><div className="themeButton">
    <div className="themeEff"></div>
    <a href="#"> 캠핑 </a>
  </div><div className="themeButton">
    <div className="themeEff"></div>
    <a href="#">맛집 </a>
  </div><div className="themeButton">
    <div className="themeEff"></div>
    <a href="#"> 노을 </a>
  </div><div className="themeButton">
    <div className="themeEff"></div>
    <a href="#"> 일출 </a>
  </div><div className="themeButton">
    <div className="themeEff"></div>
    <a href="#"> 데이트 </a>
  </div>
  <div className="themeButton">
    <div className="themeEff"></div>
    <a href="#"> 가족 </a>
  </div>

</div>)

export default Mainleftpage;

function Accordion(): JSX.Element {
  return <>아코디언</>
}
