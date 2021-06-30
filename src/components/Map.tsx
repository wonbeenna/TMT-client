import React, { useEffect } from 'react';

declare global {
    interface Window {
        kakao: any;
    }
}

const Map = (/*{setCenter}*/) => {
    useEffect(() => {

        let container = document.getElementById('map');
        let options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 7
        };

        let map = new window.kakao.maps.Map(container, options);

        // let marker = new window.kakao.maps.Marker({
        //     position: new window.kakao.maps.LatLng(33.5101562, 126.4681157), // 마커의 좌표
        //     map: window.kakao.map // 마커를 표시할 지도 객체
        // });
        let markerPosition = new window.kakao.maps.LatLng(33.5101562, 126.4681157);

        // 마커를 생성합니다
        let marking = new window.kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marking.setMap(map);

        // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
        // marker.setMap(null);    

        let marker = new window.kakao.maps.Marker({
            // 지도 중심좌표에 마커를 생성합니다 
            position: map.getCenter()
        });
        // 지도에 마커를 표시합니다
        marker.setMap(map);

        // 지도에 클릭 이벤트를 등록합니다
        // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
        window.kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {

            // 클릭한 위도, 경도 정보를 가져옵니다 
            let latlng = mouseEvent.latLng;

            // 마커 위치를 클릭한 위치로 옮깁니다
            marker.setPosition(latlng);

            let message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
            message += '경도는 ' + latlng.getLng() + ' 입니다';

            console.log(message)
        });

        function setCenter() {
            // 이동할 위도 경도 위치를 생성합니다 
            var moveLatLon = new window.kakao.maps.LatLng(33.452613, 126.570888);

            // 지도 중심을 이동 시킵니다
            map.setCenter(moveLatLon);
        }

        function panTo() {
            // 이동할 위도 경도 위치를 생성합니다 
            var moveLatLon = new window.kakao.maps.LatLng(33.450580, 126.574942);

            // 지도 중심을 부드럽게 이동시킵니다
            // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
            map.panTo(moveLatLon);
        }

    }, [])

    return (
        <div className="Map">
            <div id="map" style={{ width: "700px", height: "500px" }} />
        </div>
    );
}

export default Map;