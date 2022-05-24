import "../css/main.css";
import React from "react";
import StyledItem from "../components/common/StyledItem";
import { useStyles } from "../utils/useStyles";
import { useNavigate } from "react-router-dom";

function Main() {
  const classes = useStyles();
  const navigator = useNavigate();

  const handleClick = () => {
    navigator("/explore");
  };

  return (
    <div className="mainWrapper">
      <img
        className={"logo"}
        src="/images/main_logo_rm.png"
        alt={"animal Crossing"}
      />
      <StyledItem
        type="button"
        className={`${classes.startBtn} logo`}
        content="시작하기"
        onClick={handleClick}
      />
    </div>
  );
}

export default Main;
