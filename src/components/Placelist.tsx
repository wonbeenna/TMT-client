import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../actions";
import { RootReducer } from "../reducers";
import "./CSS/MainLeft.css";
import "./CSS/PlaceList.css";
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
  const dispatch = useDispatch();
  const [lists, setLists] = useState<Array<object>>([]);
  const [likePlace, setLikePlace] = useState<any>([]);
  const { isLogin } = useSelector((state: RootReducer) => state.LoginReducer);
  const accessToken: any = useSelector(
    (state: RootReducer) => state.accessTokenReducer
  );
  const setAccessToken = accessToken.AccessToken.accessToken;
  const likeURL = `${process.env.REACT_APP_API}/user/like`;

  useEffect(() => {
    const fetchData = async () => {
      if (isLogin) {
        await axios
          .get(likeURL, {
            headers: {
              authorization: `Bearer ${setAccessToken}`,
            },
          })
          .then((res) => setLikePlace(res.data.place));
      } else {
        setLikePlace([]);
      }
    };
    fetchData();
  }, []);

  const likeHandler = async (el: any) => {
    if (isLogin) {
      if (likePlace?.includes(el.place)) {
        await axios.delete(likeURL, {
          headers: {
            authorization: `Bearer ${setAccessToken}`,
          },
          data: {
            place: el.place,
          },
        });

        setLikePlace(likePlace?.filter((els: any) => els !== el.place));
      } else {
        await axios.post(
          likeURL,
          {
            place: el.place,
          },
          {
            headers: {
              authorization: `Bearer ${setAccessToken}`,
            },
          }
        );
        setLikePlace([...likePlace]?.concat(el.place));
      }
    } else {
      const ModalHandler = (name: string) => {
        dispatch(Actions.modalStatus(true));
        dispatch(Actions.modalName(name));
      };
      ModalHandler("LikeCheckModal");
    }
  };
  const [recommend, setRecommend]: any = useState<string | any>([]);

  return (
    <>
      <div className="placeList__warp">
        <div className="placeList__contents">
          <div className="placeList__nav">검색결과</div>
          <div className="placeList__content">
            {place.map((el: any, idx: number) => {
              const inputHandler = () => {
                setLists([...lists].concat(el));
                console.log('Placelist_lists', lists)
                //상렬님 API구현 다 되면 확인하기
                // const searchURL = `${process.env.REACT_APP_API}/trip/recommend`;
                // axios
                //   .post(
                //     searchURL,
                //     {
                //       place: el.place,
                //     },
                //     {
                //       withCredentials: true,
                //     }
                //   )
                //   .then((res) => {
                //     console.log("recommendPOST_res.data", res.data);

                //     setRecommend(res.data)
                //     // => 받은 데이터값의 lat,long으로 mainpage 지도에 마커를 찍어줘야한다.
                //     // => 리덕스로 상태 관리
                //     // recommendPOST_res.data 콘솔결과
                //     // {message: "Create success", data: {…}}
                //     // data:
                //     // post: {_id: "60ec429d9c5eed887741f6f2", __v: 0}
                //     // __proto__: Object
                //     // message: "Create success"
                //     // __proto__: Object

                //   })
                //   .catch((err) => console.log("err", err));
              };
              return (
                <div key={idx} className="placeList__destination">
                  <div
                    className="placeList__destination__list"
                    onClick={() => inputHandler()}
                  >
                    <img src={el.photo} alt="tes1" />
                  </div>
                  <div
                    className="placeList__list__container"
                    onClick={() => inputHandler()}
                  >
                    <div className="placeList__list__content">
                      {el.place}
                      <img src="../img/flag.png" alt="" />
                    </div>

                    <div className="placeList__list__address">{el.address}</div>
                  </div>
                  <div className="placeList__list__like">
                    <img
                      src={
                        likePlace?.includes(el.place)
                          ? "../img/heart.png"
                          : "../img/noheart.png"
                      }
                      onClick={() => likeHandler(el)}
                    />
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
