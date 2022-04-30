import React, { useState, useContext } from "react";
import styled from "../../css/match.module.css";
import { useNavigate } from "react-router-dom";

import { NicknameContext } from "../../context/NicknameContext";

const SelectHobbyStyle = ({ array, nextSlide }) => {
  const navigator = useNavigate();
  const { nickname } = useContext(NicknameContext);

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
    navigator("/match-result");
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
                    value={i}
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
          onClick={nextSlide}
        >
          다음
        </button>
      ) : (
        <button
          className={style !== null ? styled.btnActive : styled.btnHidden}
          onClick={handleTestSubmit}
        >
          다음
        </button>
      )}
    </div>
  );
};

export default SelectHobbyStyle;
