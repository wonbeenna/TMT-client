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


    )
}

export default Placelist;