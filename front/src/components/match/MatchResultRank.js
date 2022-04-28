import React from "react";
import styled from "../../css/match.module.css";
import MatchResultRankChar from "./MatchResultRankChar";
import TopButton from "../common/TopButton";

function MatchResultRank({ sample, goToPosition }) {
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
      <TopButton goToPosition={goToPosition} />
    </>
  );
}

export default MatchResultRank;
