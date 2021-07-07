import React, { useState } from "react";
import "./CSS/MainLeft.css";


const Placelist = (place: string | any, address: string | any) => {
    console.log('place', place)
    console.log('address', address)

    return (

        <li className="mainleft_destination">
            <div className="destination_list">
                <img src={place.img} alt="tes1" />
            </div>
            <div className="list_container">
                <div className="list_content">
                    {place.place}
                </div>

                <div className="list_address">
                    {Object.values(place.address)}
                </div>
            </div>
        </li>

export default Placelist;

// 0: ["역사&문화", "야경", "랜드마크", "휴식&힐링", "사진"]
// 1: "덕수궁"
// 2: "서울 중구 세종대로 99 덕수궁"
// 3: 37.565972575797396
// 4: 126.97515152495737
// 5: "www.dfjkjeeogoo.png"


// 0: (5) ["역사&문화", "야경", "랜드마크", "휴식&힐링", "사진"]
// 1: "경복궁"
// 2: "서울특별시 종로구 세종로 사직로 161"
// 3: 37.579698652999916
// 4: 126.97699720184801
// 5: "www.geeess.png"

// 0: (5) ["야경", "휴식&힐링", "사진", "데이트", "가족"]
// 1: "청계천"
// 2: "서울특별시 종로구 서린동 청계천로 1 "
// 3: 37.56929706865797
// 4: 126.97865846930021
// 5: "www.geeess.png"
