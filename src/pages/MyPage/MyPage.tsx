import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../modules/utils/Modal";
import {
  MyMap,
  Header,
  Footer,
  UserLike,
  MyTriproute,
  ErrPage,
} from "../../components/index";
import moment from "moment";
import { DayPickerRangeController, FocusedInputShape } from "react-dates";
import "./MyPage.css";
import "react-dates/initialize";
import { Actions } from "../../modules/api";
import { planPostReq } from "../../modules/api/place";
import { useHistory } from "react-router-dom";
import { RootState } from "../../modules/store";

function MyPage() {
  const history = useHistory();
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: RootState) => state.LoginReducer);
  const { AccessToken } = useSelector(
    (state: RootState) => state.accessTokenReducer
  );
  useEffect(() => {
    dispatch(Actions.headerActions.headerStatus("/MyPage"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(Actions.myPlaceListReq(AccessToken));
  }, [dispatch, AccessToken]);

  const { myPlaceList }: any = useSelector(
    (state: RootState) => state.myPlaceListReducer
  );

  const startDate = moment(myPlaceList?.startDate);
  const endDate = moment(myPlaceList?.endDate);

  const handlendDatesChange = (arg: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => {
    console.log(arg.startDate);
    console.log(arg.endDate);
  };

  const msDiff =
    new Date(myPlaceList?.startDate).getTime() -
    new Date(myPlaceList?.endDate).getTime();
  const range = Math.abs(msDiff / (1000 * 60 * 60 * 24)) + 1;

  const planPostHandler = () => {
    if (myPlaceList?.spot?.length === 0) {
      dispatch(Actions.modalActions.modalName("ErrModal"));
      dispatch(
        Actions.modalActions.modalMessage("하나 이상의 경로가 필요합니다.")
      );
    } else {
      dispatch(planPostReq(AccessToken, myPlaceList));
    }
  };

  return (
    <>
      {isLogin ? (
        <div className="myPage">
          <Modal />
          <Header />
          <div className="myPage__warp">
            <div className="myPage__title">
              <h1>{range}일 간의 여행 일정</h1>
            </div>
            <div className="myPage__section">
              <div className="myPage__Map">
                <MyMap />
              </div>
              <div className="myPage__share">
                <div className="myPage__calendar">
                  <DayPickerRangeController
                    startDate={startDate}
                    endDate={endDate}
                    onDatesChange={handlendDatesChange}
                    focusedInput={focusedInput}
                    onFocusChange={setFocusedInput}
                    initialVisibleMonth={null}
                    numberOfMonths={1}
                    monthFormat={"YYYY년 MM월"}
                  />
                  <div className="myPage__Btn">
                    <button
                      className="myPage__shareBtn"
                      onClick={() => history.push("./PlanPage")}
                    >
                      공유 페이지로 가기
                    </button>
                    <button
                      className="myPage__shareBtn"
                      onClick={planPostHandler}
                    >
                      여행 경로 공유 하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="myPage__section__route__title">
              <h1>나의 여행 경로</h1>
            </div>
            <div className="myPage__section__route">
              <MyTriproute myPlaceList={myPlaceList} />
            </div>
            <div className="myPage__like__title">
              <h1>좋아요 목록</h1>
            </div>
            <div className="myPage__like">
              <UserLike />
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <ErrPage />
      )}
    </>
  );
}

export default MyPage;
