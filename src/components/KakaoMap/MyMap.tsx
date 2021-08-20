import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { mapData } from "../../interfaces";
import { RootState } from "../../modules/store";

declare global {
  interface Window {
    kakao: any;
  }
}
function MyMap() {
  const { myPlaceList }: any = useSelector(
    (state: RootState) => state.myPlaceListReducer
  );

  const [map, setMap] = useState<any>(null);
  const [, setMarkerArr] = useState<any>([]);

  useEffect(() => {
    kakaoMap();
  }, []);

  const kakaoMap = () => {
    window.kakao.maps.load(() => {
      let mapContainer = document.getElementById("staticMaps");
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
      let imageSrc = "./img/marker_map_icon.png";
      let imageSize = new window.kakao.maps.Size(50, 50);
      let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
      const tempArr: Array<string> = [];
      const linePath: Array<string> = [];

      myPlaceList?.spot?.forEach((el: mapData) => {
        let marker = new window.kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: new window.kakao.maps.LatLng(el.lat, el.long),
          image: markerImage, // 마커 이미지
        });
        tempArr.push(marker);
        let sw = new window.kakao.maps.LatLng(38, 127.5);
        let ne = new window.kakao.maps.LatLng(37, 127);
        let bounds = new window.kakao.maps.LatLngBounds(sw, ne);
        bounds.extend(new window.kakao.maps.LatLng(el.lat, el.long));
        map?.setBounds(bounds);
        linePath.push(new window.kakao.maps.LatLng(el.lat, el.long));
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
  }, [myPlaceList]);

  return (
    <div>
      <div id="staticMaps" />
    </div>
  );
}

export default MyMap;
