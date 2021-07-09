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
  // console.log('placedata2', placedata.placedata[0].lat)
  // console.log('long', long)
  // useEffect(()=>{
  //     window.kakao.map.load(() => {
  //         lenderMap()
  //     })
  // })
  // const lenderMap = () => {
  //     let container = document.getElementById('map');
  //     let options = {
  //         center: new window.kakao.maps.LatLng(33.50011272482717, 126.52728521151296),
  //         level: 7
  //     };
  //     let map = new window.kakao.maps.Map(container, options);
  // }
  const listData = useSelector((state: RootReducer) => state.placeListReducer);
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
    // 마커 이미지의 이미지 주소
    let imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
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
      window.kakao.maps.event.addListener(marker, "click", function () {
        marker.setMap(map);
      });
    });
    //마커를 선으로 연결
    let linePath = [
      new window.kakao.maps.LatLng(126.97515152495737, 37.565972575797396),
      new window.kakao.maps.LatLng(126.97699720184801, 37.579698652999916),
      new window.kakao.maps.LatLng(126.97865846930021, 37.56929706865797),
    ];
    // 지도에 표시할 선을 생성합니다
    let polyline = new window.kakao.maps.Polyline({
      path: linePath, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: "#75B8FA", // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    });
    // console.log(positions)
    // 지도에 선을 표시합니다
    polyline.setMap(map);
    // 커스텀 오버레이에 표시할 내용입니다
    // HTML 문자열 또는 Dom Element 입니다
    var content =
      '<div class="overlaybox">' +
      '    <div class="boxtitle">금주 영화순위</div>' +
      '    <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
      '    <div class="first">' +
      '        <div class="triangle text">1</div>' +
      '        <div class="movietitle text">드래곤 길들이기2</div>' +
      "    </div>" +
      "    <ul>" +
      '        <li class="up">' +
      '            <span class="number">2</span>' +
      '            <span class="title">명량</span>' +
      '            <span class="arrow up"></span>' +
      '            <span class="count">2</span>' +
      "        </li>" +
      "        <li>" +
      '            <span class="number">3</span>' +
      '            <span class="title">해적(바다로 간 산적)</span>' +
      '            <span class="arrow up"></span>' +
      '            <span class="count">6</span>' +
      "        </li>" +
      "        <li>" +
      '            <span class="number">4</span>' +
      '            <span class="title">해무</span>' +
      '            <span class="arrow up"></span>' +
      '            <span class="count">3</span>' +
      "        </li>" +
      "        <li>" +
      '            <span class="number">5</span>' +
      '            <span class="title">안녕, 헤이즐</span>' +
      '            <span class="arrow down"></span>' +
      '            <span class="count">1</span>' +
      "        </li>" +
      "    </ul>" +
      "</div>";
    // 커스텀 오버레이가 표시될 위치입니다
    let position = new window.kakao.maps.LatLng(
      33.50011272482717,
      126.52728521151296
    );
    // 커스텀 오버레이를 생성합니다
    let customOverlay = new window.kakao.maps.CustomOverlay({
      position: position,
      content: content,
      xAnchor: 0.3,
      yAnchor: 0.91,
    });
    // 커스텀 오버레이를 지도에 표시합니다
    // customOverlay.setMap(map);
    // window.kakao.maps.event.addListener(marking, "click", function () {
    //   customOverlay.setMap(map);
    // });
    // window.kakao.maps.event.addListener(marker, 'click', function () {
    //     customOverlay.setMap(null);
    // });
    // function closeOverlay() {
    //     customOverlay.setMap(null);
    // }
  });
  return (
    <div className="Map">
      <div
        id="map"
        // style={{ width: "100vw", height: "500px" }}
      />
    </div>
  );
};

export default Map;
