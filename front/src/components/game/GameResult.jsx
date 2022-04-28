import { useState } from "react";
import { useStyles } from "../../utils/useStyles";
import "../../css/GameResult.css";
import { Typography } from "@mui/material";

const GameResult = () => {
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState(0);

  const classes = useStyles();
  const typoStyles = {
    fontFamily: "TmoneyRoundWindExtraBold",
    fontSize: "1.5rem",
  };
  return (
    <div className="gameResultRoot">
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
          당신의 기록은 {score}점 이고,
        </Typography>
        <Typography sx={typoStyles} variant={"body1"} className="content3">
          최종 순위는 {rank}등 입니다!
        </Typography>
      </div>
    </div>
  );
};

export default GameResult;
