import React from "react";
import styled from "../../css/match.module.css";
import { useStyles } from "../../utils/useStyles";
import HomeButton from "../common/HomeButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const MatchResultRank = ({ sample, goToPosition }) => {
  const classes = useStyles();

  return (
    <>
      <div className={`${styled.rankCharTitle} ${styled.rankCharTitleBg2}`}>
        가장 많은 유형
      </div>
      <div className={styled.rankCharWrapper}>
        {sample.map((s, idx) => (
          <div className={styled.rankCharCard} key={idx} idx={idx}>
            <div className={styled.rankCharTitle}>{idx + 1}위</div>
            <div className={styled.rankCharImage}>
              <img src={s["image_photo"]} alt="주민사진" />
            </div>
            <div className={styled.rankCharName}>{s["name_ko"]}</div>
            <div className={styled.rankCharSubTitle}>
              <span className={styled.charSmallSubTitle}>전체 참여자 중</span>{" "}
              <div className={styled.percentTitle}>
                {(Math.random() * 100).toFixed(2)}%
              </div>
            </div>
            <button className={styled.goToCharInfoBtn}>도감 보기</button>
          </div>
        ))}
      </div>
      <HomeButton
        Icon={ArrowUpwardIcon}
        className={classes.topBtn}
        onClick={goToPosition}
      />
    </>
  );
};

export default MatchResultRank;
