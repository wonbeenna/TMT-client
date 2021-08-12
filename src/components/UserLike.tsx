import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import "./CSS/UserLike.css";
import axios from "axios";
import { RootReducer } from "../modules/reducer";
import requests from "../modules/utils/requests";

const UserLike = () => {
  const [result, setResult] = useState<any | any[]>([]);
  const [likePlace, setLikePlace] = useState<any | any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isLogin } = useSelector((state: RootReducer) => state.LoginReducer);
  const accessToken: any = useSelector(
    (state: RootReducer) => state.accessTokenReducer
  );
  const setAccessToken = accessToken.AccessToken.accessToken;
  console.log(likePlace, result);
  const fetchMoreData = async () => {
    setIsLoading(true);
    setResult(result.concat(likePlace.slice(0, 5)));
    setLikePlace(likePlace.slice(5));
    setIsLoading(false);
  };

  const _infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;
    scrollHeight -= 100;
    if (scrollTop + clientHeight >= scrollHeight && isLoading === false) {
      fetchMoreData();
    }
  }, [isLoading]);

  const fetchData = async () => {
    if (isLogin) {
      await axios
        .get(requests.photoLikeURL, {
          headers: {
            authorization: `Bearer ${setAccessToken}`,
          },
        })
        .then((res) => {
          if (res.data === undefined || res.data === "") {
            return;
          } else {
            let response = res.data;
            setResult(response.slice(0, 5));
            response = response.slice(5);
            setLikePlace(response);
            setIsLoading(false);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setLikePlace([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", _infiniteScroll, true);
    return () => window.removeEventListener("scroll", _infiniteScroll, true);
  }, [_infiniteScroll]);

  return (
    <div className="userLikeWrap">
      <div className="userLike">
        {result?.map((el: any) => {
          return (
            <div className="userLike__contents">
              <div className="userLike__img">
                <img src={el.photo} alt="likephoto" />
              </div>
              <div className="userLike__info">
                <p>{el.place}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default UserLike;
