import React, { useState, useEffect, useRef } from "react";
import { testData } from "../../utils/util";
import { useStyles } from "../../utils/useStyles";
import Card from "./Card";
import "../../css/quiz.css";

const GameItem = () => {
  const [isTwoFlipped, setIsTwoFlipped] = useState(0);
  const classes = useStyles();
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

  const handleCheckTwo = () => {
    setIsTwoFlipped((v) => v + 1);
  };

  return (
    <React.Fragment>
      <div className={classes.progressBar}>
        <div className={classes.inProgressBar}></div>
      </div>

      <div className={classes.cardRoot}>
        {testData.map((item, idx) => {
          return (
            <>
              <div className={classes.wrapCard} onClick={handleCheckTwo}>
                <Card name={item.name_ko} />
              </div>
              <div className={classes.wrapCard} onClick={handleCheckTwo}>
                <Card chImage={item.image_photo} />
              </div>
            </>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default GameItem;
