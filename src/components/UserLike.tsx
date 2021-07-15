import { useEffect, useState } from "react";

const UserLike = ({ likePlace }: any) => {
  likePlace?.map((el: any) => {});

  //에러 수정하기 TypeError: Cannot read property 'map' of undefined
  return (
    <>
      <div className="route_body">
        {likePlace?.map((el: any) => {
          return (
            <div className="route_oneofroute">
              <p>{el}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default UserLike;
