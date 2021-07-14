import { useEffect, useState } from "react";

const UserLike = ({ likePlace }: any) => {
  console.log("likePlace_Userlike", likePlace);

  // likePlace.map((el: any) => {
  //     console.log('el', el)
  // })

  return (
    <>
      <div className="route_body">
        {likePlace.map((el: any) => {
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
