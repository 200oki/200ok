import React, { useContext } from "react";
import styled from "../../css/match.module.css";

import { NicknameContext } from "../../context/NicknameContext";

function MatchResult() {
  const { nickname, setNickname } = useContext(NicknameContext);

  return (
    <div className={styled.Wrapper}>
      <div className={styled.imgWrapper}>
        <img src="/image/Aurora.png" />
      </div>
      <div className={styled.textWrapper}>
        <div>{nickname} 님과 잘 어울리는 주민은</div>
        <div className={styled.villagerName}>❝ 오로라 ❞</div>
        <div>귀염뽀짝 어쩌구 저쩌구</div>
        <div>구구절절 쫑알쫑알</div>
        <div>최고의 궁합!</div>
      </div>
      <div className={styled.btnsWrapper}>
        <button>공유하기</button>
        <button>다시하기</button>
        <button>반응 남기기</button>
      </div>
    </div>
  );
}

export default MatchResult;
