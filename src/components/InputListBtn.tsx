import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../actions";
import { RootReducer } from "../reducers";

function InputListBtn({ startToday, endToday, lists }: any) {
  const [insertPlace, setInsertPlace] = useState<any>([]);

  const sendHandler = () => {
    console.log(lists);
    // console.log(startToday, endToday);
    // post >  insertPlace
    console.log(insertPlace);
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
