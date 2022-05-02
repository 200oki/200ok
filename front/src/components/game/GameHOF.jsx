import React, { useEffect, useState } from "react";
import "../../css/GameHof.css";
import BackButton from "../common/BackButton";
import { useStyles } from "../../utils/useStyles";
import * as Api from "../../api";
import { Typography } from "@mui/material";
import styled from "../../css/match.module.css";

const GameHOF = () => {
  const classes = useStyles();
  const [rank, setRank] = useState([]);
  const typoStyles = {
    fontFamily: "TmoneyRoundWindExtraBold",
    fontSize: "1.5rem",
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
      <div className={classes.navBar}>
        <BackButton content="뒤로가기" className={classes.leftArrow} destination="explore" />
      </div>
      <div className="rankWrap">
        <div className="imageWrap">
          <img src="images/trophy_rm.png" alt="trophy" />
          <div className={`hofTitle txt-shine`}>명예의 전당</div>
        </div>

        {rank.map((item, idx) => {
          return (
            <div className="rankList" key={idx}>
              <Typography sx={typoStyles} variant="body1" textAlign="center">
                {idx + 1}등
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

        <form className={styled.commentForm}>
          <div className={styled.commentBack}>
            <input type="text" placeholder="댓글을 입력해주세요" required />
          </div>
          <button type="submit" className={styled.commentReg}>
            등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default GameHOF;
