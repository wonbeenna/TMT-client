import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../reducers";

declare global {
  interface Window {
    kakao: any;
  }
}
const Map = (placedata: any) => {
  const ListData: any = useSelector(
    (state: RootReducer) => state.placeListReducer.listData
  );

  const [kakaoMaps, setKakaoMaps] = useState<any>(null);
  const [markers, setMarkers] = useState<any>([]);
  const [Positions, setPositions] = useState<any>([]);

  useEffect(() => {
    setPositions(
      ListData[0].map(
        (el: any) => new window.kakao.maps.LatLng(el.lat, el.long)
      )
    );
  }, [ListData]);

  // 지도 실행
  useEffect(() => {
    kakaoMap();
  }, []);

  // 지도 띄우기
  const kakaoMap = () => {
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(
        37.579698652999916,
        126.97699720184801
      ),
      level: 10,
    };
    let map = new window.kakao.maps.Map(container, options);
    setKakaoMaps(map);
  };

  // 마커와 선긋기
  useEffect(() => {
    const viewMarker = () => {
      let imageSrc = "./img/marker_map_icon.png";
      let imageSize = new window.kakao.maps.Size(50, 50);
      let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
      setPositions(Positions);
      let marker = new window.kakao.maps.Marker({
        map: kakaoMaps,
        position: new window.kakao.maps.LatLng(Positions),
        // title: el.place, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage,
      });
      marker.setMap(kakaoMaps);
      setKakaoMaps(kakaoMaps);
    };
    viewMarker();
  }, [kakaoMaps, Positions]);

  console.log(Positions);
  // console.log(markers);
  return (
    <div className="Map">
      <div id="map" />
    </div>
  );
};

export default Map;
