import React, { useState, useEffect, useContext } from "react";
import { useStyles } from "../../utils/useStyles";
import "../../css/quiz.css";
import * as Api from "../../api";
import { shuffle } from "../../utils/shuffle";
import FlashcardList from "./FlashcardList";
import { GameAnswerContext } from "../../context/GameAnswerContext";

const GameItem = ({ tier }) => {
  const [isTwoFlipped, setIsTwoFlipped] = useState(0);
  const [timer, setTimer] = useState(0);
  const [cards, setCards] = useState([]);
  const [value, setValue] = useState([]);
  const classes = useStyles();
  const { answer, setAnswer } = useContext(GameAnswerContext);

  const getCards = async () => {
    try {
      let url;
      if (!tier) {
        url = "characters/random?size=8&tiers=1&fields=name_ko,image_photo";
      } else {
        url = `characters/random?size=16&tiers=${tier}&fields=name_ko,image_photo`;
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

  return (
    <React.Fragment>
      <div className={classes.progressBar}>
        <div
          style={{ width: `${timer}%` }}
          className={classes.inProgressBar}
        ></div>
      </div>
      <div className="container">
        <FlashcardList flashcard={value} />
      </div>
    </React.Fragment>
  );
};

export default GameItem;
