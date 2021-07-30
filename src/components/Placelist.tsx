import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../actions";
import { RootReducer } from "../reducers";
import "./CSS/MainLeft.css";
import "./CSS/PlaceList.css";
import InputList from "./InputList";
import Paging from "./Pagination";
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
  const [likePlace, setLikePlace] = useState<Array<string>>([]);
  const [recommend, setRecommend] = useState<Array<object>>([]);
  const { isLogin } = useSelector((state: RootReducer) => state.LoginReducer);
  const accessToken: any = useSelector(
    (state: RootReducer) => state.accessTokenReducer
  );
  const setAccessToken = accessToken.AccessToken.accessToken;
  const setRefreshToken = accessToken.AccessToken.refreshToken;
  const tokenURL = `${process.env.REACT_APP_API}/token/refreshToken`;
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
          .then((res) => {
            setLikePlace(res.data.place);
          });
      } else {
        setLikePlace([]);
        const callbackAxios = async () => {
          await axios
            .post(
              tokenURL,
              {},
              {
                headers: {
                  authorization: `Bearer ${setRefreshToken}`,
                },
              }
            )
            .then((res) => {
              dispatch(Actions.LoginStatus(true));
              dispatch(
                Actions.AccessToken(res.data.newAccessToken, setRefreshToken)
              );
            })
            .catch((err) => {
              const status = err.response?.status;
              if (status === 401) {
                dispatch(Actions.LoginStatus(false));
                dispatch(Actions.AccessToken("", ""));
              } else {
                throw err;
              }
            });
        };
        callbackAxios();
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
        if (likePlace === undefined) {
          setLikePlace([el.place]);
        } else {
          setLikePlace([...likePlace]?.concat(el.place));
        }
      }
    } else {
      const ModalHandler = (name: string) => {
        dispatch(Actions.modalStatus(true));
        dispatch(Actions.modalName(name));
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
                const searchURL = `${process.env.REACT_APP_API}/trip/recommend`;
                axios
                  .post(
                    searchURL,
                    {
                      place: el.place,
                    },
                    {
                      withCredentials: true,
                    }
                  )
                  .then((res) => {
                    setRecommend([...recommend].concat(res.data));
                    dispatch(Actions.nextPlaceList(res.data));
                  })
                  .catch((err) => console.log("err", err));

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
          open={open}
          setOpen={setOpen}
        />
      </div>
    </>
  );
};
export default Placelist;
