import React, { useState, useEffect, useContext } from "react";
import { useStyles } from "../../utils/useStyles";
import "../../css/quiz.css";
import * as Api from "../../api";
import { shuffle } from "../../utils/shuffle";
import FlashcardList from "./FlashcardList";
import { GameAnswerContext } from "../../context/GameAnswerContext";
import CustomModal from "../common/CustomModal";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GameButtonText } from "../../utils/util";
import usePathParams from "../../utils/usePathParams";
import { GameContext } from "../../context/GameContext";

const GameItem = () => {
  const [timer, setTimer] = useState(0);
  const [value, setValue] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const classes = useStyles();
  const pathname = usePathParams();

  const navigator = useNavigate();
  const { score, setScore } = useContext(GameContext);
  const { tier, setTier } = useContext(GameContext);
  const { answer, setAnswer } = useContext(GameAnswerContext);

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

  useEffect(() => {
    getCards().then((data) => {
      let arr = [];
      [...data].map((item, idx) => {
        arr.push(data[idx].name_ko);
        arr.push(data[idx].image_photo);
      });
      setValue(shuffle(arr));
    });
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
  }, [tier]);

  const time = () => {
    const tick = setTimeout(() => {
      setTimer(timer + 1.67);
    }, 1000);
  };

  useEffect(() => {
    if (timer >= 100) {
      return () => clearTimeout(time);
    }
    time();
  }, [timer]);

  const handleClose = () => {
    setIsModalOpen((v) => !v);
  };

  const notSixTier = () => {
    setScore((v) => v + tier * 8);
    setTier((v) => v + 1);
    window.clearTimeout(time);
    setTimer(0);
    setIsModalOpen(false);
  };
  const sixTier = () => {
    setScore((v) => v + tier * 8);
  };

  const handleNavigate = (e) => {
    e.preventDefault();

    if (e.target.innerText == GameButtonText.NextRound) {
      console.log("win", e.target.innerText);
      if (tier !== 6) {
        notSixTier();

        navigator("/game-start");
      } else if (tier === 6) {
        sixTier();

        navigator("/game-result");
      } else if (e.target.innerText == GameButtonText.RESULT) {
        window.clearTimeout(time);
        navigator("/game-result");
      }
      //콘텍스트에서 tier가지고 있으니까
      //티어 1 올리고
      //다시 게임 시작 컴포넌트로 보내기
      //아니면 게임 결과 페이지로 보내기
    }
  };

  return (
    <React.Fragment>
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
              {tier
                ? `${tier}단계가 완료되었습니다.}`
                : "1단계가 완료되었습니다."}
            </Typography>

            {tier != 6 ? (
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
