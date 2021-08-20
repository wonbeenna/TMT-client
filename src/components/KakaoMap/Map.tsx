import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListProps, mapData } from "../../interfaces";
import { Actions } from "../../modules/api";
import { RootState } from "../../modules/store";
import "./Map.css";

declare global {
  interface Window {
    kakao: any;
  }
}

function Map({ lists, setLists }: ListProps) {
  const dispatch = useDispatch();
  const ListData = useSelector(
    (state: RootState) => state.placeListReducer.listData
  );
  const NextListData = useSelector(
    (state: RootState) => state.NextPlaceListReducer.nextListData
  );
  const { kakao } = window;
  const [map, setMap] = useState<any | null>(null);
  const [markerArr, setMarkerArr] = useState<any>([]);
  const [nextMarkerArr, setNextMarkerArr] = useState<any>([]);
  const [pathArr, setPathArr] = useState<any>({});

  useEffect(() => {
    kakaoMap();
  }, []);

  useEffect(() => {
    viewMarker();
  }, [ListData, NextListData, lists]);

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

    const tempArr: Array<string> = [];
    const linePath: Array<string> = [];

    ListData?.forEach((el: mapData, idx: number) => {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.lat, el.long),
        image: markerImage,
      });
      tempArr.push(marker);
      let sw = new kakao.maps.LatLng(el.lat - 0.03, el.long - 0.03);
      let ne = new kakao.maps.LatLng(el.lat + 0.03, el.long + 0.03);
      let bounds = new kakao.maps.LatLngBounds(sw, ne);
      bounds.extend(new kakao.maps.LatLng(el.lat, el.long));
      map?.setBounds(bounds, 200, 100, 100, 600);
      linePath.push(new kakao.maps.LatLng(el.lat, el.long));

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

    const NextTempArr: Array<string> = [];
    NextListData[0]?.forEach((el: mapData) => {
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
            NextListData[0].filter((e: mapData) => e.place === el.place)
          )
        );
        infowindow.close();
        removeNextMarker2();
      });

      function removeNextMarker2() {
        dispatch(
          Actions.placeActions.nextPlaceList(
            NextListData[0].filter((e: mapData) => e.place !== el.place)
          )
        );
      }
    });

    setNextMarkerArr(NextTempArr);
    function removeMarker() {
      markerArr?.forEach((e: mapData) => e?.setMap(null));
      for (let i = 0; i < markerArr?.length; i++) {
        markerArr[i]?.setMap(null);
      }
      pathArr?.setMap(null);
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
}

export default Map;
