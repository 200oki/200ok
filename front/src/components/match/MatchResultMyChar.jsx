import React, { useContext } from "react";
import styled from "../../css/match.module.css";

import { NicknameContext } from "../../context/NicknameContext";
import { MatchElementContext } from "../../context/MatchElementContext";

const MatchResultMyChar = ({ myChar, goToPosition, goToFirstPage }) => {
  const { nickname } = useContext(NicknameContext);
  const { resultMent } = useContext(MatchElementContext);

  return (
    <>
      <div className={styled.imgWrapper}>
        <img src={myChar.image_photo} alt={"주민 사진"} />
      </div>
      <div className={styled.textWrapper}>
        <div>{nickname} 님과 잘 어울리는 주민은</div>
        <div className={styled.villagerName}>
          ❝{" "}
          <span style={{ color: "#FA8D74", textShadow: "2px 2px #FFC4A8" }}>
            {myChar.name_ko}
          </span>{" "}
          ❞
        </div>
        <div>{resultMent[0]} 당신은</div>
        <div>귀염뽀짝 {myChar.name_ko} 과(와)</div>
        <div>최고의 궁합!</div>
        <div className={styled.avgText}>
          (전체 참여자 중{" "}
          <span className={styled.avgSubText}>{myChar.avg}%</span> 가 같은
          주민이 나왔어요!)
        </div>
      </div>
      <div className={styled.btnsWrapper}>
        <button>공유하기</button>
        <button onClick={goToFirstPage}>다시하기</button>
        <button onClick={goToPosition}>유형별 궁합</button>
        <button onClick={goToPosition}>가장 많은 유형</button>
        <button onClick={goToPosition}>반응 남기기</button>
      </div>
    </>
  );
};

export default MatchResultMyChar;
