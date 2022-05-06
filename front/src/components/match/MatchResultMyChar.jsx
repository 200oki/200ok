import React, { useContext } from "react";
import styled from "../../css/match.module.css";
import { MatchButtonText } from "../../utils/util";
import { CopyToClipboard } from "react-copy-to-clipboard/src";
import "react-toastify/dist/ReactToastify.css";

import { NicknameContext } from "../../context/NicknameContext";
import { MatchElementContext } from "../../context/MatchElementContext";

const MatchResultMyChar = ({
  myChar,
  goToPosition,
  goToFirstPage,
  setCopied,
  value,
}) => {
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
        <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
          <button onClick={goToPosition}>{MatchButtonText.SHARE}</button>
        </CopyToClipboard>
        <button onClick={goToFirstPage}>{MatchButtonText.RETRY}</button>
        <button onClick={goToPosition}>{MatchButtonText.TYPE}</button>
        <button onClick={goToPosition}>{MatchButtonText.BEST}</button>
        <button onClick={goToPosition}>{MatchButtonText.COMMENT}</button>
      </div>
    </>
  );
};

export default MatchResultMyChar;
