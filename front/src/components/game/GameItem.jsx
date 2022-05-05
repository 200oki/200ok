import React, { useState, useEffect, useContext } from "react";
import { useStyles } from "../../utils/useStyles";
import * as Api from "../../api";
import { shuffle } from "../../utils/shuffle";
import FlashcardList from "./FlashcardList";
import { GameAnswerContext } from "../../context/GameAnswerContext";
import CustomModal from "../common/CustomModal";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GameButtonText } from "../../utils/util";
import { GameContext } from "../../context/GameContext";

const GameItem = () => {
  const [timer, setTimer] = useState(0);
  const [gameTime, setGameTime] = useState(60);
  const [value, setValue] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const classes = useStyles();

  const navigator = useNavigate();
  const { score, setScore } = useContext(GameContext);
  const { tier, setTier } = useContext(GameContext);
  const { setAnswer } = useContext(GameAnswerContext);

  const ms = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    textAlign: "center",
    bgcolor: "rgba(255, 255, 255, 0.6)",
    border: "2px solid #fff",
    boxShadow: 24,
    p: 4,
    outline: "none",
  };

  const getCards = async () => {
    try {
      let url;
      if (!tier) {
        url = "characters/random?size=8&tiers=1&fields=name_ko,image_photo";
      } else {
        url = `characters/random?size=8&tiers=${tier}&fields=name_ko,image_photo`;
      }
      const { data } = await Api.get(url);
      await setAnswer([...data.payload]);

      return data.payload;
    } catch (e) {
      console.log(e);
    }
  };

  const setGame = () => {
    setGameTime(60);
    setTimer(0);
    setIsWin(false);
  };

  useEffect(() => {
    getCards().then((data) => {
      let arr = [];
      [...data].map((item, idx) => {
        arr.push(data[idx].name_ko);
        arr.push(data[idx].image_photo);
      });
      setValue(shuffle(arr));
    });
    setGame();
  }, []);

  useEffect(() => {
    getCards().then((data) => {
      let arr = [];
      [...data].map((item, idx) => {
        arr.push(data[idx].name_ko);
        arr.push(data[idx].image_photo);
      });
      setValue(shuffle(arr));
    });
    setIsModalOpen(false);
    time();
  }, [tier]);

  const time = () => {
    const tick = window.setTimeout(() => {
      setTimer(timer + 1.67);
      setGameTime(gameTime - 1);
    }, 1000);
  };

  useEffect(() => {
    if (timer >= 100 && gameTime === 0) {
      setIsModalOpen(true);
      window.clearTimeout(time);
    }
  }, [timer, gameTime]);

  useEffect(() => {
    if (timer >= 100 || isWin) {
      return () => window.clearTimeout(time);
    }
    time();
  }, [timer, isWin]);

  useEffect(() => {
    if (tier !== 6) {
      notSixTier();
    } else if (tier === 6) {
      sixTier();
    }
  }, [isWin]);

  const handleClose = () => {
    setIsModalOpen((v) => !v);
  };

  const notSixTier = () => {
    if (gameTime !== 60 && isWin) {
      setScore((v) => v + tier * gameTime);
      setTimer(0);
      setGameTime(60);
      window.clearTimeout(time);
    }
  };

  const sixTier = () => {
    if (gameTime !== 60) {
      if (gameTime === 0) {
        setScore((v) => v + tier * 8);
      } else {
        setScore((v) => v + tier * gameTime);
      }
    }
  };

  const handleNavigate = (e) => {
    if (e.target.innerText === GameButtonText.NextRound) {
      if (tier !== 6) {
        setTier((v) => v + 1);
        setGame();
        navigator("/game-start");
      } else if (tier === 6) {
        setGame();
        navigator("/game-result");
      }
    } else if (e.target.innerText === GameButtonText.RESULT) {
      setGame();
      navigator("/game-result");
    }
  };

  return (
    <React.Fragment>
      <div className={classes.gameTime}>{gameTime}</div>
      <div className={classes.progressBar}>
        <div
          style={{ width: `${timer}%` }}
          className={classes.inProgressBar}
        ></div>
      </div>
      <div className="container">
        <FlashcardList
          flashcard={value}
          setIsWin={setIsWin}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      <CustomModal open={isModalOpen} onClose={handleClose} modalStyle={ms}>
        {isWin ? (
          <div className={classes.gameEndModal}>
            <Typography
              id="modal-modal-description"
              className={classes.modalEndFont}
            >
              {tier}단계가 완료되었습니다.
            </Typography>

            {tier !== 6 ? (
              <button
                className={classes.gameEndButton}
                onClick={handleNavigate}
              >
                다음 라운드
              </button>
            ) : (
              <button
                className={classes.gameEndButton}
                onClick={handleNavigate}
              >
                결과 보기
              </button>
            )}
          </div>
        ) : (
          <div className={classes.gameEndModal}>
            <Typography
              id="modal-modal-description"
              className={classes.modalEndFont}
            >
              스테이지 클리어 실패 ㅠㅠ
            </Typography>
            <button className={classes.gameEndButton} onClick={handleNavigate}>
              결과 보기
            </button>
          </div>
        )}
      </CustomModal>
    </React.Fragment>
  );
};

export default GameItem;
