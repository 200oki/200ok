import React, { useState, useContext } from "react";
import styled from "../../css/match.module.css";

import { NicknameContext } from "../../context/NicknameContext";
import { MatchElementContext } from "../../context/MatchElementContext";

const SelectColor = ({ nextSlide }) => {
  const { nickname } = useContext(NicknameContext);
  const { matchElem, setMatchElem } = useContext(MatchElementContext);

  const [color, setColor] = useState(null);

  const colors = [
    "베이지색",
    "검정색",
    "파랑색",
    "갈색",
    "컬러풀색",
    "회색",
    "초록색",
    "연파랑색",
    "오렌지색",
    "핑크색",
    "보라색",
    "빨강색",
    "하양색",
    "노랑색",
  ];

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <div className={`${styled.testContent} ${styled.Wrapper}`}>
      <div className={styled.testTitle}>
        {nickname}님이 좋아하는 색깔을 알려주세요!
        <span className={styled.subTestTitle}>(2 / 5)</span>
      </div>
      <form className={styled.colorForm}>
        <div>
          <div className={styled.colorTopDiv}>
            {colors
              .filter((p) => colors.indexOf(p) < 7)
              .map((p, i) => (
                <div key={`input${i}`} className={styled.colorRadioBtn}>
                  <input
                    type="radio"
                    value={colors[i]}
                    id={`color${i}`}
                    name="color"
                    onChange={handleColorChange}
                  />
                  <label htmlFor={`color${i}`}>{p}</label>
                </div>
              ))}
          </div>
          <div className={styled.colorBottomDiv}>
            {colors
              .filter((p) => colors.indexOf(p) >= 7)
              .map((p, i) => (
                <div key={`input${i + 7}`} className={styled.colorRadioBtn}>
                  <input
                    type="radio"
                    value={colors[i + 7]}
                    id={`color${i + 7}`}
                    name="color"
                    onChange={handleColorChange}
                  />
                  <label htmlFor={`color${i + 7}`}>{p}</label>
                </div>
              ))}
          </div>
        </div>
      </form>
      <button
        className={color !== null ? styled.btnActive : styled.btnHidden}
        onClick={() => {
          setMatchElem([...matchElem, [color]]);
          nextSlide();
        }}
      >
        다음
      </button>
    </div>
  );
};

export default SelectColor;
