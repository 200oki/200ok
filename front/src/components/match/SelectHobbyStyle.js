import React, { useState, useContext } from "react";
import styled from "../../css/match.module.css";
import { useNavigate } from "react-router-dom";

import { NicknameContext } from "../../context/NicknameContext";

import { MatchElementContext } from "../../context/MatchElementContext";

const SelectHobbyStyle = ({ array, nextSlide }) => {
  const navigator = useNavigate();
  const { nickname } = useContext(NicknameContext);
  const { matchElem, setMatchElem } = useContext(MatchElementContext);

  const [hobby, setHobby] = useState(null);
  const [style, setStyle] = useState(null);

  const handleHobbyStyleChange = (e) => {
    if (array[0] === "취미") {
      setHobby(e.target.value);
    } else {
      setStyle(e.target.value);
    }
  };

  const handleTestSubmit = async (e) => {
    e.preventDefault();

    if (array[0] === "취미") {
      setMatchElem([...matchElem, hobby]);
    } else {
      setMatchElem([...matchElem, [style]]);
    }
  };

  return (
    <div className={`${styled.testContent} ${styled.Wrapper}`}>
      {array[0] === "취미" ? (
        <div className={styled.testTitle}>
          {nickname}님의 취미는 무엇인가요?
        </div>
      ) : (
        <div className={styled.testTitle}>
          {nickname}님의 스타일을 알려주세요!
        </div>
      )}
      <form className={styled.hobbyStyleForm}>
        <div>
          <div className={styled.hobbyStyleDiv}>
            {array
              .filter((a) => array.indexOf(a) !== 0)
              .map((p, i) => (
                <div key={`input${i}`} className={styled.hobbyStyleRadioBtn}>
                  <input
                    type="radio"
                    value={array[i + 1]}
                    id={array[0] === "취미" ? `hobby${i}` : `style${i}`}
                    name={array[0]}
                    onChange={handleHobbyStyleChange}
                  />
                  <label
                    htmlFor={array[0] === "취미" ? `hobby${i}` : `style${i}`}
                  >
                    {p}
                  </label>
                </div>
              ))}
          </div>
        </div>
      </form>
      {array[0] === "취미" ? (
        <button
          className={hobby !== null ? styled.btnActive : styled.btnHidden}
          onClick={(e) => {
            nextSlide();
            handleTestSubmit(e);
          }}
        >
          다음
        </button>
      ) : (
        <button
          className={style !== null ? styled.btnActive : styled.btnHidden}
          onClick={(e) => {
            handleTestSubmit(e);
            navigator("/match-result");
          }}
        >
          다음
        </button>
      )}
    </div>
  );
};

export default SelectHobbyStyle;
