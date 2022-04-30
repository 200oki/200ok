import React from "react";
import styled from "../../css/match.module.css";
import { useStyles } from "../../utils/useStyles";
import HomeButton from "../common/HomeButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function MatchResultRank({ sample, goToPosition }) {
  const classes = useStyles();

  const compat = sample.slice(0, 2);

  return (
    <>
      <div className={`${styled.rankCharTitle} ${styled.rankCharTitleBg}`}>
        유형별 궁합
      </div>
      <div className={styled.rankCharWrapper}>
        {compat.map((s, idx) => (
          <div className={styled.rankCharCard} key={idx} idx={idx}>
            <div className={styled.rankCharTitle}>
              {idx === 0 ? "Good :)" : "Bad :("}
            </div>
            <div className={styled.rankCharImage}>
              <img src={s["image_photo"]} alt="주민사진" />
            </div>
            <div className={styled.rankCharName}>{s["name_ko"]}</div>
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
}

export default MatchResultRank;
