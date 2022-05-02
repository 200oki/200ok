import React, { useState, useContext } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { useStyles } from "../../utils/useStyles";
import GameItem from "./GameItem";
import { GameContext } from "../../context/GameContext";

const Game = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { score, setScore } = useContext(GameContext);

  const classes = useStyles();

  const handleClick = () => {
    setIsClicked((v) => !v);
  };
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #fff",
    boxShadow: 24,
    fontFamily: "TmoneyRoundWindExtraBold !important",
    p: 4,
    outline: "none",
  };

  return (
    <div className={classes.quizRoot}>
      <div className={classes.quizContent}>
        <div className={classes.view} onClick={handleClick}>
          ?
        </div>
      </div>
      <GameItem />
      <Modal
        open={isClicked}
        onClose={handleClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
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
        </Box>
      </Modal>
    </div>
  );
};

export default Game;
