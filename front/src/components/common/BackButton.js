import { ArrowLeft } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import { useStyles } from "../../utils/useStyles";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const classes = useStyles();
  const navigator = useNavigate();

  const backHome = () => {
    navigator(-1);
    // if (window.location.pathname === "/game-start") {
    //   navigator("/explore");
    // }
  };

  return (
    <Typography className={classes.quizName} onClick={backHome}>
      <ArrowLeft className={classes.leftArrow} />
      뒤로가기
    </Typography>
  );
};

export default BackButton;
