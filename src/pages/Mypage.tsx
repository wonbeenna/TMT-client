import React, { useState } from "react";
import DatePicker from "react-datepicker"
import { DateRange } from 'react-date-range';
import Map from '../components/Map'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './CSS/Mypage.css'
import 'react-date-range/dist/theme/default.css';

const Mypage = () => {
    // const [startDate, setStartDate] = useState(new Date())
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    return (
        <>
            <Header />
            <div className="mypage">
                <div className="mypageMap">
                    <Map />
                    <div className="route">여행 경로</div>
                </div>
                <div className="mypageMap">
                    <div className="calendar">
                        달력자리
                        {/* <Calendar onChange={(date: Date) => setDate(date)} /> */}
                        <DateRange
                            editableDateInputs={true}
                            onChange={(item: any) => setState([item.selection])}
                            moveRangeOnFirstSelection={false}
                        // ranges={state}
                        />
                        {/* <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)}
                        /> */}
                    </div>
                    <div className="like">여행지like</div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Mypage;