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
        center: new kakao.maps.LatLng(36.579698652999916, 125.37699720184801),
        level: 12,
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

    ListData[0]?.forEach((el: any) => {
      tempArr.push(
        new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(el.lat, el.long),
          image: markerImage,
        })
      );
      let bounds = new kakao.maps.LatLngBounds();
      bounds.extend(new kakao.maps.LatLng(el.lat, el.long));
      linePath.push(new kakao.maps.LatLng(el.lat, el.long));
      map.setBounds(bounds, 90, 30, 10, 400);
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
