import React from "react";
import styled from "../../css/match.module.css";
import MatchResultRankChar from "./MatchResultRankChar";
import { useStyles } from "../../utils/useStyles";
import HomeButton from "../common/HomeButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function MatchResultRank({ sample, goToPosition }) {
  const classes = useStyles();

  return (
    <>
      <div className={`${styled.rankCharTitle} ${styled.rankCharTitleBg}`}>
        유형별 궁합
      </div>
      <div className={styled.rankCharWrapper}>
        {sample.map((s, idx) => (
          <MatchResultRankChar
            src={s["image_photo"]}
            key={idx}
            idx={idx}
            name={s["name_ko"]}
          />
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
