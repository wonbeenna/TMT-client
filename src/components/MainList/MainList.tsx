import { useState, useEffect } from "react";
import "./MainList.css";
import { useDispatch, useSelector } from "react-redux";
import { placeDataReq } from "../../modules/api/place";
import DatePicker from "../DatePicker/DatePicker";
import moment, { Moment } from "moment";
import { ThemeInput, PlaceInput, LocationInput, PlaceList } from "../index";
import { ListProps } from "../../interfaces";
import { RootState } from "../../modules/store";

function MainList({ lists, setLists }: ListProps) {
  const [province, setProvince] = useState<string | null>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const dispatch = useDispatch();
  const { placeData } = useSelector(
    (state: RootState) => state.placeDataReducer
  );
  const currentPosts = placeData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(placeDataReq());
  }, [dispatch]);

  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const _startDate = moment(startDate).format("YYYY-MM-DD");
  const _endDate = moment(endDate).format("YYYY-MM-DD");

  const handlendDatesChange = (arg: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => {
    setStartDate(arg.startDate);
    setEndDate(arg.endDate);
  };
  return (
    <>
      <div className="MainList">
        <div className="MainList__container">
          <div className="MainList__place">
            <PlaceInput />
            <div className="MainList__Location">
              <LocationInput setProvince={setProvince} />
              <ThemeInput province={province} />
            </div>
            <DatePicker
              startDate={startDate}
              endDate={endDate}
              handlendDatesChange={handlendDatesChange}
            />
          </div>
          <PlaceList
            place={currentPosts}
            _startDate={_startDate}
            _endDate={_endDate}
            postsPerPage={postsPerPage}
            totalPosts={placeData.length}
            paginate={paginate}
            currentPage={currentPage}
            lists={lists}
            setLists={setLists}
          />
        </div>
      </div>
    </>
  );
}

export default MainList;
