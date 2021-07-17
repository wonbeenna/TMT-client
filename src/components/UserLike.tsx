import { useEffect, useState, useCallback } from "react";
import "./CSS/UserLike.css";

const UserLike = ({ likePlace }: any) => {
  // const [itemIndex, setItemIndex] = useState(0);
  // const [result, setResult] = useState(likePlace.slice(0, 5));

  // const _infiniteScroll = useCallback(() => {
  //   let scrollHeight = Math.max(
  //     document.documentElement.scrollHeight,
  //     document.body.scrollHeight
  //   );
  //   let scrollTop = Math.max(
  //     document.documentElement.scrollTop,
  //     document.body.scrollTop
  //   );
  //   let clientHeight = document.documentElement.clientHeight;
  //   // console.log('qqq', scrollTop + clientHeight)
  //   // console.log('wwwww2wwww', scrollHeight)
  //   if (scrollTop + clientHeight === scrollHeight) {
  //     setItemIndex(itemIndex + 5);
  //     setResult(result.concat(likePlace.slice(itemIndex + 5, itemIndex + 10)));
  //   }
  // }, [itemIndex, result]);

  // useEffect(() => {
  //   window.addEventListener("scroll", _infiniteScroll, true);
  //   return () => window.removeEventListener("scroll", _infiniteScroll, true);
  // }, [_infiniteScroll]);
  // console.log(likePlace);
  // console.log('length1', document.documentElement.scrollHeight) //3173 => 4087
  // console.log('length2', document.body.scrollHeight) //3173 => 4087
  // console.log('scrollTop', document.documentElement.scrollTop, document.body.scrollTop)  //683 0 => => 0 0
  // console.log('clientHeight', document.documentElement.clientHeight) //1099 => 764
  // console.log('구조가 어떻게 되나', likePlace)
  return (
    <div className="userLikeWrap">
      <div className="userLike">
        {likePlace?.map((el: any) => {
          return (
            <div className="userLike__contents">
              <div className="userLike__img">
                <img src={el.photo} />
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
