import { useEffect } from "react";
import { useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}
function ViewMap({ viewList }: any) {
  const [map, setMap] = useState<any>(null);
  const [, setMarkerArr] = useState<any>([]);

  useEffect(() => {
    kakaoMap();
  }, []);

  const kakaoMap = () => {
    window.kakao.maps.load(() => {
      let mapContainer = document.getElementById("viewMaps");
      let mapOption = {
        center: new window.kakao.maps.LatLng(
          37.479698652999916,
          126.87699720184801
        ), // 지도생길때 보여주는 범위 좌표
        level: 12,
      };
      let map = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(map);
    });
  };

  //   console.log(viewList[0]?.spot);
  useEffect(() => {
    const viewMap = () => {
      const tempArr: Array<string> = [];
      const linePath: Array<string> = [];
      let imageSrc = "../img/flag.png";
      let imageSize = new window.kakao.maps.Size(50, 50);
      let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

      viewList?.forEach((el: any) => {
        return el.spot.map((e: any) => {
          let marker = new window.kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: new window.kakao.maps.LatLng(e.lat, e.long),
            image: markerImage, // 마커 이미지
          });
          tempArr.push(marker);
          let sw = new window.kakao.maps.LatLng(38, 127.5);
          let ne = new window.kakao.maps.LatLng(37, 127);
          let bounds = new window.kakao.maps.LatLngBounds(sw, ne);
          bounds.extend(new window.kakao.maps.LatLng(e.lat, e.long));
          map?.setBounds(bounds);
          linePath.push(new window.kakao.maps.LatLng(e.lat, e.long));
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
  }, [viewList]);

  return (
    <div>
      <div id="viewMaps" />
    </div>
  );
}

export default ViewMap;
