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

  const handleClick = (e) => {
    switch (e.target.innerText) {
      case "오늘의 주인공":
        return navigator("/today");
        break;
      case "나와 맞는 주민 찾기":
        return navigator("/match");
        break;
      case "주민도감":
        return navigator("/bestiary");
        break;
      case "주민퀴즈":
        return navigator("/game");
        break;
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
            onClick={handleClick}
          />
        );
      })}
      <HomeButton />
    </div>
  );
};

export default Explore;
