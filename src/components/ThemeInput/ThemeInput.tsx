import { theme } from "../../modules/utils/theme";
import { useCallback, useState } from "react";
import { searchPlaceReq } from "../../modules/api/place";
import { useDispatch } from "react-redux";
import "./ThemeInput.css";

function ThemeInput({ province }: any) {
  const dispatch = useDispatch();
  const [checkItems, setCheckItems] = useState<Array<string>>([]);
  const [open, setOpen] = useState<boolean>(false);
  const openContainer = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);
  const handleSingleCheck = (checked: boolean, theme: string) => {
    if (checked) {
      setCheckItems([...checkItems, theme]);
    } else {
      setCheckItems(checkItems.filter((el: string) => el !== theme));
    }
  };

  const handleSearch = () => {
    dispatch(searchPlaceReq({ province, checkItems }));
    setOpen(false);
    setCheckItems([]);
  };

  return (
    <>
      {open ? (
        <>
          <button className="themeInput__on" onClick={openContainer}>
            닫기
          </button>
          <div className="themeInput">
            {theme.map((el, index: number) => (
              <div className="themeInput__box" key={index}>
                <input
                  className="themeInput__checkBox"
                  type={"checkbox"}
                  onChange={(e) => {
                    handleSingleCheck(e.target.checked, el.title);
                  }}
                ></input>
                <span className="themeInput__title">{el.title}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <button className="themeInput__off" onClick={openContainer}>
          테마선택
        </button>
      )}
      <button
        className="themeInput__btn"
        onClick={handleSearch}
        title="지역&테마로 검색"
      >
        검색
      </button>
    </>
  );
}

export default ThemeInput;
