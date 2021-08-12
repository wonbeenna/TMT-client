import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../modules/api";
import { RootReducer } from "../modules/reducer";
import "./CSS/MainLeft.css";
import "./CSS/PlaceList.css";
import InputList from "./InputList";
import Paging from "./Pagination";
import requests from "../modules/utils/requests";
import { likeDeleteReq, likeGetReq, likePostReq } from "../modules/api/user";
import { recommendReq } from "../modules/api/place";
axios.defaults.withCredentials = true;
const Placelist = ({
  place,
  _startDate,
  _endDate,
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  lists,
  setLists,
}: any) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const { isLogin } = useSelector((state: RootReducer) => state.LoginReducer);
  const accessToken: any = useSelector(
    (state: RootReducer) => state.accessTokenReducer
  );
  const setAccessToken = accessToken.AccessToken.accessToken;

  const { userLike }: any = useSelector(
    (state: RootReducer) => state.userLikeReducer
  );
  useEffect(() => {
    dispatch(likeGetReq(setAccessToken));
    // const fetchData = async () => {
    //   if (isLogin) {
    //     await axios
    //       .get(requests.likeURL, {
    //         headers: {
    //           authorization: `Bearer ${setAccessToken}`,
    //         },
    //       })
    //       .then((res) => {
    //         setLikePlace(res.data.place);
    //       });
    //   } else {
    //     setLikePlace([]);
    //   }
    // };
    // fetchData();
  }, [setAccessToken]);

  const likeHandler = (el: any) => {
    if (isLogin) {
      if (userLike?.includes(el.place)) {
        dispatch(likeDeleteReq(el.place, setAccessToken));
        dispatch(
          Actions.userActions.userLike(
            userLike?.filter((els: any) => els !== el.place)
          )
        );
      } else {
        dispatch(likePostReq(el.place, setAccessToken));
        if (userLike === undefined) {
          dispatch(Actions.userActions.userLike([el.place]));
        } else {
          dispatch(
            Actions.userActions.userLike([...userLike]?.concat(el.place))
          );
        }
      }
    } else {
      const ModalHandler = (name: string) => {
        dispatch(Actions.modalActions.modalStatus(true));
        dispatch(Actions.modalActions.modalName(name));
      };
      ModalHandler("LikeCheckModal");
    }
  };

  return (
    <>
      <div className="placeList__warp">
        <div className="placeList__contents">
          <div className="placeList__nav">검색결과</div>
          <div className="placeList__content">
            {place.map((el: any, idx: number) => {
              const inputHandler = () => {
                setLists([...lists].concat(el));
                dispatch(recommendReq(el.place));
                // axios
                //   .post(
                //     requests.recommendURL,
                //     {
                //       place: el.place,
                //     },
                //     {
                //       withCredentials: true,
                //     }
                //   )
                //   .then((res) => {
                //     setRecommend([...recommend].concat(res.data));
                //     dispatch(Actions.placeActions.nextPlaceList(res.data));
                //   })
                //   .catch((err) => console.log("err", err));

                if (lists.length >= 0) {
                  setOpen(true);
                }
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
                        userLike?.includes(el.place)
                          ? "../img/heart.png"
                          : "../img/noheart.png"
                      }
                      alt=""
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
          open={open}
          setOpen={setOpen}
        />
      </div>
    </>
  );
};
export default Placelist;
