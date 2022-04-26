import React from "react";
import { useStyles } from "../../utils/useStyles";
import StyledItem from "../StyledItem";
import { menuList } from "../../utils/util";
import HomeButton from "../common/HomeButton";
import { useNavigate } from "react-router-dom";
import "../../css/explore.css";

const Explore = () => {
  const classes = useStyles();
  const navigator = useNavigate();

  const handleNavigate = (e) => {
    if (e.target.innerText === "주민퀴즈") {
      navigator("/game");
    } else if (e.target.innerText === "오늘의 주인공") {
      navigator("/today");
    } else if (e.target.innerText === "나와 맞는 주민 찾기") {
      navigator("/match");
    } else if (e.target.innerText === "주민도감") {
      navigator("/bestiary");
    }
  };

  return (
    <div className={"root"}>
      {menuList.map((item, idx) => {
        return (
          <StyledItem
            key={idx}
            type="whiteItem"
            content={item}
            className={classes.menuItem}
            onClick={handleNavigate}
          />
        );
      })}
      <HomeButton />
    </div>
  );
};

export default Explore;
