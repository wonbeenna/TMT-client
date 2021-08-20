import "./PlanSearch.css";
import { options, theme } from "../../modules/utils/theme";
import { useCallback, useState } from "react";
import { planSearchReq } from "../../modules/api/place";
import { useDispatch } from "react-redux";

function PlanSearch({ planList }: any) {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(true);
  const [checkTheme, setCheckTheme] = useState<Array<string>>([]);

  const openContainer = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const locationHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: string
  ) => {
    if (type === "location") {
      setValue(event.target.value);
    }
  };

  const handleSingleCheck = (checked: boolean, theme: string) => {
    if (checked) {
      setCheckTheme([...checkTheme, theme]);
    } else {
      setCheckTheme(checkTheme.filter((el: string) => el !== theme));
    }
  };

  const searchHandler = () => {
    dispatch(planSearchReq(value, checkTheme));
  };

  return (
    <div className="planPage__search">
      <div className="planPage__searchTitle">
        <h2>다른 여행자들의 플랜</h2>
      </div>
      <div className="planPage__searchBar">
        <div className="planPage__location">
          <p>지역검색</p>
          <select
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              locationHandler(e, "location");
            }}
          >
            <option value={""}>지역검색</option>
            {options.map((el, idx) => {
              return (
                <option value={el} key={idx}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>

        <div className="planPage__theme">
          <p>테마검색</p>
          {open ? (
            <>
              <button className="planPage__theme__on" onClick={openContainer}>
                닫기
              </button>
              <div className="planPage__theme__input">
                {theme.map((el, index: number) => (
                  <div className="planPage__theme__box" key={index}>
                    <input
                      className="planPage__theme__checkbox"
                      type={"checkbox"}
                      onChange={(e) => {
                        handleSingleCheck(e.target.checked, el.title);
                      }}
                    ></input>
                    <span className="planPage__theme__title">{el.title}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <button className="planPage__theme__off" onClick={openContainer}>
              테마선택
            </button>
          )}
          <button
            className="planPage__theme__btn"
            title="지역&테마로 검색"
            onClick={searchHandler}
          >
            검색
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlanSearch;
