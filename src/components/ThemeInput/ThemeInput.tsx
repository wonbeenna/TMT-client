import { theme } from "../../modules/utils/theme";
import Popper from "@material-ui/core/Popper";
import Button from "@material-ui/core/Button";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { searchPlaceReq } from "../../modules/api/place";
import { useDispatch } from "react-redux";
import "./ThemeInput.css";

function ThemeInput({ province }: any) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [checkItems, setCheckItems] = useState<Array<string>>([]);

  const handleSingleCheck = (checked: boolean, theme: string) => {
    if (checked) {
      setCheckItems([...checkItems, theme]);
    } else {
      setCheckItems(checkItems.filter((el: string) => el !== theme));
    }
  };

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        border: "0.1px solid",
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        display: "grid",
        gridTemplateColumns: "1.5fr 5fr",
        justifyContent: "center",
      },
      paperInput: {
        margintop: "3px",
      },
    })
  );
  const classes = useStyles();
  const handleSearch = () => {
    dispatch(searchPlaceReq({ province, checkItems }));
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <div className="themeInput">
        <Button aria-describedby={id} type="button" onClick={handleClick}>
          테마 선택
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <div className={classes.paper}>
            {theme.map((el, idx: number) => (
              <>
                <input
                  className="paperInput"
                  key={idx}
                  type={"checkbox"}
                  onChange={(e) => {
                    handleSingleCheck(e.target.checked, el.title);
                  }}
                  checked={checkItems.includes(el.title) ? true : false}
                ></input>
                <span className="themeInput__title">{el.title}</span>
              </>
            ))}
          </div>
        </Popper>
        <button
          className="themeInput__btn"
          onClick={handleSearch}
          title="지역&테마로 검색"
        >
          search
        </button>
      </div>
    </>
  );
}

export default ThemeInput;
