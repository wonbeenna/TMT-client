import React, { useState } from "react";
import "./CSS/MainLeft.css";
import InputList from "./InputList";
import Paging from "./Pagination";

const Placelist = ({
  place,
  _startDate,
  _endDate,
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}: any) => {
  const [lists, setLists] = useState<Array<object>>([]);

  return (
    <>
      <div className="PlaceList__warp">
        <div className="placeList__contents">
          <div className="placeList__nav">검색결과</div>
          <div className="placeList__content">
            {place.map((el: any, idx: number) => {
              const inputHandler = () => {
                setLists([...lists].concat(el));
              };
              return (
                <div
                  key={idx}
                  className="mainleft_destination"
                  onClick={() => inputHandler()}
                >
                  <div className="destination_list">
                    <img src={el.img} alt="tes1" />
                  </div>
                  <div className="list_container">
                    <div className="list_content">{el.place}</div>
                    <div className="list_address">
                      {el.address}
                      <img src="../img/flag.png" alt="" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Paging
            postsPerPage={postsPerPage}
            totalPosts={totalPosts}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
        <InputList
          _startDate={_startDate}
          _endDate={_endDate}
          lists={lists}
          setLists={setLists}
        />
      </div>
    </>
  );
};
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
