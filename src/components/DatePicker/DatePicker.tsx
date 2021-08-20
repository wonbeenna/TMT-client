import "./datepicker.css";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import { useState } from "react";
import moment from "moment";
import { datePicker } from "../../interfaces";

function DatePicker({ startDate, endDate, handlendDatesChange }: datePicker) {
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );

  const handleFocusChange = (arg: FocusedInputShape | null) => {
    setFocusedInput(arg);
  };

  const orientation = window.matchMedia("(max-width: 635px)").matches
    ? "vertical"
    : "horizontal";

  return (
    <div className="datePicker">
      <img src="../img/calendar-icon.png" alt="" />
      <DateRangePicker
        startDate={startDate}
        startDateId="startDate"
        endDate={endDate}
        endDateId="endDate"
        onDatesChange={handlendDatesChange}
        focusedInput={focusedInput}
        onFocusChange={handleFocusChange}
        startDatePlaceholderText={"여행 시작일"}
        endDatePlaceholderText={"여행 종료일"}
        isOutsideRange={(day) => moment().diff(day) >= 0}
        monthFormat={"YYYY년 MM월"}
        minimumNights={0}
        block
        noBorder
        showClearDates
        orientation={orientation}
      />
    </div>
  );
}

export default DatePicker;
