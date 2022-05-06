import React from "react";
import { useStyles } from "../../utils/useStyles";
import StyledItem from "../common/StyledItem";
import { menuList } from "../../utils/util";
import HomeButton from "../common/HomeButton";
import { useNavigate } from "react-router-dom";
import styled from "../../css/team.module.css";
import "../../css/explore.css";

const Explore = () => {
  const classes = useStyles();
  const navigator = useNavigate();

  const handleClick = (e) => {
    switch (e.target.innerText) {
      case "오늘의 주인공":
        return navigator("/today");
        break;
      case "주민매칭":
        return navigator("/match");
        break;
      case "주민도감":
        return navigator("/bestiary");
        break;
      case "미니게임":
        return navigator("/game");
        break;
      case "글쓰기":
        return navigator("/write");
        break;
      default:
        return navigator("/team-introduction");
        break;
    }
  };

  return (
    <div className={"root"}>
      <button className={styled.teamPageBtn} onClick={handleClick}>
        <img src="/images/ham.png" />
      </button>
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
      <HomeButton className={classes.fab} />
    </div>
  );
};

export default Explore;
