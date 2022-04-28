import React from "react";
import styled from "../../css/match.module.css";

function MatchResultRankChar({ src, idx, name }) {
  return (
    <div className={styled.rankCharCard}>
      <div className={styled.rankCharTitle}>
        {idx === 0 ? "Good :)" : "Bad :("}
      </div>
      <div className={styled.rankCharImage}>
        <img src={src} alt="주민사진" />
      </div>
      <div className={styled.rankCharName}>{name}</div>
      <button className={styled.goToCharInfoBtn}>도감 보기</button>
    </div>
  );
}

export default MatchResultRankChar;
