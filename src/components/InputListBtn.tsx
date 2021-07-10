import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../reducers";

function InputListBtn({ startToday, endToday, lists }: any) {
  // let listData2 = useSelector(
  //   (state: RootReducer) => state.savePlaceListReducer.place
  // );

  // console.log(startToday, endToday);

  const sendHandler = () => {
    console.log(lists);
  };

  return (
    <div className="inputList__save">
      <button className="inputList__saveBtn" onClick={sendHandler}>
        저장하기
      </button>
    </div>
  );
}

export default InputListBtn;
