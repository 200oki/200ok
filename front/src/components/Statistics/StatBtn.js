import React from "react";
import { useStyles } from "../../utils/useStyles";
import StyledItem from "../StyledItem";
import { statMenuList } from "../../utils/util";
import { useNavigate } from "react-router-dom";
import "../../css/stats.css";

const StatBtn = () => {
  const classes = useStyles();
  const navigator = useNavigate();

  const handleClick = (e) => {
    // eslint-disable-next-line default-case
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
    <>
      <div className="firstDiv">
        {statMenuList
          .filter((menu) => menu.indexOf(menu) <= 2)
          .map((item, idx) => {
            return (
              <StyledItem
                key={idx}
                type="whiteItem"
                content={item}
                className={classes.menuItem}
                onClick={handleClick}
              />
            );
          })}
      </div>
      <div className="secondDiv">
        {statMenuList
            .filter((menu) => menu.indexOf(menu) > 2)
            .map((item, idx) => {
              return (
                  <StyledItem
                      key={idx}
                      type="whiteItem"
                      content={item}
                      className={classes.menuItem}
                      onClick={handleClick}
                  />
              );
            })}
      </div>
    </>
  );
};


export default StatBtn;