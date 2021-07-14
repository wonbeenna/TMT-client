import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../reducers";
import "./CSS/Map.css";

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = (placedata: any) => {
  let ListData: any = useSelector(
    (state: RootReducer) => state.placeListReducer.listData
  );
  const { kakao } = window;
  const [map, setMap] = useState<any>(null);
  const [markerArr, setMarkerArr] = useState<any>([]);
  const [pathArr, setPathArr] = useState<any>({});

  // 지도 실행
  useEffect(() => {
    kakaoMap();
  }, []);

  useEffect(() => {
    viewMarker();
  }, [ListData]);

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
        '<div class="wrap">' +
        '    <div class="info">' +
        '        <div class="num">' +
        `            ${idx + 1}` +
        "        </div>" +
        '        <div class="title">' +
        `            ${el.place}` +
        "        </div>" +
        '        <div class="body">' +
        '            <div class="desc">' +
        `                <div class="ellipsis">${el.address}</div>` +
        "            </div>" +
        "        </div>" +
        "    </div>" +
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

    function removeMarker() {
      // markerArr?.forEach((e: any) => e?.setMap(null));
      for (let i = 0; i < markerArr?.length; i++) {
        markerArr[i]?.setMap(null);
      }
      pathArr?.setMap(null);
      // ListData = [];
    }
  };

  return (
    <div className="Map">
      <div id="map" />
    </div>
  );
};

export default Map;
