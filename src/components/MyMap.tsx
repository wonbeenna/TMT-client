import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../reducers";

declare global {
    interface Window {
        kakao: any;
    }
}

const MyMap = (placedata: any) => {
    // const listData = useSelector((state: RootReducer) => state.placeListReducer);

    // console.log('MyMap_listData1', listData.listData);

    // // useEffect(() => {
    // //     let mapContainer = document.getElementById("staticMap");
    // //     let mapOption = {
    // //         center: new window.kakao.maps.LatLng(
    // //             33.36197069309868, 126.52923096776973
    // //         ), // 지도생길때 보여주는 범위 좌표
    // //         level: 8,
    // //         draggable: true,
    // //     };
    // //     let map = new window.kakao.maps.Map(mapContainer, mapOption);
    // // })
    // useEffect(() => {

    //     var markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);

    //     var marker = {
    //         position: markerPosition
    //     };
    //     //지도생성
    //     var staticMapContainer = document.getElementById('staticMap'), // 이미지 지도를 표시할 div  
    //         staticMapOption = {
    //             center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 이미지 지도의 중심좌표
    //             level: 7, // 이미지 지도의 확대 레벨
    //             marker: marker
    //         };

    //     // 이미지 지도를 표시할 div와 옵션으로 이미지 지도를 생성합니다
    //     var staticMap = new window.kakao.maps.StaticMap(staticMapContainer, staticMapOption);

    //     // const linePath: any[] = [];


    //     // let bounds = new window.kakao.maps.LatLngBounds()


    //     // listData.listData.forEach((el: any) => {

    //     //     let imageSrc = "./img/marker_map_icon.png";
    //     //     let imageSize = new window.kakao.maps.Size(50, 50);
    //     //     let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

    //     //     let marker = new window.kakao.maps.Marker({
    //     //         map: staticMap, // 마커를 표시할 지도
    //     //         position: new window.kakao.maps.LatLng(el.lat, el.long),
    //     //         // title: el.place, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    //     //         image: markerImage, // 마커 이미지
    //     //     });

    //     //     marker.setMap(staticMap);

    //     //     bounds.extend(new window.kakao.maps.LatLng(el.lat, el.long))

    //     //     //   markers.push(marker);


    //     // });


    //     // if (!isNaN(bounds.ha)) {
    //     //     staticMap.setBounds(bounds, 90, 30, 10, 400);
    //     // }
    // });

    return (
        <div >
            <div id="staticMaps" />
        </div>
    );
};

export default MyMap;
