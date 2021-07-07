import React, { useEffect } from 'react';

declare global {
    interface Window {
        kakao: any;
    }
}

const Map = (placedata: any) => {
    console.log('placedata1', placedata.placedata)

    console.log('placedata2', placedata.placedata[0].lat)

    // console.log('long', long)

    // useEffect(()=>{
    //     window.kakao.map.load(() => {
    //         lenderMap()
    //     })
    // })

    // const lenderMap = () => {
    //     let container = document.getElementById('map');
    //     let options = {
    //         center: new window.kakao.maps.LatLng(33.50011272482717, 126.52728521151296),
    //         level: 7
    //     };

    //     let map = new window.kakao.maps.Map(container, options);

    // }

    useEffect(() => {

        //지도생성
        let container = document.getElementById('map');
        let options = {
            center: new window.kakao.maps.LatLng(33.50011272482717, 126.52728521151296),
            level: 7
        };

        let map = new window.kakao.maps.Map(container, options);


        // 고정 마커 생성
        let markerPosition = new window.kakao.maps.LatLng(placedata.placedata[0].lat, placedata.placedata[0].long); //제주공항
        // let markerPosition = new window.kakao.maps.LatLng(33.507035753055014, 126.49278647606816); //제주공항

        let marking = new window.kakao.maps.Marker({
            position: markerPosition
        });

        marking.setMap(map);

        // marking.setMap(null);

        //클릭한 위치에 마커표시
        // let marker = new window.kakao.maps.Marker({
        //     // 지도 중심좌표에 마커를 생성합니다 
        //     position: map.getCenter()
        // });
        // // 지도에 마커를 표시합니다
        // marker.setMap(map);

        // // 지도에 클릭 이벤트를 등록합니다
        // // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
        // window.kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {

        //     // 클릭한 위도, 경도 정보를 가져옵니다 
        //     let latlng = mouseEvent.latLng;

        //     // 마커 위치를 클릭한 위치로 옮깁니다
        //     marker.setPosition(latlng);

        //     let message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
        //     message += '경도는 ' + latlng.getLng() + ' 입니다';

        //     console.log(message)
        // });

        //지정 장소에 마커표시
        let positions = [
            {
                title: '시외버스터미널',
                latlng: new window.kakao.maps.LatLng(33.4995328804834, 126.51489117831237)
            },
            {
                title: '하나로마트',
                latlng: new window.kakao.maps.LatLng(33.493289623963925, 126.50470336484108)
            },
            {
                title: '오리동 주민센터',
                latlng: new window.kakao.maps.LatLng(33.495133627198406, 126.51157983652422)
            }
        ];

        // 마커 이미지의 이미지 주소
        let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        for (let i = 0; i < positions.length; i++) {

            // 마커 이미지의 이미지 크기
            let imageSize = new window.kakao.maps.Size(24, 35);

            // 마커 이미지를 생성  
            let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

            // 마커를 생성
            let marker = new window.kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage // 마커 이미지 
            });

            window.kakao.maps.event.addListener(marker, 'click', function () {
                marker.setMap(null);
            });
        }

        //마커를 선으로 연결
        let linePath = [
            new window.kakao.maps.LatLng(33.4995328804834, 126.51489117831237),
            new window.kakao.maps.LatLng(33.493289623963925, 126.50470336484108),
            new window.kakao.maps.LatLng(33.495133627198406, 126.51157983652422)
        ];

        // 지도에 표시할 선을 생성합니다
        let polyline = new window.kakao.maps.Polyline({
            path: linePath, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: '#75B8FA', // 선의 색깔입니다
            strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid' // 선의 스타일입니다
        });
        // console.log(positions)
        console.log('linePath', linePath)
        // 지도에 선을 표시합니다 
        polyline.setMap(map);


        // 커스텀 오버레이에 표시할 내용입니다     
        // HTML 문자열 또는 Dom Element 입니다 
        var content = '<div class="overlaybox">' +
            '    <div class="boxtitle">금주 영화순위</div>' +
            '    <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
            '    <div class="first">' +
            '        <div class="triangle text">1</div>' +
            '        <div class="movietitle text">드래곤 길들이기2</div>' +
            '    </div>' +
            '    <ul>' +
            '        <li class="up">' +
            '            <span class="number">2</span>' +
            '            <span class="title">명량</span>' +
            '            <span class="arrow up"></span>' +
            '            <span class="count">2</span>' +
            '        </li>' +
            '        <li>' +
            '            <span class="number">3</span>' +
            '            <span class="title">해적(바다로 간 산적)</span>' +
            '            <span class="arrow up"></span>' +
            '            <span class="count">6</span>' +
            '        </li>' +
            '        <li>' +
            '            <span class="number">4</span>' +
            '            <span class="title">해무</span>' +
            '            <span class="arrow up"></span>' +
            '            <span class="count">3</span>' +
            '        </li>' +
            '        <li>' +
            '            <span class="number">5</span>' +
            '            <span class="title">안녕, 헤이즐</span>' +
            '            <span class="arrow down"></span>' +
            '            <span class="count">1</span>' +
            '        </li>' +
            '    </ul>' +
            '</div>';

        // 커스텀 오버레이가 표시될 위치입니다 
        let position = new window.kakao.maps.LatLng(33.50011272482717, 126.52728521151296);


        // 커스텀 오버레이를 생성합니다
        let customOverlay = new window.kakao.maps.CustomOverlay({
            position: position,
            content: content,
            xAnchor: 0.3,
            yAnchor: 0.91
        });

        // 커스텀 오버레이를 지도에 표시합니다
        // customOverlay.setMap(map);

        window.kakao.maps.event.addListener(marking, 'click', function () {
            customOverlay.setMap(map);
        });

        // window.kakao.maps.event.addListener(marker, 'click', function () {
        //     customOverlay.setMap(null);
        // });

        // function closeOverlay() {
        //     customOverlay.setMap(null);
        // }
    }, [])

    return (
        <div className="Map">
            <div id="map"
            // style={{ width: "100vw", height: "500px" }} 
            />
        </div>
    )
}

export default Map;