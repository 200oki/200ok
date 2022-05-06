import { useStyles } from "../../utils/useStyles";
import "../../css/GameIntro.css";
import { useNavigate } from "react-router-dom";
import BackButton from "../common/BackButton";
import React, { useEffect, useState, useContext } from "react";
import CustomModal from "../common/CustomModal";
import { Typography } from "@mui/material";
import { GameContext } from "../../context/GameContext";

const GameResult = () => {
  const [isClicked, setIsClicked] = useState(false);
  const classes = useStyles();
  const navigator = useNavigate();
  const { score, setScore } = useContext(GameContext);
  const { setTier, setMatchedTotal } = useContext(GameContext);

  const handleClick = () => {
    navigator("/game-start");
  };

  const handleModal = () => {
    setIsClicked((v) => !v);
  };

  useEffect(() => {
    setScore(0);
    setTier(1);
    setMatchedTotal([]);
  }, []);

  return (
    <div className="gameResultRoot">
      <div className={classes.quizContent}>
        <div className="backBtnWrapper">
          <BackButton content="뒤로가기" destination="game" />
        </div>
        <div className={classes.view} onClick={handleModal}>
          ?
        </div>
      </div>
      <img src="images/game_intro.png" alt="dj" className={"gameIntroImg"} />

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

      <CustomModal open={isClicked} onClose={handleModal}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className={classes.modalFont}
        >
          카드 뒤집기 게임
        </Typography>
        <hr />
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          className={classes.modalFont}
        >
          1분동안 8쌍의 카드 짝을 찾는 게임입니다.
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          className={classes.modalFont}
        >
          총 6단계로 게임이 진행됩니다.
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          className={classes.modalFont}
        >
          단, 그 전에 시간을 모두 소모할 시 게임이 종료 됩니다.
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          className={classes.modalFont}
        >
          최종 점수는 각 단계 * 남은 시간으로 계산됩니다.
        </Typography>
      </CustomModal>
    </div>
  );
};

export default GameResult;
