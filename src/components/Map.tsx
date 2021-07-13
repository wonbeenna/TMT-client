import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../reducers";

declare global {
  interface Window {
    kakao: any;
  }
}

//마커 선이어지는 코드
const Map = (placedata: any) => {
//mypage_layout/0.3
 // const listData = useSelector((state: RootReducer) => state.placeListReducer);

  //useEffect(() => {
    //지도생성
 //   let mapContainer = document.getElementById("map");
 //   let mapOption = {
 //     center: new window.kakao.maps.LatLng(
 //       33.36197069309868,
 //       126.52923096776973

  const ListData: any = useSelector(
    (state: RootReducer) => state.placeListReducer.listData
  );

  const [kakaoMaps, setKakaoMaps] = useState<any>(null);
  const [markers, setMarkers] = useState<any>([]);
  const [Positions, setPositions] = useState<any>([]);

  useEffect(() => {
    setPositions(
      ListData[0].map(
        (el: any) => new window.kakao.maps.LatLng(el.lat, el.long)
      )
    );
  }, [ListData]);

  // 지도 실행
  useEffect(() => {
    kakaoMap();
  }, []);

  // 지도 띄우기
  const kakaoMap = () => {
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(
        37.579698652999916,
        126.97699720184801

      ),
      level: 10,
    };
// mypage_layout/0.3
    //let map = new window.kakao.maps.Map(mapContainer, mapOption);

   // const linePath: any[] = [];

   // let bounds = new window.kakao.maps.LatLngBounds();

   // listData?.listData[0]?.forEach((el: any) => {
   //   let imageSrc = "./img/marker_map_icon.png";
   //   let imageSize = new window.kakao.maps.Size(50, 50);
   //   let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

    //  let marker = new window.kakao.maps.Marker({
    //    map: map, // 마커를 표시할 지도
     //   position: new window.kakao.maps.LatLng(el.lat, el.long),
     //   // title: el.place, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
     //   image: markerImage, // 마커 이미지
    //  });

    //  let imageSrc2 = "./img/Logo004.png";
    //  let imageSize2 = new window.kakao.maps.Size(50, 50);
    //  let markerImage2 = new window.kakao.maps.MarkerImage(
    //    imageSrc2,
    //    imageSize2
    //  );

    //  marker.setMap(map);

    //  bounds.extend(new window.kakao.maps.LatLng(el.lat, el.long));

      //마커를 선으로 연결
   //   linePath.push(new window.kakao.maps.LatLng(el.lat, el.long));

      // 지도에 표시할 선을 생성합니다
   //   let polyline = new window.kakao.maps.Polyline({
  //      path: linePath, // 선을 구성하는 좌표배열
   //     strokeWeight: 5,
    //    strokeColor: "#75B8FA",
    //    strokeOpacity: 0.7,
    //    strokeStyle: "solid",
     //   // startArrow: false,
     //   // endArrow: true
    //  });
    //  polyline.setMap(map);

    //  const content =
    //    `<div class="infowindowbox";>${el.place}</div>` +
    //    `<div class="info1"; >${el.address}</div>`;

     // // 인포윈도우를 생성합니다
    //  const infowindow = new window.kakao.maps.InfoWindow({
    //    content: content,
   //   });

   //   window.kakao.maps.event.addListener(marker, "mouseover", function () {
    //    infowindow.open(map, marker);
    //  });

    //  window.kakao.maps.event.addListener(marker, "mouseout", function () {
    //    infowindow.close();
   //   });
   // });

    //if (!isNaN(bounds.ha)) {
   //   map.setBounds(bounds, 90, 30, 10, 400);
  //  }
 // });

    let map = new window.kakao.maps.Map(container, options);
    setKakaoMaps(map);
  };

  // 마커와 선긋기
  useEffect(() => {
    const viewMarker = () => {
      let imageSrc = "./img/marker_map_icon.png";
      let imageSize = new window.kakao.maps.Size(50, 50);
      let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
      setPositions(Positions);
      let marker = new window.kakao.maps.Marker({
        map: kakaoMaps,
        position: new window.kakao.maps.LatLng(Positions),
        // title: el.place, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage,
      });
      marker.setMap(kakaoMaps);
      setKakaoMaps(kakaoMaps);
    };
    viewMarker();
  }, [kakaoMaps, Positions]);


  console.log(Positions);
  // console.log(markers);
  return (
    <div className="Map">
      <div id="map" />
    </div>
  );
};

export default Map;