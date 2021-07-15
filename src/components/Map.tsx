import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../actions";
import { RootReducer } from "../reducers";
import "./CSS/Map.css";

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = ({ lists, setLists }: any) => {
  const dispatch = useDispatch();
  const ListData: any = useSelector(
    (state: RootReducer) => state.placeListReducer.listData
  );
  const NextListData: any = useSelector(
    (state: RootReducer) => state.nextPlaceListReducer.nextListData
  );
  const { kakao } = window;
  const [map, setMap] = useState<any>(null);
  const [markerArr, setMarkerArr] = useState<any>([]);
  const [nextMarkerArr, setNextMarkerArr] = useState<any>([]);
  const [pathArr, setPathArr] = useState<any>({});

  // 지도 실행
  useEffect(() => {
    kakaoMap();
  }, []);

  useEffect(() => {
    viewMarker();
  }, [ListData, NextListData]);

  const kakaoMap = () => {
    kakao.maps.load(() => {
      let container = document.getElementById("map");
      let options = {
        center: new kakao.maps.LatLng(37.479698652999916, 126.87699720184801),
        level: 9,
      };
      let map = new kakao.maps.Map(container, options);
      setMap(map);
    });
  };

  // 지도 띄우기
  const viewMarker = () => {
    if (markerArr.length > 0) {
      removeMarker();
    }
    if (nextMarkerArr.length > 0) {
      removeNextMarker();
    }

    let imageSrc = "./img/marker_map_icon.png";
    let imageSize = new kakao.maps.Size(50, 50);
    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    const tempArr: any = [];
    const linePath: any = [];

    ListData[0]?.forEach((el: any, idx: number) => {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.lat, el.long),
        image: markerImage,
      });
      tempArr.push(marker);
      let sw = new kakao.maps.LatLng(38, 127.5);
      let ne = new kakao.maps.LatLng(37, 127);
      let bounds = new kakao.maps.LatLngBounds(sw, ne);
      bounds.extend(new kakao.maps.LatLng(el.lat - 1, el.long - 1));
      linePath.push(new kakao.maps.LatLng(el.lat, el.long));
      map.setBounds(bounds);

      var iwContent =
        '<div class="map__wrap">' +
        '    <div class="map__info">' +
        '    <div class="map__container">' +
        '        <span class="map__num">' +
        `            ${idx + 1}` +
        "        </span>" +
        '        <span class="map__title">' +
        `            ${el.place}` +
        "        </span>" +
        "            </div>" +
        '        <div class="map__body">' +
        '            <div class="map__desc">' +
        `                <div class="map__ellipsis">${el.address}</div>` +
        "            </div>" +
        "        </div>" +
        "    </div>" +
        "</div>" +
        "</div>";

      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
      });

      kakao.maps.event.addListener(marker, "mouseover", function () {
        infowindow.open(map, marker);
      });

      kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });
    });
    let polyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 5,
      strokeColor: "#75B8FA",
      strokeOpacity: 0.7,
      strokeStyle: "solid",
    });
    polyline.setMap(map);
    setPathArr(polyline);
    setMarkerArr(tempArr);

    const NextTempArr: any = [];
    NextListData[0]?.forEach((el: any) => {
      let imageSrc = "./img/thumbtack.png";
      let imageSize = new kakao.maps.Size(40, 40);
      let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.lat, el.long),
        image: markerImage,
      });
      NextTempArr.push(marker);
      var randomNum = Math.floor(Math.random() * 1000) + 1;
      var iwContent =
        '<div class="map__wrap2">' +
        '    <div class="map__info">' +
        '        <div class="map__img">' +
        `            <img src=${el.photo} />` +
        '    <div class="map__info">' +
        '        <div class="map__title">' +
        `            ${el.place}` +
        '          <img src="./img/quality.png" />' +
        "        </div>" +
        '        <div class="map__body">' +
        '            <div class="map__desc">' +
        `                <div class="map__ellipsis">${el.address}</div>` +
        '        <div class="map__randomNum">' +
        `            ${randomNum} 명이 추천했습니다!` +
        "        </div>" +
        "            </div>" +
        "            </div>" +
        "            </div>" +
        "        </div>" +
        "    </div>" +
        '        <div class="map__save">' +
        `            마커를 클릭하면 여행일정에 저장됩니다.` +
        "        </div>" +
        "</div>";
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
      });

      kakao.maps.event.addListener(marker, "mouseover", function () {
        infowindow.open(map, marker);
      });

      kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });

      kakao.maps.event.addListener(marker, "click", function () {
        setLists(
          [...lists].concat(
            NextListData[0].filter((e: any) => e.place === el.place)
          )
        );
        infowindow.close();
        removeNextMarker2();
      });

      function removeNextMarker2() {
        dispatch(
          Actions.nextPlaceList(
            NextListData[0].filter((e: any) => e.place !== el.place)
          )
        );
      }
    });

    setNextMarkerArr(NextTempArr);
    function removeMarker() {
      markerArr?.forEach((e: any) => e?.setMap(null));
      for (let i = 0; i < markerArr?.length; i++) {
        markerArr[i]?.setMap(null);
      }
      pathArr?.setMap(null);
      // ListData = [];
    }
    function removeNextMarker() {
      for (let i = 0; i < nextMarkerArr.length; i++) {
        nextMarkerArr[i]?.setMap(null);
      }
    }
  };

  return (
    <div className="Map">
      <div id="map" />
    </div>
  );
};

export default Map;
