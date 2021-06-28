import React from 'react'
import './CSS/MainLeft.css'


const Mainleftpage = () =>

(
  <div className="mainpage_leftside">

    <div className="location">
      <input></input>
      <button>TMT</button>
    </div>

    <div className="mainleft_buttoncontainer">
      <button className="themeButton"><div className="themeEff"></div><a>레저</a></button>
      <button className="themeButton"><div className="themeEff"></div><a>바다</a></button>
      <button className="themeButton"><div className="themeEff"></div><a>산</a></button>
      <button className="themeButton">
        <div className="themeEff"></div>
        <a>드라이브</a>
      </button>
      <button className="themeButton">
        <div className="themeEff"></div>
        <a href="#"> 휴식&힐링 </a>
      </button>
      <button className="themeButton">
        <div className="themeEff"></div>
        <a href="#"> 사진 </a>
      </button>
      <button className="themeButton">
        <div className="themeEff"></div>
        <a href="#"> 역사&문화 </a>
      </button>
      <button className="themeButton">
        <div className="themeEff"></div>
        <a href="#"> 야경 </a>
      </button>
      <button className="themeButton">
        <div className="themeEff"></div>
        <a href="#"> 캠핑 </a>
      </button>
      <button className="themeButton">
        <div className="themeEff"></div>
        <a href="#">맛집 </a>
      </button>
      <button className="themeButton">
        <div className="themeEff"></div>
        <a href="#"> 노을 </a>
      </button>
      <button className="themeButton">
        <div className="themeEff"></div>
        <a href="#"> 일출 </a>
      </button>
      <button className="themeButton">
        <div className="themeEff"></div>
        <a href="#"> 데이트 </a>
      </button>
      <button className="themeButton">
        <div className="themeEff"></div>
        <a href="#"> 가족 </a>
      </button>
    </div>

    <div className='mainleft_list'>
      <li className='mainleft_destination'>
        <div className='list_img'>
          <img src="../img/headerLogo.png" alt="tes1" />
        </div>
        <div className='list_content'>제주도<img src="img/icon-heart.png" alt="heart" /></div>
      </li>

      <li className='mainleft_destination'>
        <div className='list_img'>
          <img src='/img/headerLogo.png' alt="tes2"></img>
        </div>
        <div className='list_content'>서울 </div>
      </li>

    </div>
  </div>)

export default Mainleftpage;