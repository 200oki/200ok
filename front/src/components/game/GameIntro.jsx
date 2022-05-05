import { useStyles } from "../../utils/useStyles";
import "../../css/GameIntro.css";
import { useNavigate } from "react-router-dom";
import BackButton from "../common/BackButton";
import React from "react";

const GameResult = () => {
  const classes = useStyles();
  const navigator = useNavigate();

  const handleClick = () => {
    navigator("/game-start");
  };
  return (
    <div className="gameResultRoot">
      <div className="backBtnWrapper">
        <BackButton content="뒤로가기" destination="game" />
      </div>

      <img
        src="images/game_intro.png"
        alt="raccoon"
        className={"gameIntroImg"}
      />
      <div className="contentRoot">
        <div className={"gameIntroComment"}>
          <img src="images/game_intro_content.png" alt="comment" />
          <img
            className={`${classes.introBottomArrow} blinkImg`}
            src="images/triangleBottomArrow.png"
            alt="arrow"
          />
        </div>

        <div className="btnWrapper">
          <button onClick={handleClick}>게임 시작</button>
        </div>
      </div>
    </div>
  );
};

export default GameResult;
