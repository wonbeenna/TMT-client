import moment from "moment";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../reducers";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./CSS/InputList.css";
import { indexOf } from "lodash";

// 프롭으로 받아와서 쓸수있는지 확인해야됨(목록리스트)
const testPlace: any = [
  { id: "0", title: "경복궁" },
  { id: "1", title: "한라산" },
  { id: "2", title: "남산타워" },
  { id: "3", title: "청계천" },
  { id: "4", title: "남대문" },
  { id: "5", title: "동대문" },
  { id: "6", title: "청와대" },
];

function InputList() {
  const [open, setOpen] = useState<boolean>(false);
  const [startToday, setStartToday] = useState<string>("");
  const [endToday, setEndToday] = useState<string>("");
  const [place, setPlace] = useState(testPlace);
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

  const handleChange = (result: any) => {
    if (!result.destination) {
      return;
    }
    console.log(result);
    const items = [...place];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPlace(items);
  };
  // console.log(place);
  return (
    <div className={open ? "inputList" : "inputList__close"}>
      <div
        className={
          open ? "inputList__container" : "inputList__container__close"
        }
      >
        <div className="inputList__warp">
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
                  {place.map(({ id, title }: any, index: any) => {
                    return (
                      <Draggable key={id} draggableId={`${id}`} index={index}>
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
                              {title}
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
          <button className="inputList__saveBtn">저장하기</button>
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
