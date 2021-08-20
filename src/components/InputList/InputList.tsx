import moment from "moment";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { Actions } from "../../modules/api";
import "./InputList.css";

import { InputListProps } from "../../interfaces";
import { InputListBtn } from "../index";

function InputList({
  _startDate,
  _endDate,
  lists,
  setLists,
  open,
  setOpen,
}: InputListProps) {
  const dispatch = useDispatch();
  const [startToday, setStartToday] = useState<string>("");
  const [endToday, setEndToday] = useState<string>("");

  const openContainer = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  useEffect(() => {
    if (_startDate === "Invalid date" && _endDate === "Invalid date") {
      setStartToday(moment(new Date()).format("YYYY-MM-DD"));
      setEndToday(moment(new Date()).format("YYYY-MM-DD"));
    }
    if (_startDate !== "Invalid date" && _endDate !== "Invalid date") {
      setStartToday(_startDate);
      setEndToday(_endDate);
    }
  }, [_startDate, _endDate]);

  const deleteHandler = (index: number) => {
    setLists(lists.filter((el, idx: number) => idx !== index));
  };

  const handleChange = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = [...lists];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setLists(items);
  };

  useEffect(() => {
    dispatch(Actions.placeActions.placeList(lists));
    if (lists.length > 0) {
      setOpen(true);
    }
  }, [dispatch, lists, setOpen]);

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

            <DragDropContext onDragEnd={(e) => handleChange(e)}>
              <Droppable droppableId="lists">
                {(provided) => (
                  <div
                    className="inputList__content"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {lists?.map((el: any, index) => {
                      return (
                        <Draggable
                          key={index}
                          draggableId={`${index}`}
                          index={index}
                        >
                          {(provided) => (
                            <div className="inputList__list">
                              <div
                                className="inputList__list__title"
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                              >
                                <div className="inputList__list__num">{`${
                                  index + 1
                                }`}</div>
                                <p>{el.place}</p>
                                <div
                                  key={index}
                                  className="inputList__list__delete"
                                  onClick={() => deleteHandler(index)}
                                >
                                  <img src="../img/delete.png" alt="" />
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

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
