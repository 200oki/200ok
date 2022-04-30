import { useState } from "react";
import { useStyles } from "../../utils/useStyles";
import "../../css/GameResult.css";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HomeButton from "../common/HomeButton";

const GameResult = () => {
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState(0);

  const classes = useStyles();
  const navigator = useNavigate();

  const typoStyles = {
    fontFamily: "TmoneyRoundWindExtraBold",
    fontSize: "1.5rem",
  };
  const gameResultHandler = (e) => {
    e.preventDefault();
    if (e.target.innerText === "홈으로") {
      navigator("/");
    } else if (e.target.innerText === "공유하기") {
    } else if (e.target.innerText === "다시하기") {
      navigator("/game");
    } else {
      navigator("/game-hof");
    }
  };
  return (
    <div className="gameResultRoot">
      <HomeButton
        Icon={EmojiEventsIcon}
        className={classes.fab}
        onClick={gameResultHandler}
      />
      <img
        src="images/raccoon.png"
        alt="raccoon"
        className={classes.gameResultImg}
      />
      <div className="contentRoot">
        <img src="images/gameResult.png" alt="comment" />
        <img
          className={`${classes.bottomArrow} blinkImg`}
          src="images/triangleBottomArrow.png"
          alt="arrow"
        />
        <Typography sx={typoStyles} variant={"body1"} className="content1">
          축하합니다!
        </Typography>
        <Typography sx={typoStyles} variant={"body1"} className="content2">
          당신의 기록은 <span className="gameResultScore">{score}점</span> 이고,
        </Typography>
        <Typography sx={typoStyles} variant={"body1"} className="content3">
          최종 순위는 <span className="gameResultRank">{rank}등</span> 입니다!
        </Typography>
        <div className="btnWrapper">
          <button onClick={gameResultHandler}>공유하기</button>
          <button onClick={gameResultHandler}>홈으로</button>
          <button onClick={gameResultHandler}>다시하기</button>
        </div>
      </div>
    </div>
  );
};

export default GameResult;
