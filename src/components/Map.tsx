import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../reducers";

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = (placedata: any) => {


  const listData = useSelector((state: RootReducer) => state.placeListReducer);
  console.log('listData', listData.listData);


  useEffect(() => {
    //지도생성
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(
        37.559698652999916,
        126.93699720184801
      ), // 지도생길때 보여주는 범위 좌표
      level: 7,
    };
    let map = new window.kakao.maps.Map(container, options);

    const linePath: any[] = [];
    let addEventHandle: any
    // 마커 이미지의 이미지 주소
    let imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    let bounds = new window.kakao.maps.LatLngBounds()

    listData.listData.forEach((el: any) => {
      // 마커 이미지의 이미지 크기
      let imageSize = new window.kakao.maps.Size(24, 35);
      // 마커 이미지를 생성
      let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
      // 마커를 생성
      let marker = new window.kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new window.kakao.maps.LatLng(el.lat, el.long), // 마커를 표시할 위치
        title: el.place, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });

      bounds.extend(new window.kakao.maps.LatLng(el.lat, el.long))
      console.log('bounds', bounds)

      window.kakao.maps.event.addListener(marker, "click", function () {
        marker.setMap(map);
      });

      //마커를 선으로 연결
      linePath.push(
        new window.kakao.maps.LatLng(el.lat, el.long),
      );

      // 지도에 표시할 선을 생성합니다
      let polyline = new window.kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열
        strokeWeight: 5,
        strokeColor: "#75B8FA",
        strokeOpacity: 0.7,
        strokeStyle: "solid",
        // endArrow: true
      });
      // console.log(positions)
      // 지도에 선을 표시합니다
      polyline.setMap(map);


      const content = `<div class="infowindowbox";>${el.place}</div>` +
        `<div class="info1"; >${el.address}</div>`;

      // 인포윈도우를 생성합니다
      const infowindow = new window.kakao.maps.InfoWindow({
        content: content,
      });


      window.kakao.maps.event.addListener(marker, "mouseover", function () {
        infowindow.open(map, marker);
      });


      window.kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });

      marker.setMap(map);


      // markers.push(marker);


      // 커스텀 오버레이에 표시할 내용입니다
      // var content =


      // // 커스텀 오버레이가 표시될 위치입니다
      // let position = new window.kakao.maps.LatLng(
      //   el.lat, el.long
      // );

      // // 커스텀 오버레이를 생성합니다
      // let customOverlay = new window.kakao.maps.CustomOverlay({
      //   position: position,
      //   content: content,
      //   xAnchor: 0.3,
      //   yAnchor: 0.91,
      // });

      // contentaddEventHandle(content, 'mouseover', onmouseover);
      // addEventHandle(content, 'mouseout', onmouseout);
      // customOverlay.setMap(map);

    });

    if (!isNaN(bounds.ha)) {
      map.setBounds(bounds);
    }


  });
  return (
    <div className="Map">
      <div
        id="map"
      />
    </div>
  );
};

export default Map;
