import React from "react";
import styled from "../../css/match.module.css";
import { useStyles } from "../../utils/useStyles";
import { useNavigate } from "react-router-dom";
import HomeButton from "../common/HomeButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function MatchResultRank({ goodBad, goToPosition }) {
  const classes = useStyles();
  const navigator = useNavigate();

  return (
    <>
      <div className={`${styled.rankCharTitle} ${styled.rankCharTitleBg}`}>
        유형별 궁합
      </div>
      <div className={styled.rankCharWrapper}>
        {goodBad.map((s, idx) => (
          <div className={styled.rankCharCard} key={idx} idx={idx}>
            <div className={styled.rankCharTitle}>
              {idx === 0 ? <span>Good :)</span> : <span>Bad :(</span>}
            </div>
            <div className={styled.rankCharImage}>
              <img src={s.character.image_photo} alt="주민사진" />
            </div>
            <div className={styled.rankCharName}>{s.character.name_ko}</div>
            <button
              className={styled.goToCharInfoBtn}
              onClick={() => {
                navigator(`/detail/${s.id}`);
              }}
            >
              도감 보기
            </button>
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
