import React, { useState } from "react";
import "./CSS/MainLeft.css";

const Placelist = (place: string | any) => {
    return (

        <li className="mainleft_destination">
            <div className="destination_list">
                <img src="../img/pic1.jpeg" alt="tes1" />
            </div>
            <div className="list_container">
                <div className="list_content">
                    {place}
                </div>

            </div>
        </li>


    )
}

export default Placelist;