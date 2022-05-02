import React, { useEffect, useState } from "react";
import "../../css/GameHof.css";
import BackButton from "../common/BackButton";
import { useStyles } from "../../utils/useStyles";
import * as Api from "../../api";
import { Typography } from "@mui/material";

const GameHOF = () => {
  const classes = useStyles();
  const [rank, setRank] = useState([]);
  const typoStyles = {
    fontFamily: "TmoneyRoundWindExtraBold",
    fontSize: "1.5rem",
  };
  const titleStyles = {
    fontFamily: "TmoneyRoundWindExtraBold",
    fontSize: "1.5rem",
    display: "flex",
  };
  const getData = async () => {
    try {
      const { data } = await Api.get("scorelist");
      console.log(data);
      setRank(data.rankList);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="gameResultRoot">
      <div className={classes.quizContent}>
        <BackButton content="뒤로가기" className={classes.leftArrow} />
      </div>
      <div className="rankWrap">
        <div className="imageWrap">
          <img src="images/trophy_rm.png" alt="trophy" />
          <Typography
            className="title"
            sx={typoStyles}
            variant="body1"
            textAlign="center"
          >
            명예의 전당
          </Typography>
        </div>

        {rank.map((item, idx) => {
          return (
            <div className="rankList" key={idx}>
              <Typography sx={typoStyles} variant="body1" textAlign="center">
                {idx + 1}st
              </Typography>
              <Typography sx={typoStyles} variant="body1" textAlign="center">
                {item.nickname}
              </Typography>
              <Typography sx={typoStyles} variant="body1" textAlign="center">
                {item.score}점
              </Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameHOF;
