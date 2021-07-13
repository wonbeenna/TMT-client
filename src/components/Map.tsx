import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../reducers";

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
  const [pathArr, setPathArr] = useState<any>([]);

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
        center: new kakao.maps.LatLng(37.579698652999916, 126.97699720184801),
        level: 10,
      };
      let map = new kakao.maps.Map(container, options);
      setMap(map);
    });
  };

  // 지도 띄우기
  const viewMarker = () => {
    let imageSrc = "./img/marker_map_icon.png";
    let imageSize = new kakao.maps.Size(50, 50);
    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    let bounds = new kakao.maps.LatLngBounds();
    const tempArr: any = [];
    const linePath: any = [];
    ListData[0]?.forEach((el: any) => {
      tempArr.push(
        new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(el.lat, el.long),
          image: markerImage,
        })
      );

      linePath.push(new kakao.maps.LatLng(el.lat, el.long));

      bounds.extend(new kakao.maps.LatLng(el.lat, el.long));

      let polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: "#75B8FA",
        strokeOpacity: 0.7,
        strokeStyle: "solid",
      });
      polyline.setMap(map);

      setMarkerArr(tempArr);
      setPathArr(linePath);
      map.setBounds(bounds, 90, 30, 10, 400);
    });

    function removeMarker() {
      markerArr?.forEach((e: any) => e?.setMap(null));
      ListData = [];
    }

    removeMarker();
  };

  console.log(ListData[0]);
  console.log(pathArr);

  return (
    <div className="Map">
      <div id="map" />
    </div>
  );
};

export default Map;
