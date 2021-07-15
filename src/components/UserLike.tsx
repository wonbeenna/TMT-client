import { useEffect, useState } from "react";

const UserLike = ({ likePlace }: any) => {

    return (
        <>
            <div className="route_body">
                {likePlace?.map((el: any) => {
                    return (
                        <div className="route_oneoflike">
                            <img src={el.photo} />
                            <p>{el.place}</p>
                        </div>
                    );
                })}
            </div>
        </>
    );

}
export default UserLike

