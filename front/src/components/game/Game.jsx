import React from "react";
import { useStyles } from "../../utils/useStyles";
import GameItem from "./GameItem";

const Game = () => {
  const classes = useStyles();

  return (
    <div className={classes.quizRoot}>
      <div className={classes.quizContent}></div>
      <GameItem />
    </div>
  );
};

export default Game;
