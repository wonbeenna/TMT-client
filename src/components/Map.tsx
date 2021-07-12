import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../reducers";

declare global {
  interface Window {
    kakao: any;
  }
}
const Map = (placedata: any) => {
  const listData = useSelector((state: RootReducer) => state.placeListReducer);
  // console.log(listData.listData[0]); // <<-- [0] 번째 배열 쓰세용
  // console.log('listData1', listData.listData);

  //초기맵화면 코드스테이츠
  useEffect(() => {
    let mapContainer = document.getElementById("map");
    let mapOption = {
      center: new window.kakao.maps.LatLng(
        37.49675169537155,
        127.02476872729723
      ),
      level: 4,
    };
    let map1 = new window.kakao.maps.Map(mapContainer, mapOption);
    let imageSrc = "./img/star_yellow_icon.png";
    let imageSize = new window.kakao.maps.Size(30, 30);
    let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
    let marker = new window.kakao.maps.Marker({
      map1: map1,
      position: mapOption.center,
      image: markerImage,
    });
    marker.setMap(map1);
  });

  useEffect(() => {
    //지도생성
    let mapContainer = document.getElementById("map");
    let mapOption = {
      center: new window.kakao.maps.LatLng(
        33.36197069309868,
        126.52923096776973
      ),
      level: 8,
    };
    let map = new window.kakao.maps.Map(mapContainer, mapOption);

    let bounds = new window.kakao.maps.LatLngBounds();

    listData?.listData[0]?.forEach((el: any) => {
      let imageSrc = "./img/marker_map_icon.png";
      let imageSize = new window.kakao.maps.Size(50, 50);
      let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
      //선택한 여행지 마커
      let marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(el.lat, el.long),
        // title: el.place, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage,
      });

      let imageSrc2 = "./img/Logo004.png";
      let imageSize2 = new window.kakao.maps.Size(50, 50);
      let markerImage2 = new window.kakao.maps.MarkerImage(
        imageSrc2,
        imageSize2
      );

      // 일단 찍는건 된다. 리스트에 넣는건 해봐야됨.
      let marker2 = new window.kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new window.kakao.maps.LatLng(
          33.36197069309868,
          126.52923096776973
        ),
        // title: el.place, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage2,
      });
      marker2.setMap(map);
      marker.setMap(map);
      const linePath: any[] = [];
      bounds.extend(new window.kakao.maps.LatLng(el.lat, el.long));

      //   console.log('bounds', bounds)

      //   window.kakao.maps.event.addListener(marker, "click", function () {
      //     marker.setMap(map);
      //   });

      //   //마커를 선으로 연결
      linePath.push(new window.kakao.maps.LatLng(el.lat, el.long));

      //   // 지도에 표시할 선을 생성합니다
      let polyline = new window.kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열
        strokeWeight: 5,
        strokeColor: "#75B8FA",
        strokeOpacity: 0.7,
        strokeStyle: "solid",
        // startArrow: false,
        // endArrow: true
      });
      // console.log(positions)
      // 지도에 선을 표시합니다
      polyline.setMap(map);

      const content =
        `<div class="infowindowbox";>${el.place}</div>` +
        `<div class="info1"; >${el.address}</div>`;

      //   // 인포윈도우를 생성합니다
      const infowindow = new window.kakao.maps.InfoWindow({
        content: content,
      });

      window.kakao.maps.event.addListener(marker, "mouseover", function () {
        infowindow.open(map, marker);
      });

      window.kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });

      //   markers.push(marker);
    });

    if (!isNaN(bounds.ha)) {
      map.setBounds(bounds, 90, 30, 10, 400);
    }
  });

  return (
    <div className="Map">
      <div id="map" />
    </div>
  );
};

export default Map;
