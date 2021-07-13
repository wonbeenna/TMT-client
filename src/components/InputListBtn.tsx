import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../reducers";
import { Actions } from "../actions";
import axios from "axios";

function InputListBtn({ startToday, endToday, lists }: any) {
  // let listData2 = useSelector(
  //   (state: RootReducer) => state.savePlaceListReducer.place
  // );
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: RootReducer) => state.LoginReducer);

  const sendHandler = () => {

    if (isLogin) {
      const sendURL = `${process.env.REACT_APP_API}/trip/insertSpot`;
      axios.post(sendURL, {
        place: lists,
        startDate: startToday,
        endDate: endToday
      })
      window.location.href = "/Mypage"
    } else {
      const ModalHandler = (name: string) => {
        dispatch(Actions.modalStatus(true));
        dispatch(Actions.modalName(name));
      }
      ModalHandler("LikeCheckModal");
    }

    // console.log('lists', lists);
    // console.log('startToday, endToday', startToday, endToday);
  };

  // console.log(lists);
  // console.log(startToday, endToday);

  return (
    <div className="inputList__save">
      <button className="inputList__saveBtn" onClick={sendHandler}>
        저장하기
      </button>
    </div>
  );

}

export default InputListBtn;
