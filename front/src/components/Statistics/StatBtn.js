import React from "react";
import { useStyles } from "../../utils/useStyles";
import StyledItem from "../StyledItem";
import { statMenuList } from "../../utils/util";
import { useNavigate } from "react-router-dom";

const StatBtn = () => {
  const classes = useStyles();
  const navigator = useNavigate();

  const handleClick = (e) => {
    switch (e.target.innerText) {
      case "성별 분포":
        return navigator("/stats/gender");
        break;
      case "종 분포":
        return navigator("/stats/species");
        break;
      case "성격 분포":
        return navigator("/stats/personality");
        break;
      case "취미 분포":
        return navigator("/stats/hobby");
        break;
      case "스타일 분포":
        return navigator("/stats/style");
        break;
    }
  };
  return (
    <div>
      <div className={"stats"}>
        {statMenuList.map((item, idx) => {
          return idx >= 2 ? (
            <div className="firstDiv">
              <StyledItem
                key={idx}
                type="whiteItem"
                content={item}
                className={classes.menuItem}
                onClick={handleClick}
              />
            </div>
          ) : (
            <div className="secondDiv">
              <StyledItem
                key={idx}
                type="whiteItem"
                content={item}
                className={classes.menuItem}
                onClick={handleClick}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatBtn;