import React, { useState, useEffect } from "react";
import { useStyles } from "../../utils/useStyles";
import "../../css/quiz.css";
import * as Api from "../../api";
import { shuffle } from "../../utils/shuffle";
import FlashcardList from "./FlashcardList";

const GameItem = ({ tier }) => {
  const [isTwoFlipped, setIsTwoFlipped] = useState(0);
  const [timer, setTimer] = useState(0);
  const [cards, setCards] = useState([]);
  const [value, setValue] = useState([]);
  const classes = useStyles();

  const getCards = async () => {
    try {
      let url;
      if (!tier) {
        url = "characters/random?size=8&tiers=1&fields=name_ko,image_photo";
      } else {
        url = `characters/random?size=16&tiers=${tier}&fields=name_ko,image_photo`;
      }
      const { data } = await Api.get(url);

      return data.payload;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCards().then((data) => {
      setCards(data);
      let arr = [];
      [...data].map((item, idx) => {
        arr.push(data[idx].name_ko);
        arr.push(data[idx].image_photo);
      });
      setValue(shuffle(arr));
      console.log("random", arr);
      console.log("data", data);
    });
  }, []);

  useEffect(() => {
    if (timer >= 100) {
      return () => clearTimeout(tick);
    }
    const tick = setTimeout(() => {
      setTimer(timer + 1.67);
    }, 1000);
  }, [timer]);

  useEffect(() => {
    if (isTwoFlipped >= 2) {
      //card 뒤집혀있으면 클릭되면 클래스 달아서
      [...document.querySelectorAll(".react-card-front")].map(
        (x) =>
          (x.style =
            "backface-visibility: hidden; height: 100%; left: 0px; position: relative; top: 0px; transform: rotateY(0deg); transform-style: preserve-3d; transition: all 0.6s ease 0s; width: 100%; z-index: 2;")
      );
      [...document.querySelectorAll(".react-card-back")].map(
        (x) =>
          (x.style =
            "backface-visibility: hidden; height: 100%; left: 0px; position: absolute; top: 0px; transform: rotateY(-180deg); transform-style: preserve-3d; transition: all 0.6s ease 0s; width: 100%; z-index: 2;")
      );
    }
  }, [isTwoFlipped]);

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
