import React from 'react'
import './CSS/MainRight.css'
import Map from './Map'

const Mainrightpage = () => {
  return (

    <div className="mainpage_rightside">
      <div id="map">
        <Map /*setCenter={setCenter}*/ />
      </div>
    </div>

  )
}

export default Mainrightpage

// import React, { useEffect } from 'react';

// declare global {
//   interface Window {
//     kakao: any;
//   }
// }

// const Mainrightpage: React.FC = () => {
//   useEffect(() => {

//     let container = document.getElementById('map'); 
//     let options = { 
//       center: new window.kakao.maps.LatLng(33.450701, 126.570667), 
//       level: 7 /
//     };

//     let map = new window.kakao.maps.Map(container, options); 

//   }, [])

//   return (
//     <div className="App">
//       <div id="map" style={{ width: "500px", height: "400px" }} />
//     </div>
//   );
// }

// export default Mainrightpage;