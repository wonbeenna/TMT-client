import moment from "moment";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../reducers";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./CSS/InputList.css";
import { Actions } from "../actions";

function InputList() {
  const dispatch = useDispatch();

  let listData = useSelector(
    (state: RootReducer) => state.placeListReducer.listData
  );

  const handleChange = (result: any) => {
    if (!result.destination) {
      return;
    }
    const items = [...listData];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    listData = items;
    dispatch(Actions.savePlaceList(listData));
  };
  // dispatch(Actions.savePlaceList(listData));

  const [open, setOpen] = useState<boolean>(false);
  const [startToday, setStartToday] = useState<string>("");
  const [endToday, setEndToday] = useState<string>("");

  const openContainer = useCallback(() => {
    setOpen(!open);
  }, [open]);
  const Range: any = useSelector(
    (state: RootReducer) => state.RangeControllerReducer
  );
  useEffect(() => {
    if (
      Range.Range.startDate === "Invalid date" &&
      Range.Range.endDate === "Invalid date"
    ) {
      setStartToday(moment(new Date()).format("YYYY-MM-DD"));
      setEndToday(moment(new Date()).format("YYYY-MM-DD"));
    }
    if (
      Range.Range.startDate !== "Invalid date" &&
      Range.Range.endDate !== "Invalid date"
    ) {
      setStartToday(Range.Range.startDate);
      setEndToday(Range.Range.endDate);
    }
  });

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
            {/* 드래그 앤 드롭 부분 */}
            <DragDropContext onDragEnd={handleChange}>
              <Droppable droppableId="testPlace">
                {(provided) => (
                  <div
                    className="inputList__list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {listData?.map(({ place }: any, index: any) => {
                      return (
                        <Draggable
                          key={index}
                          draggableId={`${index}`}
                          index={index}
                        >
                          {(provided) => (
                            <>
                              <div
                                className="inputList__list__title"
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                              >
                                <div className="inputList__list__num">
                                  {index}
                                </div>
                                <p>{place}</p>
                                <div className="inputList__list__delete">
                                  <img src="../img/delete.png" alt="" />
                                </div>
                              </div>
                            </>
                          )}
                        </Draggable>
                      );
                    })}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div className="inputList__save">
              <button className="inputList__saveBtn">저장하기</button>
            </div>
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
