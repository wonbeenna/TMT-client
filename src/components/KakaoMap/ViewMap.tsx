import { useEffect } from "react";
import { useState } from "react";
import { mapData } from "../../interfaces";

declare global {
  interface Window {
    kakao: any;
  }
}
function ViewMap({ viewList }: any) {
  const [list, setList] = useState<any>([]);
  const [map, setMap] = useState<any>(null);
  const [, setMarkerArr] = useState<string[]>([]);

  useEffect(() => {
    kakaoMap();
  }, []);

  useEffect(() => {
    setList(viewList);
  }, [viewList]);

  const kakaoMap = () => {
    window.kakao.maps.load(() => {
      let mapContainer = document.getElementById("viewMaps");
      let mapOption = {
        center: new window.kakao.maps.LatLng(
          37.479698652999916,
          126.87699720184801
        ), // 지도생길때 보여주는 범위 좌표
        level: 8,
      };
      let map = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(map);
    });
  };

  useEffect(() => {
    const viewMap = () => {
      const tempArr: Array<string> = [];
      const linePath: Array<string> = [];
      let imageSrc = "../img/flag.png";
      let imageSize = new window.kakao.maps.Size(50, 50);
      let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

      list?.forEach((e: mapData, idx: number) => {
        let marker = new window.kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: new window.kakao.maps.LatLng(e.lat, e.long),
          image: markerImage, // 마커 이미지
        });
        tempArr.push(marker);
        let sw = new window.kakao.maps.LatLng(e.lat - 0.1, e.long - 0.1);
        let ne = new window.kakao.maps.LatLng(e.lat + 0.1, e.long + 0.1);
        let bounds = new window.kakao.maps.LatLngBounds(sw, ne);
        bounds.extend(new window.kakao.maps.LatLng(e.lat, e.long + 0.3));
        map?.setBounds(bounds, 100, 50, 50, 400);
        linePath.push(new window.kakao.maps.LatLng(e.lat, e.long));

        var randomNum = Math.floor(Math.random() * 1000) + 1;
        var iwContent =
          '<div class="map__wrap2">' +
          '    <div class="map__info">' +
          '        <div class="map__img">' +
          `            <img src=${e.photo} />` +
          '    <div class="map__info">' +
          '        <div class="map__title">' +
          `            ${e.place}` +
          '          <img src="../img/quality.png" />' +
          "        </div>" +
          '        <div class="map__body">' +
          '            <div class="map__desc">' +
          `                <div class="map__ellipsis">${e.address}</div>` +
          '        <div class="map__randomNum">' +
          `            ${randomNum} 명이 추천했습니다!` +
          "        </div>" +
          "            </div>" +
          "            </div>" +
          "            </div>" +
          "        </div>" +
          "    </div>" +
          "</div>";

        var infowindow = new window.kakao.maps.InfoWindow({
          content: iwContent,
        });

        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          infowindow.open(map, marker);
        });

        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          infowindow.close();
        });
      });

      let polyline = new window.kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: "#75B8FA",
        strokeOpacity: 0.7,
        strokeStyle: "solid",
      });
      polyline.setMap(map);
      setMarkerArr(tempArr);
    };
    viewMap();
  }, [viewList, list]);

  return (
    <div>
      <div id="viewMaps" />
    </div>
  );
}

export default ViewMap;
