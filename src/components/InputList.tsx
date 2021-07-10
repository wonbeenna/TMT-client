import moment from "moment";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./CSS/InputList.css";
import InputListBtn from "./InputListBtn";

function InputList({ _startDate, _endDate, lists, setLists }: any) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(true);
  const [startToday, setStartToday] = useState<string>("");
  const [endToday, setEndToday] = useState<string>("");

  const openContainer = useCallback(() => {
    setOpen(!open);
  }, [open]);

  useEffect(() => {
    if (_startDate === "Invalid date" && _endDate === "Invalid date") {
      setStartToday(moment(new Date()).format("YYYY-MM-DD"));
      setEndToday(moment(new Date()).format("YYYY-MM-DD"));
    }
    if (_startDate !== "Invalid date" && _endDate !== "Invalid date") {
      setStartToday(_startDate);
      setEndToday(_endDate);
    }
  });

  // const handleChange = (result: any) => {
  //   if (!result.destination) {
  //     return;
  //   }
  //   const items = [...listData];
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);
  //   listData = items;

  //   dispatch(Actions.savePlaceList(listData));
  // };
  // dispatch(Actions.savePlaceList(listData));

  // // 일단 제거된 값까진 받는데 다시 어떻게 랜더할지 모르겠음
  // // 리덕스 자체에서 필터를 해야되는건가?
  // const deleteHandler = (event: any) => {
  //   let listData2 = listData.filter((el: any) => {
  //     return el?.place !== event;
  //   });

  //   dispatch(Actions.savePlaceList(listData2.slice(-1)));
  //   listData = listData2;
  //   console.log(listData2);
  //   console.log(listData);
  // };

  const deleteHandler = useCallback(
    (event: any) => {
      setLists(lists.filter((el: any) => el.place !== event.place));
    },
    [lists]
  );
  console.log(lists);
  return (
    <div className={open ? "inputList" : "inputList__close"}>
      <div
        className={
          open ? "inputList__container" : "inputList__container__close"
        }
      >
        <div className="inputList__warp">
          <div className="inputList__contents">
            <div className="inputList__nav">
              <div className="inputList__title">나의 여행 일정</div>
              <img
                className="inputList__calendar"
                src="../img/calendar-icon.png"
                alt=""
              />
              <div className="inputList__date">
                {startToday} ~ {endToday}
              </div>
            </div>
            <div className="inputList__content">
              {lists?.map((el: any, idx: number) => {
                return (
                  <div className="inputList__list">
                    <div className="inputList__list__title">
                      <div className="inputList__list__num">{`${idx + 1}`}</div>
                      <p>{el.place}</p>
                      <div
                        key={idx}
                        className="inputList__list__delete"
                        onClick={() => deleteHandler(el)}
                      >
                        <img src="../img/delete.png" alt="" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <InputListBtn
              startToday={startToday}
              endToday={endToday}
              lists={lists}
            />
          </div>
        </div>
      </div>
      <div
        className={open ? "inputList__slideBtn" : "inputList__slideBtn__close"}
      >
        <img src="../img/right-arrow.png" alt="" onClick={openContainer} />
      </div>
    </div>
  );
}

export default InputList;
